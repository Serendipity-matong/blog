// 文章数据
const articlesData = {
    '最新': [
        { title: 'React 18新特性深度解析：并发特性与性能优化', date: '2025.09.12', category: '技术', url: 'blog-react.html' },
        { title: '技术与生活的平衡艺术', date: '2025.09.10', category: '随想', url: 'blog-tech-life-balance.html' },
        { title: 'Astro：下一代静态站点生成器的革命性创新', date: '2025.09.08', category: '技术', url: 'blog-astro.html' },
        { title: '学习之路：从迷茫到清晰的成长轨迹', date: '2025.09.06', category: '随想', url: 'blog-learning-journey.html' },
        { title: '微服务架构设计与实践：从单体到分布式的演进之路', date: '2025.09.04', category: '技术', url: 'blog-microservices.html' }
    ],
    '技术': [
        { title: 'React 18新特性深度解析：并发特性与性能优化', date: '2025.09.12', category: '技术', url: 'blog-react.html' },
        { title: 'Astro：下一代静态站点生成器的革命性创新', date: '2025.09.08', category: '技术', url: 'blog-astro.html' },
        { title: 'TailwindCSS实战指南：原子化CSS的现代化应用', date: '2025.09.05', category: '技术', url: 'blog-tailwind.html' },
        { title: '微服务架构设计与实践：从单体到分布式的演进之路', date: '2025.09.04', category: '技术', url: 'blog-microservices.html' },
        { title: 'DDOS攻击防护策略：构建弹性网络安全防线', date: '2025.09.01', category: '技术', url: 'blog-ddos.html' }
    ],
    '学术': [
        { title: '梯度稀疏化方法：Top-k与Rand-k算法的理论与实践', date: '2025.09.03', category: '学术', url: 'blog-sparsification.html' },
        { title: '分布式梯度下降算法：从同步到异步的优化策略', date: '2025.09.02', category: '学术', url: 'blog-distributed-sgd.html' },
        { title: '梯度编码技术：分布式学习中的容错机制', date: '2025.09.04', category: '学术', url: 'blog-gradient-coding.html' },
        { title: 'Fastest-k SGD：基于动态选择的高效分布式优化算法', date: '2025.09.07', category: '学术', url: 'blog-fastest-k.html' },
        { title: 'Adaptive Fastest-k SGD：智能参数调优的分布式学习算法', date: '2025.09.09', category: '学术', url: 'blog-adaptive-fastest-k.html' }
    ],
    '随想': [
        { title: '技术与生活的平衡艺术', date: '2025.09.10', category: '随想', url: 'blog-tech-life-balance.html' },
        { title: '学习之路：从迷茫到清晰的成长轨迹', date: '2025.09.06', category: '随想', url: 'blog-learning-journey.html' },
        { title: '开源精神：协作与共享的力量', date: '2025.09.07', category: '随想', url: 'blog-open-source.html' },
        { title: '失败是成功的垫脚石', date: '2025.09.03', category: '随想', url: 'blog-failure-success.html' },
        { title: '未来技术的畅想', date: '2025.09.02', category: '随想', url: 'blog-future-tech.html' }
    ],
    '旅游': [
        { title: '云南：多彩秘境的寻梦之旅', date: '2025.09.01', category: '旅游', url: 'blog-yunnan-travel.html' },
        { title: '武汉：江城百年风华', date: '2025.09.05', category: '旅游', url: 'travel-wuhan.html' },
        { title: '海南：椰风海韵的热带天堂', date: '2025.09.06', category: '旅游', url: 'travel-hainan.html' },
        { title: '桂林：山水甲天下的诗意之旅', date: '2025.09.08', category: '旅游', url: 'travel-detail.html' },
        { title: '贵州：多彩喀斯特的自然奇观', date: '2025.09.10', category: '旅游', url: 'travel-guizhou.html' }
    ]
};

/**
 * 初始化博客分类切换功能
 */
function initializeBlogCategories() {
    console.log('初始化博客分类切换功能...');
    
    // 绑定分类按钮事件
    const categoryButtons = document.querySelectorAll('.category-btn');
    console.log(`找到 ${categoryButtons.length} 个分类按钮`);
    
    if (categoryButtons.length === 0) {
        console.error('未找到任何分类按钮！');
        return;
    }
    
    categoryButtons.forEach((btn, index) => {
        console.log(`绑定按钮 ${index}: ${btn.textContent}`);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`按钮被点击: ${this.textContent}`);
            handleCategoryClick(this);
        });
        
        // 添加测试样式
        btn.style.cursor = 'pointer';
    });
    
    console.log('博客分类切换功能初始化完成');
}

/**
 * 处理分类按钮点击
 */
