// 文章数据
const articlesData = {
    '最新': [
        { title: '再赴一场盛夏：写给下一个五年', date: '2025.09.11', category: '随想' },
        { title: '技术成长路径：从初级到高级开发者', date: '2025.09.11', category: '技术' },
        { title: '产品思维：如何设计用户喜爱的功能', date: '2025.09.12', category: '技术' },
        { title: '生活随笔：在快节奏中寻找内心平静', date: '2025.09.08', category: '生活' },
        { title: 'MacBook Pro M3 深度体验：创作者的新选择', date: '2025.08.19', category: '测评' }
    ],
    '技术': [
        { title: '技术成长路径：从初级到高级开发者', date: '2025.09.11', category: '技术' },
        { title: '产品思维：如何设计用户喜爱的功能', date: '2025.09.12', category: '技术' },
        { title: 'React 18 新特性详解与实践指南', date: '2025.08.15', category: '技术' },
        { title: 'TypeScript 最佳实践：类型安全的代码之路', date: '2025.08.10', category: '技术' },
        { title: '微服务架构设计模式与实现', date: '2025.08.05', category: '技术' }
    ],
    '生活': [
        { title: '生活随笔：在快节奏中寻找内心平静', date: '2025.09.08', category: '生活' },
        { title: '咖啡文化探索：从豆子到杯子的旅程', date: '2025.08.12', category: '生活' },
        { title: '摄影日记：捕捉城市中的光影瞬间', date: '2025.08.08', category: '生活' },
        { title: '旅行手记：漫步京都的春天', date: '2025.07.30', category: '生活' },
        { title: '读书笔记：《人类简史》的思考', date: '2025.07.25', category: '生活' }
    ],
    '随想': [
        { title: '再赴一场盛夏：写给下一个五年', date: '2025.09.11', category: '随想' },
        { title: '关于时间管理的一些思考', date: '2025.08.18', category: '随想' },
        { title: '数字化时代的人际关系', date: '2025.08.14', category: '随想' },
        { title: '创作的意义：为什么要坚持写作', date: '2025.08.06', category: '随想' },
        { title: '成长的代价与收获', date: '2025.07.28', category: '随想' }
    ],
    '测评': [
        { title: 'MacBook Pro M3 深度体验：创作者的新选择', date: '2025.08.19', category: '测评' },
        { title: 'iPhone 15 Pro 使用一个月后的真实感受', date: '2025.08.11', category: '测评' },
        { title: 'iPad Pro vs. Surface Pro：创作设备对比', date: '2025.08.02', category: '测评' },
        { title: 'AirPods Pro 2 音质与降噪深度测试', date: '2025.07.26', category: '测评' },
        { title: 'M2 MacBook Air：性能与便携的完美平衡', date: '2025.07.20', category: '测评' }
    ]
};

// 社交平台链接
const socialLinks = {
    zhihu: 'https://www.zhihu.com/people/matong-65',
    bilibili: 'https://space.bilibili.com/479915630',
    github: 'https://github.com/Serendipity-matong',
    douyin: 'https://www.douyin.com/user/MS4wLjABAAAA8wFPl4Q5vw6WSBvaeZ-9cuvKgvBmhVGMTH8b88qLLrU?from_tab_name=main'
};

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractions();
    initializeAnimations();
    initializeSocialLinks();
    initializeKeyboardNavigation();
    initializePerformanceMonitoring();
    initializeNewSections();
});

/**
 * 初始化所有交互功能
 */
function initializeInteractions() {
    // 分类按钮事件
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleCategoryClick(this);
        });
    });

    // 文章项目悬停效果
    initializeArticleHoverEffects();
    
    // 卡片点击效果
    initializeCardClickEffects();
    
    // 滚动效果
    initializeScrollEffects();
}

/**
 * 处理分类按钮点击
 */
function handleCategoryClick(button) {
    const category = button.textContent;
    
    // 更新按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // 添加点击动画
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 80);
    
    // 更新文章列表
    updateArticlesList(category);
}

/**
 * 更新文章列表
 */
