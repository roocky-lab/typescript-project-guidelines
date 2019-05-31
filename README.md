# TypeScript工程指南

> 这是一份TypeScript工程指南，也包含遵循该指南的项目模板。
> 你可以一键克隆，直接使用。
> 不过，更好是浏览一遍，了解TypeScript一系列最佳实践。

## 原则

- 逐条记录搭建步骤，授之以渔
- 奉行『约定优于配置』，简单、省心、易于协作
- 同步最新主流实践，欢迎大家提出建议

## 前置条件

使用前，确保已安装：
- Node.js
- VS Code

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

## Todo

- node(master):
  - [ ] 安装TypeScript编译工具
  - [ ] 配置在VS Code中一键构建、单步调试
  - [ ] 强制StandardJS编码风格，开启问题提示及自动纠错
  - [ ] 集成单元测试工具：Mocha框架、power-assert断言库及Istanbul覆盖率统计
  - [ ] 集成API文档自动生成工具：TypeDoc

- server：
  - [ ] 安装Koa及基本中间件
  - [ ] 集成Passport身份认证库
  - [ ] ...

- react
  - [ ] ...
