## silo tools

快速构建 webpack + karma 工具

### 安装

```shell
 npm install silo-tools -g
```

### 简单开始

```shell

silo init myProject  初始化项目

silo server 运行本地服务器

sudo silo karma 开始跑测试

```

### 看看你代码到底写了多少行了（码农需要一点成就感）

- 运行 `npm run len:all`

### 生成es6文档

- 运行 `npm run doc`

### 如何运行测试

- 非前端项目: 运行 `npm run test`
- 前端项目: 运行 `sudo npm run karma` 或者 `sudo silo karma`

### 如何运行测试覆盖率

- 非前端项目：运行 `npm run test:cov`

- 前端项目: 运行 `sudo silo karma` 查看 coverage 文件夹

### 更多命令

通过 `silo --help` 查看

### thanks:

[rc-tools](https://github.com/react-component/rc-tools)

