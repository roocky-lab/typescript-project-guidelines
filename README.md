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
 
1. 安装TypeScript构建工具

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

此外，TS-Node还会简化VS Code及Mocha的配置，这些后面会讲到。

## Todo

- node(master):
  - [X] ~~安装TypeScript构建工具~~
  - [ ] 配置在VS Code中构建、调试
  - [ ] 强制StandardJS编码风格，开启问题提示及自动纠错
  - [ ] 集成单元测试工具：Mocha框架、power-assert断言库及Istanbul覆盖率统计
  - [ ] 集成API文档自动生成工具：TypeDoc

- server：
  - [ ] 安装Koa及基本中间件
  - [ ] 集成Passport身份认证库
  - [ ] ...

- react
  - [ ] ...
