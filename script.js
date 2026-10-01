// Native HTML keeps the page useful without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const careerItems = [...document.querySelectorAll('.career-item')];
  careerItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      careerItems.forEach(other => { if (other !== item) other.open = false; });
      if (!reducedMotion && item.querySelector('.career-description').animate) {
        item.querySelector('.career-description').animate([{opacity: .4, transform: 'translateY(-4px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 180});
      }
    });
  });
  const openCareerLink = (focus = false) => {
    const item = careerItems.find(role => `#${role.id}` === location.hash);
    if (!item) return;
    careerItems.forEach(other => { other.open = other === item; });
    if (focus) item.querySelector('summary').focus({preventScroll: true});
    item.scrollIntoView({behavior: 'instant', block: 'start'});
  };
  openCareerLink();
  window.addEventListener('hashchange', () => openCareerLink(true));
  window.addEventListener('popstate', () => openCareerLink(true));
  const projectTools = document.querySelector('.project-tools');
  const projects = [...document.querySelectorAll('.project')];
  if (projectTools && projects.length) {
    projectTools.hidden = false;
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        projects.forEach(project => { project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category); });
        const count = projects.filter(project => !project.hidden).length;
        document.querySelector('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
      });
    });
  }
  const progress = document.querySelector('.reading-progress span');
  if (progress) {
    let scheduled = false;
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0})`;
      scheduled = false;
    };
    const queueProgress = () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
    };
    window.addEventListener('scroll', queueProgress, {passive: true});
    window.addEventListener('resize', queueProgress);
    document.addEventListener('toggle', queueProgress, true);
    window.addEventListener('load', queueProgress);
    updateProgress();
  }
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.area').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      });
    });
  }
  if (!('IntersectionObserver' in window)) return;
  if (!reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) navObserver.observe(section);
  });
})();
