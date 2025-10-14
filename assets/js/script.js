
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
        
        // Inicializar modal de galeria
        initImageGallery();
    });

    // Modal de Galeria de Imagens
    function initImageGallery() {
        let currentImageIndex = 0;
        let images = [];
        
        // Criar o modal HTML
        const modalHTML = `
            <div id="image-modal" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" id="modal-close">&times;</button>
                    <button class="modal-nav prev" id="modal-prev">&#8249;</button>
                    <img class="modal-image" id="modal-image" src="" alt="">
                    <button class="modal-nav next" id="modal-next">&#8250;</button>
                    <div class="modal-counter" id="modal-counter">1 / 1</div>
                </div>
            </div>
        `;
        
        // Adicionar modal ao body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Elementos do modal
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalClose = document.getElementById('modal-close');
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');
        const modalCounter = document.getElementById('modal-counter');
        
        // Coletar todas as imagens da galeria
        function collectGalleryImages() {
            const galleryImages = document.querySelectorAll('.gallery-grid img');
            images = Array.from(galleryImages).map(img => ({
                src: img.src,
                alt: img.alt || 'Imagem da galeria'
            }));
        }
        
        // Abrir modal
        function openModal(imageIndex) {
            collectGalleryImages();
            if (images.length === 0) return;
            
            currentImageIndex = imageIndex;
            showImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Fechar modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Mostrar imagem atual
        function showImage() {
            if (images.length === 0) return;
            
            const currentImage = images[currentImageIndex];
            modalImage.src = currentImage.src;
            modalImage.alt = currentImage.alt;
            
            // Atualizar contador
            modalCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
            
            // Habilitar/desabilitar botões de navegação
            modalPrev.disabled = currentImageIndex === 0;
            modalNext.disabled = currentImageIndex === images.length - 1;
        }
        
        // Navegação anterior
        function prevImage() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                showImage();
            }
        }
        
        // Navegação próxima
        function nextImage() {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                showImage();
            }
        }
        
        // Event listeners
        modalClose.addEventListener('click', closeModal);
        modalPrev.addEventListener('click', prevImage);
        modalNext.addEventListener('click', nextImage);
        
        // Fechar modal clicando fora da imagem
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });
        
        // Adicionar event listeners para as imagens da galeria
        function setupGalleryListeners() {
            const galleryImages = document.querySelectorAll('.gallery-grid img');
            galleryImages.forEach((img, index) => {
                img.addEventListener('click', function() {
                    openModal(index);
                });
                
                // Adicionar indicador visual de que é clicável
                img.style.cursor = 'pointer';
                img.title = 'Clique para ampliar';
            });
        }
        
        // Configurar listeners inicialmente
        setupGalleryListeners();
        
        // Reconfigurar listeners se novas imagens forem adicionadas dinamicamente
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    setupGalleryListeners();
                }
            });
        });
        
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            observer.observe(galleryGrid, { childList: true, subtree: true });
        }
    }
})();
