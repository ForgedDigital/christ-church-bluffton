@echo off
echo ====================================
echo  Deploying Christ Church Bluffton
echo ====================================
cd "C:\Users\kwmcc\Desktop\Web Design\1. Working Websites\1. Current Projects\7.1 Christ Church Bluffton"

set /p message="Enter what you changed: "

echo.
echo Adding files...
git add .
echo Committing changes...
git commit -m "%message%"
echo Pushing to GitHub...
git push
echo.
echo ====================================
echo  Deployment Complete!
echo  Files uploaded to GitHub
echo ====================================
pause
