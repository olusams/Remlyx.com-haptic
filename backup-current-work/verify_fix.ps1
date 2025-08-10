# Verification Script - Test if McAfee removal fixed the file deletion issue

Write-Host "=== VERIFYING MCAFEE REMOVAL ===" -ForegroundColor Green

# Check for any remaining McAfee processes
Write-Host "`n1. Checking for McAfee processes..." -ForegroundColor Yellow
$mcafeeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*mcafee*"}
if ($mcafeeProcesses) {
    Write-Host "❌ McAfee processes still running:" -ForegroundColor Red
    $mcafeeProcesses | ForEach-Object { Write-Host "   - $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Red }
} else {
    Write-Host "✅ No McAfee processes found" -ForegroundColor Green
}

# Check for McAfee services
Write-Host "`n2. Checking for McAfee services..." -ForegroundColor Yellow
$mcafeeServices = Get-Service | Where-Object {$_.Name -like "*mcafee*" -or $_.DisplayName -like "*mcafee*"}
if ($mcafeeServices) {
    Write-Host "⚠️  McAfee services found (should be stopped):" -ForegroundColor Yellow
    $mcafeeServices | ForEach-Object { Write-Host "   - $($_.DisplayName) (Status: $($_.Status))" -ForegroundColor Yellow }
} else {
    Write-Host "✅ No McAfee services found" -ForegroundColor Green
}

# Test file access
Write-Host "`n3. Testing file access..." -ForegroundColor Yellow
try {
    $testFiles = Get-ChildItem -Path "assets" -Recurse | Select-Object -First 5
    Write-Host "✅ File access test successful - Found $($testFiles.Count) files" -ForegroundColor Green
    $testFiles | ForEach-Object { Write-Host "   - $($_.Name)" -ForegroundColor Gray }
} catch {
    Write-Host "❌ File access test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check Windows Defender status
Write-Host "`n4. Checking Windows Defender status..." -ForegroundColor Yellow
try {
    $defenderStatus = Get-MpComputerStatus
    if ($defenderStatus.AntivirusEnabled) {
        Write-Host "✅ Windows Defender is active and protecting your system" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Windows Defender is not active" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Could not check Windows Defender status" -ForegroundColor Red
}

# Test folder creation and deletion
Write-Host "`n5. Testing folder operations..." -ForegroundColor Yellow
try {
    $testFolder = "test_folder_$(Get-Random)"
    New-Item -ItemType Directory -Path $testFolder -Force | Out-Null
    Write-Host "✅ Folder creation successful" -ForegroundColor Green
    
    Remove-Item -Path $testFolder -Force
    Write-Host "✅ Folder deletion successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Folder operations failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== VERIFICATION COMPLETE ===" -ForegroundColor Green
Write-Host "If all tests passed, the file deletion issue should be resolved!" -ForegroundColor Green
Write-Host "Try clicking on files and folders normally now." -ForegroundColor Yellow 