# CV Builder - Criador de Currículos Profissionais

> Uma aplicação React moderna e responsiva que transforma a criação de currículos em uma experiência intuitiva e profissional

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)

## O que torna este projeto especial

Criar um currículo não deveria ser uma tarefa frustrante. Pensando nisso, desenvolvi uma solução que combina design moderno com funcionalidade prática, permitindo que qualquer pessoa crie um currículo profissional em minutos.

### **Design que impressiona**
Implementei uma interface com Glassmorphism, criando efeitos visuais sofisticados com blur e transparência. As animações suaves e gradientes dinâmicos proporcionam uma experiência visual agradável, enquanto a responsividade garante que funcione perfeitamente em qualquer dispositivo.

### **Experiência mobile pensada**
O menu mobile foi estrategicamente posicionado na parte inferior da tela, seguindo as melhores práticas de UX para dispositivos móveis. O layout se adapta inteligentemente usando CSS Grid e Flexbox, com breakpoints cuidadosamente definidos.

### **Templates que contam histórias**
Cada um dos três templates foi pensado para diferentes perfis profissionais:
- **Profissional Moderno**: Com gradientes roxos e layout clean, perfeito para profissionais de tecnologia
- **Executivo Elegante**: Design formal e sofisticado, ideal para posições de liderança
- **Criativo Minimalista**: Abordagem minimalista que deixa o conteúdo falar por si

### **Upload de foto simplificado**
Funciona tanto no computador quanto no smartphone, com preview instantâneo e conversão automática para base64. A interface é intuitiva e permite uma experiência fluida de upload.

### **PDF profissional com um clique**
O sistema gera PDFs otimizados para impressão, preservando toda a formatação e imagens. O arquivo é nomeado automaticamente com o nome do usuário para facilitar a organização.

### **Arquitetura React moderna**
Utilizei componentes funcionais com hooks modernos, gerenciamento de estado eficiente com useState e useEffect, e comunicação clara entre componentes. O código JSX é limpo e de fácil manutenção.

## Tecnologias escolhidas e por quê

### **Base sólida com React**
Escolhi React 18.2 como base por sua maturidade e ecossistema robusto. A combinação com JavaScript ES6+ permite um código mais limpo e moderno, enquanto CSS3 com Glassmorphism cria uma estética contemporânea. HTML5 semântico garante acessibilidade e SEO.

### **Bibliotecas cuidadosamente selecionadas**
Para geração de PDF, optei pela html2pdf.js que funciona inteiramente no cliente, eliminando dependências de servidor. A tipografia Inter do Google Fonts foi escolhida por sua legibilidade excepcional. Os React Hooks (useState, useEffect) mantêm o estado da aplicação de forma eficiente.

### **Abordagem pragmática**
Utilizar React via CDN permite desenvolvimento rápido sem complexidade de build. O Babel Standalone compila JSX em tempo real, mantendo a simplicidade. A metodologia mobile-first garante que a experiência seja excelente em todos os dispositivos.

## Como executar o projeto

A beleza desta solução está na sua simplicidade. Não há instalações complexas ou configurações complicadas:

```bash
# Clone o repositório
git clone https://github.com/jadersoncunha/cv-builder

# Navegue até o diretório
cd cv-builder

# Abra o index.html diretamente no navegador
# Ou, se preferir um servidor local:
python -m http.server 3000
# Acesse: http://localhost:3000
```

Isso mesmo - é só abrir o arquivo HTML no navegador e começar a usar!

## Decisões técnicas que fazem a diferença

### **Performance pensada desde o início**
O carregamento via CDN elimina tempos de espera longos, enquanto a re-renderização otimizada do React garante que a interface responda instantaneamente às ações do usuário. Cada interação foi pensada para ser fluida e natural.

### **Experiência do usuário como prioridade**
Implementei um design system consistente que cria familiaridade e confiança. A abordagem mobile-first garante que a experiência seja excelente independente do dispositivo. Considerei aspectos de acessibilidade e criei micro-interações que tornam o uso prazeroso.

### **Código que conta uma história**
Cada componente foi criado para ser reutilizável e autodocumentado. A separação clara de responsabilidades facilita manutenção e evolução. Apliquei princípios SOLID para garantir que o código seja sustentável a longo prazo.

## Para quem este projeto foi pensado

Desenvolvendo esta solução, tive em mente diferentes personas que enfrentam desafios na criação de currículos:

**Profissionais em transição de carreira** que precisam de uma ferramenta rápida e eficiente para se destacar no mercado competitivo atual.

**Recrutadores e consultores de RH** que podem oferecer esta ferramenta aos candidatos, agregando valor ao seu serviço.

**Estudantes e recém-formados** criando seu primeiro currículo profissional, sem a complexidade de ferramentas caras ou complicadas.

**Freelancers e autônomos** que precisam atualizar rapidamente seu portfólio e apresentação profissional.

## O que torna esta solução única

**Simplicidade radical** - Funciona diretamente no navegador, sem instalações ou cadastros complicados.

**Independência total** - Após o carregamento inicial, funciona offline, garantindo privacidade e disponibilidade.

**Verdadeiramente universal** - Funciona em qualquer dispositivo: PC, Mac, Android, iOS, tablets.

**Qualidade profissional** - Templates desenvolvidos com cuidado estético e funcional, não apenas "mais do mesmo".

**Tecnologia atual** - Construído com as melhores práticas e tecnologias modernas do mercado.

## Sobre o desenvolvedor

Sou **Jaderson Cunha**, desenvolvedor apaixonado por criar soluções que realmente fazem diferença na vida das pessoas. Este projeto nasceu da frustração de ver tantas ferramentas complicadas para algo que deveria ser simples: criar um currículo profissional.

Acredito que tecnologia deve ser acessível e útil, não um obstáculo. Por isso, cada linha de código foi pensada para proporcionar uma experiência fluida e agradável.

**Conecte-se comigo:**
- LinkedIn: [linkedin.com/in/jadersoncunha](https://linkedin.com/in/jadersoncunha)
- Email: jaderson@email.com
- Portfolio: [jadersoncunha.dev](https://jadersoncunha.dev)

---

**Se este projeto te ajudou de alguma forma, ficarei feliz em saber! Deixe uma estrela no GitHub e compartilhe com quem precisa.**

*Desenvolvido com React, JavaScript, CSS3 e muito carinho pela experiência do usuário.*