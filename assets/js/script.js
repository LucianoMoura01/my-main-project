
(function(){
    // calcula idade a partir do input #dataNascimento e preenche #idade
    function calcularIdade(){
        const input = document.getElementById('dataNascimento');
        const idadeInput = document.getElementById('idade');
        if(!input || !idadeInput) return undefined;
        const val = input.value;
        if(!val) { idadeInput.value = ''; return undefined; }
        const today = new Date();
        const dob = new Date(val);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        idadeInput.value = age;
        return age;
    }

    window.calcularIdade = calcularIdade;

    document.addEventListener('DOMContentLoaded', function(){
        // menu
        const menuToggle = document.querySelector('.menu-toggle');
        if(menuToggle){
            menuToggle.addEventListener('click', function(){
                const menu = document.getElementById('main-menu');
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', String(!expanded));
                if(menu) menu.classList.toggle('open');
            });
        }

        //scroll links
        document.querySelectorAll('a[href^="#"]').forEach(a=>{
            a.addEventListener('click', function(e){
                const href = this.getAttribute('href');
                if(!href || href === '#') return;
                const targetId = href.slice(1);
                const target = document.getElementById(targetId);
                if(target){
                    e.preventDefault();
                    window.scrollTo({top: target.offsetTop - 70, behavior: 'smooth'});
                    // close menu on mobile
                    const menu = document.getElementById('main-menu');
                    if(menu && menu.classList.contains('open')){ menu.classList.remove('open'); const t=document.querySelector('.menu-toggle'); if(t) t.setAttribute('aria-expanded','false'); }
                }
            });
        });

        const anoEl = document.getElementById('ano');
        if(anoEl) anoEl.textContent = new Date().getFullYear();
    });
})();
