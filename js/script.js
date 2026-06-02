// ===============================
// GLOBAL SCRIPT (ALL PAGES)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // SCROLL TO TOP BUTTON
  // ===============================
  const scrollBtn = document.getElementById("scrollTop");
  
  if (scrollBtn) {
  window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
  scrollBtn.classList.add("visible");
  } else {
  scrollBtn.classList.remove("visible");
  }
  });
  
  
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  
  }
  
  // ===============================
  // SKILL BAR ANIMATION
  // ===============================
  const skillBars = document.querySelectorAll(".skill-fill");
  
  const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
  entry.target.classList.add("on");
  }
  });
  }, { threshold: 0.4 });
  
  skillBars.forEach(bar => {
  skillObserver.observe(bar);
  });
  
  // ===============================
  // STATS COUNTER ANIMATION
  // ===============================
  const counters = document.querySelectorAll(".stat-num");
  
  const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
  animateCounter(entry.target);
  counterObserver.unobserve(entry.target);
  }
  });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
  counterObserver.observe(counter);
  });
  
  function animateCounter(el) {
  const target = +el.getAttribute("data-target") || +el.innerText;
  let count = 0;
  const increment = target / 60;
  
  
  const update = () => {
    count += increment;
    if (count < target) {
      el.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      el.innerText = target;
    }
  };
  
  update();
  
  
  }
  
  });
  
  // ===============================
  // PROJECT FILTER
  // ===============================
  function filterProj(cat, btn) {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  document.querySelectorAll('.proj-card').forEach(card => {
  if (cat === '*' || card.dataset.cat === cat) {
  card.classList.remove('hidden');
  } else {
  card.classList.add('hidden');
  }
  });
  }
  
  // ===============================
  // MODAL (PROJECT DETAILS)
  // ===============================
  function openModal(title, cat, desc, category, client, year, status) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  
  modal.classList.add('open');
  
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalCat').innerText = cat;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalCategory').innerText = category;
  document.getElementById('modalClient').innerText = client;
  document.getElementById('modalYear').innerText = year;
  document.getElementById('modalStatus').innerText = status;
  }
  
  function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('open');
  }
  
 // ===============================
// CONTACT FORM LOGIC
// ===============================
async function submitForm() {
  const name    = document.getElementById('cName')?.value.trim();
  const email   = document.getElementById('cEmail')?.value.trim();
  const subject = document.getElementById('cSubject')?.value.trim();
  const message = document.getElementById('cMessage')?.value.trim();

  const errorEl     = document.getElementById('formError');
  const sendErrorEl = document.getElementById('formSendError');
  if (errorEl) errorEl.style.display = 'none';
  if (sendErrorEl) sendErrorEl.style.display = 'none';

  // Validation
  if (!name || !email || !subject || !message) {
    if (errorEl) errorEl.style.display = 'block';
    return;
  }

  const btn = document.getElementById('submitBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…'; }

  try {
    //https://formspree.io/f/mykvrroq
    const FORMSPREE_ID = 'mykvrroq';

    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, _subject: subject, message })
    });

    if (res.ok) {
      document.getElementById('formArea').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    if (sendErrorEl) sendErrorEl.style.display = 'block';
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message'; }
  }
}

/**
 * Resets form to allow sending a new message
 */
function resetForm() {
  ['cName', 'cEmail', 'cSubject', 'cMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const formArea = document.getElementById('formArea');
  const formSuccess = document.getElementById('formSuccess');
  if (formArea) formArea.style.display = 'block';
  if (formSuccess) formSuccess.style.display = 'none';
}
  
  // ===============================
  // CLOSE MODAL ON OUTSIDE CLICK
  // ===============================
  window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
  modal.classList.remove("open");
  }
  });
  
