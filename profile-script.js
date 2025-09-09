// 文章数据
const articlesData = {
    '最新': [
        { title: '再赴一场盛夏：写给下一个五年', date: '2025.08.31', category: '随想' },
        { title: '技术成长路径：从初级到高级开发者', date: '2025.08.28', category: '技术' },
        { title: '产品思维：如何设计用户喜爱的功能', date: '2025.08.25', category: '技术' },
        { title: '生活随笔：在快节奏中寻找内心平静', date: '2025.08.22', category: '生活' },
        { title: 'MacBook Pro M3 深度体验：创作者的新选择', date: '2025.08.19', category: '测评' }
    ],
    '技术': [
        { title: '技术成长路径：从初级到高级开发者', date: '2025.08.28', category: '技术' },
        { title: '产品思维：如何设计用户喜爱的功能', date: '2025.08.25', category: '技术' },
        { title: 'React 18 新特性详解与实践指南', date: '2025.08.15', category: '技术' },
        { title: 'TypeScript 最佳实践：类型安全的代码之路', date: '2025.08.10', category: '技术' },
        { title: '微服务架构设计模式与实现', date: '2025.08.05', category: '技术' }
    ],
    '生活': [
        { title: '生活随笔：在快节奏中寻找内心平静', date: '2025.08.22', category: '生活' },
        { title: '咖啡文化探索：从豆子到杯子的旅程', date: '2025.08.12', category: '生活' },
        { title: '摄影日记：捕捉城市中的光影瞬间', date: '2025.08.08', category: '生活' },
        { title: '旅行手记：漫步京都的春天', date: '2025.07.30', category: '生活' },
        { title: '读书笔记：《人类简史》的思考', date: '2025.07.25', category: '生活' }
    ],
    '随想': [
        { title: '再赴一场盛夏：写给下一个五年', date: '2025.08.31', category: '随想' },
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
    zhihu: 'https://www.zhihu.com/people/idealclover',
    bilibili: 'https://space.bilibili.com/504404093',
    github: 'https://github.com/idealclover',
    jike: 'https://okjike.com/u/idealclover'
};

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractions();
    initializeAnimations();
    initializeSocialLinks();
    initializeKeyboardNavigation();
    initializePerformanceMonitoring();
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
    }, 150);
    
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
            articleElement.style.transform = 'translateY(20px)';
            articlesList.appendChild(articleElement);
            
            // 延迟显示动画
            setTimeout(() => {
                articleElement.style.transition = 'all 0.4s ease';
                articleElement.style.opacity = '1';
                articleElement.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        // 淡入容器
        articlesList.style.transition = 'all 0.4s ease';
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
                }, 150);
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
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
        const parallaxElements = document.querySelectorAll('.avatar-img');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
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
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
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

// 导出工具函数
window.profileUtils = {
    switchCategory: handleCategoryClick,
    showNotification: showNotification,
    createRipple: createRippleEffect
};
