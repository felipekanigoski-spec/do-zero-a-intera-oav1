/* ==========================================
   PARANÁ FUTURISTA
   JavaScript
========================================== */


/* MENU MOBILE */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        menuBtn.textContent = "×";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* FECHAR MENU AO CLICAR EM UM LINK */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");
        menuBtn.textContent = "☰";

    });

});


/* ==========================================
   CONTADORES
========================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1600;
        const increment = target / (duration / 16);

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;
                return;

            }

            counter.textContent = Math.floor(current);

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ==========================================
   MODAL DOS DESTINOS
========================================== */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

const moreButtons = document.querySelectorAll(".more-btn");

moreButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const text = button.dataset.text;

        modalTitle.textContent = title;
        modalText.textContent = text;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeModal);


modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* ==========================================
   EFEITO DE APARECER AO ROLAR
========================================== */

const animatedElements = document.querySelectorAll(
    ".info-card, .destination-card, .economy-card, .culture-card, .fact, .timeline-item"
);

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

    });

}, {
    threshold: 0.12
});


animatedElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ==========================================
   EFEITO DO HEADER AO ROLAR
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(3, 8, 7, 0.94)";
        header.style.borderBottomColor = "rgba(0, 255, 157, 0.12)";

    } else {

        header.style.background = "rgba(3, 8, 7, 0.72)";
        header.style.borderBottomColor = "rgba(255,255,255,0.05)";

    }

});


/* ==========================================
   EFEITO PARALLAX DO ORBE
========================================== */

const orb = document.querySelector(".orb");

window.addEventListener("mousemove", event => {

    if (!orb) return;

    const x = (window.innerWidth / 2 - event.clientX) / 70;
    const y = (window.innerHeight / 2 - event.clientY) / 70;

    orb.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ==========================================
   ANIMAÇÃO DOS ELEMENTOS
========================================== */

const animationStyle = document.createElement("style");

animationStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(35px);
        transition:
            opacity 0.8s ease,
            transform 0.8s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .destination-card:hover {
        transform: scale(1.015);
        box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.4);
    }

`;

document.head.appendChild(animationStyle);


/* ==========================================
   ANO AUTOMÁTICO NO FOOTER
========================================== */

const footerYear = document.querySelector("footer small");

if (footerYear) {

    footerYear.innerHTML =
        `© ${new Date().getFullYear()} Paraná Futurista • Desenvolvido para a web`;

}


/* ==========================================
   CURSOR / EFEITO DE LUZ
========================================== */

const cursorGlow = document.createElement("div");

cursorGlow.style.cssText = `
    position: fixed;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(
        circle,
        rgba(0,255,157,0.06),
        transparent 70%
    );
    transform: translate(-50%, -50%);
`;

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", event => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});


/* ==========================================
   CONSOLE
========================================== */

console.log(
    "%c PARANÁ FUTURISTA ",
    "background:#00ff9d;color:#00130c;font-size:20px;font-weight:bold;padding:8px;"
);

console.log(
    "Site informativo sobre o estado do Paraná."
);
