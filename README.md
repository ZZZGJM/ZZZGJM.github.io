# ZZZGJM.github.io

精选商城网站 - 基于 Astro 构建的现代化电商平台

## 功能特性

- 🛍️ 商品展示：精美的商品卡片展示，支持分类筛选
- 💳 支付功能：支持微信支付和支付宝支付（二维码展示）
- 🔒 私密信息：支付成功后显示专属私密信息
- 📱 响应式设计：完美适配移动端和桌面端
- 🎨 现代化UI：优雅的界面设计和流畅的动画效果

## 技术栈

- [Astro](https://astro.build/) - 现代静态站点生成器
- [Svelte](https://svelte.dev/) - 组件框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署

本项目已配置为 GitHub Pages，推送到 main 分支后会自动部署。

## Timeline

- 9.2 markdown中要添加local图片, 不需要在前面加入./ (比如./imgs/flow_matching_tutorial/1.png❌ imgs/flow_matching_tutorial/1.png ✔)
- 9.1 添加鼠标点击文本特效, 引入随机表情(NachoNeko, cat girl, 胡桃等), 可以在"\src\components\mouse\click-content-config.ts"添加表情属性, 在"\src\components\mouse\ClickTextEffect.astro"作相应的修改
- 8.31 增加背景"蜘蛛网", 在"\src\layouts\Layout.astro"的\<body>下添加<SpiderWebEffect/>
- 8.30 修改部分布局, 增加友链链接以及增加Timeline,banner轮播图(修改config下的src从string->"Array<{ src: string}>"数组, 在"\src\layouts\MainGridLayout.astro"中将ImageWrapper换成Carousel)
- 8.29 采用[fuwari](https://github.com/saicaca/fuwari)模板
- 8.28 开始学习[Astro](https://docs.astro.build/zh-cn/getting-started/)











