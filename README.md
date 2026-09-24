# 李星 · 个人作品集

纯原生 HTML / CSS / JavaScript 实现的单页个人作品集，面向老师、同学与企业招聘人员。
展示 6 个完整项目（其中 4 个来自企业委托或校企合作），无框架、无构建步骤、无第三方依赖，
浏览器直接打开即可运行。

## 主要功能

- **作品展示**：6 个项目用 4 种杂志式版式呈现 —— 通栏大图 `feature`、左图右文 `split-left`、右图左文 `split-right`、错位编辑式 `editorial`。
- **类别筛选**：筛选标签按数据中出现的顺序自动生成（智能座舱 / 自动驾驶 / 机器人系统 / 视觉算法），支持"全部"与空状态提示；筛选后项目编号保持稳定，不随结果重排。
- **深色 / 浅色主题**：导航栏一键切换（月亮 / 太阳图标），选择写入 `localStorage`；首次访问跟随系统深浅色，`<head>` 内联脚本在样式表生效前写好主题，避免首屏白闪。
- **响应式排版**：桌面多栏 → 平板（≤1080px）首屏与"关于我"收成单列 → 移动端（≤900px）折叠为汉堡菜单 → ≤760px 所有项目版式统一折叠为单列。
- **其他交互**：吸顶导航滚动后出现分割线、导航当前区块高亮、滚动入场动画（尊重 `prefers-reduced-motion`）。

## 技术栈

- 原生 HTML5 + CSS3 + ES5 JavaScript，不使用 React / Vue 等框架，不引入任何 UI 组件库与 npm 依赖。
- CSS 自定义属性（变量）统一管理配色与版式尺度；深色主题只覆盖变量，不改结构样式。
- `IntersectionObserver` 做滚动入场，`matchMedia` 跟随系统主题变化，`localStorage` 记忆用户选择。
- JS 全部为 IIFE 挂全局模块（`window.PROJECTS` / `PortfolioRender` / `PortfolioInteractions`），按脚本顺序装配。

## 目录结构

```
lab04/
├── index.html              页面结构（含主题预设内联脚本）
├── css/
│   ├── base.css            设计变量、重置、通用排版（深色主题变量也在这里）
│   ├── layout.css          导航、首屏、关于我、联系方式、页脚
│   ├── projects.css        作品区栅格与四种版式变体
│   └── responsive.css      断点适配
├── js/
│   ├── projects.js         项目数据（日常唯一需要维护的文件）
│   ├── render.js           把项目数据渲染成 DOM
│   ├── interactions.js     导航、移动端菜单、主题切换、滚动高亮、类别筛选
│   └── main.js             入口：按顺序装配各模块
├── assets/images/          人像照与项目配图
├── profile.md              页面内容来源
└── 实现方案.md             设计说明
```

## 运行方式

方式一：直接双击 `index.html` 用浏览器打开。

方式二（推荐）：起一个本地静态服务，避免 `file://` 下 `localStorage` 受限导致主题记忆失效。

```bash
python -m http.server 8000
# 然后访问 http://127.0.0.1:8000/index.html
```

## 维护说明

- **新增 / 修改项目**：在 `js/projects.js` 的数组里追加对象即可（字段含义见该文件头部注释），页面会自动渲染并同步"作品数量"和筛选标签，无需改动其他文件。
- **调整配色**：只改 `css/base.css` 中的 `:root`（浅色）与 `html[data-theme="dark"]`（深色）变量块。
- **脚本加载顺序**：`projects.js → render.js → interactions.js → main.js`，新增脚本时需同步 `index.html` 底部顺序。

## 浏览器支持

Chrome / Edge / Firefox / Safari 现代版本（依赖 Grid、Flexbox、CSS 变量、`IntersectionObserver`）。