function handleCategoryClick(button) {
    const category = button.textContent;
    console.log(`点击分类: ${category}`);
    
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
    console.log(`更新文章列表 - 分类: ${category}`);
    const articlesList = document.querySelector('.articles-list');
    const articles = articlesData[category] || articlesData['最新'];
    console.log(`找到 ${articles.length} 篇文章`);
    
    if (!articlesList) {
        console.error('未找到文章列表容器');
        return;
    }
    
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
        setTimeout(() => {
            articlesList.style.transition = 'all 0.2s ease';
            articlesList.style.opacity = '1';
            articlesList.style.transform = 'translateY(0)';
        }, 100);
        
    }, 150);
}

/**
 * 创建文章元素
 */
function createArticleElement(article) {
    const articleElement = document.createElement('a');
    articleElement.href = `../blog/${article.url}`;
    articleElement.className = 'article-item clickable';
    articleElement.innerHTML = `
        <h3 class="article-title">${article.title}</h3>
        <time class="article-date">${article.date}</time>
    `;
    
    return articleElement;
}

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initializeTheme();
    
    // 绑定主题切换按钮
    setupThemeToggle();
    
    // 初始化博客分类切换
    setTimeout(() => {
        initializeBlogCategories();
    }, 100);
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 初始化交互效果
    initializeInteractiveEffects();
    
    // 初始化响应式处理
    initializeResponsiveHandling();
    
    // 页面加载动画
    initializeLoadAnimation();
    
    // 初始化视频播放器
    initializeVideoPlayer();
});

/**
 * 初始化主题设置
 */
function initializeTheme() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 确定初始主题
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // 应用主题
    applyTheme(initialTheme);
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * 设置主题切换功能
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // 添加切换动画
            themeToggle.classList.add('animate-spin');
            setTimeout(() => {
                themeToggle.classList.remove('animate-spin');
            }, 300);
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/**
 * 应用主题
 */
function applyTheme(theme) {
    const html = document.documentElement;
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    html.setAttribute('data-theme', theme);
    
    // 更新主题图标
    if (lightIcon && darkIcon) {
        if (theme === 'dark') {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    }
    
    // 更新meta标签颜色
    updateMetaThemeColor(theme);
}

/**
 * 更新meta主题颜色
 */
function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    const themeColors = {
        light: '#ffffff',
        dark: '#000000'
    };
    
    metaThemeColor.content = themeColors[theme];
}

/**
 * 初始化滚动动画
 */
function initializeScrollAnimations() {
    // 创建交叉观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 初始化交互效果
 */
function initializeInteractiveEffects() {
    // 为卡片添加悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
        
        // 添加点击波纹效果
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击缩放效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            createRippleEffect(e, this);
        });
    });
    
    // 输入框焦点效果
    const inputs = document.querySelectorAll('.input, .select, .textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // 进度条动画
    animateProgressBars();
}

/**
 * 创建波纹效果
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // 确保元素有相对定位
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    
    // 动画结束后移除元素
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

/**
 * 进度条动画
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('value');
                
                // 重置进度条
                progress.setAttribute('value', '0');
                
                // 动画到目标值
                let current = 0;
                const increment = value / 50; // 50步动画
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(timer);
                    }
                    progress.setAttribute('value', current);
                }, 20);
                
                observer.unobserve(progress);
            }
        });
    };
    
    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/**
 * 初始化响应式处理
 */
function initializeResponsiveHandling() {
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(() => {
        handleResponsiveChanges();
    }, 250));
    
    // 初始处理
    handleResponsiveChanges();
}

/**
 * 处理响应式变化
 */
function handleResponsiveChanges() {
    const isMobile = window.innerWidth < 768;
    const body = document.body;
    
    if (isMobile) {
        body.classList.add('mobile-view');
        body.classList.remove('desktop-view');
    } else {
        body.classList.add('desktop-view');
        body.classList.remove('mobile-view');
    }
    
    // 调整导航栏
    adjustNavigation(isMobile);
}

/**
 * 调整导航栏
 */
function adjustNavigation(isMobile) {
    const navbar = document.querySelector('.navbar');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (navbar) {
        if (isMobile) {
            navbar.classList.add('mobile-nav');
        } else {
            navbar.classList.remove('mobile-nav');
        }
    }
}

/**
 * 页面加载动画
 */
function initializeLoadAnimation() {
    // 为页面元素添加加载动画
    const animateElements = document.querySelectorAll('.hero, .card, .navbar');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 页面加载完成后移除加载状态
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

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

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
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
    
    .mobile-view .card {
        margin-bottom: 1rem;
    }
    
    .mobile-view .hero h1 {
        font-size: 2rem;
    }
    
    .focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    .loaded .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// 动态添加CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭模态框
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal:target, .modal.modal-open');
        if (openModal) {
            openModal.checked = false;
        }
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

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`页面加载时间: ${pageLoadTime}ms`);
        }, 0);
    });
}

