### autostart webpack when conEmu run
```bash 
press key: windows+alt+p to open setting page
=> StartUp => Tasks > click "+" to add a new task

task parameners:
/dir "D:\front-end test\project\reconsitution_use_react"

Commands:

cmd.exe /k "%ConEmuBaseDir%\CmdInit.cmd" -cur_console:sH & webpack --w
cmd.exe /k "%ConEmuBaseDir%\CmdInit.cmd" -cur_console:sH & npm start

checked "default shell(wind+x)"

click "Up" move it to top of the list


```