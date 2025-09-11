/**
 * matong Homepage 原版特效 - 一比一复刻
 * 🎯 彩色粒子爆炸下坠效果 + 光标跟踪小黄豆
 * 参考：https://github.com/matong/Homepage
 */
(function() {
    'use strict';
    
    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        /* 光标跟踪小黄豆 */
        .cursor-dot {
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease-out;
            mix-blend-mode: difference;
        }
        
        /* 点击粒子 */
        .click-particle {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            will-change: transform, opacity;
        }
        
        /* 移动端隐藏光标跟踪 */
        @media (max-width: 768px) {
            .cursor-dot {
                display: none;
            }
        }
        
        /* 暗色主题适配 */
        @media (prefers-color-scheme: dark) {
            .cursor-dot {
                background: rgba(96, 165, 250, 0.7);
            }
        }
    `;
    document.head.appendChild(style);
    
    // matong 配色方案 - 彩色粒子
    const particleColors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#82E0AA', '#F8C471', '#D7DBDD', '#AED6F1',
        '#F1948A', '#76D7C4', '#F39C12', '#E74C3C',
        '#9B59B6', '#3498DB', '#1ABC9C', '#F1C40F'
    ];
    
    // 光标跟踪小黄豆（您喜欢的效果）
    let cursorDot = null;
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        
        // 平滑跟踪算法
        function updateCursor() {
            const speed = 0.2;
            dotX += (mouseX - dotX) * speed;
            dotY += (mouseY - dotY) * speed;
            
            if (cursorDot) {
                cursorDot.style.left = (dotX - 2) + 'px';
                cursorDot.style.top = (dotY - 2) + 'px';
            }
            
            requestAnimationFrame(updateCursor);
        }
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        document.addEventListener('mouseenter', function() {
            if (cursorDot) cursorDot.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', function() {
            if (cursorDot) cursorDot.style.opacity = '0';
        });
        
        updateCursor();
    }
    
    // matong 原版：彩色粒子爆炸下坠到底部
    function createParticleExplosion(x, y) {
        const particleCount = 9; // 粒子数量减少40% (15 -> 9)
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            
            // 随机颜色和大小
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            const size = Math.random() * 4 + 3; // 3-7px
            
            particle.style.backgroundColor = color;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.boxShadow = `0 0 6px ${color}`;
            
            // 初始位置
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            
            // 爆炸物理参数 - 优化重力效果
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
            const velocity = Math.random() * 150 + 80; // 稍微减少初始速度
            const gravity = 1.2; // 增强重力加速度 (0.6 -> 1.2)
            const friction = 0.985; // 减少空气阻力，让粒子更容易到底部
            
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity - Math.random() * 80; // 向上初始速度
            let px = x;
            let py = y;
            let life = 1;
            let rotation = Math.random() * 360;
            let rotationSpeed = (Math.random() - 0.5) * 8;
            
            // 粒子动画循环
            function animateParticle() {
                // 物理计算 - 增强重力效果
                vy += gravity; // 更强的重力影响
                vx *= friction; // 空气阻力
                
                // 更新位置
                px += vx * 0.016; // 60fps
                py += vy * 0.016;
                
                // 旋转
                rotation += rotationSpeed;
                
                // 生命衰减 - 减慢衰减速度，确保到达底部
                life -= 0.008; // 从0.012减少到0.008，生命更持久
                
                // 更新DOM
                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = Math.max(0.1, life); // 保持最小透明度，直到到达底部
                particle.style.transform = `rotate(${rotation}deg) scale(${Math.max(0.3, life)})`;
                
                // 只有当粒子到达底部时才移除（确保所有粒子都下落到底部）
                if (py > window.innerHeight + 20) {
                    particle.remove();
                    return;
                }
                
                // 如果生命值太低但还没到底部，继续下落但开始淡出
                if (life <= 0) {
                    particle.style.opacity = Math.max(0, 0.5 - (py / window.innerHeight));
                }
                
                // 边界反弹（左右边界） - 减少反弹强度
                if (px <= 0 || px >= window.innerWidth) {
                    vx = -vx * 0.5;
                    px = Math.max(0, Math.min(window.innerWidth, px));
                }
                
                requestAnimationFrame(animateParticle);
            }
            
            // 延迟启动，制造爆炸感
            setTimeout(() => {
                requestAnimationFrame(animateParticle);
            }, i * 8);
        }
    }
    
    // 点击事件监听
    document.addEventListener('click', function(e) {
        createParticleExplosion(e.clientX, e.clientY);
    });
    
    // 卡片悬浮效果（保持简约）
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.article-item, .project-card, .exhibition-card');
        
        cards.forEach(card => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    });
    
    console.log('🎨 matong 原版特效已加载');
    console.log('💫 彩色粒子爆炸下坠 + 光标跟踪小黄豆');
})();