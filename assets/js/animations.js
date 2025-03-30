document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initTypingEffect();
    initSkillBarsAnimation();
    initParallaxEffect();
    initButtonHoverEffects();
});

function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    
    if (heroTitle && heroSubtitle) {
        heroTitle.classList.add('typing-effect');
        
        setTimeout(() => {
            heroTitle.classList.remove('typing-effect');
            heroSubtitle.classList.add('typing-effect');
            
            setTimeout(() => {
                heroSubtitle.classList.remove('typing-effect');
            }, 3200);
        }, 2000);
    }
}

function initSkillBarsAnimation() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        level.style.width = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('style').split('width:')[1].trim();
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease-in-out';
                    entry.target.style.width = targetWidth;
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        const heroBackground = document.getElementById('hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
        
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage && isInViewport(aboutImage)) {
            aboutImage.style.transform = `translateY(${(scrollPosition - aboutImage.offsetTop + 500) * 0.05}px)`;
        }
    });
}

function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            .btn-ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
