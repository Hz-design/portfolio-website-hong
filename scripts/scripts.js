/* mouse hover elements */
const featureItemLeft = document.querySelector(".product-left");
const featureItemMiddle = document.querySelector(".product-middle");
const featureItemRight = document.querySelector(".product-right");

const featuredItemLeftTitle = document.querySelector(".featured__title--left");
const featuredItemMiddleTitle = document.querySelector(
    ".featured__title--middle"
);
const featuredItemRightTitle = document.querySelector(
    ".featured__title--right"
);

const featuredLeftOverlay = document.querySelector(".overlay--left");
const featuredMiddleOverlay = document.querySelector(".overlay--middle");
const featuredRightOverlay = document.querySelector(".overlay--right");

const featuredLeftText = document.querySelector(".card-title--left");
const featuredMiddleText = document.querySelector(".card-title--middle");
const featuredRightText = document.querySelector(".card-title--right");

////////////////////////////////////////
// Hover over featured items
function handleFeatureItemHover(
    featureItem,
    titleElement,
    overlayElements,
    textElement
) {
    // Check if all elements are present in the DOM
    if (featureItem && titleElement && overlayElements && textElement) {
        featureItem.addEventListener("mouseover", function () {
            titleElement.style.visibility = "unset";
            titleElement.style.opacity = "1";
            overlayElements.forEach((overlay) => (overlay.style.opacity = "1"));
            textElement.style.opacity = "1";
        });

        featureItem.addEventListener("mouseout", function () {
            titleElement.style.visibility = "hidden";
            titleElement.style.opacity = "0";
            overlayElements.forEach((overlay) => (overlay.style.opacity = "0"));
            textElement.style.opacity = "0";
        });
    } else {
        // console.error("One or more elements are not recognized in the DOM.");
    }
}

// Example usage for featureItemLeft
handleFeatureItemHover(
    featureItemLeft,
    featuredItemLeftTitle,
    [featuredMiddleOverlay, featuredRightOverlay],
    featuredLeftText
);

// Example usage for featureItemMiddle
handleFeatureItemHover(
    featureItemMiddle,
    featuredItemMiddleTitle,
    [featuredLeftOverlay, featuredRightOverlay],
    featuredMiddleText
);

// Example usage for featureItemRight
handleFeatureItemHover(
    featureItemRight,
    featuredItemRightTitle,
    [featuredMiddleOverlay, featuredLeftOverlay],
    featuredRightText
);

////////////////////////////////////////////////
// Including locomotive js library
const locomotiveScroll = new LocomotiveScroll();

////////////////////////////////////////////////
// Hide nav after first section
const nav = document.querySelector(".navigation__container");
const liItem = document.querySelectorAll(".navigation-items li a span");
const firstSection = document.querySelector(".first-section");
let prevScrollPos = window.scrollY || window.pageYOffset;

if (firstSection) {
    window.addEventListener("scroll", () => {
        const currentScrollPos = window.scrollY || window.pageYOffset;
        const firstSectionCalc = firstSection.offsetTop - 100;
        if (currentScrollPos <= firstSectionCalc) {
            // User is scrolling within or before the first section, so keep the menu visible
            nav.style.transform = "translateY(0%)";
            liItem.forEach((element) =>
                element.classList.remove("in-viewport")
            );
        } else if (prevScrollPos > currentScrollPos) {
            // User is scrolling up after the first section, so show the menu and change the menu line color
            nav.style.transform = "translateY(0%)";
        } else {
            // User is scrolling down after the first section, so hide the menu
            nav.style.transform = "translateY(-100%)";
        }

        prevScrollPos = currentScrollPos;
    });
}

///////////////////////////////////////////
// hide on Scroll
const scrollEl = document.querySelector(".home_scroll_down_container");

if (scrollEl) {
    window.addEventListener("scroll", () => {
        const currentScrollPos = window.scrollY || window.pageYOffset;
        if (currentScrollPos < 50) {
            scrollEl.style.transform = "translateY(0%)";
            scrollEl.style.opacity = "1";
        } else {
            scrollEl.style.transform = "translateY(100%)";
            scrollEl.style.opacity = "0";
        }
    });
}

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".reveal");

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

////////////////////////////////////////////
// update amsterdam time

function updateAmsterdamTime() {
    // Get current time in Amsterdam time zone
    const amsterdamTime = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Amsterdam",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    // Update the content of the element with the current Amsterdam time
    document.querySelectorAll(".amsterdam-time").forEach((element) => {
        element.textContent =
            amsterdamTime + " AMS, Amsterdam, The Netherlands";

        // Update the time every second (1000 milliseconds)
        setTimeout(updateAmsterdamTime, 1000);
    });
}

// Initial call to start updating the time
updateAmsterdamTime();

////////////////////////////////////////////
// Custom Cursor
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`,
    };

    trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards",
    });
};

const getTrailerClass = (type) => {
    switch (type) {
        case "video":
            return "fa-play";
        case "mail":
            return "fa-mail";
        case "link":
            return "fa-arrow-up-right";
        default:
            return;
    }
};

window.onmousemove = (e) => {
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;

    const icon = document.getElementById("trailer-icon");
    const datatypeTrailer = trailer.dataset.type;

    if (datatypeTrailer != true) {
        icon.classList.remove("fa-arrow-up-right");
        icon.classList.remove("fa-mail");
        icon.classList.remove("fa-play");
    }
    animateTrailer(e, interacting);

    trailer.dataset.type = interacting ? interactable.dataset.type : "";

    if (interacting) {
        icon.className = getTrailerClass(interactable.dataset.type);
    }
};
