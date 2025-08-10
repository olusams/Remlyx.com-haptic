@echo off
title Remlyx Website Server - Auto-Restart
echo Starting Remlyx Website Server with Auto-Restart...
echo Press Ctrl+C to stop completely
echo.

:restart
echo [%date% %time%] Starting server...
powershell -ExecutionPolicy Bypass -File start-server.ps1
echo [%date% %time%] Server stopped. Restarting in 3 seconds...
timeout /t 3 /nobreak >nul
goto restart
