// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.getAttribute('data-tab');
            
            // Hide all command grids
            document.querySelectorAll('[id$="-commands"]').forEach(grid => {
                grid.style.display = 'none';
            });
            
            // Show selected command grid
            const targetGrid = document.getElementById(tabName + '-commands');
            if (targetGrid) {
                targetGrid.style.display = 'grid';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    
    const animateStats = () => {
        statCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !card.classList.contains('animated')) {
                card.classList.add('animated');
                
                const statValue = card.querySelector('.stat-value');
                const finalValue = statValue.textContent;
                
                // Simple counter animation for numbers
                if (/^\d+/.test(finalValue)) {
                    const number = parseInt(finalValue.match(/\d+/)[0]);
                    let current = 0;
                    const increment = number / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        
                        statValue.textContent = finalValue.replace(/\d+/, Math.floor(current));
                    }, 50);
                }
            }
        });
    };
    
    // Добавляем анимацию задержки для новой статистики
    statCards.forEach((card, index) => {
        if (index === 3) { // Четвертая карточка (50+ пользователей)
            card.style.animationDelay = '0.9s';
        }
    });
    
    // Animate on page load
    setTimeout(animateStats, 500);
    
    // Animate on scroll
    window.addEventListener('scroll', animateStats);
    
    // Параллакс-эффект для hero с отложенным стартом
    // Позволяет контенту быть видимым при первой загрузке
    let isPageLoaded = false;
    
    // Устанавливаем флаг после полной загрузки страницы
    window.addEventListener('load', () => {
        isPageLoaded = true;
    });
    
    // Применяем параллакс только после скролла
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled > 10) {  // Начинаем эффект только после небольшой прокрутки
            // Ограничиваем максимальное смещение до 120px
            const speed = Math.min(scrolled * 0.2, 120);
            hero.style.transform = `translateY(${speed}px)`;
        } else if (hero) {
            // При начальной позиции сбрасываем трансформацию
            hero.style.transform = 'translateY(0)';
        }
    });
    
    // Add intersection observer for feature cards
    const observeElements = (selector, className = 'animate-in') => {
        const elements = document.querySelectorAll(selector);
        
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(className);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        }
    };
    
    // Observe feature cards and other elements
    observeElements('.feature-card');
    observeElements('.card');
    observeElements('.endpoint');
    
    // Add a subtle loading animation for command cards
    const commandCards = document.querySelectorAll('.card');
    commandCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add CSS for animation classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card,
    .card,
    .endpoint {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .feature-card.animate-in,
    .card.animate-in,
    .endpoint.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);