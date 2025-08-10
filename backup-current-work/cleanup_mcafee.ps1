# McAfee Registry Cleanup Script
# Run this AFTER using the official McAfee uninstaller

Write-Host "McAfee Registry Cleanup Script" -ForegroundColor Green
Write-Host "This script removes remaining McAfee registry entries" -ForegroundColor Yellow

# Stop any remaining McAfee processes
Get-Process | Where-Object {$_.ProcessName -like "*mcafee*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Remove McAfee registry entries
$registryPaths = @(
    "HKLM:\SOFTWARE\McAfee",
    "HKLM:\SOFTWARE\WOW6432Node\McAfee",
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*McAfee*",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*McAfee*",
    "HKCU:\SOFTWARE\McAfee",
    "HKLM:\SOFTWARE\Microsoft\SecurityManager\CapAuthz\ApplicationsEx\*McAfee*"
)

foreach ($path in $registryPaths) {
    try {
        Get-ChildItem -Path $path -Recurse -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Cleaned: $path" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not clean: $path" -ForegroundColor Red
    }
}

# Remove browser extensions
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
        Write-Host "Could not remove: $path" -ForegroundColor Red
    }
}

# Remove McAfee files and folders
$mcafeePaths = @(
    "C:\Program Files\McAfee",
    "C:\Program Files (x86)\McAfee",
    "C:\Program Files (x86)\Common Files\McAfee",
    "$env:LOCALAPPDATA\McAfee",
    "$env:APPDATA\McAfee"
)

foreach ($path in $mcafeePaths) {
    if (Test-Path $path) {
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "Removed folder: $path" -ForegroundColor Green
        }
        catch {
            Write-Host "Could not remove folder: $path" -ForegroundColor Red
        }
    }
}

Write-Host "`nMcAfee cleanup completed!" -ForegroundColor Green
Write-Host "Please restart your computer to complete the removal." -ForegroundColor Yellow 