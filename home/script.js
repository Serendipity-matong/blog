// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initializeTheme();
    
    // 绑定主题切换按钮
    setupThemeToggle();
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 初始化交互效果
    initializeInteractiveEffects();
    
    // 初始化响应式处理
    initializeResponsiveHandling();
    
    // 页面加载动画
    initializeLoadAnimation();
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

console.log('页面脚本加载完成 ✨');
