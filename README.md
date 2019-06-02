# TypeScript工程实践指南

> 这是一份指南，也包含遵循指南的项目模板  
> 你可以一键克隆，直接使用  
> 不过，更好是浏览一遍，来了解TypeScript的一系列最佳实践  

## 原则

- 逐条记录搭建步骤，授之以渔
- 奉行『约定优于配置』，简单、省心、易于协作
- 同步最新主流实践，欢迎大家提出建议

## 前置条件

使用前，确保已安装：
- [Node.js](https://nodejs.org/en/download)
- [Visual Studio Code](https://code.visualstudio.com/Download)

## 直接使用

- 下载模板
```bash
$ git clone --depth=1 https://github.com/roocky-lab/typescript-project-guidelines.git <project_name>
```

- 安装依赖
```bash
$ cd <project_name>
$ npm install
```

## 工程搭建
 
### 1. 安装TypeScript构建工具

```bash
# 建议局部安装
$ npm install --save-dev typescript
$ npm install --save-dev ts-node
```

[TypeScript](https://github.com/microsoft/TypeScript)是Microsoft官方编译器  
[TS-Node](https://github.com/TypeStrong/ts-node)是Node.js运行TypeScript的扩展，提供一些实用功能，比如：

```bash
# 启动TypeScript版REPL(交互解析器)，用于随手验证
$ npx ts-node

# 直接运行TypeScript(不产生编译后文件)
$ npx ts-node <xxx.ts>
# 或(等价)
$ node -r ts-node/register <xxx.ts>
```

此外，TS-Node还会简化VS Code及Mocha的配置，后面会讲到。


### 2. 配置在VS Code中调试TypeScript

让VS Code支持TypeScript脚本的构建、单步调试，借用TS-Node是目前最简便的方法，避免直接配置JavaScript、SourceMap等中间文件的烦恼。  

在工程根目录创建`.vscode`文件夹，新建启动调试的配置文件`launch.json`:

```bash 
$ code .vscode/launch.json
```

下面是基本配置，入口文件`app.ts`可以自由指定，`${workspaceFolder}`指工程根目录：

**.vscode/launch.json**
```json
// node -r ts-node/register app.ts
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "runtimeArgs": [
        "-r",
        "ts-node/register"
      ],
      "args": [
        "${workspaceFolder}/app.ts"
      ]
    }
  ]
}
```

上述`.vscode/launch.json`的配置，也可以通过界面操作，具体步骤及参数的含义等，可参考：
- [VSCode Launch configurations](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
- [TS-Node for VSCode](https://github.com/TypeStrong/ts-node#visual-studio-code)

配置完毕，在工程根目录创建`app.ts`，敲上一段TypeScript版Hello World:

```bash
code app.ts
```

**app.ts**
```javascript
function hello(who: string): string {
  return `Hello, ${who}!`
}

console.log(hello('World'))
```

按下`F5`构建输出，然后加个断点，再跑一遍。  


## Todo

- node(master):
  - [X] ~~安装TypeScript构建工具~~
  - [X] ~~配置在VS Code中调试TypeScript~~
  - [ ] 强制StandardJS编码风格，开启问题提示及自动纠错
  - [ ] 集成单元测试工具：Mocha框架、power-assert断言库及Istanbul覆盖率统计
  - [ ] 集成API文档自动生成工具：TypeDoc

- server：
  - [ ] 安装Koa及基本中间件
  - [ ] 集成Passport身份认证库
  - [ ] ...
