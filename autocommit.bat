@echo off
:loop
git pull
git add --all :/
git commit -m "Autocommit"
git push
goto loop