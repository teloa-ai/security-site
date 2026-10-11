# Teloa AI Security

<img src="assets/teloa-security.webp" width="200" alt="小松鼠 Teloa 安全工程师">

Teloa AI Security 是源于 Teloa 开发实践的 AI 安全研究与开源计划，关注智能体身份、授权、执行边界与安全治理，并将设计经验整理为开放基线、参考架构和评估工具。

公共安全站点：[security.teloa.ai](https://security.teloa.ai/?lang=zh-CN)

发起与维护：Teloa AI Security。

## 项目入口

- [智能体安全基线在线自评](https://security.teloa.ai/agent-baseline-assessor/?lang=zh-CN)
- [多语言参考架构](https://security.teloa.ai/agent-baseline-assessor/01-standard/diagrams/?lang=zh-CN)
- [项目仓库与文档](https://github.com/teloa-ai/agent-baseline-assessor)

## 部署

本独立仓库通过 Cloudflare Pages 发布公共安全门户 `security.teloa.ai`。组织级 `teloa-ai.github.io` 仓库保留用于组织主页与公共资源。

门户使用静态 HTML 与本地脚本切换中英文内容并渲染统一导航，不含统计或数据收集。默认英文，`?lang=zh-CN` 切换中文。

基线是可自行部署的[独立项目](https://github.com/teloa-ai/agent-baseline-assessor)。本门户仅在 `/agent-baseline-assessor/` 提供演示；构建从其公开仓库获取 `demo-project.json` 指定的版本，不给工具或架构图册注入门户导航或运行依赖。

安装 Node.js 22+ 与 Git 后，运行 `npm test` 构建并检查 `dist/`。维护者登录 Cloudflare CLI 后，可用 `npm run deploy` 发布。仓库不保存凭据；发布已审查的项目版本时，显式更新演示版本。

品牌与小松鼠素材的权利说明见 [assets/README.md](assets/README.md)。

[官网](https://www.teloa.ai/) · [文档](https://docs.teloa.ai/) · [资源市场](https://market.teloa.ai/) · [博客](https://www.teloa.ai/blog/) · [安全报告](https://security.teloa.ai/report/?lang=zh-CN)

安全问题可通过 [security@teloa.ai](mailto:security@teloa.ai) 报告；请遵循各项目的[报告指引](https://security.teloa.ai/report/?lang=zh-CN)。

门户代码采用 Apache-2.0 许可；品牌素材另见权利说明。演示项目保留自身的软件和文档许可。
