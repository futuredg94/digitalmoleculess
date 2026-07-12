// ============================================
// 1. HAMBURGER MENU TOGGLE (Mobile Navigation)
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked (on mobile)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ============================================
// 2. SMOOTH SCROLLING (for anchor links)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 3. SCROLL ANIMATIONS (Reveal elements on scroll)
// ============================================
const revealElements = document.querySelectorAll('.feature, .stat-card, .product-card');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('revealed');
        }
    });
};

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .feature, .stat-card, .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .feature.revealed, .stat-card.revealed, .product-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Run on load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// ============================================
// 4. NAVBAR SHADOW ON SCROLL (optional)
// ============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

// ============================================
// 5. PRODUCT SEARCH/FILTER (for products.html)
// ============================================
const searchInput = document.getElementById('productSearch');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('keyup', function () {
        const searchTerm = this.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            const productCategory = card.querySelector('.product-cat')?.textContent?.toLowerCase() || '';
            const productDesc = card.querySelector('.product-desc')?.textContent?.toLowerCase() || '';
            const catalogNo = card.querySelector('.product-details span:first-child')?.textContent?.toLowerCase() || '';

            const match = productName.includes(searchTerm) ||
                          productCategory.includes(searchTerm) ||
                          productDesc.includes(searchTerm) ||
                          catalogNo.includes(searchTerm);

            card.style.display = match ? 'block' : 'none';
        });
    });
}

// ============================================
// 6. CONTACT FORM VALIDATION (for contact.html)
// ============================================
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // Optional: Show success message
        alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
    });
}

// ============================================
// 7. PRODUCT INQUIRY BUTTONS (pre-fill email)
// ============================================
document.querySelectorAll('.btn-small').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('mailto:')) {
            // The email link already works, but we can track clicks
            console.log('Product inquiry clicked: ' + href);
        }
    });
});

// ============================================
// 8. COPYRIGHT YEAR AUTO-UPDATE
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ============================================
// 9. CONSOLE WELCOME MESSAGE (fun!)
// ============================================
console.log('🚀 Welcome to Digital Molecules!');
console.log('📧 For inquiries: purchase@digitalmoleculess.com');
console.log('📞 Phone: +91 8919727242');
