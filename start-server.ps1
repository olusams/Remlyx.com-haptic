# Simple HTTP Server for Static Files
$port = 3000
$url = "http://localhost:$port/"

# Ensure we're in the correct directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Starting HTTP server on $url" -ForegroundColor Green
Write-Host "Serving files from: $PWD" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

# Check if port is available
$portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "Port $port is already in use. Trying port 3001..." -ForegroundColor Yellow
    $port = 3001
    $url = "http://localhost:$port/"
}

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Host "Failed to start server on port $port. Trying port 8082..." -ForegroundColor Yellow
    $port = 8082
    $url = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
}

Write-Host "Server is running at $url" -ForegroundColor Green

try {
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $localPath = $request.Url.LocalPath
            $localPath = $localPath.TrimStart('/')
            
            if ([string]::IsNullOrEmpty($localPath)) {
                $localPath = "index.html"
            }
            
            $filePath = Join-Path $PWD $localPath
            
            Write-Host "Request: $localPath" -ForegroundColor Gray
            
            if (Test-Path $filePath -PathType Leaf) {
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $content.Length
                
                # Set content type based on file extension
                $extension = [System.IO.Path]::GetExtension($filePath)
                switch ($extension) {
                    ".html" { $response.ContentType = "text/html; charset=utf-8" }
                    ".css" { $response.ContentType = "text/css; charset=utf-8" }
                    ".js" { $response.ContentType = "application/javascript; charset=utf-8" }
                    ".png" { $response.ContentType = "image/png" }
                    ".jpg" { $response.ContentType = "image/jpeg" }
                    ".jpeg" { $response.ContentType = "image/jpeg" }
                    ".gif" { $response.ContentType = "image/gif" }
                    ".svg" { $response.ContentType = "image/svg+xml; charset=utf-8" }
                    ".ico" { $response.ContentType = "image/x-icon" }
                    ".woff" { $response.ContentType = "font/woff" }
                    ".woff2" { $response.ContentType = "font/woff2" }
                    ".ttf" { $response.ContentType = "font/ttf" }
                    ".map" { $response.ContentType = "application/json" }
                    default { $response.ContentType = "text/plain; charset=utf-8" }
                }
                
                # Add CORS headers for development
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
                
                $response.OutputStream.Write($content, 0, $content.Length)
                $response.StatusCode = 200
            } else {
                $response.StatusCode = 404
                $notFoundContent = "<html><body><h1>404 - File Not Found</h1><p>The requested file '$localPath' was not found.</p><p><a href='/'>Return to Homepage</a></p></body></html>"
                $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundContent)
                $response.ContentLength64 = $notFoundBytes.Length
                $response.ContentType = "text/html; charset=utf-8"
                $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
            }
            
            $response.Close()
        } catch [System.Net.HttpListenerException] {
            # Handle client disconnections gracefully
            Write-Host "Client disconnected unexpectedly" -ForegroundColor Yellow
            continue
        } catch {
            Write-Host "Request error: $($_.Exception.Message)" -ForegroundColor Yellow
            try { $response.Close() } catch { }
            continue
        }
    }
} catch {
    Write-Host "Server stopped: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    Write-Host "Server stopped." -ForegroundColor Yellow
}
