document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initProjectHoverEffects();
    initSmoothScrolling();
    initLightboxGallery();
});

function initCustomCursor() {
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    if (!document.getElementById('cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.textContent = `
            body {
                cursor: none;
            }
            
            .cursor-outer,
            .cursor-inner {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                transition: width 0.2s, height 0.2s, background 0.2s;
            }
            
            .cursor-outer {
                width: 40px;
                height: 40px;
                background: rgba(248, 165, 194, 0.2); /* Pastel Magenta with transparency */
                transition: transform 0.1s;
            }
            
            .cursor-inner {
                width: 8px;
                height: 8px;
                background: var(--light-purple);
                transition: transform 0.05s;
            }
            
            .cursor-hover {
                width: 60px;
                height: 60px;
                background: rgba(197, 163, 255, 0.2); /* Light Purple with transparency */
            }
            
            .cursor-click {
                transform: translate(-50%, -50%) scale(0.8);
            }
            
            @media (max-width: 768px) {
                .cursor-outer, .cursor-inner {
                    display: none;
                }
                
                body {
                    cursor: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.addEventListener('mousemove', (e) => {
        cursorOuter.style.left = e.clientX + 'px';
        cursorOuter.style.top = e.clientY + 'px';
        
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursorOuter.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorOuter.classList.remove('cursor-click');
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
        });
    });
}

function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = document.createElement('div');
        overlay.classList.add('project-overlay');
        
        const viewButton = document.createElement('button');
        viewButton.classList.add('view-project-btn');
        viewButton.textContent = 'View Details';
        
        overlay.appendChild(viewButton);
        card.appendChild(overlay);
        
        if (!document.getElementById('project-overlay-style')) {
            const style = document.createElement('style');
            style.id = 'project-overlay-style';
            style.textContent = `
                .project-card {
                    position: relative;
                    overflow: hidden;
                }
                
                .project-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .project-card:hover .project-overlay {
                    opacity: 1;
                }
                
                .view-project-btn {
                    background: var(--gradient-magenta-purple);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                    font-family: var(--body-font);
                    font-weight: 500;
                    transform: translateY(20px);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                
                .project-card:hover .view-project-btn {
                    transform: translateY(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }
        
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projectTitle = card.querySelector('h3').textContent;
            const projectDesc = card.querySelector('p').textContent;
            
            showLightbox(projectTitle, projectDesc, card);
        });
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (window.gsap && window.ScrollToPlugin) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80
                        },
                        ease: "power3.inOut"
                    });
                } else {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initLightboxGallery() {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    
    const lightboxTitle = document.createElement('h3');
    lightboxTitle.classList.add('lightbox-title');
    
    const lightboxDesc = document.createElement('p');
    lightboxDesc.classList.add('lightbox-desc');
    
    const lightboxTags = document.createElement('div');
    lightboxTags.classList.add('lightbox-tags');
    
    const lightboxLinks = document.createElement('div');
    lightboxLinks.classList.add('lightbox-links');
    
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(lightboxTitle);
    lightboxContent.appendChild(lightboxDesc);
    lightboxContent.appendChild(lightboxTags);
    lightboxContent.appendChild(lightboxLinks);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    if (!document.getElementById('lightbox-style')) {
        const style = document.createElement('style');
        style.id = 'lightbox-style';
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
                pointer-events: auto;
            }
            
            .lightbox-content {
                background: white;
                padding: 30px;
                border-radius: var(--border-radius-lg);
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                transform: translateY(20px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .lightbox.active .lightbox-content {
                transform: translateY(0);
                opacity: 1;
            }
            
            .lightbox-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--dark-text);
            }
            
            .lightbox-title {
                margin-bottom: 15px;
                color: var(--darker-purple);
            }
            
            .lightbox-desc {
                margin-bottom: 20px;
            }
            
            .lightbox-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .lightbox-tags span {
                background: var(--light-lavender);
                color: var(--darker-purple);
                padding: 5px 10px;
                border-radius: var(--border-radius-sm);
                font-size: 0.9rem;
            }
            
            .lightbox-links {
                display: flex;
                gap: 15px;
            }
            
            .lightbox-links a {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                color: var(--darker-purple);
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
    
    window.showLightbox = function(title, desc, projectCard) {
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightboxTags.innerHTML = '';
        const tags = projectCard.querySelectorAll('.project-tags span');
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.textContent = tag.textContent;
            lightboxTags.appendChild(tagEl);
        });
        
        lightboxLinks.innerHTML = '';
        const links = projectCard.querySelectorAll('.project-links a');
        links.forEach(link => {
            const linkEl = document.createElement('a');
            linkEl.href = link.href;
            linkEl.target = '_blank';
            linkEl.innerHTML = link.innerHTML;
            lightboxLinks.appendChild(linkEl);
        });
        
        lightbox.classList.add('active');
    };
}
