// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const header = document.querySelector("header")
  const nav = document.querySelector("nav")
  const authButtons = document.querySelector(".auth-buttons")

  // Create mobile menu toggle button
  const mobileMenuToggle = document.createElement("button")
  mobileMenuToggle.className = "mobile-menu-toggle"
  mobileMenuToggle.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
  mobileMenuToggle.setAttribute("aria-label", "Toggle navigation menu")

  // Insert the toggle button before the nav element
  header.insertBefore(mobileMenuToggle, nav)

  // Clone auth buttons for mobile menu
  if (authButtons) {
    // Add class to original auth buttons for targeting in CSS
    authButtons.classList.add("header-auth-buttons")

    // Clone auth buttons and append to nav for mobile
    const mobileAuthButtons = authButtons.cloneNode(true)
    nav.appendChild(mobileAuthButtons)
  }

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    if (nav.classList.contains("active")) {
      document.body.style.overflow = "hidden"
      mobileMenuToggle.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    } else {
      document.body.style.overflow = ""
      mobileMenuToggle.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    }
  })

  // Close mobile menu when clicking on a nav link or button
  const navLinks = document.querySelectorAll("nav a, nav button")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      document.body.style.overflow = ""
      mobileMenuToggle.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("visible")
      }
    })
  }

  // Initial check
  checkScroll()

  // Check on scroll
  window.addEventListener("scroll", checkScroll)

  // Form validation
  const contactForm = document.querySelector("#contact form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      let isValid = true

      // Name validation
      const nameInput = document.getElementById("last_name")
      const nameError = document.getElementById("nameError")
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name"
        isValid = false
      } else {
        nameError.textContent = ""
      }

      // Email validation
      const emailInput = document.getElementById("email")
      const emailError = document.getElementById("emailError")
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address"
        isValid = false
      } else {
        emailError.textContent = ""
      }

      // Message validation
      const messageInput = document.getElementById("message")
      const messageError = document.getElementById("messageError")
      if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter your message"
        isValid = false
      } else {
        messageError.textContent = ""
      }

      if (!isValid) {
        e.preventDefault()
      }
    })
  }

  // Simulate traffic stats counting animation
  function animateCounter(element, target, duration) {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        clearInterval(timer)
        current = target
      }

      if (element.id === "bounceRate") {
        element.textContent = Math.round(current) + "%"
      } else {
        element.textContent = Math.round(current).toLocaleString()
      }
    }, 16)
  }

  // Intersection Observer for traffic stats
  const trafficSection = document.getElementById("traffic")
  if (trafficSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(document.getElementById("pageViews"), 10000, 2000)
            animateCounter(document.getElementById("uniqueVisitors"), 5000, 2000)
            animateCounter(document.getElementById("bounceRate"), 30, 2000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(trafficSection)
  }

  // Create scroll down indicator if it doesn't exist
  const heroSection = document.getElementById("hero")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (heroSection && !scrollIndicator) {
    const newScrollIndicator = document.createElement("div")
    newScrollIndicator.className = "scroll-indicator"
    newScrollIndicator.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'

    heroSection.appendChild(newScrollIndicator)

    newScrollIndicator.addEventListener("click", () => {
      const servicesSection = document.getElementById("services")
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }
})

document.getElementById("year").textContent = new Date().getFullYear();

