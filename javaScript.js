document.addEventListener("DOMContentLoaded", function() {
    let homeContent = document.querySelector(".home-content");

    function showContent() {
        let position = homeContent.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight) {
            homeContent.classList.add("show");
        }
    }

    window.addEventListener("scroll", showContent);
    showContent(); // Run initially in case the section is already in view
});

document.addEventListener("DOMContentLoaded", function() {
    const lightning = document.querySelector(".lightning");

    function randomFlicker() {
        const randomDelay = Math.random() * 2000 + 500; // Between 500ms - 2500ms
        lightning.style.animation = `flicker 0.2s infinite alternate`;

        setTimeout(() => {
            lightning.style.animation = "none"; // Stop flickering
            setTimeout(randomFlicker, randomDelay); // Restart after delay
        }, 200);
    }

    randomFlicker();
});

let typingText = document.querySelector(".typing-text span");
let roles = ["Project Manager", "Web Developer", "UI/UX Designer", "Editor", "Published Author"];
let index = 0,
    charIndex = 0;

function typeEffect() {
    if (charIndex < roles[index].length) {
        typingText.textContent += roles[index][charIndex];
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingText.textContent = roles[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        index = (index + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();


// Home setup
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Function to generate a random number within the range
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Array that will contain all of the circles and their properties
let circles = [];

// Colors to use in the canvas
const colors = ["#080328", "#0c0347", "#180273", "#3004ad"];

// Set body background to one of the colors
document.body.style.backgroundColor = "#020207";

// Create circle data
function initCircles() {
    circles = [];
    let circleCount = Math.floor(window.innerWidth / 100);

    for (let i = 0; i < circleCount; i++) {
        let radius = window.innerWidth / 4;
        let x = randomBetween(radius, canvas.width - radius);
        let y = randomBetween(radius, canvas.height - radius);
        let dx = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let dy = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let color = colors[Math.floor(Math.random() * colors.length)];
        circles.push({ x, y, dx, dy, radius, color });
    }
}

// Draw the circles with our new values
function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Animation function
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;
        drawCircle(circle);
    });
}

// Function that makes the gradient always full screen
function resizecanvas() {
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;
    initCircles();
}

// Make canvas full width on page load
resizecanvas();

// Make canvas full width every time the screen is resized
window.addEventListener("resize", resizecanvas);

// Create the circle data on page load
initCircles();

// Run the animation on page load
animate();

// Scroll Animations
document.addEventListener("DOMContentLoaded", function() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.home-content, .home-img, .skills-card, .heading'
    );

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add show class when element is visible
                entry.target.classList.add('show');
            } else {
                // Optional: remove show class when element is not visible
                // This will create animation when scrolling back up
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    // Observe each element
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Initial check for elements already in view
    function checkInitialVisibility() {
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight) {
                element.classList.add('show');
            }
        });
    }

    // Run initial check
    checkInitialVisibility();
});

// Active Navigation on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    function onScroll() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', onScroll);

    // Call onScroll on page load to set initial active state
    onScroll();
});

// Update active nav link based on scroll position with smooth transition
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section.home, section.skills');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scroll = window.scrollY;

        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Smooth scrolling with animation trigger
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listeners
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Skills cards animation
const skillsCards = document.querySelectorAll('.skills-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillsCards.forEach(card => {
    observer.observe(card);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
});

// Loading Animation (Commented)
/*
document.addEventListener('DOMContentLoaded', function() {
    const loadingWrapper = document.getElementById('loading-wrapper');
    
    setTimeout(() => {
        loadingWrapper.classList.add('loaded');
        
        setTimeout(() => {
            loadingWrapper.style.display = 'none';
        }, 500);
    }, 2500);
});
*/

// Enhanced Scroll Animation
function scrollAnimation() {
    const elements = document.querySelectorAll('.scroll-scale');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (elementPosition < screenPosition * 0.85) { // Trigger slightly earlier
            element.classList.add('show');

            // If this is the carousel container, ensure proper carousel state
            if (element.classList.contains('carousel-container')) {
                initializeCarouselState();
            }
        }
    });
}

