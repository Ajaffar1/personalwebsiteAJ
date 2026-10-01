// Native HTML keeps the page useful without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const careerItems = [...document.querySelectorAll('.career-item')];
  const careerRail = document.querySelector('.career-list');
  if (careerRail && careerItems.length) {
    const controls = document.querySelector('.glass-controls');
    const previous = document.querySelector('.career-previous');
    const next = document.querySelector('.career-next');
    let selected = careerItems.find(item => `#${item.id}` === location.hash) || careerItems.find(item => item.open) || careerItems[0];
    const updateControls = () => {
      const index = careerItems.indexOf(selected);
      previous.disabled = index === 0;
      next.disabled = index === careerItems.length - 1;
    };
    const centerCard = item => {
      careerRail.scrollTo({left: item.offsetLeft - (careerRail.clientWidth - item.offsetWidth) / 2, behavior: reducedMotion ? 'instant' : 'smooth'});
    };
    const select = (item, {focus = false, center = true} = {}) => {
      selected = item;
      careerItems.forEach(other => { other.open = other === item; });
      updateControls();
      if (focus) item.querySelector('summary').focus({preventScroll: true});
      if (center) centerCard(item);
    };
    controls.hidden = false;
    previous.addEventListener('click', () => select(careerItems[Math.max(0, careerItems.indexOf(selected) - 1)]));
    next.addEventListener('click', () => select(careerItems[Math.min(careerItems.length - 1, careerItems.indexOf(selected) + 1)]));
    careerItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        selected = item;
        careerItems.forEach(other => { if (other !== item) other.open = false; });
        updateControls();
        centerCard(item);
        if (!reducedMotion && item.querySelector('.career-description').animate) {
          item.querySelector('.career-description').animate([{opacity: .3, transform: 'translateY(6px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 220, easing: 'ease-out'});
        }
      });
      item.querySelector('summary').addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const index = careerItems.indexOf(item);
        const target = event.key === 'Home' ? 0 : event.key === 'End' ? careerItems.length - 1 : Math.max(0, Math.min(careerItems.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1)));
        select(careerItems[target], {focus: true});
      });
    });
    const openCareerLink = () => {
      const item = careerItems.find(role => `#${role.id}` === location.hash);
      if (!item) return;
      select(item, {focus: true});
      document.querySelector('.glass-timeline').scrollIntoView({behavior: 'instant', block: 'start'});
    };
    window.addEventListener('hashchange', openCareerLink);
    window.addEventListener('popstate', openCareerLink);
    select(selected, {center: true});
    if (location.hash.startsWith('#career-')) requestAnimationFrame(openCareerLink);
  }
  const projectTools = document.querySelector('.project-tools');
  const projects = [...document.querySelectorAll('.project')];
  if (projectTools && projects.length) {
    projectTools.hidden = false;
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        projects.forEach(project => { project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category); });
        if (!reducedMotion) projects.filter(project => !project.hidden).forEach((project, index) => {
          if (project.animate) project.animate([{opacity: .35, transform: 'translateY(5px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 180, delay: index * 25, easing: 'ease-out', fill: 'backwards'});
        });
        const count = projects.filter(project => !project.hidden).length;
        document.querySelector('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
      });
    });
  }
  const portrait = document.querySelector('.portrait');
  if (portrait && !reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let framePending = false;
    let frameX = 0;
    let frameY = 0;
    portrait.addEventListener('pointermove', event => {
      const rect = portrait.getBoundingClientRect();
      frameX = ((event.clientX - rect.left) / rect.width - .5) * 8;
      frameY = ((event.clientY - rect.top) / rect.height - .5) * 8;
      if (!framePending) {
        framePending = true;
        requestAnimationFrame(() => {
          portrait.style.setProperty('--frame-x', `${frameX}px`);
          portrait.style.setProperty('--frame-y', `${frameY}px`);
          framePending = false;
        });
      }
    });
    portrait.addEventListener('pointerleave', () => {
      frameX = frameY = 0;
      portrait.style.setProperty('--frame-x', '0px');
      portrait.style.setProperty('--frame-y', '0px');
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
