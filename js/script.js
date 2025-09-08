// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const backToTopBtn = document.querySelector('.back-to-top');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
// Smooth scroll for "View Our Services" button
const servicesBtn = document.querySelector('.btn-secondary');
if (servicesBtn) {
    servicesBtn.addEventListener('click', () => {
        const target = document.querySelector('#services'); // make sure your section ID is 'services'
        if (target) {
            const offsetTop = target.offsetTop - 80; // adjust for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}


// Smooth scroll for all "Get a Quote" buttons
document.querySelectorAll('.nav-cta, .btn-primary.animate-pulse').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.querySelector('#contact'); // target section
        if (target) {
            const offsetTop = target.offsetTop - 80; // adjust for fixed navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Validate form
    if (!validateForm(data)) return;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Send email via EmailJS
    emailjs.send('service_btolsta', 'template_ta9nc9j', data)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        }, (error) => {
            console.error('FAILED...', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

});


// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add animation class based on element type
            if (element.classList.contains('scroll-animate')) {
                element.classList.add('animate');
            } else if (element.classList.contains('scroll-animate-left')) {
                element.classList.add('animate');
            } else if (element.classList.contains('scroll-animate-right')) {
                element.classList.add('animate');
            } else if (element.classList.contains('scroll-animate-scale')) {
                element.classList.add('animate');
            } else if (element.classList.contains('scroll-animate-rotate')) {
                element.classList.add('animate');
            }
            
            // Trigger specific animations with delays
            if (element.classList.contains('why-card')) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, Math.random() * 500);
            }
        }
    });
}, observerOptions);

// Observe all scroll animation elements
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-rotate');
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add staggered animations to cards
    const cards = document.querySelectorAll('.why-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.2}s`;
    });
});

// Enhanced Service item hover effects
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.1) rotate(2deg)';
        this.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.3)';
        
        // Animate the icon
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.color = '#ff6b35';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        
        // Reset the icon
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.color = 'white';
        }
    });
    
    // Add entrance animation delay
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
    }, index * 200);
});

// Why card animations on scroll
const whyCards = document.querySelectorAll('.why-card');
const whyCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

whyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    whyCardsObserver.observe(card);
});

// Stat counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = target.textContent;
            const isPlus = finalNumber.includes('+');
            const number = parseInt(finalNumber.replace('+', ''));
            
            animateCounter(target, 0, number, 2000, isPlus);
            statObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

function animateCounter(element, start, end, duration, hasPlus = false) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Image lazy loading (skip logos)
const images = document.querySelectorAll('img:not(.logo-icon img)');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});


// Enhanced Parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero images parallax
    const heroImages = document.querySelector('.hero-images');
    if (heroImages) {
        const rate = scrolled * -0.3;
        heroImages.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.01}deg)`;
    }
    
    // Hero text parallax
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const rate = scrolled * 0.2;
        heroText.style.transform = `translateY(${rate}px)`;
    }
    
    // Service items floating effect
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        const rate = scrolled * 0.1 + (index * 0.1);
        item.style.transform = `translateY(${Math.sin(rate) * 5}px)`;
    });
    
    // Cards floating effect
    const cards = document.querySelectorAll('.why-card');
    cards.forEach((card, index) => {
        const rate = scrolled * 0.05 + (index * 0.2);
        card.style.transform = `translateY(${Math.sin(rate) * 3}px)`;
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sri Guru Sai Laser website loaded successfully!');
    
    // Add loading animation to images
    const heroImages = document.querySelectorAll('.hero-img');
    heroImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        img.style.transform = 'scale(0.8) rotate(5deg)';
        
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1) rotate(0deg)';
        }, index * 300);
    });
    
    // Add initial animation to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.8)';
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 1000 + (index * 200));
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #ff6b35';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Add mouse follow effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 107, 53, 0.3), transparent)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = '';
        });
    });
});
