// ===== Header sticky =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30));

// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), (i % 4) * 90); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Lightbox galeria =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', (e) => { e.preventDefault(); lightboxImg.src = item.getAttribute('href'); lightbox.classList.add('open'); });
});
const closeLightbox = () => lightbox.classList.remove('open');
lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== Formulário -> WhatsApp =====
const WHATS_NUMBER = '351913455008'; // número da Andreia (351 + número sem espaços)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const tel = form.tel.value.trim();
  const servico = form.servico.value || 'um tratamento';
  const msg = form.msg.value.trim();
  const texto = `Olá! O meu nome é ${nome}.%0ATenho interesse em: ${servico}.%0AContacto: ${tel}.${msg ? '%0AMensagem: ' + encodeURIComponent(msg) : ''}`;
  window.open(`https://wa.me/${WHATS_NUMBER}?text=${texto}`, '_blank');
  note.textContent = 'A redirecionar para o WhatsApp...';
  form.reset();
});
