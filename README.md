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

### 3. 强制StandardJS编码风格

保持一致的编码规范，好处无需赘述。但关于规范的细则、争议及一堆`eslintrc*`，让人不胜其扰。  
直接使用[StandardJS风格](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)，规则一致、自动纠错、开箱即用。  

安装[StandardJS](https://github.com/standard/standard#install)及[TypeScript插件](https://github.com/standard/standard#typescript)

```bash
$ npm install --save-dev standard
$ npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

配置文件中，开启StandardJS的TypeScript扩展插件:

**package.json**
```json
{
  "standard": {
    "parser": "@typescript-eslint/parser",
    "plugins": [ "@typescript-eslint/eslint-plugin" ]
  }
}
```

现在，用命令可以格式化任意TypeScript脚本：

```bash
$ npx standard *.ts
```

更多的时候，我们希望是在VS Code中自动提示与修正。由此，应用商店搜索安装[StandardJS插件](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)，或通过命令安装：

```bash
$ code --install-extension chenxsan.vscode-standardjs
```

创建VS Code本地工作区配置文件`.vscode/settings.json`

```bash
$ code .vscode/settings.json
```

**.vscode/settings.json**

```json
{
  "javascript.validate.enable": false,

  "standard.autoFixOnSave": true,
  "standard.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    }
  ]
}
```

再给VS Code添加段落补全(snippets)功能，安装[JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)插件：

```bash
$ code --install-extension xabikos.javascriptsnippets
```

最后，重启VS Code，打开`app.ts`，随手写些代码：
- 尝试输入`fof` / `clg`等缩写，然后敲`Tab`，看段落补全效果；
- 把代码的缩进、换行、命名弄乱，`Ctrl + S`保存时，观察自动修正效果。 

### 4. 集成Mocha单元测试框架及相关配套

[Mocha](https://mochajs.org/)测试框架功能丰富，支持运行在Node.js和浏览器中，对异步测试支持非常友好；  
[power-assert](https://github.com/power-assert-js/power-assert)断言库API完全与Node.js原生`assert`完全一致，没学习负担直接使用，错误信息详尽友好；  
[espower-typescript](https://github.com/power-assert-js/espower-typescript)是power-assert支持TypeScript的扩展。

```bash
$ npm install --save-dev mocha power-assert espower-typescript @types/mocha @types/node
```

创建Mocha的配置文件，统一放在config目录下：
```bash
$ code config/.mocha.opts
```

**config/.mocha.opts**
```bash
--require espower-typescript/guess
--colors
--recursive
--bail
--full-trace
--exit
app/**/*.test.{js,jsx,ts,tsx}
```

安装测试覆盖率统计工具[Istanbul](https://github.com/gotwarlost/istanbul)的命令行接口[nyc](https://github.com/istanbuljs/nyc)及[nyc-config-typescript](https://github.com/wizardsoftheweb/nyc-config-typescript)扩展插件:

```bash
$ npm install --save-dev nyc @istanbuljs/nyc-config-typescript
```

添加配置及调用命令，其中`app/`是代码和测试用例的主目录，也可另行命名:

**package.json**
```json
{
  "scripts": {
    "start": "node -r ts-node/register app.ts",
    "test": "mocha --opts config/.mocha.opts",
    "cov": "nyc npm run test"
  },
  "nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true,
    "reporter": "text-summary",
    "cwd": "app/"
  },
  "directories": {
    "test": "app/"
  }
}
```

配置完毕，现在测试一下。新建一对文件，分别是代码与用例：

```bash
$ code app/add.ts app/add.test.ts
```

源代码，简单的加法函数：
**app/add.ts**
```javascript
function add (a: number, b: number): number {
  return a + b
}

export default add

```

测试用例，测试对应的加法函数：
**app/add.test.ts**
```javascript
/* eslint-env mocha */
import add from './add'
import assert = require('assert')

describe('app/add.ts', function () {
  it('1 + 1 = 2', () => {
    assert(add(1, 1) === 2)
  })
})

```

看一下成果：
```bash
# 执行单元测试
$ npm run test

# 执行测试用例并统计测试覆盖率
$ npm run cov
```


## Todo

- node(master):
  - [X] ~~安装TypeScript构建工具~~
  - [X] ~~配置在VS Code中调试TypeScript~~
  - [X] ~~强制StandardJS编码风格，开启提示、自动修正及段落补全~~
  - [X] ~~集成单元测试工具：Mocha框架、power-assert断言库及Istanbul覆盖率统计~~
  - [ ] 集成API文档自动生成工具：TypeDoc

- server：
  - [ ] 安装Koa及基本中间件
  - [ ] 集成Passport身份认证库
  - [ ] ...
