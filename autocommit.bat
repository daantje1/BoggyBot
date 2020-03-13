@echo off
:loop
git add --all :/
git commit -m "Autocommit"
git push
goto loop