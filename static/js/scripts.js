const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications','projects','practice_projects', 'awards']

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
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
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);

            // ✅ 插入导航项
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
                    const label = yml[link.configKey] || link.default;
                    li.innerHTML = `<a class="nav-link me-lg-3" href="#${link.id}">${label}</a>`;
                    navContainer.appendChild(li);
                });
            }

            // ✅ 替换页面上对应的内容
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }
            })
        })
        .catch(error => console.log(error));

    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    });

});
(function () {
  function slugify(s) {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function buildProjectsDropdown() {
    // 找到导航栏里指向 #projects 的那个链接
    const navLink = document.querySelector('a[href="#projects"]');
    if (!navLink) return;

    const li = navLink.closest("li") || navLink.parentElement;
    if (!li) return;

    // 防止重复创建
    if (li.querySelector(".dropdown-menu")) return;

    // 从 projects-md 里抓项目标题（h3）
    const headings = document.querySelectorAll("#projects-md h4, #projects-md h3");
    if (!headings.length) return;

    li.classList.add("has-dropdown");

    const menu = document.createElement("ul");
    menu.className = "dropdown-menu";

    headings.forEach((h, idx) => {
      const title = (h.textContent || "").trim();
      if (!title) return;

      // 给每个标题一个 id，用于锚点跳转
      if (!h.id) {
        const base = slugify(title) || `proj-${idx + 1}`;
        h.id = base.startsWith("proj-") ? base : `proj-${base}`;
      }

      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = title;

      const item = document.createElement("li");
      item.appendChild(a);
      menu.appendChild(item);
    });

    if (!menu.children.length) return;
    li.appendChild(menu);

    // 移动端：点击 PROJECTS 时切换展开（不直接跳到 #projects）
    navLink.addEventListener("click", (e) => {
      const isMobile = window.matchMedia("(max-width: 991px)").matches;
      if (isMobile) {
        e.preventDefault();
        li.classList.toggle("open");
      }
    });
  }

  // 关键：你的 projects 内容是后加载的，所以用 MutationObserver 等它加载完成
  const target = document.getElementById("projects-md");
  if (!target) return;

  const obs = new MutationObserver(() => {
    if (target.childNodes.length) {
      buildProjectsDropdown();
      obs.disconnect();
    }
  });

  obs.observe(target, { childList: true, subtree: false });
})();