// 导出一些实用函数供全局使用
window.themeUtils = {
    getCurrentTheme: () => document.documentElement.getAttribute('data-theme'),
    setTheme: applyTheme,
    toggleTheme: () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

/**
 * 初始化二次元视频播放器
 */
function initializeVideoPlayer() {
    const video = document.getElementById('animeVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!video) return;
    
    // 设置初始音量（由于autoplay muted，先设为0，用户点击后恢复）
    video.volume = 0;
    
    // 尝试自动播放，如果失败则等待用户交互
    const tryAutoplay = async () => {
        try {
            await video.play();
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        } catch (error) {
            console.log('自动播放被阻止，等待用户交互', error);
            // 添加点击视频播放的功能
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    video.muted = false; // 用户点击时取消静音
                    video.volume = 0.5;
                    if (volumeSlider) volumeSlider.value = 50;
                    updateVolumeIcon();
                }
            });
            
            // 添加视频区域点击提示
            const playHint = document.createElement('div');
            playHint.className = 'play-hint';
            playHint.innerHTML = '<i class="fas fa-play-circle"></i><span>点击播放视频</span>';
            playHint.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(255, 255, 255, 0.8);
                text-align: center;
                z-index: 3;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            playHint.querySelector('i').style.cssText = `
                font-size: 3rem;
                display: block;
                margin-bottom: 10px;
            `;
            video.parentNode.appendChild(playHint);
            
            // 视频开始播放时隐藏提示
            video.addEventListener('play', function() {
                if (playHint) {
                    playHint.style.opacity = '0';
                    setTimeout(() => playHint.remove(), 300);
                }
            });
        }
    };
    
    // 页面加载后尝试自动播放
    setTimeout(tryAutoplay, 100);
    
    // 播放/暂停功能
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // 视频播放/暂停事件
    video.addEventListener('play', function() {
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
    
    video.addEventListener('pause', function() {
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // 更新进度条
    video.addEventListener('timeupdate', function() {
        if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            if (currentTimeSpan) {
                currentTimeSpan.textContent = formatTime(video.currentTime);
            }
        }
    });
    
    // 视频加载完成后显示时长
    video.addEventListener('loadedmetadata', function() {
        if (durationSpan) {
            durationSpan.textContent = formatTime(video.duration);
        }
    });
    
    // 进度条点击跳转
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progress = clickX / rect.width;
            video.currentTime = progress * video.duration;
        });
    }
    
    // 音量控制
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            video.volume = volumeSlider.value / 100;
            updateVolumeIcon();
        });
        
        // 初始化音量显示（自动播放时为0）
        volumeSlider.value = 0;
        updateVolumeIcon();
    }
    
    // 音量按钮点击取消静音（由于自动播放需要静音）
    if (volumeBtn) {
        volumeBtn.addEventListener('click', function() {
            if (video.volume > 0) {
                video.volume = 0;
                video.muted = true;
                if (volumeSlider) volumeSlider.value = 0;
            } else {
                video.volume = 0.5;
                video.muted = false; // 取消静音
                if (volumeSlider) volumeSlider.value = 50;
            }
            updateVolumeIcon();
        });
    }
    
    // 全屏功能
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        // 只在视频聚焦或无其他输入元素聚焦时响应
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    video.volume = Math.min(1, video.volume + 0.1);
                    if (volumeSlider) volumeSlider.value = video.volume * 100;
                    updateVolumeIcon();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    video.volume = Math.max(0, video.volume - 0.1);
                    if (volumeSlider) volumeSlider.value = video.volume * 100;
                    updateVolumeIcon();
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    if (fullscreenBtn) fullscreenBtn.click();
                    break;
            }
        }
    });
    
    // 更新音量图标
    function updateVolumeIcon() {
        if (!volumeBtn) return;
        
        const volume = video.volume;
        let iconClass = 'fas fa-volume-up';
        
        if (video.muted || volume === 0) {
            iconClass = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            iconClass = 'fas fa-volume-down';
        }
        
        volumeBtn.innerHTML = `<i class="${iconClass}"></i>`;
    }
    
    // 格式化时间显示
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // 视频错误处理
    video.addEventListener('error', function(e) {
        console.error('视频加载错误:', e);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'video-error';
        errorMessage.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                text-align: center;
                z-index: 10;
                background: rgba(0,0,0,0.8);
                padding: 20px;
                border-radius: 10px;
            ">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px; color: #ff6b6b;"></i>
                <br>
                视频加载失败
                <br>
                <small style="opacity: 0.7;">请检查网络连接或视频文件</small>
            </div>
        `;
        video.parentNode.appendChild(errorMessage);
    });
    
    // 添加加载动画
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'video-loading';
    loadingIndicator.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            z-index: 5;
        ">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
        </div>
    `;
    
    video.addEventListener('waiting', function() {
        video.parentNode.appendChild(loadingIndicator);
    });
    
    video.addEventListener('canplay', function() {
        const loading = video.parentNode.querySelector('.video-loading');
        if (loading) {
            loading.remove();
        }
    });
}

console.log('页面脚本加载完成 ✨');
