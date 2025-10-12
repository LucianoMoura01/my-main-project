
(function(){
    
    function calcularIdade(){
        const input = document.getElementById('dataNascimento');
        const idadeInput = document.getElementById('idade');
        if(!input || !idadeInput) return undefined;
        const val = input.value;
        if(!val) { 
            idadeInput.value = ''; 
            habilitarTodasTurmas();
            return undefined; 
        }
        const today = new Date();
        const dob = new Date(val);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        idadeInput.value = age;
        
        atualizarTurmasDisponiveis(age);
        
        return age;
    }

    function atualizarTurmasDisponiveis(idade) {
        const turmas = document.querySelectorAll('.turma');
        let turmasDisponiveis = 0;
        
        turmas.forEach(turma => {
            const minIdade = parseInt(turma.getAttribute('data-min'));
            const maxIdade = parseInt(turma.getAttribute('data-max'));
            const label = turma.closest('label');
            
            if (idade >= minIdade && idade <= maxIdade) {
                turma.disabled = false;
                turmasDisponiveis++;
                if (label) {
                    label.style.opacity = '1';
                    label.style.cursor = 'pointer';
                    label.title = '';
                }
            } else {
                turma.disabled = true;
                turma.checked = false; 
                if (label) {
                    label.style.opacity = '0.5';
                    label.style.cursor = 'not-allowed';
                    label.title = `Esta turma é para idades entre ${minIdade} e ${maxIdade} anos`;
                }
            }
        });
        
        mostrarMensagemIdade(idade, turmasDisponiveis);
    }

    function habilitarTodasTurmas() {
        const turmas = document.querySelectorAll('.turma');
        
        turmas.forEach(turma => {
            const label = turma.closest('label');
            turma.disabled = false;
            if (label) {
                label.style.opacity = '1';
                label.style.cursor = 'pointer';
                label.title = '';
            }
        });
        
        removerMensagemIdade();
    }

    function mostrarMensagemIdade(idade, turmasDisponiveis) {
        removerMensagemIdade();
        
        const turmasFieldset = document.querySelector('fieldset legend');
        if (turmasFieldset && turmasFieldset.textContent.includes('Turmas')) {
            const mensagem = document.createElement('div');
            mensagem.className = 'idade-mensagem';
            mensagem.innerHTML = `
                <p><strong>Idade: ${idade} anos</strong></p>
                <p>Turmas disponíveis: ${turmasDisponiveis} ${turmasDisponiveis === 1 ? 'turma' : 'turmas'}</p>
                ${turmasDisponiveis === 0 ? '<p style="color: #d9534f;">⚠️ Nenhuma turma disponível para esta idade.</p>' : ''}
            `;
            turmasFieldset.parentNode.insertBefore(mensagem, turmasFieldset.nextSibling);
        }
    }

    function removerMensagemIdade() {
        const mensagemExistente = document.querySelector('.idade-mensagem');
        if (mensagemExistente) {
            mensagemExistente.remove();
        }
    }

    // Função para controlar o campo de alergia
    function toggleAlergiaField() {
        const radioSim = document.querySelector('input[name="alergia_radio"][value="sim"]');
        const radioNao = document.querySelector('input[name="alergia_radio"][value="nao"]');
        const campoAlergia = document.getElementById('alergia_descricao');
        
        if (!campoAlergia) return;
        
        if (radioSim && radioSim.checked) {
            campoAlergia.disabled = false;
            campoAlergia.required = true;
            campoAlergia.style.opacity = '1';
            campoAlergia.style.cursor = 'text';
            campoAlergia.focus();
        } else {
            campoAlergia.disabled = true;
            campoAlergia.required = false;
            campoAlergia.value = ''; 
            campoAlergia.style.opacity = '0.5';
            campoAlergia.style.cursor = 'not-allowed';
        }
    }

    window.calcularIdade = calcularIdade;
    window.toggleAlergiaField = toggleAlergiaField;

    document.addEventListener('DOMContentLoaded', function(){
        const menuToggle = document.querySelector('.menu-toggle');
        if(menuToggle){
            menuToggle.addEventListener('click', function(){
                const menu = document.getElementById('main-menu');
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', String(!expanded));
                if(menu) menu.classList.toggle('open');
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(a=>{
            a.addEventListener('click', function(e){
                const href = this.getAttribute('href');
                if(!href || href === '#') return;
                const targetId = href.slice(1);
                const target = document.getElementById(targetId);
                if(target){
                    e.preventDefault();
                    window.scrollTo({top: target.offsetTop - 70, behavior: 'smooth'});
                    const menu = document.getElementById('main-menu');
                    if(menu && menu.classList.contains('open')){ menu.classList.remove('open'); const t=document.querySelector('.menu-toggle'); if(t) t.setAttribute('aria-expanded','false'); }
                }
            });
        });

        const anoEl = document.getElementById('ano');
        if(anoEl) anoEl.textContent = new Date().getFullYear();
        
        toggleAlergiaField();
    });
})();
