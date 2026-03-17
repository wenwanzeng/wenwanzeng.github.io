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
  // Generic dropdown builder
  // ------------------------------
  const dropdownBuiltMap = {};
  const dropdownTimerMap = {};

  function tryBuildDropdown(navId, sectionId, prefix) {
    if (dropdownBuiltMap[navId]) return true;

    // 1) nav link must exist
    const navLink = document.querySelector(`a[href="#${navId}"]`);
    if (!navLink) return false;

    // 2) headings must exist in rendered markdown
    // Support h3 and h4 as dropdown source headings
    const headings = document.querySelectorAll(`#${sectionId}-md h4, #${sectionId}-md h3`);
    if (!headings.length) return false;

    const host = navLink.closest('li') || navLink.parentElement;
    if (!host) return false;

    // Avoid duplicate dropdown menus
    if (host.querySelector('.dropdown-menu')) {
      dropdownBuiltMap[navId] = true;
      return true;
    }

    host.classList.add('has-dropdown');

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    headings.forEach((h, idx) => {
      const title = (h.textContent || '').trim();
      if (!title) return;

      if (!h.id) {
        const base = slugify(title) || `${prefix}-${idx + 1}`;
        h.id = base.startsWith(prefix) ? base : `${prefix}-${base}`;
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

    // Mobile: click to toggle dropdown
    // Desktop: hover is handled by CSS
    navLink.addEventListener('click', (e) => {
      const isMobile = window.matchMedia('(max-width: 991px)').matches;
      if (isMobile) {
        e.preventDefault();
        host.classList.toggle('open');
      }
    });

    dropdownBuiltMap[navId] = true;
    return true;
  }

  function scheduleDropdown(navId, sectionId, prefix) {
    if (dropdownBuiltMap[navId]) return;
    if (dropdownTimerMap[navId]) return;

    let tries = 0;
    dropdownTimerMap[navId] = setInterval(() => {
      tries += 1;

      if (tryBuildDropdown(navId, sectionId, prefix)) {
        clearInterval(dropdownTimerMap[navId]);
        dropdownTimerMap[navId] = null;
        return;
      }

      // Stop after ~10s
      if (tries >= 50) {
        clearInterval(dropdownTimerMap[navId]);
        dropdownTimerMap[navId] = null;
        console.warn(`[WARN] Dropdown not built for ${navId}: navLink or headings still missing.`);
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

      // Nav is ready -> try to build dropdowns
      scheduleDropdown('projects', 'projects', 'proj');
      scheduleDropdown('practice_projects', 'practice_projects', 'practice');
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

        // Render markdown
        const ok = safeSetHTMLById(name + '-md', html);
        if (!ok) return;

        // Build dropdowns when related sections are ready
        if (name === 'projects') {
          scheduleDropdown('projects', 'projects', 'proj');
        }

        if (name === 'practice_projects') {
          scheduleDropdown('practice_projects', 'practice_projects', 'practice');
        }
      })
      .then(() => {
        safeTypesetMathJax();
      })
      .catch(err => console.log(err));
  });

});