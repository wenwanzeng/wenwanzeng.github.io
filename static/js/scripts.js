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
      // 允许中文、字母数字、下划线、空格、连字符
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function buildProjectsDropdown() {
    // 导航里指向 #projects 的链接（你的导航就是用这个 href 生成的）
    const navLink = document.querySelector('a[href="#projects"]');
    if (!navLink) {
      console.warn('[WARN] nav link a[href="#projects"] not found');
      return;
    }

    const host = navLink.closest('li') || navLink.parentElement;
    if (!host) return;

    // 防止重复创建
    if (host.querySelector('.dropdown-menu')) return;

    // 你的 projects.md 用 #### => h4（也兼容 h3）
    const headings = document.querySelectorAll('#projects-md h4, #projects-md h3');
    if (!headings.length) {
      console.warn('[WARN] no headings found under #projects-md (h4/h3)');
      return;
    }

    host.classList.add('has-dropdown');

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    headings.forEach((h, idx) => {
      const title = (h.textContent || '').trim();
      if (!title) return;

      // 给标题补 id，方便锚点跳转
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

    if (!menu.children.length) return;

    host.appendChild(menu);

    // 移动端：点 PROJECTS 展开/收起下拉（不直接跳到 #projects）
    navLink.addEventListener('click', (e) => {
      const isMobile = window.matchMedia('(max-width: 991px)').matches;
      if (isMobile) {
        e.preventDefault();
        host.classList.toggle('open');
      }
    });
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
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener('click', () => {
      if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // ------------------------------
  // Load config.yml and build nav + replace labels
  // ------------------------------
  fetch(content_dir + config_file)
    .then((response) => response.text())
    .then((text) => {
      const yml = window.jsyaml?.load ? jsyaml.load(text) : {};

      // 插入导航项
      const navLinks = [
        { id: 'home', configKey: 'nav-home', default: 'HOME' },
        { id: 'projects', configKey: 'nav-projects', default: 'PROJECTS' },
        { id: 'publications', configKey: 'nav-publications', default: 'PUBLICATIONS' },
        { id: 'awards', configKey: 'nav-awards', default: 'AWARDS' },
        { id: 'practice_projects', configKey: 'nav-practice_projects', default: 'PRACTICE PROJECTS' },
      ];

      const navContainer = document.getElementById('navbar-items');
      if (navContainer) {
        navLinks.forEach((link) => {
          const li = document.createElement('li');
          li.className = 'nav-item';

          const label = (yml && yml[link.configKey]) ? yml[link.configKey] : link.default;

          li.innerHTML = `<a class="nav-link me-lg-3" href="#${link.id}">${label}</a>`;
          navContainer.appendChild(li);
        });
      } else {
        console.warn('[WARN] #navbar-items not found, nav links not inserted');
      }

      // 替换页面上对应的内容（key 对应某些 id 的文本）
      if (yml && typeof yml === 'object') {
        Object.keys(yml).forEach((key) => {
          const el = document.getElementById(key);
          if (el) {
            el.innerHTML = yml[key];
          } else {
            // 不是每个 key 都一定有对应 id，保留日志即可
            // console.log("Unknown id and value: " + key + "," + String(yml[key]));
          }
        });
      }
    })
    .catch((error) => console.log(error));

  // ------------------------------
  // Load markdown sections and render
  // ------------------------------
  if (window.marked?.use) {
    marked.use({ mangle: false, headerIds: false });
  } else {
    console.warn('[WARN] marked not found');
  }

  section_names.forEach((name) => {
    fetch(content_dir + name + '.md')
      .then((response) => response.text())
      .then((markdown) => {
        const html = window.marked?.parse ? marked.parse(markdown) : markdown;

        // 写入对应容器
        const ok = safeSetHTMLById(name + '-md', html);
        if (!ok) return;

        // ✅ projects 内容渲染完成后立刻生成下拉（无需 observer）
        if (name === 'projects') {
          buildProjectsDropdown();
        }
      })
      .then(() => {
        safeTypesetMathJax();
      })
      .catch((error) => console.log(error));
  });

});
