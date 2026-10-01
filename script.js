// Native HTML keeps the page useful without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chapters = [...document.querySelectorAll('.chapter')];
  const timelineTools = document.querySelector('.timeline-tools');
  const expandButton = document.querySelector('.expand-timeline');
  if (timelineTools && expandButton && chapters.length) {
    const timeline = document.querySelector('.timeline');
    const earlier = document.querySelector('.earlier-role');
    const later = document.querySelector('.later-role');
    const yearButtons = [...document.querySelectorAll('[data-year]')];
    let mode = 'focus';
    let selected = chapters.find(ch => `#${ch.id}` === location.hash) || chapters.find(ch => ch.open) || chapters[0];
    const update = () => {
      const index = chapters.indexOf(selected);
      timeline.dataset.mode = mode;
      expandButton.textContent = mode === 'all' ? 'Focus on one role' : 'View all roles';
      earlier.disabled = index === chapters.length - 1;
      later.disabled = index === 0;
      chapters.forEach(ch => ch.classList.toggle('selected-role', ch === selected));
      yearButtons.forEach(button => {
        const chapter = document.getElementById(button.getAttribute('aria-controls'));
        button.setAttribute('aria-pressed', String(chapter === selected));
        button.setAttribute('aria-expanded', String(chapter.open));
      });
      const title = selected.querySelector('.chapter-title');
      const role = title.firstChild.textContent.trim();
      document.querySelector('.role-status').textContent = `${role} · ${title.querySelector('small').textContent}`;
    };
    const selectRole = (chapter, {navigate = false, focus = false, scroll = false} = {}) => {
      selected = chapter;
      mode = 'focus';
      chapters.forEach(ch => { ch.open = ch === chapter; });
      if (navigate && location.hash !== `#${chapter.id}`) history.pushState(null, '', `#${chapter.id}`);
      update();
      if (!reducedMotion && chapter.querySelector('.chapter-body').animate) {
        chapter.querySelector('.chapter-body').animate([{opacity: .35, transform: 'translateY(8px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 240, easing: 'ease-out'});
      }
      if (focus) chapter.querySelector('summary').focus({preventScroll: true});
      if (scroll) timelineTools.scrollIntoView({behavior: reducedMotion ? 'instant' : 'smooth', block: 'start'});
    };
    timelineTools.hidden = false;
    yearButtons.forEach(button => {
      button.addEventListener('click', () => selectRole(document.getElementById(button.getAttribute('aria-controls')), {navigate: true}));
    });
    earlier.addEventListener('click', () => selectRole(chapters[Math.min(chapters.length - 1, chapters.indexOf(selected) + 1)], {navigate: true}));
    later.addEventListener('click', () => selectRole(chapters[Math.max(0, chapters.indexOf(selected) - 1)], {navigate: true}));
    expandButton.addEventListener('click', () => {
      mode = mode === 'focus' ? 'all' : 'focus';
      chapters.forEach(ch => { ch.open = mode === 'all' || ch === selected; });
      update();
    });
    chapters.forEach(ch => {
      ch.querySelector('summary').addEventListener('click', () => { selected = ch; });
      ch.addEventListener('toggle', update);
    });
    const openLinkedChapter = () => {
      const chapter = chapters.find(ch => `#${ch.id}` === location.hash);
      if (chapter) selectRole(chapter, {focus: true, scroll: true});
    };
    window.addEventListener('hashchange', openLinkedChapter);
    window.addEventListener('popstate', openLinkedChapter);
    selectRole(selected);
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
