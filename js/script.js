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
    });

    /* ===== Navigation (Mobile Toggle Ready) ===== */
    function initNavigation() {
        const nav = document.querySelector(".nav");
        if (!nav) return;

        // Create mobile toggle button
        const toggle = document.createElement("button");
        toggle.className = "nav-toggle";
        toggle.setAttribute("aria-label", "Toggle navigation");
        toggle.innerHTML = "☰";

        nav.appendChild(toggle);

        const navLinks = document.querySelector(".nav-links");

        toggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Close menu on link click (mobile UX)
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    /* ===== Smooth Scroll for Anchor Links ===== */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");

                if (targetId.length > 1) {
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

    /* ===== Utility: Format Number ===== */
    function formatNumber(value) {
        if (!value) return "";
        return Number(value).toLocaleString();
    }

    /* ===== Utility: Create Element ===== */
    function createElement(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    }

    /* ===== Expose Utilities Globally ===== */
    window.DM = {
        formatNumber,
        createElement
    };

})();
