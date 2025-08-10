# Comprehensive Diagnostic Script
# This script will check for various potential causes of file deletion issues

Write-Host "=== COMPREHENSIVE DIAGNOSTIC ===" -ForegroundColor Green

# 1. Check for any McAfee remnants
Write-Host "`n1. Checking for McAfee remnants..." -ForegroundColor Yellow
$mcafeeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*mcafee*"}
if ($mcafeeProcesses) {
    Write-Host "❌ McAfee processes found:" -ForegroundColor Red
    $mcafeeProcesses | ForEach-Object { Write-Host "   - $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Red }
} else {
    Write-Host "✅ No McAfee processes found" -ForegroundColor Green
}

# 2. Check for suspicious processes
Write-Host "`n2. Checking for suspicious processes..." -ForegroundColor Yellow
$suspiciousProcesses = Get-Process | Where-Object {
    $_.ProcessName -like "*clean*" -or 
    $_.ProcessName -like "*delete*" -or 
    $_.ProcessName -like "*remove*" -or
    $_.ProcessName -like "*uninstall*"
}
if ($suspiciousProcesses) {
    Write-Host "⚠️  Suspicious processes found:" -ForegroundColor Yellow
    $suspiciousProcesses | ForEach-Object { Write-Host "   - $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Yellow }
} else {
    Write-Host "✅ No suspicious processes found" -ForegroundColor Green
}

# 3. Check file system integrity
Write-Host "`n3. Checking file system integrity..." -ForegroundColor Yellow
try {
    $testFile = "diagnostic_test_$(Get-Random).txt"
    New-Item -ItemType File -Path $testFile -Force | Out-Null
    Write-Host "✅ File creation successful" -ForegroundColor Green
    
    Remove-Item -Path $testFile -Force
    Write-Host "✅ File deletion successful" -ForegroundColor Green
} catch {
    Write-Host "❌ File system test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Check Windows Defender status
Write-Host "`n4. Checking Windows Defender status..." -ForegroundColor Yellow
try {
    $defenderStatus = Get-MpComputerStatus
    Write-Host "   Antivirus Enabled: $($defenderStatus.AntivirusEnabled)" -ForegroundColor Gray
    Write-Host "   Real-time Protection: $($defenderStatus.RealTimeProtectionEnabled)" -ForegroundColor Gray
    Write-Host "   Behavior Monitoring: $($defenderStatus.BehaviorMonitorEnabled)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Could not check Windows Defender status" -ForegroundColor Red
}

# 5. Check for file association issues
Write-Host "`n5. Checking file associations..." -ForegroundColor Yellow
$htmlAssociation = reg query "HKLM\Software\Classes\.html" 2>$null
if ($htmlAssociation) {
    Write-Host "✅ HTML file association exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  HTML file association missing" -ForegroundColor Yellow
}

# 6. Check for context menu issues
Write-Host "`n6. Checking context menu..." -ForegroundColor Yellow
$contextMenu = reg query "HKLM\Software\Classes\AllFileSystemObjects\shell" 2>$null
if ($contextMenu) {
    Write-Host "✅ Context menu registry entries exist" -ForegroundColor Green
} else {
    Write-Host "⚠️  Context menu registry entries missing" -ForegroundColor Yellow
}

# 7. Check for disk space issues
Write-Host "`n7. Checking disk space..." -ForegroundColor Yellow
$disk = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'"
$freeSpaceGB = [math]::Round($disk.FreeSpace / 1GB, 2)
$totalSpaceGB = [math]::Round($disk.Size / 1GB, 2)
$freePercentage = [math]::Round(($disk.FreeSpace / $disk.Size) * 100, 2)
Write-Host "   Free space: $freeSpaceGB GB ($freePercentage%)" -ForegroundColor Gray

if ($freePercentage -lt 10) {
    Write-Host "⚠️  Low disk space detected" -ForegroundColor Yellow
} else {
    Write-Host "✅ Sufficient disk space" -ForegroundColor Green
}

# 8. Check for system errors
Write-Host "`n8. Checking recent system errors..." -ForegroundColor Yellow
try {
    $recentErrors = Get-EventLog -LogName System -EntryType Error -Newest 5 -ErrorAction SilentlyContinue
    if ($recentErrors) {
        Write-Host "⚠️  Recent system errors found:" -ForegroundColor Yellow
        $recentErrors | ForEach-Object { Write-Host "   - $($_.TimeGenerated): $($_.Message)" -ForegroundColor Gray }
    } else {
        Write-Host "✅ No recent system errors" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Could not check system errors (requires admin)" -ForegroundColor Yellow
}

Write-Host "`n=== DIAGNOSTIC COMPLETE ===" -ForegroundColor Green
Write-Host "If no issues were found, the problem might be:" -ForegroundColor Yellow
Write-Host "1. A temporary Windows Explorer issue" -ForegroundColor Gray
Write-Host "2. A file association problem" -ForegroundColor Gray
Write-Host "3. A context menu issue" -ForegroundColor Gray
Write-Host "4. A Windows Defender false positive" -ForegroundColor Gray 