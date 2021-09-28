# Git

## Git 中的 core.autocrlf 选项

项目的开发环境为Windows，在Linux环境下编译，使用Git进行版本控制

在安装好 Git 和 TortoiseGit 后，从远端 clone，遇到一个奇怪的问题，Shell 脚本中的 LF 总是被替换成了 CRLF，最后发现是在 Git 的安装过程中有一项没有被配置好

在Windows下，由回车CR（0x0D）（\r）和换行LF（0x0A）（ \n）)共同标志一行的结束

而在 Linux 和 Mac 环境下，每一行的结束仅有一个换行 LF（0x0A）（\n）

在 Git 中有一项 core.autocflf 配置项，它可以被配置为 true，false 和 input，它们分别表示：

```bash
// 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

// 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

// 提交检出均不转换
git config --global core.autocrlf false
```

 使用上述的最后一条命令，将 core.autocrlf 配置为 false，即不开启自动转换功能，之后重新 clone，本地仓库中的 Shell 脚本中不再出现 CR