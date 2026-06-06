/* ---------- Smooth scroll for nav links (header & sidebar) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // close sidebar if open (mobile)
    closeSidebar();
  });
});


/* ---------- Typing animation (hero) ---------- */
const typingElem = document.querySelector('.typing-text');
const roles = [
  "Data Analyst",
  "Power BI Developer",
  "SQL Enthusiast",
  "Bussiness Analyst",
  "Tableau Developer"
];
let rIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const role = roles[rIdx];

  if (!deleting) {
    cIdx++;
    typingElem.textContent = role.slice(0, cIdx);
  } else {
    cIdx--;
    typingElem.textContent = role.slice(0, cIdx);
  }

  if (!deleting && cIdx === role.length + 1) {
    deleting = true;
    setTimeout(typeLoop, 800);
  } else if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
    setTimeout(typeLoop, 400);
  } else {
    setTimeout(typeLoop, deleting ? 60 : 110);
  }
}

typeLoop();

/* ---------- Reveal on scroll ---------- */
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100)
      el.classList.add('active');
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ---------- Sidebar open/close ---------- */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  sidebar.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  sidebar.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
}

openBtn && openBtn.addEventListener('click', openSidebar);
closeBtn && closeBtn.addEventListener('click', closeSidebar);
overlay && overlay.addEventListener('click', closeSidebar);

/* ---------- Close sidebar when any sidebar link is clicked ---------- */
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', () => closeSidebar());
});

/* ---------- Keyboard accessibility: close sidebar with ESC ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

/* ---------- Topbar transparency on scroll ---------- */
window.addEventListener('scroll', () => {
  const topbar = document.querySelector('.topbar');
  if (window.scrollY > 20) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});
