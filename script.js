// Elementos do DOM
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contact-form');
const loading = document.querySelector('.loading');

// Mostrar loading antes de carregar a página
document.body.classList.add('loading-active');

// Menu Mobile
if (burger && nav && navLinks) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Formulário de Contato
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            this.reset();
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        }, 1500);
    });
}

// Animação de Elementos ao Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, section h2');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Configuração inicial dos elementos
    document.querySelectorAll('.skill-card, .project-card, section h2').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Primeira animação
    animateOnScroll();

    // Evento de scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Remover loading após carregamento completo
window.addEventListener('load', () => {
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            document.body.classList.remove('loading-active');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000); // Aguarda 1 segundo antes de remover o loading
    }
}); 