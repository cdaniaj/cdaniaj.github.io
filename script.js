// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.produto-card, .galeria-item').forEach(el => {
    observer.observe(el);
});

// Função de Montar Combo Interativo
const pecasInputs = document.querySelectorAll('.peca-input');
const comboList = document.getElementById('comboList');
const qtdPecas = document.getElementById('qtdPecas');
const precoTotal = document.getElementById('precoTotal');
const precoFinal = document.getElementById('precoFinal');
const desconto = document.getElementById('desconto');
const resumoDesconto = document.getElementById('resumoDesconto');
let pecasSelecionadas = [];

function atualizarCombo() {
    pecasSelecionadas = [];
    
    pecasInputs.forEach(input => {
        if (input.checked) {
            pecasSelecionadas.push({
                nome: input.dataset.nome,
                preco: parseFloat(input.dataset.preco)
            });
        }
    });
    
    // Atualizar lista de peças
    if (pecasSelecionadas.length === 0) {
        comboList.innerHTML = '<p class="empty-combo">Selecione as peças para montar seu combo</p>';
    } else {
        comboList.innerHTML = pecasSelecionadas.map(peca => `
            <div class="combo-item">
                <span class="item-nome">${peca.nome}</span>
                <span class="item-preco">R$ ${peca.preco.toFixed(2).replace('.', ',')}</span>
            </div>
        `).join('');
    }
    
    // Calcular totais
    const total = pecasSelecionadas.reduce((sum, peca) => sum + peca.preco, 0);
    const temDesconto = pecasSelecionadas.length >= 2;
    const descontoValor = temDesconto ? total * 0.1 : 0;
    const totalFinal = total - descontoValor;
    
    // Atualizar display
    qtdPecas.textContent = pecasSelecionadas.length;
    precoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if (temDesconto) {
        resumoDesconto.style.display = 'flex';
        desconto.textContent = `-R$ ${descontoValor.toFixed(2).replace('.', ',')}`;
    } else {
        resumoDesconto.style.display = 'none';
    }
    
    precoFinal.textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
}

pecasInputs.forEach(input => {
    input.addEventListener('change', atualizarCombo);
});

// Botão Solicitar Orçamento
const btnSolicitar = document.querySelector('.btn-solicitar');
btnSolicitar.addEventListener('click', function() {
    if (pecasSelecionadas.length === 0) {
        alert('Por favor, selecione pelo menos uma peça para montar seu combo!');
        return;
    }
    
    const listaCombo = pecasSelecionadas.map(p => `${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})`).join(', ');
    const total = document.getElementById('precoFinal').textContent;
    
    const mensagem = `Olá! Gostaria de solicitar um orçamento para o seguinte combo: ${listaCombo}. Valor total: ${total}.`;
    const urlWhatsApp = `https://wa.me/5511966041294?text=${encodeURIComponent(mensagem)}`;
    
    window.open(urlWhatsApp, '_blank');
});

// Formulário de contato
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            alert(`Obrigado ${name}! Sua mensagem foi recebida.\nResponderemos em breve no email: ${email}`);
            this.reset();
        }
    });
}

// Adiciona classe ativa ao navegar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Log de confirmação
console.log('💚 Kah Atelie - Website carregado com sucesso!');
