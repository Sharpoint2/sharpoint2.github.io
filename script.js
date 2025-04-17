// script.js for William Castle's Portfolio

document.addEventListener('DOMContentLoaded', () => {

    console.log("William Castle's portfolio script loaded successfully.");

    // --- Cache Frequently Used Elements ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id]'); // Sections with IDs
    const backToTopButton = document.getElementById('backToTopBtn'); // Get the button
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .about-content p'); // Elements to fade in/out

    // --- Calculate Header Height for Offsets ---
    // Get header height dynamically to offset scroll position checks
    const headerHeight = header ? header.offsetHeight : 70; // Use actual height or fallback

    // --- 1. Active Navigation Link Highlighting on Scroll ---
    const activateNavLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10; // Adjusted for header and small buffer
            const sectionHeight = section.clientHeight;

            // Check if scroll position is within the current section's bounds
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Add 'active' class to the corresponding nav link, remove from others
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active'); // Add active class to the matching link
            }
        });

        // Special case for top of the page (highlight 'About' or first link if desired)
        if (scrollPosition < sections[0].offsetTop - headerHeight - 10) {
            navLinks.forEach(link => link.classList.remove('active'));
            // Optionally highlight the first link or 'About' when at the very top
            // if (navLinks[0]) navLinks[0].classList.add('active');
        }
        // Special case for bottom of the page (highlight 'Contact')
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) { // Check if near bottom
            navLinks.forEach(link => link.classList.remove('active'));
            const contactLink = document.querySelector('header nav ul li a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
        }
    };

    // Add scroll event listener for active nav link highlighting
    window.addEventListener('scroll', activateNavLink);
    // Initial check in case the page loads scrolled down
    activateNavLink();

    /*
     * NOTE for Active Nav Link:
     * You need to add CSS rules for the '.active' class in your 'style.css' file.
     * Example:
     * header nav ul li a.active {
     * color: #fff; // Or a distinct highlight color
     * font-weight: bold;
     * border-bottom: 2px solid #fff; // Example underline
     * }
    */

    // --- 2. Back to Top Button Functionality ---
    const handleBackToTop = () => {
        if (backToTopButton) {
            // Show button when scrolled down 300px, hide otherwise
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1'; // Fade in effect
            } else {
                backToTopButton.style.opacity = '0'; // Fade out effect
                // Use setTimeout to hide after fade out transition completes
                setTimeout(() => {
                    // Double check scroll position before hiding, in case user scrolls back down quickly
                    if (window.pageYOffset <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300); // Match this duration with CSS transition duration
            }
        }
    };

    // Add scroll event listener for the back-to-top button visibility
    window.addEventListener('scroll', handleBackToTop);

    // Add click event listener to scroll smoothly to the top
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll animation
            });
        });
    }



// --- 3. Simple Scroll Animations (Fade-in / Fade-Out Effect) ---
const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the element is intersecting (entering viewport)
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
        // If the element is NOT intersecting (leaving viewport)
       
    });
}, observerOptions);

// Observe each element selected for animation
elementsToAnimate.forEach(el => {
    el.classList.add('hidden-initial'); // Add initial hidden state class
    animationObserver.observe(el);
});



}); // End of DOMContentLoaded
