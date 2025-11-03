const { useState, useEffect } = React;

// Templates de exemplo
const cvTemplates = [
  {
    id: 1,
    name: "Profissional Moderno",
    description: "Template limpo e moderno, ideal para profissionais de tecnologia e áreas corporativas",
    personal: {
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      address: "São Paulo, SP",
      summary: "Desenvolvedor Full Stack com 5 anos de experiência em React, Node.js e Python. Especialista em desenvolvimento de aplicações web escaláveis e APIs RESTful."
    },
    experience: [
      {
        id: 1,
        company: "Tech Solutions Ltda",
        position: "Desenvolvedor Full Stack Sênior",
        period: "2021 - Presente",
        description: "Desenvolvimento de aplicações web usando React e Node.js. Liderança de equipe de 3 desenvolvedores. Implementação de arquiteturas de microserviços."
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Desenvolvedor Frontend",
        period: "2019 - 2021",
        description: "Criação de interfaces responsivas com React e TypeScript. Integração com APIs REST. Otimização de performance e SEO."
      }
    ],
    skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git"]
  },
  {
    id: 2,
    name: "Executivo Elegante",
    description: "Design sofisticado para cargos de liderança e posições executivas",
    personal: {
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 88888-8888",
      address: "Rio de Janeiro, RJ",
      summary: "Gerente de Marketing com 8 anos de experiência em estratégias digitais, branding e gestão de equipes. Especialista em campanhas multicanal e análise de dados."
    },
    experience: [
      {
        id: 1,
        company: "Empresa Global S.A.",
        position: "Gerente de Marketing Digital",
        period: "2020 - Presente",
        description: "Gestão de equipe de 10 profissionais. Desenvolvimento de estratégias de marketing digital que resultaram em 150% de aumento nas vendas online."
      }
    ],
    skills: ["Marketing Digital", "Google Ads", "Facebook Ads", "Analytics", "SEO", "Branding", "Gestão de Equipes", "Excel Avançado"]
  },
  {
    id: 3,
    name: "Criativo Minimalista",
    description: "Template clean e minimalista, perfeito para designers e profissionais criativos",
    personal: {
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      phone: "(11) 77777-7777",
      address: "Belo Horizonte, MG",
      summary: "Designer UX/UI com 4 anos de experiência em design de produtos digitais. Especialista em pesquisa de usuário, prototipagem e design systems."
    },
    experience: [
      {
        id: 1,
        company: "Design Studio",
        position: "UX/UI Designer Sênior",
        period: "2022 - Presente",
        description: "Design de interfaces para aplicativos mobile e web. Condução de pesquisas de usuário e testes de usabilidade."
      }
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "Prototyping", "User Research"]
  },
  {
    id: 4,
    name: "Acadêmico Clássico",
    description: "Formato tradicional ideal para áreas acadêmicas, pesquisa e educação",
    personal: {
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "(11) 66666-6666",
      address: "Campinas, SP",
      summary: "Professora e pesquisadora com Doutorado em Ciência da Computação. 6 anos de experiência em ensino superior e pesquisa em Inteligência Artificial."
    },
    experience: [
      {
        id: 1,
        company: "Universidade Federal",
        position: "Professora Adjunta",
        period: "2021 - Presente",
        description: "Ensino de disciplinas de Algoritmos e Estruturas de Dados. Orientação de projetos de iniciação científica."
      }
    ],
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pesquisa Científica"]
  }
];