// Initialize carousel state
function initializeCarouselState() {
    const items = Array.from(document.querySelectorAll('.carousel-item'));

    // Reset all items first
    items.forEach(item => {
        item.classList.remove('active', 'prev', 'next');
    });

    // Set initial states
    if (items.length > 0) {
        items[0].classList.add('active');
        if (items.length > 1) {
            items[1].classList.add('next');
        }
        if (items.length > 2) {
            items[items.length - 1].classList.add('prev');
        }
    }
}

// Update Project Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');

            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            }
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function goToNext() {
        if (!isTransitioning) {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }
    }

    function goToPrev() {
        if (!isTransitioning) {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }
    }

    // Event Listeners
    prevButton.addEventListener('click', goToPrev);
    nextButton.addEventListener('click', goToNext);

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            goToNext();
        } else if (touchEndX - touchStartX > 50) {
            goToPrev();
        }
    });

    // Initialize carousel
    updateCarousel();
});

// Add scroll event listener
window.addEventListener('scroll', scrollAnimation);
// Initial check for elements in view
window.addEventListener('load', scrollAnimation);

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const lightningTrigger = document.getElementById('lightning-trigger');
    const lightningFlash = document.getElementById('lightning-flash');

    function createLightningSymbol(x, y, size, delay) {
        const symbol = document.createElement('div');
        symbol.className = 'lightning-symbol';
        symbol.textContent = '⚡︎';
        symbol.style.left = x + '%';
        symbol.style.top = y + '%';
        symbol.style.fontSize = size + 'px';

        // Create unique animation name
        const animationName = `lightningSymbol${Math.random().toString(36).substr(2, 9)}`;
        const keyframes = `
            @keyframes ${animationName} {
                0% {
                    opacity: 0;
                    transform: scale(0.5) rotate(${-20 + Math.random() * 40}deg);
                }
                20% {
                    opacity: 1;
                    transform: scale(${1.1 + Math.random() * 0.3}) rotate(${-20 + Math.random() * 40}deg);
                }
                40% {
                    opacity: ${0.6 + Math.random() * 0.4};
                    transform: scale(${0.8 + Math.random() * 0.3}) rotate(${-20 + Math.random() * 40}deg);
                }
                60% {
                    opacity: 1;
                    transform: scale(${1 + Math.random() * 0.3}) rotate(${-20 + Math.random() * 40}deg);
                }
                80% {
                    opacity: ${0.7 + Math.random() * 0.3};
                    transform: scale(${0.9 + Math.random() * 0.2}) rotate(${-10 + Math.random() * 20}deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(1) rotate(0);
                }
            }
        `;

        // Add keyframes to document
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);

        // Apply animation
        symbol.style.animation = `${animationName} ${0.3 + Math.random() * 0.2}s ease-out ${delay}s`;

        lightningFlash.appendChild(symbol);

        // Cleanup
        setTimeout(() => {
            symbol.remove();
            style.remove();
        }, (delay + 0.5) * 1000);
    }

    function createLightningStrike() {
        // Clear existing effects
        lightningFlash.classList.remove('active');
        lightningFlash.innerHTML = '';

        // Force reflow
        void lightningFlash.offsetWidth;

        // Add flash effect
        lightningFlash.classList.add('active');

        // Create main lightning path
        const symbolCount = 15 + Math.floor(Math.random() * 10);
        let currentY = 0;
        let currentX = 50;

        for (let i = 0; i < symbolCount; i++) {
            // Create zigzag pattern
            currentX += (Math.random() * 10) - 5;
            currentY += (100 / symbolCount) + (Math.random() * 2);

            // Main lightning bolt
            const size = 24 + Math.random() * 12;
            const delay = (i * 0.02) + (Math.random() * 0.02);
            createLightningSymbol(currentX, currentY, size, delay);

            // Add random branches
            if (Math.random() < 0.3) {
                const branchX = currentX + (Math.random() * 20) - 10;
                const branchY = currentY;
                const branchSize = size * 0.7;
                const branchDelay = delay + 0.05;
                createLightningSymbol(branchX, branchY, branchSize, branchDelay);
            }
        }

        // Cleanup
        setTimeout(() => {
            lightningFlash.classList.remove('active');
            lightningFlash.innerHTML = '';
        }, 1000);
    }

    lightningTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        createLightningStrike();
    });
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery img');

    // Open lightbox
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightboxImg.src = image.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

// Add click handlers for AVP links
document.addEventListener('DOMContentLoaded', function() {
    const avpLinks = document.querySelectorAll('.avp-link');
    avpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
});