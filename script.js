/* =========================================================
   TIRTHA ELECTRICAL & SERVICES — SCRIPT
   Handles: sticky navbar, mobile menu, smooth scroll + active
   link tracking, scroll-reveal animation, service "Enquire"
   shortcuts, enquiry form validation and email delivery via
   Web3Forms (see README.md for setup instructions).
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------
     1. STICKY NAVBAR
     ----------------------------------------------------- */
  var navbar = document.getElementById("navbar");

  function updateNavbarState() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  /* -----------------------------------------------------
     2. MOBILE HAMBURGER MENU
     ----------------------------------------------------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    navLinks.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    var isOpen = navLinks.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  }

  hamburger.addEventListener("click", toggleMobileMenu);

  // Close menu whenever a nav item is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* -----------------------------------------------------
     3. ACTIVE NAV LINK ON SCROLL
     ----------------------------------------------------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id], header")
  ).filter(function (el) { return el.id; });

  var navAnchors = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(function (link) {
      var targetId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", targetId === currentId);
    });
  }
  setActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });

  /* -----------------------------------------------------
     4. SCROLL REVEAL ANIMATION
     ----------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -----------------------------------------------------
     5. SERVICE CARD "ENQUIRE" SHORTCUT
     Clicking a service's Enquire button scrolls to the
     enquiry form and pre-selects that service.
     ----------------------------------------------------- */
  var serviceButtons = document.querySelectorAll(".service-link[data-service]");
  var serviceSelect = document.getElementById("serviceRequired");
  var enquirySection = document.getElementById("enquiry");
  var fullNameInput = document.getElementById("fullName");

  serviceButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var serviceName = btn.getAttribute("data-service");
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      window.setTimeout(function () {
        if (fullNameInput) fullNameInput.focus();
      }, 400);
    });
  });

  /* -----------------------------------------------------
     6. ENQUIRY FORM — VALIDATION + EMAIL DELIVERY
     -----------------------------------------------------
     Emails are delivered using Web3Forms (https://web3forms.com),
     a free service built for static sites like this one hosted
     on GitHub Pages. No credentials are stored in this file —
     only a public "access key" is used, which is safe to expose
     in client-side code. See README.md for setup instructions.
     ----------------------------------------------------- */

  // Replace this with your own Web3Forms access key (see README.md)
  var WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  var form = document.getElementById("enquiryForm");
  var statusBox = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  var validators = {
    fullName: function (value) {
      return value.trim().length >= 2 && value.trim().length <= 80;
    },
    phone: function (value) {
      return /^[0-9+\-\s]{7,15}$/.test(value.trim());
    },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    },
    serviceRequired: function (value) {
      return value.trim().length > 0;
    },
    message: function (value) {
      return value.trim().length >= 10 && value.trim().length <= 1000;
    },
    consent: function (value, field) {
      return field.checked;
    }
  };

  function showFieldError(fieldEl, show) {
    var wrapper = fieldEl.closest(".form-field, .form-checkbox");
    if (!wrapper) return;
    wrapper.classList.toggle("has-error", show);
  }

  function validateField(fieldEl) {
    var name = fieldEl.name;
    var validatorFn = validators[name];
    if (!validatorFn) return true;

    var isValid = validatorFn(fieldEl.value, fieldEl);
    showFieldError(fieldEl, !isValid);
    return isValid;
  }

  function validateForm() {
    var fieldsToValidate = form.querySelectorAll(
      "#fullName, #phone, #email, #serviceRequired, #message, #consent"
    );
    var allValid = true;

    fieldsToValidate.forEach(function (fieldEl) {
      var valid = validateField(fieldEl);
      if (!valid) allValid = false;
    });

    return allValid;
  }

  // Live validation as the user types / selects
  form.querySelectorAll("input, select, textarea").forEach(function (fieldEl) {
    var evtType = fieldEl.tagName === "SELECT" || fieldEl.type === "checkbox" ? "change" : "input";
    fieldEl.addEventListener(evtType, function () {
      if (validators[fieldEl.name]) validateField(fieldEl);
    });
  });

  function setStatus(type, message) {
    statusBox.className = "form-status " + type;
    statusBox.innerHTML = "";

    if (type === "loading") {
      var spinner = document.createElement("span");
      spinner.className = "spinner";
      statusBox.appendChild(spinner);
    } else {
      var icon = document.createElement("i");
      icon.className = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation";
      icon.setAttribute("aria-hidden", "true");
      statusBox.appendChild(icon);
    }

    var text = document.createElement("span");
    text.textContent = message;
    statusBox.appendChild(text);
  }

  function clearStatus() {
    statusBox.className = "form-status";
    statusBox.innerHTML = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearStatus();

    var isValid = validateForm();
    if (!isValid) {
      var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      setStatus("error", "Please fill in all required fields correctly before submitting.");
      return;
    }

    var formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      "New Website Enquiry - " + (formData.get("fullName") || "")
    );
    formData.append("from_name", "Tirtha Electrical & Services Website");
    formData.append("submission_date", new Date().toLocaleString("en-IN"));

    submitBtn.disabled = true;
    setStatus("loading", "Sending your enquiry...");

    fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        submitBtn.disabled = false;
        if (data.success) {
          setStatus(
            "success",
            "Thank you for contacting Tirtha Electrical & Services. Your enquiry has been submitted successfully. Our team will contact you shortly."
          );
          form.reset();
        } else {
          setStatus(
            "error",
            "Something went wrong while sending your enquiry. Please try again or contact us directly."
          );
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        setStatus(
          "error",
          "Something went wrong while sending your enquiry. Please try again or contact us directly."
        );
      });
  });

})();
