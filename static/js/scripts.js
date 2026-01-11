const content_dir = 'contents/';
const config_file = 'config.yml';
const section_names = ['home', 'publications', 'projects', 'practice_projects', 'awards'];

window.addEventListener('DOMContentLoaded', () => {

  // ------------------------------
  // Helpers
  // ------------------------------
  function safeSetHTMLById(id, html) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[WARN] element not found: #${id}`);
      return false;
    }
    el.innerHTML = html;
    return true;
  }

  function slugify(s) {
    return (s || '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // ------------------------------
  // Projects dropdown (retry until ready)
  // ------------------------------
  let dropdownBuilt = false;
  let dropdownTimer = null;

  function tryBuildProjectsDropdown() {
    if (dropdownBuilt) return true;

    // 1) nav link must exist (nav is inserted after config.yml is loaded)
    const navLink = document.querySelector('a[href="#projects"]');
    if (!navLink) return false;

    // 2) headings must exist (projects.md must be rendered into #projects-md)
    // your project titles are #### => h4; also support h3
    const headings = document.querySelectorAll('#projects-md h4, #projects-md h3');
    if (!headings.length) return false;

    const host = navLink.closest('li') || navLink.parentElement;
    if (!host) return false;

    // avoid duplicates
    if (host.querySelector('.dropdown-menu')) {
      dropdownBuilt = true;
      return true;
    }

    host.classList.add('has-dropdown');

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    headings.forEach((h, idx) => {
      const title = (h.textContent || '').trim();
      if (!title) return;

      if (!h.id) {
        const base = slugify(title) || `proj-${idx + 1}`;
        h.id = base.startsWith('proj-') ? base : `proj-${base}`;
      }

      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.textContent = title;

      const li = document.createElement('li');
      li.appendChild(a);
      menu.appendChild(li);
    });

    if (!menu.children.length) return false;

    host.appendChild(menu);

    // mobile: click to toggle (desktop uses hover via CSS)
    navLink.addEventListener('click', (e) => {
      const isMobile = window.matchMedia('(max-width: 991px)').matches;
      if (isMobile) {
        e.preventDefault();
        host.classList.toggle('open');
      }
    });

    dropdownBuilt = true;
    return true;
  }

  function scheduleProjectsDropdown() {
    if (dropdownBuilt) return;
    if (dropdownTimer) return;

    let tries = 0;
    dropdownTimer = setInterval(() => {
      tries += 1;

      if (tryBuildProjectsDropdown()) {
        clearInterval(dropdownTimer);
        dropdownTimer = null;
        return;
      }

      // stop after ~10s (50 * 200ms) to avoid infinite polling
      if (tries >= 50) {
        clearInterval(dropdownTimer);
        dropdownTimer = null;
        console.warn('[WARN] Projects dropdown not built: navLink or headings still missing.');
      }
    }, 200);
  }

  function safeTypesetMathJax() {
    try {
      if (window.MathJax && typeof MathJax.typeset === 'function') {
        MathJax.typeset();
      }
    } catch (e) {
      console.warn('[WARN] MathJax typeset failed:', e);
    }
  }

  // ------------------------------
  // Bootstrap scrollspy
  // ------------------------------
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav && window.bootstrap?.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // ------------------------------
  // Load config.yml: build nav + replace labels
  // ------------------------------
  fetch(content_dir + config_file)
    .then(r => r.text())
    .then(text => {
      const yml = window.jsyaml?.load ? jsyaml.load(text) : {};

      const navLinks = [
        { id: 'home', configKey: 'nav-home', default: 'HOME' },
        { id: 'projects', configKey: 'nav-projects', default: 'PROJECTS' },
        { id: 'publications', configKey: 'nav-publications', default: 'PUBLICATIONS' },
        { id: 'awards', configKey: 'nav-awards', default: 'AWARDS' },
        { id: 'practice_projects', configKey: 'nav-practice_projects', default: 'PRACTICE PROJECTS' },
      ];

      const navContainer = document.getElementById('navbar-items');
      if (navContainer) {
        navLinks.forEach(link => {
          const li = document.createElement('li');
          li.className = 'nav-item';
          const label = (yml && yml[link.configKey]) ? yml[link.configKey] : link.default;
          li.innerHTML = `<a class="nav-link me-lg-3" href="#${link.id}">${label}</a>`;
          navContainer.appendChild(li);
        });
      } else {
        console.warn('[WARN] #navbar-items not found');
      }

      // Replace labels by id (guarded)
      if (yml && typeof yml === 'object') {
        Object.keys(yml).forEach(key => {
          const el = document.getElementById(key);
          if (el) el.innerHTML = yml[key];
        });
      }

      // nav is ready now -> try to build dropdown
      scheduleProjectsDropdown();
    })
    .catch(err => console.log(err));

  // ------------------------------
  // Load markdown sections and render
  // ------------------------------
  if (window.marked?.use) {
    marked.use({ mangle: false, headerIds: false });
  }

  section_names.forEach((name) => {
    fetch(content_dir + name + '.md')
      .then(r => r.text())
      .then(markdown => {
        const html = window.marked?.parse ? marked.parse(markdown) : markdown;

        // render markdown
        const ok = safeSetHTMLById(name + '-md', html);
        if (!ok) return;

        // projects content ready -> try to build dropdown
        if (name === 'projects') scheduleProjectsDropdown();
      })
      .then(() => {
        safeTypesetMathJax();
      })
      .catch(err => console.log(err));
  });

});
