document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    menuToggle.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isExpanded);

        // Animate hamburger icon
        if (!isExpanded) {
            line1.classList.add('rotate-45', 'translate-y-2');
            line2.classList.add('opacity-0');
            line3.classList.add('-rotate-45', '-translate-y-2');
        } else {
            line1.classList.remove('rotate-45', 'translate-y-2');
            line2.classList.remove('opacity-0');
            line3.classList.remove('-rotate-45', '-translate-y-2');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
            line1.classList.remove('rotate-45', 'translate-y-2');
            line2.classList.remove('opacity-0');
            line3.classList.remove('-rotate-45', '-translate-y-2');
        });
    });
});
// Enhanced Navbar Scripts
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-lg');
        } else {
            navbar.classList.remove('scrolled', 'shadow-lg');
        }
    });

    // Mobile menu toggle with animation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function () {
        let fromTop = window.scrollY + 100;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);

            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active', 'text-amber-600');
            } else {
                link.classList.remove('active', 'text-amber-600');
            }
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Menu Filter System
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-amber-600', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-amber-600', 'hover:text-white');
            });
            this.classList.add('bg-amber-600', 'text-white');
            this.classList.remove('bg-gray-200', 'hover:bg-amber-600', 'hover:text-white');

            const filter = this.getAttribute('data-filter');
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form Validation and Submission
    document.getElementById('reservation-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset errors
        document.querySelectorAll('[id$="-error"]').forEach(el => {
            el.classList.add('hidden');
        });

        let isValid = true;

        // Validate Name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            document.getElementById('name-error').classList.remove('hidden');
            isValid = false;
        }

        // Validate Phone
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (phone === '' || !phoneRegex.test(phone)) {
            document.getElementById('phone-error').classList.remove('hidden');
            isValid = false;
        }

        // Validate Date
        const date = document.getElementById('date').value;
        if (date === '') {
            document.getElementById('date-error').classList.remove('hidden');
            isValid = false;
        }

        // Validate Time
        const time = document.getElementById('time').value;
        if (time === '') {
            document.getElementById('time-error').classList.remove('hidden');
            isValid = false;
        }

        // Validate Guests
        const guests = document.getElementById('guests').value;
        if (guests === null) {
            document.getElementById('guests-error').classList.remove('hidden');
            isValid = false;
        }

        if (isValid) {
            // Save to localStorage
            const reservation = {
                name: name,
                phone: phone,
                date: date,
                time: time,
                guests: guests,
                timestamp: new Date().toISOString()
            };

            let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservations.push(reservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Show toast
            const toast = document.getElementById('toast');
            toast.classList.remove('hidden');

            // Reset form
            this.reset();

            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    });

    // Initialize AOS for scroll animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120
    });

    // Stagger animations for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Stagger animations for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Stagger animations for form inputs
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
    });
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
            navbar.classList.add('bg-white/95');
            navbar.classList.add('backdrop-blur-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('bg-white/95');
            navbar.classList.remove('backdrop-blur-sm');
        }
    });
});

