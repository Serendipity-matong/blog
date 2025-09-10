// 详细页面交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializePage();
    
    // 添加交互效果
    addInteractiveEffects();
    
    // 处理导航
    handleNavigation();
    
    // 处理分享功能
    handleSharing();
    
    // 处理收藏功能
    handleBookmark();
    
    // 处理滚动效果
    handleScrollEffects();
});

// 初始化页面
function initializePage() {
    // 添加页面加载动画
    const sections = document.querySelectorAll('.detail-section, .sidebar-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 添加交互效果
function addInteractiveEffects() {
    // 为所有可点击元素添加悬停效果
    const clickableElements = document.querySelectorAll('.project-link, .related-item, .author-link');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 为卡片添加点击波纹效果
    const cards = document.querySelectorAll('.detail-section, .sidebar-section');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 创建波纹效果
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 处理导航
function handleNavigation() {
    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 返回顶部功能
    let backToTopButton = null;
    
    function createBackToTopButton() {
        backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.className = 'back-to-top';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--project-primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // 根据主题调整颜色
        if (document.body.classList.contains('blog-theme')) {
            backToTopButton.style.background = 'var(--blog-primary)';
        } else if (document.body.classList.contains('travel-theme')) {
            backToTopButton.style.background = 'var(--travel-primary)';
        }
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTopButton.addEventListener('mouseenter', () => {
            backToTopButton.style.transform = 'translateY(-2px)';
            backToTopButton.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
        });
        
        backToTopButton.addEventListener('mouseleave', () => {
            backToTopButton.style.transform = 'translateY(0)';
            backToTopButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        });
        
        document.body.appendChild(backToTopButton);
    }
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            if (!backToTopButton) {
                createBackToTopButton();
            }
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else if (backToTopButton) {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
}

// 处理分享功能
function handleSharing() {
    const shareButtons = document.querySelectorAll('.project-link[href="#"]');
    
    shareButtons.forEach(button => {
        if (button.textContent.includes('分享')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (navigator.share) {
                    // 使用原生分享API
                    navigator.share({
                        title: document.title,
                        text: document.querySelector('.detail-subtitle').textContent,
                        url: window.location.href
                    });
                } else {
                    // 复制到剪贴板
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        showToast('链接已复制到剪贴板！');
                    });
                }
            });
        }
    });
}

// 处理收藏功能
function handleBookmark() {
    const bookmarkButtons = document.querySelectorAll('.project-link[href="#"]');
    
    bookmarkButtons.forEach(button => {
        if (button.textContent.includes('收藏') || button.textContent.includes('bookmark')) {
            const bookmarkKey = `bookmark_${window.location.pathname}`;
            const isBookmarked = localStorage.getItem(bookmarkKey) === 'true';
            
            // 更新按钮状态
            updateBookmarkButton(button, isBookmarked);
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const currentlyBookmarked = localStorage.getItem(bookmarkKey) === 'true';
                const newBookmarkState = !currentlyBookmarked;
                
                localStorage.setItem(bookmarkKey, newBookmarkState.toString());
                updateBookmarkButton(button, newBookmarkState);
                
                showToast(newBookmarkState ? '已添加到收藏' : '已取消收藏');
            });
        }
    });
}

// 更新收藏按钮状态
function updateBookmarkButton(button, isBookmarked) {
    const icon = button.querySelector('i');
    const text = button.querySelector('span');
    
    if (isBookmarked) {
        icon.className = 'fas fa-bookmark';
        text.textContent = '已收藏';
        button.style.opacity = '0.8';
    } else {
        icon.className = 'far fa-bookmark';
        text.textContent = '收藏';
        button.style.opacity = '1';
    }
}

// 处理滚动效果
function handleScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景透明度
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(27, 27, 27, 0.98)';
        } else {
            navbar.style.background = 'rgba(27, 27, 27, 0.95)';
        }
        
        // 滚动时隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 视差滚动效果
    const parallaxElements = document.querySelectorAll('.detail-header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// 显示提示信息
function showToast(message) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        border: 1px solid var(--border);
    `;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// 图片懒加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键返回主页
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
    
    // Ctrl/Cmd + K 打开分享
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const shareButton = document.querySelector('.project-link[href="#"]');
        if (shareButton && shareButton.textContent.includes('分享')) {
            shareButton.click();
        }
    }
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s ease;
    }
    
    .lazy.loaded {
        filter: none;
    }
`;
document.head.appendChild(style);
