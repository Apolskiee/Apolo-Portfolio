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
    const logoImage = document.querySelector(".logo img");

    if (logoImage) {
        function randomFlicker() {
            const randomDelay = Math.random() * 2000 + 500; // Between 500ms - 2500ms
            logoImage.style.animation = `flicker 0.2s infinite alternate`;

            setTimeout(() => {
                logoImage.style.animation = "none"; // Stop flickering
                setTimeout(randomFlicker, randomDelay); // Restart after delay
            }, 200);
        }

        randomFlicker();
    }
});

let typingText = document.querySelector(".typing-text span");
let roles = ["Project Manager", "Web Developer", "UI/UX Designer", "Published Author", "Multimedia Artist"];
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
        '.home-content, .home-img, .skills-card, .heading, .sunlife-card'
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
    const sections = document.querySelectorAll('section.home, section.skills, section.projects, section.others, section.sunlife');
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

// Internship Pubmat Slider - Sliding Carousel
function initPubmatSlider() {
    const slider = document.querySelector('.pubmat-slider');
    const track = slider ? slider.querySelector('.pubmat-slider-track') : null;
    if (!slider || !track) return;
    const slides = Array.from(track.querySelectorAll('.pubmat-slide'));
    const prevBtn = document.querySelector('.pubmat-slider-arrow.prev');
    const nextBtn = document.querySelector('.pubmat-slider-arrow.next');
    const dotsContainer = document.querySelector('.pubmat-slider-dots');
    let current = 0;
    let autoPlayTimer = null;
    const SLIDE_DURATION = 5000; // ms

    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'pubmat-slider-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.pubmat-slider-dot'));

    // Set initial position
    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[current].classList.add('active');
    }

    function goToSlide(idx) {
        current = idx;
        updateSlider();
        resetAutoPlay();
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateSlider();
        resetAutoPlay();
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoPlay();
    }

    function resetAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            current = (current + 1) % slides.length;
            updateSlider();
        }, SLIDE_DURATION);
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    resetAutoPlay();
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    slider.addEventListener('mouseleave', resetAutoPlay);
    // Touch swipe support
    let startX = null;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', e => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diff = endX - startX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) prevSlide();
            else nextSlide();
        }
        startX = null;
    });
    // Initial render
    updateSlider();
}
document.addEventListener('DOMContentLoaded', initPubmatSlider);