创建项目

```bash
npx create-react-app jira --template typescript
```

全局安装 json-server

```bash
yarn global add json-server
```

启动 json-server

```bash
json-server --watch db.json
```



dev模式下安装json-server

```bash
yarn add json-server -D
```

在项目顶层新建一个目录和文件 存放数据

```bash
文件名： __json_server_mock__

文件： db.json
```



安装 prettier 代码格式化插件

```bash
yarn add --dev --exact prettier
```

新建一个配置文件

```bash
echo {}> .prettierrc.json
```

新建一个 .prettierignore 文件,用来排除不需要格式化的文件
```js
build
coverage
```

运行以下命令：
```bash
npx mrm lint-staged
```



 为了避免 eslint 和 prettier 冲突

安装eslint-config-prettier插件

```bash
yarn add eslint-config-prettier -D
```



在package.json中配置 添加"prettier" 覆盖eslint的规则

```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```



安装commitlint插件

```bash
yarn add @commitlint/{config-conventional,cli} -D
```

运行一下这个命令

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```



```bash
build：构建相关的修改，例如构建脚本、外部依赖项等。
chore：零碎的杂事，例如修改 .gitignore、增加/更新依赖等。
ci：与 CI (Continuous Integration，持续集成) 相关的修改，例如 Travis、Circle 等的配置。
docs：仅仅修改文档，例如README、API文档等。
feat：新增功能，例如新的页面、新的功能等。
fix：修复问题，例如修复bug、修正拼写错误等。
perf：优化性能的修改。
refactor：重构代码，既不修复错误也不新增功能。
revert：撤销先前的提交。
style：修改样式，例如调整缩进、空格、格式等。
test：新增或修改测试代码，例如增加单元测试、集成测试等。
```

