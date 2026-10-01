// Native HTML keeps the page useful without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chapters = [...document.querySelectorAll('.chapter')];
  const timelineTools = document.querySelector('.timeline-tools');
  const expandButton = document.querySelector('.expand-timeline');
  if (timelineTools && expandButton && chapters.length) {
    timelineTools.hidden = false;
    const update = () => {
      expandButton.textContent = chapters.every(ch => ch.open) ? 'Collapse all chapters' : 'Expand all chapters';
      document.querySelectorAll('[data-year]').forEach(button => {
        button.setAttribute('aria-expanded', String(document.getElementById(button.getAttribute('aria-controls')).open));
      });
    };
    expandButton.addEventListener('click', () => {
      const open = !chapters.every(ch => ch.open);
      chapters.forEach(ch => { ch.open = open; });
      update();
    });
    chapters.forEach(ch => ch.addEventListener('toggle', update));
    document.querySelectorAll('[data-year]').forEach(button => {
      button.addEventListener('click', () => {
        const chapter = document.getElementById(button.getAttribute('aria-controls'));
        chapter.open = true;
        if (location.hash !== `#${chapter.id}`) history.pushState(null, "", `#${chapter.id}`);
        chapter.querySelector('summary').focus({preventScroll: true});
        chapter.scrollIntoView({behavior: reducedMotion ? 'instant' : 'smooth', block: 'start'});
        update();
      });
    });
    update();
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
        const count = projects.filter(project => !project.hidden).length;
        document.querySelector('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
      });
    });
  }
  // Career chapters remain addressable from shared links and browser history.
  const openLinkedChapter = (focus) => {
    const chapter = chapters.find(item => `#${item.id}` === location.hash);
    if (!chapter) return;
    chapter.open = true;
    if (focus) chapter.querySelector('summary').focus({preventScroll: true});
    chapter.scrollIntoView({behavior: 'instant', block: 'start'});
  };
  openLinkedChapter(false);
  window.addEventListener('hashchange', () => openLinkedChapter(true));
  window.addEventListener('popstate', () => openLinkedChapter(false));

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
