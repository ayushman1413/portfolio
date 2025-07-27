document.addEventListener("DOMContentLoaded", () => {

  ;(() => {
    emailjs.init("CxJGUxwe0g66GRkCI") 
  })()

  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".menu ul li a")
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
  const sidebar = document.querySelector(".sidebar")
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioModal = document.querySelector(".portfolio-modal")
  const modalClose = document.querySelector(".modal-close")
  const contactForm = document.getElementById("contactForm")
  const homeContactForm = document.getElementById("homeContactForm")
  const skillBars = document.querySelectorAll(".skill-progress")
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const testimonialDots = document.querySelectorAll(".dot")
  const testimonialPrev = document.querySelector(".testimonial-prev")
  const testimonialNext = document.querySelector(".testimonial-next")

  let currentTestimonial = 0

  let typed
  const options = {
    strings: ["Web Developer", "UI/UX Designer", "Freelancer", "Full Stack Developer", "Web Designer", "Frontend Developer"],
    typeSpeed: 80,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
  }

  const typedScript = document.createElement("script")
  typedScript.src = "https://cdn.jsdelivr.net/npm/typed.js@2.0.12"
  typedScript.onload = () => {
    typed = new Typed(".typed-text", options)
  }
  document.body.appendChild(typedScript)

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      navLinks.forEach((link) => {
        link.parentElement.classList.remove("active")
      })

      this.parentElement.classList.add("active")

      const targetId = this.getAttribute("href")

      sections.forEach((section) => {
        section.classList.remove("active")
      })

      document.querySelector(targetId).classList.add("active")

      if (targetId === "#skills" && document.querySelector(targetId).classList.contains("active")) {
        animateSkills()
      }

      if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active")
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  })

  const heroButtons = document.querySelectorAll(".hero-cta a")
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      sections.forEach((section) => {
        section.classList.remove("active")
      })

      navLinks.forEach((link) => {
        link.parentElement.classList.remove("active")
      })

      const targetId = this.getAttribute("href")
      document.querySelector(targetId).classList.add("active")

      const correspondingNavLink = Array.from(navLinks).find((link) => link.getAttribute("href") === targetId)
      if (correspondingNavLink) {
        correspondingNavLink.parentElement.classList.add("active")
      }

      if (targetId === "#skills" && document.querySelector(targetId).classList.contains("active")) {
        animateSkills()
      }
      // sidebar close hone ke liye jab mobile view open hoga
      if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active")
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  })


  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme")

    if (document.body.classList.contains("light-theme")) {
      this.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>'
    } else {
      this.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>'
    }
  })

  // Mobile Navigation jab mobile view on hoga
  mobileNavToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active")

    if (sidebar.classList.contains("active")) {
      this.innerHTML = '<i class="fas fa-times"></i>'
    } else {
      this.innerHTML = '<i class="fas fa-bars"></i>'
    }
  })

  // Portfolio Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((btn) => {
        btn.classList.remove("active")
      })

      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Portfolio plus + icon ka Modal 
  portfolioItems.forEach((item) => {
    const portfolioLink = item.querySelector(".portfolio-link")

    portfolioLink.addEventListener("click", (e) => {
      e.preventDefault()

      const title = item.querySelector("h3").textContent
      const category = item.querySelector("p").textContent
      const imgSrc = item.querySelector("img").getAttribute("src")
      const description = item.getAttribute("data-description") || "No description available."
      const projectUrl = item.getAttribute("data-url") || "#"
      const year = item.getAttribute("data-year") || "march 2025"

      portfolioModal.querySelector(".modal-title").textContent = title
      portfolioModal.querySelector(".modal-img img").setAttribute("src", imgSrc)
      portfolioModal.querySelector(".modal-description p").textContent = description
      portfolioModal.querySelector(".modal-details .modal-detail:nth-child(1) p").textContent = "own project"
      portfolioModal.querySelector(".modal-details .modal-detail:nth-child(2) p").textContent = year
      const projectLink = portfolioModal.querySelector(".modal-details .modal-detail:nth-child(3) a")
      projectLink.textContent = "View Project"
      projectLink.setAttribute("href", projectUrl)
      projectLink.setAttribute("target", "_blank")
      projectLink.setAttribute("rel", "noopener noreferrer")

      portfolioModal.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  modalClose.addEventListener("click", () => {
    portfolioModal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  portfolioModal.addEventListener("click", function (e) {
    if (e.target === this) {
      portfolioModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  function handleFormSubmit(form, formType) {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector("button[type='submit']")
      const formStatus = this.querySelector(".form-status")

      submitBtn.classList.add("loading")

      const name = this.querySelector(`#${formType === "home" ? "home-" : ""}name`).value
      const email = this.querySelector(`#${formType === "home" ? "home-" : ""}email`).value
      const message = this.querySelector(`#${formType === "home" ? "home-" : ""}message`).value
      const subject = formType === "home" ? "Contact from Portfolio" : this.querySelector("#subject").value

      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      }

      emailjs.send("service_ayush", "template_yzgd8em", templateParams).then(
        () => {
          formStatus.textContent = "Your message has been sent successfully!"
          formStatus.className = "form-status success"
          form.reset()
          submitBtn.classList.remove("loading")
        },
        (error) => {
          console.error("Email sending failed:", error)
          formStatus.textContent = "Failed to send message. Please try again later."
          formStatus.className = "form-status error"
          submitBtn.classList.remove("loading")
        },
      )
    })
  }

  if (contactForm) handleFormSubmit(contactForm, "main")
  if (homeContactForm) handleFormSubmit(homeContactForm, "home")

  // Skills Animation
  function animateSkills() {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = progress
    })
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  window.addEventListener("scroll", () => {
    const skillsSection = document.getElementById("skills")
    if (isInViewport(skillsSection) && skillsSection.classList.contains("active")) {
      animateSkills()
    }
  })

  // Testimonials Slider
  function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.remove("active")
      testimonialDots[i].classList.remove("active")
    })

    testimonialItems[index].classList.add("active")
    testimonialDots[index].classList.add("active")
    currentTestimonial = index
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  testimonialPrev.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length
    showTestimonial(currentTestimonial)
  })

  testimonialNext.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
    showTestimonial(currentTestimonial)
  })

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
    showTestimonial(currentTestimonial)
  }, 5000)

  // Initialize
  document.querySelector(".menu ul li:first-child").classList.add("active")
  document.querySelector(".section:first-child").classList.add("active")
  showTestimonial(0)

  // Preload images
  function preloadImages() {
    const images = [
      "assets/profile.jpg",
      "assets/about.jpg",
      "assets/Calculator.png",
      "assets/collge.saitm.png",
      "assets/Emoji-103-512.webp",
      "assets/food express.png",
      "assets/PHOTO-2025-05-05-15-17-12.pdf",
      "assets/Profile picture.png",
      "assets/profile.jpg",
      "assets/restaurent image.png",
      "assets/saitmchatboat.png",
      "assets/Screenshot 2025-05-05 at 3.28.24 PM.png",
      "assets/Screenshot 2025-05-05 at 3.29.47 PM.png",
      "assets/Screenshot 2025-05-05 at 3.33.49 PM.png",
      "assets/Screenshot 2025-05-05 at 3.50.07 PM.png",
      "assets/Screenshot 2025-05-06 at 11.40.50 PM.png",
      "assets/smart atttendance.png",
      "assets/weather-image.png",
      "assets/WhatsApp Image 2025-03-17 at 19.41.58.jpeg",
      "assets/WhatsApp Image 2025-05-04 at 15.39.32.jpeg"
    ]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }
//  preload image
  preloadImages()
})
