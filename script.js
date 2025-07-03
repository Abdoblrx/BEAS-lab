// Helper to fetch and render data
async function loadSectionData(sectionId, jsonFile, renderFn) {
  try {
    const res = await fetch(`data/${jsonFile}`);
    const data = await res.json();
    document.getElementById(sectionId).innerHTML = renderFn(data);
  } catch (e) {
    document.getElementById(sectionId).innerHTML = `<p>${translations[currentLang].unableLoad}</p>`;
  }
}

const translations = {
  fr: {
    nav: ["Accueil", "Équipe", "Projets", "Publications", "Actualités", "Contact"],
    homeTitle: "Bienvenue au BEAS Lab – IP2B",
    homeDesc: "Biologie et Biotechnologie Végétales Intégratives. Notre laboratoire se concentre sur la recherche de pointe en sciences végétales, biotechnologie et collaboration interdisciplinaire.",
    teamTitle: "Notre Équipe",
    projectsTitle: "Projets de Recherche",
    publicationsTitle: "Publications",
    newsTitle: "Actualités & Événements",
    contactTitle: "Contactez-nous",
    contactEmail: "Email : ",
    contactAddress: "Adresse : Faculté des Sciences, Université de Fès, Maroc",
    contactForm: { name: "Nom :", email: "Email :", message: "Message :", send: "Envoyer" },
    contactAlert: name => `Merci, ${name} ! Votre message a été envoyé.`,
    unableLoad: "Impossible de charger les données.",
    footer: "&copy; 2024 BEAS Lab – IP2B. Tous droits réservés."
  },
  en: {
    nav: ["Home", "Team", "Projects", "Publications", "News", "Contact"],
    homeTitle: "Welcome to BEAS Lab – IP2B",
    homeDesc: "Integrative Plant Biology and Biotechnology. Our lab focuses on cutting-edge research in plant sciences, biotechnology, and interdisciplinary collaboration.",
    teamTitle: "Our Team",
    projectsTitle: "Research Projects",
    publicationsTitle: "Publications",
    newsTitle: "News & Events",
    contactTitle: "Contact Us",
    contactEmail: "Email: ",
    contactAddress: "Address: Faculty of Sciences, University of Fez, Morocco",
    contactForm: { name: "Name:", email: "Email:", message: "Message:", send: "Send" },
    contactAlert: name => `Thank you, ${name}! Your message has been sent.`,
    unableLoad: "Unable to load data.",
    footer: "&copy; 2024 BEAS Lab – IP2B. All rights reserved."
  },
  ar: {
    nav: ["الرئيسية", "الفريق", "المشاريع", "المنشورات", "الأخبار", "اتصل"],
    homeTitle: "مرحبًا بكم في مختبر BEAS – IP2B",
    homeDesc: "علم الأحياء والتكنولوجيا الحيوية النباتية التكاملية. يركز مختبرنا على البحث المتقدم في علوم النبات والتكنولوجيا الحيوية والتعاون متعدد التخصصات.",
    teamTitle: "فريقنا",
    projectsTitle: "مشاريع البحث",
    publicationsTitle: "المنشورات",
    newsTitle: "الأخبار والفعاليات",
    contactTitle: "اتصل بنا",
    contactEmail: "البريد الإلكتروني: ",
    contactAddress: "العنوان: كلية العلوم، جامعة فاس، المغرب",
    contactForm: { name: "الاسم:", email: "البريد الإلكتروني:", message: "الرسالة:", send: "إرسال" },
    contactAlert: name => `شكرًا لك، ${name}! تم إرسال رسالتك.`,
    unableLoad: "تعذر تحميل البيانات.",
    footer: "&copy; 2024 مختبر BEAS – IP2B. جميع الحقوق محفوظة."
  }
};

let currentLang = 'fr';

function updateUI(lang) {
  currentLang = lang;
  // Update nav
  document.querySelectorAll('nav ul li a').forEach((a, i) => {
    a.textContent = translations[lang].nav[i];
  });
  // Update section headings and static content
  document.getElementById('home').innerHTML = renderHome();
  document.getElementById('contact').innerHTML = renderContact();
  // Update footer
  document.querySelector('footer .container p').innerHTML = translations[lang].footer;
  // Set active button
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  // Reload dynamic sections
  loadSectionData('team', 'team.json', renderTeam);
  loadSectionData('projects', 'projects.json', renderProjects);
  loadSectionData('publications', 'publications.json', renderPublications);
  loadSectionData('news', 'news.json', renderNews);
}

// Render functions
function renderHome() {
  return `
    <h2>${translations[currentLang].homeTitle}</h2>
    <p>${translations[currentLang].homeDesc}</p>
    <img src="assets/lab-hero.jpg" alt="Lab" style="width:100%;max-width:600px;border-radius:8px;margin-top:20px;" />
  `;
}

function renderTeam(members) {
  return `
    <h2>${translations[currentLang].teamTitle}</h2>
    <div class="card-list">
      ${members.map(m => `
        <div class="card">
          <img src="assets/${m.photo}" alt="${m.name}">
          <h3>${m.name}</h3>
          <p>${m.role}</p>
          <p style="font-size:0.95em;color:#555;">${m.bio}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjects(projects) {
  return `
    <h2>${translations[currentLang].projectsTitle}</h2>
    <div class="card-list">
      ${projects.map(p => `
        <div class="card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <p style="font-size:0.95em;color:#555;">${currentLang === 'ar' ? 'الحالة' : (currentLang === 'fr' ? 'Statut' : 'Status')}: ${p.status}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPublications(pubs) {
  return `
    <h2>${translations[currentLang].publicationsTitle}</h2>
    <ul>
      ${pubs.map(pub => `
        <li><strong>${pub.title}</strong> (${pub.year})<br>
        <span>${pub.authors}</span><br>
        <em>${pub.journal}</em>
        ${pub.link ? `<a href="${pub.link}" target="_blank">[PDF]</a>` : ''}
        </li>
      `).join('')}
    </ul>
  `;
}

function renderNews(news) {
  return `
    <h2>${translations[currentLang].newsTitle}</h2>
    <ul>
      ${news.map(n => `
        <li><strong>${n.title}</strong> (${n.date})<br>${n.content}</li>
      `).join('')}
    </ul>
  `;
}

function renderContact() {
  const t = translations[currentLang];
  return `
    <h2>${t.contactTitle}</h2>
    <p>${t.contactEmail}<a href="mailto:beaslab@university.edu">beaslab@university.edu</a></p>
    <p>${t.contactAddress}</p>
    <form id="contactForm">
      <label for="name">${t.contactForm.name}</label>
      <input type="text" id="name" name="name" required>
      <label for="email">${t.contactForm.email}</label>
      <input type="email" id="email" name="email" required>
      <label for="message">${t.contactForm.message}</label>
      <textarea id="message" name="message" required></textarea>
      <button type="submit">${t.contactForm.send}</button>
    </form>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  updateUI(currentLang);
  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  // Language switcher
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', function() {
      updateUI(this.getAttribute('data-lang'));
    });
  });
  // Contact form handler
  document.addEventListener('submit', function(e) {
    if (e.target && e.target.id === 'contactForm') {
      e.preventDefault();
      const name = document.getElementById('name').value;
      alert(translations[currentLang].contactAlert(name));
      e.target.reset();
    }
  });
}); 