// Componente PDFGenerator
function PDFGenerator({ cv, mobile }) {
  const generateHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          color: #333;
          line-height: 1.4;
        }
        .header { 
          border-bottom: 3px solid #007AFF; 
          padding-bottom: 15px; 
          margin-bottom: 20px; 
        }
        .name { 
          font-size: 24px; 
          font-weight: bold; 
          margin-bottom: 8px; 
        }
        .contact { 
          font-size: 12px; 
          color: #666; 
          margin-right: 15px;
        }
        .section { 
          margin-bottom: 20px; 
        }
        .section-title { 
          font-size: 14px; 
          font-weight: bold; 
          color: #007AFF; 
          margin-bottom: 10px; 
          letter-spacing: 1px;
        }
        .experience-item { 
          margin-bottom: 15px; 
        }
        .position { 
          font-weight: bold; 
          font-size: 14px; 
        }
        .company { 
          color: #007AFF; 
          font-weight: 600; 
          font-size: 13px; 
          margin-bottom: 5px;
        }
        .period { 
          font-style: italic; 
          color: #666; 
          font-size: 12px; 
          float: right;
        }
        .description { 
          font-size: 12px; 
          margin-top: 5px;
        }
        .skill-item {
          display: inline-block;
          background: #f0f8ff;
          border: 1px solid #007AFF;
          border-radius: 10px;
          padding: 3px 8px;
          margin: 2px;
          font-size: 11px;
          color: #007AFF;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${cv.personal.name || 'Seu Nome'}</div>
        <div>
          <span class="contact">${cv.personal.email || ''}</span>
          <span class="contact">${cv.personal.phone || ''}</span>
          <span class="contact">${cv.personal.address || ''}</span>
        </div>
      </div>
      
      ${cv.personal.summary ? `
      <div class="section">
        <div class="section-title">RESUMO PROFISSIONAL</div>
        <div>${cv.personal.summary}</div>
      </div>
      ` : ''}
      
      ${cv.experience.length > 0 ? `
      <div class="section">
        <div class="section-title">EXPERIÊNCIA PROFISSIONAL</div>
        ${cv.experience.map(exp => `
          <div class="experience-item">
            <div>
              <span class="position">${exp.position || ''}</span>
              <span class="period">${exp.period || ''}</span>
            </div>
            <div class="company">${exp.company || ''}</div>
            ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${cv.skills.length > 0 ? `
      <div class="section">
        <div class="section-title">HABILIDADES</div>
        <div>
          ${cv.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
        </div>
      </div>
      ` : ''}
    </body>
    </html>
    `;
  };

  const downloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = generateHTML();
    
    const opt = {
      margin: 1,
      filename: `curriculo-${cv.personal.name || 'cv'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (mobile) {
    return React.createElement('div', { 
      onClick: downloadPDF, 
      style: { cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }
    }, 
      React.createElement('span', null, '📄'),
      React.createElement('span', null, 'PDF')
    );
  }

  return React.createElement('button', {
    className: 'pdf-button',
    onClick: downloadPDF
  }, '📄 Baixar PDF');
}

// Componente Header
function Header({ activeTab, setActiveTab, currentCV, isMobile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'templates', label: 'Templates', icon: '📋' },
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'preview', label: 'Preview', icon: '👁️' },
  ];

  return React.createElement(React.Fragment, null,
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'logo' }, 'CV Builder'),
      
      isMobile ? 
        React.createElement('div', { className: 'nav-mobile' },
          React.createElement('button', {
            className: 'menu-button',
            onClick: () => setMobileMenuOpen(!mobileMenuOpen)
          }, '☰')
        ) :
        React.createElement('nav', { className: 'nav-desktop' },
          ...menuItems.map(item =>
            React.createElement('button', {
              key: item.id,
              className: `nav-item ${activeTab === item.id ? 'active' : ''}`,
              onClick: () => setActiveTab(item.id)
            }, `${item.icon} ${item.label}`)
          ),
          React.createElement(PDFGenerator, { cv: currentCV })
        )
    ),

    isMobile && mobileMenuOpen && 
      React.createElement('div', { className: 'mobile-menu' },
        ...menuItems.map(item =>
          React.createElement('button', {
            key: item.id,
            className: `mobile-nav-item ${activeTab === item.id ? 'active' : ''}`,
            onClick: () => {
              setActiveTab(item.id);
              setMobileMenuOpen(false);
            }
          },
            React.createElement('span', null, item.icon),
            React.createElement('span', null, item.label)
          )
        ),
        React.createElement('div', { className: 'mobile-nav-item' },
          React.createElement(PDFGenerator, { cv: currentCV, mobile: true })
        )
      )
  );
}