function updateArticlesList(category) {
    const articlesList = document.querySelector('.articles-list');
    const articles = articlesData[category] || articlesData['最新'];
    
    // 淡出效果
    articlesList.style.opacity = '0';
    articlesList.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // 清空现有文章
        articlesList.innerHTML = '';
        
        // 添加新文章
        articles.forEach((article, index) => {
            const articleElement = createArticleElement(article);
            articleElement.style.opacity = '0';
            articleElement.style.transform = 'translateY(10px)';
            articlesList.appendChild(articleElement);
            
            // 延迟显示动画
            setTimeout(() => {
                articleElement.style.transition = 'all 0.2s ease';
                articleElement.style.opacity = '1';
                articleElement.style.transform = 'translateY(0)';
            }, index * 30);
        });
        
        // 淡入容器
        articlesList.style.transition = 'all 0.2s ease';
        articlesList.style.opacity = '1';
        articlesList.style.transform = 'translateY(0)';
        
        // 重新初始化文章悬停效果
        initializeArticleHoverEffects();
    }, 200);
}

/**
 * 创建文章元素
 */
function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.className = 'article-item';
    articleElement.innerHTML = `
        <h3 class="article-title">${article.title}</h3>
        <time class="article-date">${article.date}</time>
    `;
    
    // 添加点击事件
    articleElement.addEventListener('click', function() {
        handleArticleClick(article);
    });
    
    return articleElement;
}

/**
 * 处理文章点击
 */
function handleArticleClick(article) {
    // 添加点击反馈
    console.log(`点击文章: ${article.title}`);
    
    // 这里可以添加跳转到文章详情页的逻辑
    // window.open(`/article/${article.id}`, '_blank');
    
    // 临时显示提示
    showNotification(`正在打开文章：${article.title}`);
}

/**
 * 初始化文章悬停效果
 */
function initializeArticleHoverEffects() {
    const articles = document.querySelectorAll('.article-item');
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * 初始化卡片点击效果
 */
function initializeCardClickEffects() {
    const cards = document.querySelectorAll('.info-card, .blog-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

/**
 * 创建波纹效果
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // 确保父元素有相对定位
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    
    // 动画结束后移除
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

/**
 * 初始化社交链接
 */
function initializeSocialLinks() {
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', function() {
            const platform = this.classList[1]; // 获取平台名称
            const url = socialLinks[platform];
            
            if (url) {
                // 添加点击动画
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    window.open(url, '_blank');
                }, 80);
            }
        });
        
        // 添加键盘支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 初始化动画效果
 */
function initializeAnimations() {
    // 观察器配置
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };
    
    // 创建交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.social-card, .article-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = `all 0.3s ease ${Math.min(index * 0.03, 0.15)}s`;
        observer.observe(el);
    });
}

/**
 * 初始化滚动效果
 */
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollPosition() {
        const scrolled = window.pageYOffset;
        // 移除对头像的视差效果，保持头像静态
        // const parallaxElements = document.querySelectorAll('.avatar-img');
        
        // parallaxElements.forEach(el => {
        //     const speed = 0.5;
        //     el.style.transform = `translateY(${scrolled * speed}px)`;
        // });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * 初始化键盘导航
 */
function initializeKeyboardNavigation() {
    // ESC键处理
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 移除所有焦点
            document.activeElement.blur();
        }
        
        // Tab键导航增强
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // 鼠标使用时移除键盘导航样式
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * 显示通知
 */
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 50);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 200);
    }, 2500);
}

/**
 * 初始化性能监控
 */
function initializePerformanceMonitoring() {
    // 页面加载性能监控
    window.addEventListener('load', function() {
        setTimeout(() => {
            if ('performance' in window) {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`页面加载时间: ${pageLoadTime}ms`);
                
                // 如果加载时间过长，显示提示
                if (pageLoadTime > 3000) {
                    console.warn('页面加载时间较长，请检查网络连接');
                }
            }
        }, 0);
    });
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('页面隐藏');
        } else {
            console.log('页面显示');
        }
    });
}

/**
 * 响应式处理
 */
function handleResponsiveChanges() {
    const isMobile = window.innerWidth < 768;
    const socialSection = document.querySelector('.social-section');
    
    if (isMobile) {
        document.body.classList.add('mobile-view');
        // 移动端特殊处理
        if (socialSection) {
            socialSection.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    } else {
        document.body.classList.remove('mobile-view');
        if (socialSection) {
            socialSection.style.gridTemplateColumns = '';
        }
    }
}

// 窗口大小变化处理
window.addEventListener('resize', debounce(handleResponsiveChanges, 250));

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 添加波纹动画CSS
const rippleCSS = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #70a5ff !important;
        outline-offset: 2px !important;
    }
