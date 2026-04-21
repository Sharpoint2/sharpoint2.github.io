document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const nav = document.getElementById("primary-navigation");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll("#primary-navigation a");
    const sections = document.querySelectorAll("main section[id]");
    const backToTopButton = document.getElementById("backToTopBtn");
    const revealElements = document.querySelectorAll(".reveal");

    const getHeaderHeight = () => (header ? header.offsetHeight : 80);

    const closeMenu = () => {
        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
    };

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const sectionId = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${sectionId}`;
                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            root: null,
            rootMargin: `-${getHeaderHeight() + 8}px 0px -55% 0px`,
            threshold: 0.05
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    if (backToTopButton) {
        const toggleBackToTop = () => {
            const shouldShow = window.scrollY > 420;
            backToTopButton.classList.toggle("visible", shouldShow);
        };

        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopButton.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        revealElements.forEach((el) => el.classList.add("show"));
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;
                const order = Number(element.dataset.revealOrder || 0);
                window.setTimeout(() => {
                    element.classList.add("show");
                }, Math.min(order * 55, 250));
                observer.unobserve(element);
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.dataset.revealOrder = String(index + 1);
        revealObserver.observe(element);
    });
});