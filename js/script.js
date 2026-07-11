/* =========================
   Digital Molecules V2.0
   Global Script
   ========================= */

(function () {
    "use strict";

    /* ===== DOM Ready ===== */
    document.addEventListener("DOMContentLoaded", function () {
        initNavigation();
        initSmoothScroll();
        highlightActiveNav();
    });

    /* ===== Navigation (Mobile Toggle Ready) ===== */
    function initNavigation() {
        const nav = document.querySelector(".nav");
        if (!nav) return;

        // Prevent duplicate toggle button
        if (nav.querySelector(".nav-toggle")) return;

        // Create mobile toggle button
        const toggle = document.createElement("button");
        toggle.className = "nav-toggle";
        toggle.setAttribute("aria-label", "Toggle navigation");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = "☰";

        nav.appendChild(toggle);

        const navLinks = document.querySelector(".nav-links");
        if (!navLinks) return;

        toggle.addEventListener("click", function () {
            const isActive = navLinks.classList.toggle("active");
            toggle.setAttribute("aria-expanded", isActive);
        });

        // Close menu on link click (mobile UX)
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ===== Smooth Scroll for Anchor Links ===== */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");

                if (targetId && targetId.length > 1) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            });
        });
    }

    /* ===== Active Navigation Highlight ===== */
    function highlightActiveNav() {
        const links = document.querySelectorAll(".nav-links a");
        const current = window.location.pathname.split("/").pop() || "index.html";

        links.forEach(link => {
            const href = link.getAttribute("href");
            if (href === current) {
                link.style.color = "#328cc1";
            }
        });
    }

    /* ===== Utility: Format Number ===== */
    function formatNumber(value) {
        if (!value && value !== 0) return "";
        return Number(value).toLocaleString();
    }

    /* ===== Utility: Create Element ===== */
    function createElement(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined && text !== null) el.textContent = text;
        return el;
    }

    /* ===== Expose Utilities Globally ===== */
    window.DM = {
        formatNumber,
        createElement
    };

})();