`;

// 动态添加CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 初始化完成
window.addEventListener('load', function() {
    console.log('个人主页加载完成 ✨');
    
    // 添加加载完成的类
    document.body.classList.add('loaded');
});

/**
 * 初始化新添加的内容区域
 */
function initializeNewSections() {
    initializeProjectCards();
    initializeViewMoreButton();
    initializeExhibitionCards();
    initializeMusicCards();
    initializeContactItems();
    initializeFollowPlatforms();
    initializeNewAnimations();
}

/**
 * 初始化项目卡片交互
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 添加悬停效果增强
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 添加点击效果
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            
            // 获取项目链接
            const projectLink = this.querySelector('.project-link');
            if (projectLink) {
                setTimeout(() => {
                    window.open(projectLink.href, '_blank');
                }, 100);
            } else {
                const projectTitle = this.querySelector('.project-title').textContent;
                showNotification(`项目详情：${projectTitle}`);
            }
        });
        
        // 键盘支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // GitHub 按钮特殊处理
    const githubBtn = document.querySelector('.github-btn');
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            window.open(this.href, '_blank');
        }, 80);
        });
    }
}

/**
 * 初始化查看更多按钮
 */
function initializeViewMoreButton() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // 添加加载动画
            const originalText = this.textContent;
            this.textContent = '加载中...';
            this.disabled = true;
            
        // 模拟加载更多文章
        setTimeout(() => {
            // 这里可以添加加载更多文章的逻辑
            showNotification('已加载更多文章');
            this.textContent = originalText;
            this.disabled = false;
        }, 800);
        });
        
        // 悬停效果增强
        viewMoreBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        viewMoreBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
}

/**
 * 初始化展览卡片
 */
function initializeExhibitionCards() {
    const exhibitionCards = document.querySelectorAll('.exhibition-card');
    
    exhibitionCards.forEach((card, index) => {
        // 添加点击效果
        card.addEventListener('click', function() {
            const title = this.querySelector('.exhibition-title').textContent;
            showNotification(`正在查看：${title}`);
            
            // 添加点击动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 80);
        });
        
        // 图片懒加载效果
        const exhibitionImage = card.querySelector('.exhibition-image');
        if (exhibitionImage) {
            // 模拟图片加载
            setTimeout(() => {
                exhibitionImage.style.background = `linear-gradient(135deg, #2a2a2a, #1a1a1a), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23333"/><text x="50" y="55" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle">展览图片</text></svg>')`;
                exhibitionImage.style.backgroundSize = 'cover';
                exhibitionImage.style.backgroundPosition = 'center';
            }, index * 200);
        }
        
        // 键盘支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 初始化音乐卡片
 */
function initializeMusicCards() {
    const musicItems = document.querySelectorAll('.music-item');
    
    musicItems.forEach(item => {
        const playIcon = item.querySelector('.music-stats i');
        
        // 添加播放动画
        item.addEventListener('click', function() {
            const title = this.querySelector('.music-title').textContent;
            
            // 播放图标动画
            if (playIcon) {
                playIcon.style.animation = 'spin 0.5s ease-in-out';
                setTimeout(() => {
                    playIcon.style.animation = '';
                }, 500);
            }
            
            showNotification(`正在播放：${title}`);
        });
        
        // 悬停时播放图标旋转
        item.addEventListener('mouseenter', function() {
            if (playIcon) {
                playIcon.style.transform = 'rotate(15deg) scale(1.1)';
                playIcon.style.color = '#70a5ff';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (playIcon) {
                playIcon.style.transform = '';
                playIcon.style.color = '';
            }
        });
        
        // 键盘支持
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Bilibili 按钮处理
    const bilibiliBtn = document.querySelector('.bilibili-btn');
    if (bilibiliBtn) {
        bilibiliBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            window.open(this.href, '_blank');
        }, 80);
        });
    }
}

/**
 * 初始化联系方式
 */
function initializeContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const contactText = this.querySelector('span').textContent;
            
            // 根据联系方式类型处理
            if (this.classList.contains('email')) {
                // 邮箱链接保持默认行为
                return;
            } else if (this.classList.contains('qq')) {
                e.preventDefault();
                const qqNumber = contactText.split(': ')[1];
                copyToClipboard(qqNumber);
                showNotification(`QQ号已复制到剪贴板：${qqNumber}`);
            } else if (this.classList.contains('telegram') || this.classList.contains('twitter')) {
                // 社交媒体链接保持默认行为
                return;
            }
        });
        
        // 悬停效果
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * 初始化关注平台
 */
