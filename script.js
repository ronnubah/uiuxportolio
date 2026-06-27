const projects = [
  {
    title: "Podly",
    summary:
      "A podcast app prototype that tailors its suggestions and recommendations to your preferences.",
    tags: ["Figma", "FigJam"],
    accent: "#2b1d1a",
    monogram: "P",
    image: "assets/images/podly.png",
    link: "https://www.figma.com/design/5urj0Zn0OshkcnxefVQzrv/Team-Ramsey-Designs?node-id=1-3&t=6AbRysWwhbsekrVX-1",
    processLink: "podly-process.html",
  },
  {
    title: "USCIS Redesign",
    summary: "A redesign of the United States Citizenship and Immigration Services website.",
    tags: ["Figma", "FigJam"],
    accent: "#183454",
    monogram: "US",
    image: "assets/images/uscis-card-cover.png",
    link: "https://www.figma.com/design/zAbAaQ7oVY7mE3z3dEwhAX/USCIS-Portal---Prototyping?node-id=17-1000&t=nosgoo9JMAwnY35l-1",
    processLink: "uscis-process.html",
  },
  {
    title: "Phase App",
    summary:
      "A period tracking app prototype that pairs exercise with phases of the menstrual cycle.",
    tags: ["Figma", "FigJam"],
    accent: "#167d8f",
    monogram: "PH",
    image: "assets/images/phase.png",
    link: "https://www.figma.com/design/zyTcm3DY9pk2UqGmXU99bS/Phase?node-id=0-1&t=VjGkB3YOY57jQsPX-1",
    processLink: "phase-process.html",
  },
  {
    title: "Spectate",
    summary: "A short animation for a made up company.",
    tags: ["Adobe After Effects", "Adobe Illustrator"],
    accent: "#2d2d2d",
    monogram: "SP",
    image: "assets/images/spectate.png",
    link: "spectate-animation.html",
    actionLabel: "View Animation",
    homePreview: false,
  },
  {
    title: "Quick Cuisine",
    summary: "A food delivery app prototype.",
    tags: ["Figma"],
    accent: "#2563EB",
    monogram: "QC",
    image: "assets/images/quick-cuisine.png",
    link: "https://www.figma.com/design/j1cZf0Y5yx7t0ZsPo18wfy/Final-Project?node-id=103-2061&t=RPEJnoMU15lceaqi-1",
    processLink: "quick-cuisine-process.html",
    homePreview: false,
  },
  {
    title: "Swimplicity",
    summary:
      "A CRM landing page and rebrand for the company, Swimplicity, to clearly present its platform and services.",
    tags: ["Figma"],
    accent: "#2563EB",
    monogram: "SW",
    image: "assets/images/swimplicity-card.jpg",
    link: "https://www.figma.com/design/gSyg68jHuIv3RP213vJKj7/Ramsey_Codexo?node-id=1-2&t=9G0Z39Yx0EvOHolZ-1",
    processLink: "swimplicity-process.html",
    homePreview: false,
  },
];

const projectGrid = document.querySelector("#project-grid");

if (projectGrid) {
  const isHomePage = window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html");
  const visibleProjects = isHomePage
    ? projects.filter((project) => project.homePreview !== false)
    : projects;

  visibleProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const cover = project.image
      ? `<img class="project-image ${project.title.includes("USCIS") ? "project-image-contain" : ""}" src="${project.image}" alt="${project.title} project cover" />`
      : `<span class="project-monogram">${project.monogram}</span>`;

    card.innerHTML = `
      <div class="project-cover ${project.image ? "has-image" : ""}" style="background: ${project.accent}">
        ${cover}
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <div class="tag-list">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        ${
          project.link || project.processLink
            ? `<div class="project-actions">
                ${
                  project.link
                    ? `<a class="project-link" href="${project.link}">${project.actionLabel || "View Prototype"}</a>`
                    : ""
                }
                ${
                  project.processLink
                    ? `<a class="project-link project-link-secondary" href="${project.processLink}">View Process Page</a>`
                    : ""
                }
              </div>`
            : ""
        }
      </div>
    `;
    projectGrid.appendChild(card);
  });
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = siteNav ? Array.from(siteNav.querySelectorAll("a")) : [];
const activeNavLink = navLinks.find((link) => link.getAttribute("aria-current") === "page");

if (siteNav && activeNavLink) {
  const navIndicator = document.createElement("span");
  navIndicator.className = "nav-indicator";
  navIndicator.setAttribute("aria-hidden", "true");
  siteNav.appendChild(navIndicator);

  const moveNavIndicator = (link) => {
    if (window.innerWidth <= 720) {
      return;
    }

    const navBounds = siteNav.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();

    navIndicator.style.width = `${linkBounds.width}px`;
    navIndicator.style.transform = `translateX(${linkBounds.left - navBounds.left}px)`;
    navIndicator.style.opacity = "1";
  };

  const resetNavIndicator = () => moveNavIndicator(activeNavLink);

  requestAnimationFrame(() => {
    resetNavIndicator();
    requestAnimationFrame(() => siteNav.classList.add("indicator-ready"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("pointerenter", () => moveNavIndicator(link));
    link.addEventListener("focus", () => moveNavIndicator(link));
  });

  siteNav.addEventListener("pointerleave", resetNavIndicator);
  siteNav.addEventListener("focusout", (event) => {
    if (!siteNav.contains(event.relatedTarget)) {
      resetNavIndicator();
    }
  });

  window.addEventListener("resize", resetNavIndicator);
}

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const message = formData.get("message");
    const fullName = `${firstName} ${lastName}`.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:ronnubah@gmail.com?subject=${subject}&body=${body}`;
  });
}
