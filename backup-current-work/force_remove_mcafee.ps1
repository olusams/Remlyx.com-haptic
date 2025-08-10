# Force Remove McAfee - Aggressive Cleanup Script
# Run this as Administrator

Write-Host "=== FORCE REMOVE MCAFEE ===" -ForegroundColor Red
Write-Host "This script will aggressively remove all McAfee components" -ForegroundColor Yellow

# Stop all McAfee processes forcefully
Write-Host "Stopping McAfee processes..." -ForegroundColor Green
Get-Process | Where-Object {$_.ProcessName -like "*mcafee*" -or $_.ProcessName -like "*security*"} | ForEach-Object {
    try {
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Stopped process: $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not stop: $($_.ProcessName)" -ForegroundColor Red
    }
}

# Stop and disable McAfee services
Write-Host "Stopping McAfee services..." -ForegroundColor Green
$mcafeeServices = @(
    "mcafeeintegrationservice",
    "McpManagementService",
    "NPSMSvc_94f9d"
)

foreach ($service in $mcafeeServices) {
    try {
        Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
        Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
        Write-Host "Stopped and disabled service: $service" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not stop service: $service" -ForegroundColor Red
    }
}

# Remove McAfee from startup
Write-Host "Removing McAfee from startup..." -ForegroundColor Green
$startupPaths = @(
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
    "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
    "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce"
)

foreach ($path in $startupPaths) {
    Get-ItemProperty -Path $path -ErrorAction SilentlyContinue | ForEach-Object {
        $_.PSObject.Properties | Where-Object {$_.Name -like "*mcafee*" -or $_.Value -like "*mcafee*"} | ForEach-Object {
            try {
                Remove-ItemProperty -Path $path -Name $_.Name -Force -ErrorAction SilentlyContinue
                Write-Host "Removed startup entry: $($_.Name)" -ForegroundColor Green
            }
            catch {
                Write-Host "Could not remove startup entry: $($_.Name)" -ForegroundColor Red
            }
        }
    }
}

# Remove McAfee registry entries completely
Write-Host "Removing McAfee registry entries..." -ForegroundColor Green
$registryPaths = @(
    "HKLM:\SOFTWARE\McAfee",
    "HKLM:\SOFTWARE\WOW6432Node\McAfee",
    "HKCU:\SOFTWARE\McAfee",
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*McAfee*",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*McAfee*",
    "HKLM:\SOFTWARE\Microsoft\SecurityManager\CapAuthz\ApplicationsEx\*McAfee*",
    "HKLM:\SYSTEM\CurrentControlSet\Services\*mcafee*",
    "HKLM:\SYSTEM\CurrentControlSet\Services\*McAfee*"
)

foreach ($path in $registryPaths) {
    try {
        Get-ChildItem -Path $path -Recurse -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Cleaned registry: $path" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not clean registry: $path" -ForegroundColor Red
    }
}

# Remove McAfee files and folders
Write-Host "Removing McAfee files and folders..." -ForegroundColor Green
$mcafeePaths = @(
    "C:\Program Files\McAfee",
    "C:\Program Files (x86)\McAfee",
    "C:\Program Files (x86)\Common Files\McAfee",
    "$env:LOCALAPPDATA\McAfee",
    "$env:APPDATA\McAfee",
    "$env:PROGRAMDATA\McAfee",
    "C:\Windows\System32\drivers\*mcafee*",
    "C:\Windows\SysWOW64\*mcafee*"
)

foreach ($path in $mcafeePaths) {
    if (Test-Path $path) {
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "Removed: $path" -ForegroundColor Green
        }
        catch {
            Write-Host "Could not remove: $path" -ForegroundColor Red
        }
    }
}

# Remove browser extensions
Write-Host "Removing browser extensions..." -ForegroundColor Green
$browserPaths = @(
    "HKLM:\SOFTWARE\Google\Chrome\NativeMessagingHosts\webadvisor.mcafee.chrome.extension",
    "HKLM:\SOFTWARE\WOW6432Node\Google\Chrome\NativeMessagingHosts\webadvisor.mcafee.chrome.extension",
    "HKLM:\SOFTWARE\Mozilla\NativeMessagingHosts\webadvisor.mcafee.chrome.extension",
    "HKLM:\SOFTWARE\WOW6432Node\Mozilla\NativeMessagingHosts\webadvisor.mcafee.chrome.extension",
    "HKLM:\SOFTWARE\Microsoft\Edge\NativeMessagingHosts\webadvisor.mcafee.chrome.extension",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Edge\NativeMessagingHosts\webadvisor.mcafee.chrome.extension"
)

foreach ($path in $browserPaths) {
    try {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Removed browser extension: $path" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not remove browser extension: $path" -ForegroundColor Red
    }
}

# Kill any remaining McAfee processes
Write-Host "Final cleanup of any remaining processes..." -ForegroundColor Green
Get-Process | Where-Object {$_.ProcessName -like "*mcafee*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "`n=== MCAFEE FORCE REMOVAL COMPLETED ===" -ForegroundColor Green
Write-Host "Please restart your computer immediately!" -ForegroundColor Red
Write-Host "After restart, test if the file deletion issue is resolved." -ForegroundColor Yellow 