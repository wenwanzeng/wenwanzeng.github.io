

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
    };

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
            const navLinks = [
            { id: 'home', configKey: 'nav-home', default: 'HOME' },
            { id: 'projects', configKey: 'nav-projects', default: 'PROJECTS' },
            { id: 'publications', configKey: 'nav-publications', default: 'PUBLICATIONS' },
            { id: 'awards', configKey: 'nav-awards', default: 'AWARDS' },
            { id: 'practice_projects', configKey: 'nav-practice_projects', default: 'PRACTICE PROJECTS' },
        ];

        const navContainer = document.getElementById('navbar-items');  // 这个在HTML里对应 <ul id="navbar-items">
        if (navContainer) {
            navLinks.forEach(link => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                const label = yml[link.configKey] || link.default;
                li.innerHTML = `<a class="nav-link me-lg-3" href="#${link.id}">${label}</a>`;
                navContainer.appendChild(li);
            }



            
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
    })

}); 
