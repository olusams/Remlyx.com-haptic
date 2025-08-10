# Robust HTTP Server for Static Files with Auto-Recovery
param(
    [int]$Port = 3000,
    [int]$MaxRetries = 5
)

$retryCount = 0
$url = "http://localhost:$Port/"

# Ensure we're in the correct directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "=== Remlyx Website Server ===" -ForegroundColor Cyan
Write-Host "Starting robust HTTP server on $url" -ForegroundColor Green
Write-Host "Serving files from: $PWD" -ForegroundColor Yellow
Write-Host "Auto-restart enabled. Press Ctrl+C to stop completely" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Cyan

function Test-PortAvailable {
    param([int]$TestPort)
    try {
        $listener = [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties()
        $connections = $listener.GetActiveTcpListeners()
        return -not ($connections | Where-Object { $_.Port -eq $TestPort })
    } catch {
        return $true
    }
}

function Start-HttpServer {
    param([int]$ServerPort)
    
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$ServerPort/")
    
    try {
        $listener.Start()
        Write-Host "Server started successfully on port $ServerPort" -ForegroundColor Green
        return $listener
    } catch {
        Write-Warning "Failed to start on port $ServerPort`: $($_.Exception.Message)"
        return $null
    }
}

while ($retryCount -lt $MaxRetries) {
    try {
        # Find available port
        $currentPort = $Port
        while (-not (Test-PortAvailable $currentPort) -and $currentPort -lt $Port + 10) {
            $currentPort++
        }
        
        if ($currentPort -ne $Port) {
            Write-Host "Port $Port in use, trying port $currentPort" -ForegroundColor Yellow
        }
        
        $listener = Start-HttpServer -ServerPort $currentPort
        if (-not $listener) {
            $retryCount++
            Start-Sleep -Seconds 2
            continue
        }
        
        $serverUrl = "http://localhost:$currentPort/"
        Write-Host "✓ Server running at $serverUrl" -ForegroundColor Green
        Write-Host "✓ Ready for connections..." -ForegroundColor Green
        
        # Reset retry count on successful start
        $retryCount = 0
        
        # Main server loop with enhanced error handling
        while ($listener.IsListening) {
            try {
                $contextTask = $listener.GetContextAsync()
                $context = $contextTask.GetAwaiter().GetResult()
                
                $request = $context.Request
                $response = $context.Response
                
                $localPath = $request.Url.LocalPath.TrimStart('/')
                if ([string]::IsNullOrEmpty($localPath)) {
                    $localPath = "index.html"
                }
                
                $filePath = Join-Path $PWD $localPath
                
                # Simple request logging (reduced verbosity)
                if ($localPath -notmatch '\.(map|woff|woff2|ttf)$') {
                    Write-Host "→ $localPath" -ForegroundColor Gray
                }
                
                if (Test-Path $filePath -PathType Leaf) {
                    try {
                        $content = [System.IO.File]::ReadAllBytes($filePath)
                        $response.ContentLength64 = $content.Length
                        
                        # Set content type
                        $extension = [System.IO.Path]::GetExtension($filePath)
                        $response.ContentType = switch ($extension) {
                            ".html" { "text/html; charset=utf-8" }
                            ".css" { "text/css; charset=utf-8" }
                            ".js" { "application/javascript; charset=utf-8" }
                            ".png" { "image/png" }
                            ".jpg" { "image/jpeg" }
                            ".jpeg" { "image/jpeg" }
                            ".gif" { "image/gif" }
                            ".svg" { "image/svg+xml; charset=utf-8" }
                            ".ico" { "image/x-icon" }
                            ".woff" { "font/woff" }
                            ".woff2" { "font/woff2" }
                            ".ttf" { "font/ttf" }
                            ".map" { "application/json" }
                            default { "text/plain; charset=utf-8" }
                        }
                        
                        # Add headers for development
                        $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
                        $response.Headers.Add("Access-Control-Allow-Origin", "*")
                        
                        $response.StatusCode = 200
                        $response.OutputStream.Write($content, 0, $content.Length)
                    } catch {
                        Write-Warning "Error serving file $localPath`: $($_.Exception.Message)"
                        $response.StatusCode = 500
                    }
                } else {
                    $response.StatusCode = 404
                    $notFound = "<html><body><h1>404 - Not Found</h1><p>File '$localPath' not found.</p><p><a href='/'>← Back to Home</a></p></body></html>"
                    $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                    $response.ContentLength64 = $notFoundBytes.Length
                    $response.ContentType = "text/html; charset=utf-8"
                    $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
                }
                
                $response.Close()
                
            } catch [System.Net.HttpListenerException] {
                # Client disconnected - this is normal, just continue
                continue
            } catch [System.ObjectDisposedException] {
                # Listener was disposed - break out of loop
                break
            } catch {
                Write-Warning "Request handling error: $($_.Exception.Message)"
                try { $response.Close() } catch { }
                continue
            }
        }
        
    } catch [System.Net.HttpListenerException] {
        Write-Warning "Network error: $($_.Exception.Message)"
        $retryCount++
        Write-Host "Attempting restart ($retryCount/$MaxRetries) in 3 seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
    } catch {
        Write-Warning "Unexpected error: $($_.Exception.Message)"
        $retryCount++
        Write-Host "Attempting restart ($retryCount/$MaxRetries) in 3 seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
    } finally {
        if ($listener -and $listener.IsListening) {
            try {
                $listener.Stop()
                $listener.Close()
            } catch { }
        }
    }
}

Write-Host "Max retries reached. Server stopping." -ForegroundColor Red