// Componente CVEditor
function CVEditor({ cv, onUpdateCV }) {
  const updateField = (section, field, value) => {
    const updatedCV = { ...cv };
    if (section === 'personal') {
      updatedCV.personal[field] = value;
    } else if (section === 'experience') {
      updatedCV.experience = value;
    } else if (section === 'skills') {
      updatedCV.skills = value;
    }
    onUpdateCV(updatedCV);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      period: '',
      description: ''
    };
    updateField('experience', [...cv.experience, newExp]);
  };

  const removeExperience = (id) => {
    updateField('experience', cv.experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id, field, value) => {
    const updated = cv.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateField('experience', updated);
  };

  return React.createElement('div', { className: 'editor' },
    React.createElement('h2', { style: { marginBottom: '2rem', color: '#333' } }, 'Editar Currículo'),
    
    React.createElement('section', { className: 'section' },
      React.createElement('h3', { className: 'section-title' }, 'Informações Pessoais'),
      
      React.createElement('input', {
        type: 'text',
        className: 'input',
        placeholder: 'Nome completo',
        value: cv.personal.name,
        onChange: (e) => updateField('personal', 'name', e.target.value)
      }),
      
      React.createElement('input', {
        type: 'email',
        className: 'input',
        placeholder: 'Email',
        value: cv.personal.email,
        onChange: (e) => updateField('personal', 'email', e.target.value)
      }),
      
      React.createElement('input', {
        type: 'tel',
        className: 'input',
        placeholder: 'Telefone',
        value: cv.personal.phone,
        onChange: (e) => updateField('personal', 'phone', e.target.value)
      }),
      
      React.createElement('input', {
        type: 'text',
        className: 'input',
        placeholder: 'Endereço',
        value: cv.personal.address,
        onChange: (e) => updateField('personal', 'address', e.target.value)
      }),
      
      React.createElement('textarea', {
        className: 'input textarea',
        placeholder: 'Resumo profissional',
        value: cv.personal.summary,
        onChange: (e) => updateField('personal', 'summary', e.target.value),
        rows: 4
      })
    ),

    React.createElement('section', { className: 'section' },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } },
        React.createElement('h3', { className: 'section-title', style: { marginBottom: 0 } }, 'Experiência Profissional'),
        React.createElement('button', { className: 'add-button', onClick: addExperience }, '+ Adicionar')
      ),
      
      ...cv.experience.map((exp) =>
        React.createElement('div', { key: exp.id, className: 'experience-item' },
          React.createElement('button', {
            className: 'remove-button',
            onClick: () => removeExperience(exp.id)
          }, '×'),
          
          React.createElement('input', {
            type: 'text',
            className: 'input',
            placeholder: 'Empresa',
            value: exp.company,
            onChange: (e) => updateExperience(exp.id, 'company', e.target.value)
          }),
          
          React.createElement('input', {
            type: 'text',
            className: 'input',
            placeholder: 'Cargo',
            value: exp.position,
            onChange: (e) => updateExperience(exp.id, 'position', e.target.value)
          }),
          
          React.createElement('input', {
            type: 'text',
            className: 'input',
            placeholder: 'Período (ex: 2020 - 2023)',
            value: exp.period,
            onChange: (e) => updateExperience(exp.id, 'period', e.target.value)
          }),
          
          React.createElement('textarea', {
            className: 'input textarea',
            placeholder: 'Descrição das atividades',
            value: exp.description,
            onChange: (e) => updateExperience(exp.id, 'description', e.target.value),
            rows: 3
          })
        )
      )
    ),

    React.createElement('section', { className: 'section' },
      React.createElement('h3', { className: 'section-title' }, 'Habilidades'),
      React.createElement('textarea', {
        className: 'input textarea',
        placeholder: 'Liste suas habilidades separadas por vírgula',
        value: cv.skills.join(', '),
        onChange: (e) => updateField('skills', e.target.value.split(', ').filter(s => s.trim())),
        rows: 3
      })
    )
  );
}

