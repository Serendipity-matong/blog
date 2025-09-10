# Personal Blog & Portfolio Website

一个现代化的个人博客和作品集网站，包含技术博客、项目展示、旅行记录等内容。

## 🌟 功能特性

- 📝 **技术博客** - 分布式系统、机器学习、前端开发等技术文章
- 💼 **项目展示** - 个人项目和作品集展示
- 🎯 **个人简介** - 详细的个人资料和技能介绍
- 🌍 **旅行记录** - 各地旅行照片和游记分享
- 📱 **响应式设计** - 适配手机、平板、桌面等各种设备
- 🌙 **暗色模式** - 支持明暗主题切换
- 🚀 **性能优化** - 快速加载和流畅的用户体验

## 📁 项目结构

```
├── home/                   # 首页模块
│   ├── index.html         # 主页
│   ├── styles.css         # 主页样式
│   └── script.js          # 主页交互逻辑
├── blog/                   # 博客模块
│   ├── blog-distributed-sgd.html       # 分布式梯度下降
│   ├── blog-gradient-coding.html       # 梯度编码技术
│   ├── blog-sparsification.html        # 稀疏化技术
│   ├── blog-react.html                 # React开发
│   ├── blog-astro.html                 # Astro框架
│   ├── blog-microservices.html         # 微服务架构
│   ├── blog-tailwind.html              # Tailwind CSS
│   ├── blog-detail.html                # 博客详情页模板
│   └── ... (更多技术博客)
├── project/                # 项目展示模块
│   ├── project-coding-ai.html          # AI编程助手
│   ├── project-jiangxi-gaokao.html     # 江西高考分析
│   ├── project-linkbox.html            # LinkBox工具
│   ├── project-weather-prediction.html # 天气预测系统
│   ├── project-whiteboard.html         # 在线白板
│   ├── project-detail.html             # 项目详情页模板
│   └── project-*.html                  # 更多项目
├── travel/                 # 旅行记录模块
│   ├── travel-fanjingshan.html         # 贵州梵净山
│   ├── travel-guizhou.html             # 贵州游记
│   ├── travel-hainan.html              # 海南度假
│   ├── travel-wuhan.html               # 武汉探索
│   ├── travel-detail.html              # 旅行详情页模板
│   └── travel-*.html                   # 更多旅行记录
├── profile/                # 个人资料模块
│   ├── profile.html       # 个人简介页
│   ├── profile-styles.css # 个人资料样式
│   └── profile-script.js  # 个人资料交互
├── assets/                 # 静态资源
│   ├── detail-styles.css  # 详情页通用样式
│   ├── detail-script.js   # 详情页通用脚本
│   └── images/            # 图片资源
│       ├── guilin/        # 桂林旅行照片
│       ├── guizhou/       # 贵州旅行照片
│       ├── hainan/        # 海南旅行照片
│       └── wuhan/         # 武汉旅行照片
├── Dockerfile             # Docker镜像构建文件
├── docker-compose.yml     # Docker编排配置
├── nginx.conf.example     # Nginx配置示例
└── README.md             # 项目说明文档
```

## 📝 内容展示

### 技术博客
- 分布式随机梯度下降算法
- 梯度编码技术详解
- 稀疏化技术在机器学习中的应用
- React 开发最佳实践
- Astro 静态站点生成器介绍
- 微服务架构设计
- Tailwind CSS 使用心得

### 项目作品
- AI编程助手项目
- 江西高考数据分析
- LinkBox 链接管理工具
- 天气预测系统
- 在线白板应用

### 旅行记录
- 贵州梵净山之旅
- 桂林山水游记
- 海南度假记录
- 武汉城市探索

## 🚀 快速开始

### 本地开发

```bash
# 使用Python启动本地服务器
python3 -m http.server 8080

# 或使用Node.js
npx http-server

# 访问网站
open http://localhost:8080/home/index.html
```

### Docker部署

```bash
# 构建镜像
docker build -t personal-blog .

# 运行容器
docker-compose up -d

# 访问网站
open http://localhost:8080
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript ES6+
- **样式**: Tailwind CSS, 自定义CSS
- **部署**: Docker, Nginx
- **响应式设计**: Mobile-first approach
- **性能优化**: 图片懒加载, CSS/JS压缩

## 🎨 设计特色

- **现代化UI**: 简洁优雅的界面设计
- **响应式布局**: 完美适配各种屏幕尺寸
- **流畅动画**: 精心设计的过渡动画效果
- **易用导航**: 清晰的导航结构和面包屑
- **内容分类**: 按主题组织的内容分类系统
- **模块化架构**: 按功能模块组织文件，便于维护和扩展

## 🏗️ 架构优势

- **功能模块分离**: 每个功能(博客、项目、旅行)都有独立的目录
- **代码复用**: 共用的样式和脚本放在assets目录
- **维护便利**: 相关文件集中管理，修改和查找更方便
- **扩展性强**: 添加新功能模块只需创建新目录
- **部署灵活**: 可以单独部署某个功能模块

## 🌐 部署说明

### 使用Docker部署

1. 确保服务器安装了Docker和Docker Compose
2. 将项目文件上传到服务器
3. 运行部署命令：

```bash
docker-compose up -d
```

### 使用传统Web服务器部署

1. 将项目文件上传到Web服务器根目录
2. 配置Nginx或Apache服务器
3. 确保服务器支持静态文件服务

## 📱 浏览器支持

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari  
- ✅ Edge
- ✅ 移动端浏览器

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License

---

**访问在线演示**: [项目地址待添加]
