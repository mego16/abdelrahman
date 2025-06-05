/**
 * Main JavaScript file for Accountant Personal Website
 * Author: Cascade
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initMobileMenu();
    initPortfolioFilter();
    initTestimonialsSlider();
    initContactForm();
    initNewsletterForm();
    initScrollAnimation();
});

// Make header sticky on scroll
function initStickyHeader() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu')) {
                navMenu.classList.remove('show');
            }
        });
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Hide all testimonials except the first one
    if (testimonialCards.length > 1) {
        for (let i = 1; i < testimonialCards.length; i++) {
            testimonialCards[i].style.display = 'none';
        }
    }

    // Next button click event
    if (nextBtn && testimonialCards.length > 1) {
        nextBtn.addEventListener('click', function() {
            testimonialCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialCards[currentIndex].style.display = 'flex';
        });
    }

    // Previous button click event
    if (prevBtn && testimonialCards.length > 1) {
        prevBtn.addEventListener('click', function() {
            testimonialCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            testimonialCards[currentIndex].style.display = 'flex';
        });
    }

    // Auto slide every 5 seconds
    if (testimonialCards.length > 1) {
        setInterval(function() {
            testimonialCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialCards[currentIndex].style.display = 'flex';
        }, 5000);
    }
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just show a success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                alert('يرجى إدخال بريدك الإلكتروني');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just show a success message
            alert('تم الاشتراك في النشرة البريدية بنجاح!');
            newsletterForm.reset();
        });
    }
}

// Scroll animation for sections
function initScrollAnimation() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}
