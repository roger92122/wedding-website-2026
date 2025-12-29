/* ============================================================
   SMOOTH SCROLL (APPLE EASING)
   ============================================================ */

function smoothScrollTo(target, duration = 2200, offset = 80) {
  const start = window.pageYOffset;
  const end = target.getBoundingClientRect().top + start - offset;
  const distance = end - start;
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);

    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * ease);
    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ============================================================
   ON LOAD
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     HAMBURGER MENU (SINGLE SOURCE)
  -------------------------------------------------------- */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-left");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("show");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("show");
      }
    });
  }

  /* --------------------------------------------------------
     LANGUAGE SWITCHER
  -------------------------------------------------------- */

  const btnEN = document.getElementById("lang-en");
  const btnZH = document.getElementById("lang-zh");

  function setLanguage(lang) {
    const showEN = lang === "en";

    document.querySelectorAll(".lang-en").forEach(el => {
      el.style.display = showEN ? "" : "none";
    });

    document.querySelectorAll(".lang-zh").forEach(el => {
      el.style.display = showEN ? "none" : "";
    });

    btnEN && (btnEN.style.display = showEN ? "none" : "inline-block");
    btnZH && (btnZH.style.display = showEN ? "inline-block" : "none");
  }

  setLanguage("en");

  btnEN?.addEventListener("click", () => setLanguage("en"));
  btnZH?.addEventListener("click", () => setLanguage("zh"));

  /* --------------------------------------------------------
     SMOOTH SCROLL LINKS
  -------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      const isMobile = window.innerWidth < 700;

      smoothScrollTo(
        target,
        isMobile ? 5000 : 3800,
        isMobile ? 30 : 40
      );
    });
  });

  /* --------------------------------------------------------
     FADE-IN ON SCROLL
  -------------------------------------------------------- */

  const fadeEls = document.querySelectorAll(
    ".section, .hero-content, .event-image, .faq-item, .rsvp-form"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  /* --------------------------------------------------------
     RSVP: BRINGING A GUEST
  -------------------------------------------------------- */

  function setupGuestToggle(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);
    if (!checkbox || !input) return;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        input.style.display = "block";
        input.focus();
      } else {
        input.style.display = "none";
        input.value = "";
      }
    });
  }

  setupGuestToggle("bringing-guest-en", "guest-name-en");
  setupGuestToggle("bringing-guest-zh", "guest-name-zh");

});

document.addEventListener("scroll", () => {
  const rsvp = document.querySelector(".floating-rsvp");
  const footer = document.getElementById("site-footer");
  if (!rsvp || !footer) return;

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  rsvp.style.opacity = footerTop < windowHeight ? "0" : "1";
  rsvp.style.pointerEvents = footerTop < windowHeight ? "none" : "auto";
});


  /* --------------------------------------------------------
     MUSIC
  -------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

  let isPlaying = false;
  let hasInteracted = false;

  function fadeInAudio(audio, targetVolume = 0.4, duration = 1200) {
    audio.muted = false; 
    // audio.volume = 0;
    audio.play();

    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = targetVolume / steps;

    let currentStep = 0;

    const fade = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(targetVolume, audio.volume + volumeStep);

      if (currentStep >= steps) {
        audio.volume = targetVolume;
        clearInterval(fade);
      }
    }, stepTime);
  }

  // function startMusic() {
  //   if (!hasInteracted) {
  //     fadeInAudio(music, 0.4, 1800);
  //     isPlaying = true;
  //     toggle.classList.remove("muted");
  //     toggle.textContent = "❚❚";
  //     hasInteracted = true;
  //   }
  // }
  function startMusic() {
     if (hasInteracted) return;
   
     music.muted = false;
     music.volume = 0;
   
     music.play().then(() => {
       // ✅ ONLY set state after successful play
       fadeInAudio(music, 0.4, 1800);
   
       isPlaying = true;
       hasInteracted = true;
   
       toggle.classList.remove("muted");
       toggle.textContent = "❚❚";
     }).catch(err => {
       // ❌ play blocked (likely from scroll)
       console.warn("Audio play blocked:", err);
     });
   }


  // Start on first interaction
  // document.addEventListener("click", startMusic, { once: true });

  // Start on first scroll (touchpad / mouse / swipe)
  // window.addEventListener("scroll", startMusic, { once: true });

  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
  window.addEventListener("scroll", startMusic, { once: true });



  // Manual toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!isPlaying) {
      fadeInAudio(music, 0.4, 1200);
      isPlaying = true;
      toggle.classList.remove("muted");
      toggle.textContent = "❚❚";
    } else {
      music.pause();
      isPlaying = false;
      toggle.classList.add("muted");
      toggle.textContent = "♪";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".gallery-item");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  items.forEach(item => observer.observe(item));
});


 /* --------------------------------------------------------
     Message Button
  -------------------------------------------------------- */
const msgBtn = document.getElementById("floating-message-btn");
const modal = document.getElementById("message-modal");
const closeBtn = document.querySelector(".modal-close");
const backdrop = document.querySelector(".modal-backdrop");

msgBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

backdrop.addEventListener("click", () => {
  modal.classList.remove("active");
});






