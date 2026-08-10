/* ==========================================================
   BLESS AMERICA — MAIN JS
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initCopyAddress();
});

/* ----------------------------------------------------------
   Mobile nav toggle
   ---------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    mobile.classList.toggle('active');
  });

  mobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobile.classList.remove('active'));
  });
}

/* ----------------------------------------------------------
   Scroll reveal — fade/rise elements into view
   ---------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
}

/* ----------------------------------------------------------
   Copy contract address to clipboard (works for any button
   with the .hero-ca-copy class, paired with the address text
   in its sibling .hero-ca-value element)
   ---------------------------------------------------------- */
function initCopyAddress() {
  document.querySelectorAll('.hero-ca-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.hero-ca-row');
      const value = row ? row.querySelector('.hero-ca-value') : null;
      if (!value) return;

      navigator.clipboard.writeText(value.textContent.trim()).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1800);
      }).catch(() => {
        console.warn('Clipboard copy failed.');
      });
    });
  });
}
