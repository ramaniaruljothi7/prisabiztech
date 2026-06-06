const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const floatingEmail = document.querySelector("[data-floating-email]");
const emailFallback = document.querySelector("[data-email-fallback]");
let revealItems = document.querySelectorAll(".reveal");
let emailFallbackTimer;
const businessEmail = "sathya@prisabiztech.com";

const galleryImages = [
  ["image5.jpeg", "Institution program banner"],
  ["image6.jpeg", "Award and recognition event"],
  ["image7.jpeg", "Recognition ceremony"],
  ["image8.jpeg", "Event stage recognition"],
  ["image9.jpeg", "Speaker recognition"],
  ["image10.jpeg", "Tagore Institute event"],
  ["image11.jpeg", "Classroom training session"],
  ["image12.png", "Group program photograph"],
  ["image13.png", "Institution group session"],
  ["image15.png", "Student seminar session"],
  ["image16.png", "Educational program gathering"],
  ["image17.png", "Selvam College lecture series"],
  ["image18.png", "International webinar poster"],
  ["image19.png", "Paavai Engineering College program"],
  ["image20.jpeg", "Guest lecture social update"],
  ["image21.jpeg", "AVS College event invite"],
  ["image22.jpeg", "Training collage"],
  ["image23.png", "Sengunthar Engineering College program"],
  ["image24.jpeg", "Career opportunities poster"],
  ["image25.jpeg", "Event documentation collage"],
  ["image26.png", "VET Institute expert talk"],
  ["image27.jpeg", "Institution program update"],
  ["image28.jpeg", "Vivekanandha College workshop"],
  ["image29.jpeg", "Job opportunities webinar"],
  ["image30.jpeg", "KSR College MOU program"],
  ["image31.jpeg", "Guest lecture session"],
  ["image32.jpeg", "AVS Engineering College partnership"],
  ["image33.jpeg", "AVS Engineering College MOU"],
  ["image34.png", "Paavai College guest program"],
  ["image35.jpeg", "Industry cum college MOU"],
  ["image36.jpeg", "College MOU signing"],
  ["image37.jpeg", "Board of Studies meeting as per Industry Standards"],
  ["image38.jpeg", "Board of Studies Review meeting"],
  ["image39.jpeg", "Board of Studies Team discussion"],
  ["image40.jpeg", "Government Institutional Award"],
  ["image41.jpeg", "Award news clipping"],
  ["image42.jpeg", "Media coverage"],
  ["image43.jpeg", "Academic event speech"],
  ["image44.jpeg", "HOSPITAL STAFF TRAINING"],
  ["image45.jpeg", "Hospital SOPs implementation"],
  ["image46.jpeg", "Founder speaking at event"],
  ["image47.png", "Vivekanandha College program poster"],
  ["image48.jpeg", "Sengunthar College program update"],
  ["image49.png", "Hospital Soft Skill training for quality enhancement"],
  ["image50.jpeg", "Hospital Front Desk Training"],
  ["image52.jpeg", "Certificate and recognition collage"],
  ["image53.jpeg", "MOU and career guidance update"]
];

const observeReveals = () => {
  revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
};

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxImage.src = image.dataset.fullSrc || image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Expanded image preview";
  lightboxCaption.textContent = image.alt || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
};

const showEmailFallback = () => {
  if (!emailFallback) {
    return;
  }

  emailFallback.textContent = `Email us at ${businessEmail}`;
  emailFallback.hidden = false;
  clearTimeout(emailFallbackTimer);
  emailFallbackTimer = window.setTimeout(() => {
    emailFallback.hidden = true;
  }, 6000);
};

const enableImagePreview = () => {
  const previewImages = document.querySelectorAll(".logo-grid img, .gallery-item img, .event-card img");

  previewImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Expand image: ${image.alt}`);

    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
};

if (gallery) {
  const fragment = document.createDocumentFragment();

  galleryImages.forEach(([fileName, caption]) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    figure.className = "gallery-item reveal";
    if (fileName === "image41.jpeg") {
      image.className = "position-top";
    }
    image.src = `assets/document/${fileName}`;
    image.alt = caption;
    image.loading = "lazy";
    figcaption.textContent = caption;

    figure.append(image, figcaption);
    fragment.append(figure);
  });

  gallery.append(fragment);
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
observeReveals();
enableImagePreview();

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

floatingEmail?.addEventListener("click", () => {
  let pageLostFocus = false;
  const markPageLostFocus = () => {
    pageLostFocus = true;
  };

  window.addEventListener("blur", markPageLostFocus, { once: true });
  document.addEventListener("visibilitychange", markPageLostFocus, { once: true });
  navigator.clipboard?.writeText(businessEmail).catch(() => {});

  window.setTimeout(() => {
    if (!pageLostFocus && document.visibilityState === "visible") {
      showEmailFallback();
    }
  }, 900);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const service = formData.get("service");
  const message = formData.get("message");
  const subject = encodeURIComponent(`Website enquiry - ${service}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Opening your email app with the enquiry details.";
  window.location.href = `mailto:sathya@prisabiztech.com?subject=${subject}&body=${body}`;
  form.reset();
});