function initializeFollowPlatforms() {
    const followPlatforms = document.querySelectorAll('.follow-platform');
    
    followPlatforms.forEach(platform => {
        platform.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platformName = this.querySelector('.platform-name').textContent;
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showNotification(`正在跳转到${platformName}`);
                // 这里可以添加实际的跳转逻辑
            }, 80);
        });
        
        // 图标动画
        platform.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        platform.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * 初始化新区域的动画
 */
function initializeNewAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察新添加的元素
    const newElements = document.querySelectorAll(`
        .project-card,
        .exhibition-card,
        .music-item,
        .follow-platform,
        .contact-item,
        .section-header
    `);
    
    newElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.3s ease ${Math.min(index * 0.05, 0.3)}s`;
        observer.observe(el);
    });
}

/**
 * 复制到剪贴板
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // 降级处理
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.prepend(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (error) {
            console.error('复制失败:', error);
        } finally {
            textArea.remove();
        }
    }
}

// 添加新的CSS动画
const newAnimationsCSS = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-card.featured::after {
        content: '推荐';
        position: absolute;
        top: 8px;
        right: 8px;
        background: #70a5ff;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7rem;
        z-index: 2;
    }
    
    .project-card.popular::after {
        content: '热门';
        position: absolute;
        top: 8px;
        right: 8px;
        background: #ff6b6b;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7rem;
        z-index: 2;
    }
    
    .music-item:hover .music-stats i {
        animation: pulse 0.6s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .contact-item:hover {
        background: linear-gradient(135deg, #252525, #2a2a2a);
    }
    
    .exhibition-image {
        transition: all 0.2s ease;
    }
    
    .exhibition-card:hover .exhibition-image {
        transform: scale(1.05);
    }
`;

// 动态添加新的CSS
const newStyle = document.createElement('style');
newStyle.textContent = newAnimationsCSS;
document.head.appendChild(newStyle);

// 显示即将推出提示
function showComingSoon(itemName) {
    // 移除现有的提示
    const existingToast = document.querySelector('.coming-soon-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的提示
    const toast = document.createElement('div');
    toast.className = 'coming-soon-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-clock"></i>
            <div class="toast-text">
                <h4>${itemName}</h4>
                <p>详细页面即将推出，敬请期待！</p>
            </div>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: #272727;
        color: #ffffff;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 
            8px 16px 32px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        z-index: 1001;
        opacity: 0;
        transition: all 0.3s ease;
        border: 1px solid #444444;
        max-width: 400px;
        width: 90%;
        backdrop-filter: blur(20px);
    `;
    
    // 添加样式
    if (!document.querySelector('#coming-soon-styles')) {
        const style = document.createElement('style');
        style.id = 'coming-soon-styles';
        style.textContent = `
            .toast-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .toast-content i {
                font-size: 2rem;
                color: #70a5ff;
                flex-shrink: 0;
            }
            
            .toast-text h4 {
                margin: 0 0 8px 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: #ffffff;
            }
            
            .toast-text p {
                margin: 0;
                font-size: 0.9rem;
                color: #cccccc;
                line-height: 1.4;
            }
            
            .coming-soon-toast::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                right: -1px;
                bottom: -1px;
                background: linear-gradient(135deg, rgba(112, 165, 255, 0.3), rgba(112, 165, 255, 0.1));
                border-radius: inherit;
                z-index: -1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // 显示动画
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // 点击关闭
    toast.addEventListener('click', () => {
        hideComingSoonToast(toast);
    });
    
    // 自动隐藏
    setTimeout(() => {
        hideComingSoonToast(toast);
    }, 4000);
    
    // ESC键关闭
    function handleEscape(e) {
        if (e.key === 'Escape') {
            hideComingSoonToast(toast);
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
}

// 隐藏即将推出提示
function hideComingSoonToast(toast) {
    if (toast && toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// 导出工具函数
window.profileUtils = {
    switchCategory: handleCategoryClick,
    showNotification: showNotification,
    createRipple: createRippleEffect,
    copyToClipboard: copyToClipboard,
    showComingSoon: showComingSoon
};