// Componente CVPreview
function CVPreview({ cv }) {
  return React.createElement('div', { className: 'preview' },
    React.createElement('div', { className: 'preview-container' },
      React.createElement('div', { className: 'cv-header' },
        React.createElement('h1', { className: 'cv-name' }, cv.personal.name || 'Seu Nome'),
        React.createElement('div', { className: 'cv-contact' },
          React.createElement('span', null, cv.personal.email),
          React.createElement('span', null, cv.personal.phone),
          React.createElement('span', null, cv.personal.address)
        )
      ),

      cv.personal.summary && React.createElement('section', { className: 'cv-section' },
        React.createElement('h2', { className: 'cv-section-title' }, 'RESUMO PROFISSIONAL'),
        React.createElement('p', null, cv.personal.summary)
      ),

      cv.experience.length > 0 && React.createElement('section', { className: 'cv-section' },
        React.createElement('h2', { className: 'cv-section-title' }, 'EXPERIÊNCIA PROFISSIONAL'),
        ...cv.experience.map((exp) =>
          React.createElement('div', { key: exp.id, style: { marginBottom: '1rem' } },
            React.createElement('div', { className: 'experience-header' },
              React.createElement('h3', { className: 'position' }, exp.position),
              React.createElement('span', { className: 'period' }, exp.period)
            ),
            React.createElement('p', { className: 'company' }, exp.company),
            exp.description && React.createElement('p', null, exp.description)
          )
        )
      ),

      cv.skills.length > 0 && React.createElement('section', { className: 'cv-section' },
        React.createElement('h2', { className: 'cv-section-title' }, 'HABILIDADES'),
        React.createElement('div', { className: 'skills-container' },
          ...cv.skills.map((skill, index) =>
            React.createElement('span', { key: index, className: 'skill-item' }, skill)
          )
        )
      )
    )
  );
}

// Componente TemplateSelector
function TemplateSelector({ templates, onSelectTemplate, currentCV }) {
  return React.createElement('div', { className: 'templates-container' },
    React.createElement('h1', { style: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' } }, 'Escolha um Template'),
    React.createElement('p', { style: { color: '#666', marginBottom: '2rem', fontSize: '1.1rem' } }, 'Selecione um modelo para começar a editar seu currículo'),
    
    React.createElement('div', { className: 'templates-grid' },
      ...templates.map((template) =>
        React.createElement('div', {
          key: template.id,
          className: `template-card ${currentCV.id === template.id ? 'selected' : ''}`,
          onClick: () => onSelectTemplate(template)
        },
          React.createElement('div', { className: 'template-preview' },
            React.createElement('div', { style: { height: '20px', backgroundColor: '#333', borderRadius: '4px', marginBottom: '8px', width: '70%' } }),
            React.createElement('div', { style: { height: '12px', backgroundColor: '#666', borderRadius: '2px', marginBottom: '15px', width: '90%' } }),
            React.createElement('div', { style: { height: '14px', backgroundColor: '#007AFF', borderRadius: '2px', marginBottom: '8px', width: '60%' } }),
            React.createElement('div', { style: { height: '10px', backgroundColor: '#ccc', borderRadius: '2px', marginBottom: '4px', width: '100%' } }),
            React.createElement('div', { style: { height: '10px', backgroundColor: '#ccc', borderRadius: '2px', marginBottom: '12px', width: '100%' } }),
            React.createElement('div', { style: { height: '14px', backgroundColor: '#007AFF', borderRadius: '2px', marginBottom: '8px', width: '60%' } }),
            React.createElement('div', { style: { height: '10px', backgroundColor: '#ccc', borderRadius: '2px', marginBottom: '4px', width: '100%' } }),
            React.createElement('div', { style: { height: '8px', backgroundColor: '#ddd', borderRadius: '2px', width: '80%' } })
          ),
          
          React.createElement('h3', { style: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' } }, template.name),
          React.createElement('p', { style: { color: '#666', fontSize: '0.9rem', lineHeight: '1.4' } }, template.description)
        )
      )
    )
  );
}

// Componente principal App
function App() {
  const [currentCV, setCurrentCV] = useState(cvTemplates[0]);
  const [activeTab, setActiveTab] = useState('editor');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return React.createElement('div', { className: 'container' },
    React.createElement(Header, {
      activeTab: activeTab,
      setActiveTab: setActiveTab,
      currentCV: currentCV,
      isMobile: isMobile
    }),
    
    React.createElement('div', { className: 'content' },
      activeTab === 'templates' && React.createElement(TemplateSelector, {
        templates: cvTemplates,
        onSelectTemplate: setCurrentCV,
        currentCV: currentCV
      }),
      
      activeTab === 'editor' && React.createElement('div', { className: 'editor-container' },
        React.createElement(CVEditor, {
          cv: currentCV,
          onUpdateCV: setCurrentCV
        }),
        !isMobile && React.createElement(CVPreview, { cv: currentCV })
      ),
      
      activeTab === 'preview' && React.createElement(CVPreview, { cv: currentCV })
    )
  );
}

// Renderizar a aplicação
ReactDOM.render(React.createElement(App), document.getElementById('root'));