# Modal de Galeria de Imagens

## 🖼️ Funcionalidades Implementadas

### ✨ Características Principais
- **Visualização Ampliada**: Clique em qualquer imagem da galeria para visualizá-la em tamanho maior
- **Fundo Escuro**: A página fica com overlay escuro (90% de transparência) para destacar a imagem
- **Navegação**: Botões para navegar entre as imagens (anterior/próxima)
- **Contador**: Mostra a posição atual da imagem (ex: "2 / 4")
- **Responsivo**: Funciona perfeitamente em dispositivos móveis

### 🎮 Controles Disponíveis

#### Com o Mouse:
- **Clique na imagem**: Abre o modal
- **Botão ×**: Fecha o modal
- **Botões ◀ ▶**: Navega entre as imagens
- **Clique fora da imagem**: Fecha o modal

#### Com o Teclado:
- **ESC**: Fecha o modal
- **Seta Esquerda**: Imagem anterior
- **Seta Direita**: Próxima imagem

### 📱 Responsividade
- **Desktop**: Botões de navegação posicionados nas laterais
- **Tablet**: Botões ligeiramente menores
- **Mobile**: Botões reposicionados para melhor acessibilidade

### 🎨 Animações
- **Zoom suave**: A imagem aparece com animação de zoom
- **Hover effects**: Efeitos visuais ao passar o mouse sobre as imagens da galeria
- **Transições**: Todas as interações têm transições suaves

## 🛠️ Arquivos Modificados

### CSS (`assets/css/styles.css`)
- Adicionadas regras para o modal overlay
- Estilização dos botões de navegação
- Responsividade para diferentes tamanhos de tela
- Animações e transições

### JavaScript (`assets/js/script.js`)
- Função `initImageGallery()` para inicializar o modal
- Navegação entre imagens
- Event listeners para teclado e mouse
- Observer para detectar novas imagens adicionadas dinamicamente

### HTML (`projeto.html`)
- Simplificação da estrutura da galeria
- Remoção dos imageboxes antigos baseados em âncoras
- Estrutura limpa com apenas as imagens

## 🚀 Como Usar

1. **Adicionar Imagens**: Adicione novas imagens dentro da div `.gallery-grid`
2. **Formato**: Use a estrutura: `<img src="caminho/imagem.jpg" alt="Descrição" loading="lazy">`
3. **Automático**: O JavaScript detecta automaticamente as novas imagens

## 💡 Exemplo de Uso

```html
<div class="gallery-grid">
    <img src="assets/img/1.png" alt="Aula de ballet" loading="lazy">
    <img src="assets/img/2.png" alt="Apresentação" loading="lazy">
    <!-- Adicione mais imagens aqui -->
</div>
```

A funcionalidade é totalmente automática - apenas adicione as imagens e o modal funcionará!