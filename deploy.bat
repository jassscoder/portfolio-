@echo off
echo ========================================
echo    PORTFOLIO GITHUB DEPLOYMENT SCRIPT
echo ========================================
echo.
echo This script will help you deploy your portfolio to GitHub Pages
echo.
set /p username=jassscoder
set /p repo=portfolio-
echo.
echo Repository URL: https://github.com/%username%/%repo%
echo.
git remote add origin https://github.com/%username%/%repo%.git
git push -u origin main
echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your code is now on GitHub!
echo.
echo To enable GitHub Pages:
echo 1. Go to: https://github.com/%username%/%repo%
echo 2. Click "Settings" tab
echo 3. Scroll down to "Pages" section
echo 4. Under "Source", select "Deploy from a branch"
echo 5. Under "Branch", select "main" and "/ (root)"
echo 6. Click "Save"
echo.
echo Your portfolio will be live at:
echo https://%username%.github.io/%repo%/
echo.
echo It may take 2-3 minutes to go live.
echo.
pause