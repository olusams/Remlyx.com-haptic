# File System Monitor Script
# This script will monitor file system events to detect what's causing deletion prompts

Write-Host "=== FILE SYSTEM MONITOR ===" -ForegroundColor Green
Write-Host "Monitoring file system events for the next 30 seconds..." -ForegroundColor Yellow
Write-Host "Try clicking on files and folders during this time." -ForegroundColor Yellow

# Register for file system events
$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    $time = Get-Date -Format "HH:mm:ss"
    Write-Host "[$time] $changeType : $path" -ForegroundColor Cyan
}

try {
    # Monitor the current directory
    $watcher = New-Object System.IO.FileSystemWatcher
    $watcher.Path = Get-Location
    $watcher.IncludeSubdirectories = $true
    $watcher.EnableRaisingEvents = $true

    # Register events
    $handlers = @()
    $handlers += Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action $action
    $handlers += Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action $action
    $handlers += Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action $action
    $handlers += Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action $action

    Write-Host "Monitoring started. Press Ctrl+C to stop." -ForegroundColor Green
    
    # Wait for 30 seconds
    Start-Sleep -Seconds 30
    
    # Cleanup
    $handlers | ForEach-Object { Unregister-Event -SourceIdentifier $_.Name }
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    
    Write-Host "Monitoring stopped." -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
} 