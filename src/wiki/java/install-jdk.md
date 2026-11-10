# 安装 JDK

因为 Java 程序必须运行在 JVM 之上，所以，我们第一件事情就是安装 JDK。

安装地址：

https://www.oracle.com/java/technologies/downloads/

Windows 优先选 `x64 MSI Installer`

## 设置环境变量

安装完 JDK 后，需要设置一个 `JAVA_HOME` 的环境变量，它指向 JDK 的安装目录。在 Windows 下，它是安装目录，类似：

```
C:\Program Files\Java\jdk-25
```

然后，把 `JAVA_HOME` 的 `bin` 目录附加到系统环境变量 `PATH` 上。在 Windows 下，它长这样：

```
Path=%JAVA_HOME%\bin;<现有的其他路径>
```

把 `JAVA_HOME` 的 `bin` 目录添加到 `PATH` 中是为了在任意文件夹下都可以运行 `java`。打开 PowerShell 窗口，输入命令 `java -version`，如果一切正常，你会看到如下输出：

```
┌─────────────────────────────────────────────────────────┐
│Windows PowerShell                                 - □ x │
├─────────────────────────────────────────────────────────┤
│Windows PowerShell                                       │
│Copyright (C) Microsoft Corporation. All rights reserved.│
│                                                         │
│PS C:\Users\liaoxuefeng> java -version                   │
│java version "25" ...                                    │
│Java(TM) SE Runtime Environment                          │
│Java HotSpot(TM) 64-Bit Server VM                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

如果你看到的版本号不是 `25`，而是 `15`、`1.8` 之类，说明系统存在多个 JDK，且默认 JDK 不是 JDK 25，需要把 JDK 25 提到 `PATH` 前面。

## JDK

细心的童鞋还可以在 `JAVA_HOME` 的 `bin` 目录下找到很多可执行文件：

- java：这个可执行程序其实就是 JVM，运行 Java 程序，就是启动 JVM，然后让 JVM 执行指定的编译后的代码；
- javac：这是 Java 的编译器，它用于把 Java 源码文件（以 `.java` 后缀结尾）编译为 Java 字节码文件（以 `.class` 后缀结尾）；
- jar：用于把一组 `.class` 文件打包成一个 `.jar` 文件，便于发布；
- javadoc：用于从 Java 源码中自动提取注释并生成文档；
- jdb：Java 调试器，用于开发阶段的运行调试。
