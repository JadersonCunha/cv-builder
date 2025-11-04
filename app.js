const { useState, useEffect } = React;

// SUBSTITUA pelo seu Client ID real do Google Cloud Console
const GOOGLE_CLIENT_ID = '908560175195-lf7chg3ulkvuv2pobjvi0lo9vv03661h.apps.googleusercontent.com';

// Templates de exemplo
const templates = [
  {
    id: 1,
    name: "Profissional Moderno",
    description: "Perfeito para você que trabalha com tecnologia e quer impressionar recrutadores",
    data: {
      personal: {
        name: "João Silva",
        email: "joao.silva@email.com",
        phone: "(11) 99999-9999",
        address: "São Paulo, SP",
        photo: null,
        summary: "Sou apaixonado por tecnologia e adoro criar soluções que fazem a diferença na vida das pessoas. Com 5 anos transformando ideias em código, especializo-me em React, Node.js e Python para construir experiências digitais incríveis."
      },
      experience: [
        {
          id: 1,
          company: "Tech Solutions",
          position: "Desenvolvedor Full Stack Sênior",
          period: "2021 - Presente",
          description: "Lidero uma equipe incrível de 3 desenvolvedores, criando aplicações web que nossos usuários amam usar. Cada linha de código é pensada para proporcionar a melhor experiência possível."
        }
      ],
      skills: ["React", "Node.js", "Python", "JavaScript", "MongoDB", "Docker", "AWS"]
    }
  },
  {
    id: 2,
    name: "Executivo Elegante",
    description: "Ideal para líderes que querem transmitir confiança e profissionalismo",
    data: {
      personal: {
        name: "Maria Santos",
        email: "maria.santos@email.com",
        phone: "(11) 88888-8888",
        address: "Rio de Janeiro, RJ",
        photo: null,
        summary: "Acredito que o marketing é sobre conectar pessoas e marcas de forma autêntica. Em 8 anos de carreira, ajudei empresas a contar suas histórias e conquistar corações, sempre com foco em resultados que importam."
      },
      experience: [
        {
          id: 1,
          company: "Empresa Global",
          position: "Gerente de Marketing Digital",
          period: "2020 - Presente",
          description: "Gestão de equipe de 10 profissionais. Aumento de 150% nas vendas online."
        }
      ],
      skills: ["Marketing Digital", "Google Ads", "Analytics", "SEO", "Gestão de Equipes"]
    }
  },
  {
    id: 3,
    name: "Criativo Minimalista",
    description: "Para mentes criativas que acreditam que menos é mais e querem deixar o trabalho falar por si",
    data: {
      personal: {
        name: "Pedro Costa",
        email: "pedro.costa@email.com",
        phone: "(11) 77777-7777",
        address: "Belo Horizonte, MG",
        photo: null,
        summary: "Sou obcecado por criar experiências que fazem as pessoas sorrirem ao usar um produto. Há 4 anos, transformo problemas complexos em soluções simples e elegantes, sempre colocando o usuário no centro de tudo."
      },
      experience: [
        {
          id: 1,
          company: "Design Studio",
          position: "UX/UI Designer Sênior",
          period: "2022 - Presente",
          description: "Design de interfaces para aplicativos mobile e web. Pesquisa de usuário e prototipagem."
        }
      ],
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research"]
    }
  }
];

// Componente principal
function App() {
  const [activeTab, setActiveTab] = useState('templates');
  const [currentCV, setCurrentCV] = useState({...templates[0].data, templateId: templates[0].id});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inicializar Google Sign-In
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      try {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: false
          });
          
          // Verificar se há usuário logado
          const savedUser = localStorage.getItem('cvbuilder_user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (e) {
              localStorage.removeItem('cvbuilder_user');
            }
          }
          setIsLoading(false);
        } else {
          // Tentar novamente em 500ms se o Google SDK não estiver carregado
          setTimeout(initializeGoogleSignIn, 500);
        }
      } catch (error) {
        console.error('Erro ao inicializar Google SDK:', error);
        setIsLoading(false);
      }
    };
    
    initializeGoogleSignIn();
  }, []);

  const handleGoogleSignIn = (response) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };
      
      setUser(userData);
      localStorage.setItem('cvbuilder_user', JSON.stringify(userData));
      
      // Preencher dados pessoais automaticamente
      setCurrentCV(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          name: userData.name,
          email: userData.email
        }
      }));
    } catch (error) {
      console.error('Erro ao processar login do Google:', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('cvbuilder_user');
    try {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (error) {
      console.log('Google SDK não disponível para logout');
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById('cv-preview');
    const opt = {
      margin: 0.5,
      filename: `curriculo-${currentCV.personal.name || 'cv'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (isLoading) {
    return (
      <div className="app">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <div>Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <LoginScreen onSignIn={handleGoogleSignIn} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isMobile={isMobile}
        downloadPDF={downloadPDF}
        user={user}
        onSignOut={handleSignOut}
      />
      
      <div className="content">
        <div className="main-content">
          {activeTab === 'templates' && (
            <TemplateSelector 
              templates={templates}
              currentCV={currentCV}
              setCurrentCV={setCurrentCV}
              setActiveTab={setActiveTab}
            />
          )}
          
          {activeTab === 'editor' && (
            <div className={isMobile ? '' : 'editor-layout'}>
              <CVEditor cv={currentCV} setCV={setCurrentCV} />
              {!isMobile && <CVPreview cv={currentCV} />}
            </div>
          )}
          
          {activeTab === 'preview' && (
            <CVPreview cv={currentCV} />
          )}
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="tech-stack">
            <div className="tech-badge">
              <svg className="react-logo" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
              </svg>
              React.js
            </div>
            <div className="tech-badge">
              HTML5
            </div>
            <div className="tech-badge">
              CSS3
            </div>
            <div className="tech-badge">
              JavaScript ES6+
            </div>
          </div>
          <div className="developer-info">
            Desenvolvido por <strong>Jaderson Cunha</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente LoginScreen
function LoginScreen({ onSignIn }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #fff, #f0f0f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          CV Builder
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Crie currículos profissionais de forma rápida e fácil.
          Faça login com sua conta Google para começar!
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div id="google-signin-button"></div>
        </div>
        
        <div style={{
          fontSize: '0.9rem',
          opacity: 0.7,
          marginTop: '2rem'
        }}>
          ✓ Seus dados ficam seguros<br/>
          ✓ Preenchimento automático<br/>
          ✓ Acesso rápido e fácil
        </div>
      </div>
    </div>
  );
}

// Componente Header
function Header({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, isMobile, downloadPDF, user, onSignOut }) {
  const menuItems = [
    { id: 'templates', label: 'Templates', icon: '' },
    { id: 'editor', label: 'Editor', icon: '' },
    { id: 'preview', label: 'Preview', icon: '' }
  ];

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="assets/CV Builder Logo Transparente.jpg" alt="CV Builder" className="logo-img" />
        </div>
        
        {isMobile ? (
          <button 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        ) : (
          <nav className="nav-desktop">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-primary" onClick={downloadPDF}>
              Baixar PDF
            </button>
            
            <div className="user-menu">
              <img 
                src={user.picture} 
                alt={user.name}
                className="user-avatar"
              />
              <span className="user-name">{user.name}</span>
              <button className="btn-secondary" onClick={onSignOut}>
                Sair
              </button>
            </div>
          </nav>
        )}
      </header>

      {isMobile && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="mobile-nav-btn"
            onClick={() => {
              downloadPDF();
              setMobileMenuOpen(false);
            }}
          >
            PDF
          </button>
          <div className="mobile-user-info">
            <img src={user.picture} alt={user.name} className="user-avatar" />
            <span>{user.name}</span>
          </div>
          <button
            className="mobile-nav-btn"
            onClick={() => {
              onSignOut();
              setMobileMenuOpen(false);
            }}
          >
            Sair
          </button>
        </div>
      )}
    </>
  );
}

// Componente TemplateSelector
function TemplateSelector({ templates, currentCV, setCurrentCV, setActiveTab }) {
  return (
    <div>
      <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748'}}>
        Vamos criar algo incrível juntos!
      </h1>
      <p style={{fontSize: '1.2rem', color: '#4a5568', marginBottom: '2rem', lineHeight: '1.6'}}>
        Escolha o template que mais combina com sua personalidade e vamos dar vida ao seu currículo dos sonhos
      </p>
      
      <div className="templates-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${currentCV.templateId === template.id ? 'selected' : ''}`}
            onClick={() => {
              setCurrentCV({...template.data, templateId: template.id});
              setActiveTab('editor');
            }}
          >
            <div className="template-preview">
              <div className="preview-header"></div>
              <div className="preview-line" style={{width: '90%'}}></div>
              <div className="preview-line blue"></div>
              <div className="preview-line" style={{width: '80%'}}></div>
              <div className="preview-line" style={{width: '70%'}}></div>
              <div className="preview-line blue" style={{width: '50%'}}></div>
              <div className="preview-line" style={{width: '85%'}}></div>
            </div>
            
            <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              {template.name}
            </h3>
            <p style={{color: '#666', lineHeight: '1.4'}}>
              {template.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente CVEditor
function CVEditor({ cv, setCV }) {
  const updatePersonal = (field, value) => {
    setCV(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      period: '',
      description: ''
    };
    setCV(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id, field, value) => {
    setCV(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setCV(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateSkills = (value) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setCV(prev => ({ ...prev, skills }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePersonal('photo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="editor-panel">
      <h2 style={{fontSize: '1.8rem', marginBottom: '2rem', color: '#2d3748'}}>
        Conte sua história
      </h2>
      <p style={{fontSize: '1rem', color: '#4a5568', marginBottom: '2rem', lineHeight: '1.6'}}>
        Cada campo é uma oportunidade de mostrar quem você é. Seja autêntico e deixe sua personalidade brilhar!
      </p>
      
      <div className="form-section">
        <div className="section-title">Informações Pessoais</div>
        
        <div className="photo-upload">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt="Foto" className="photo-preview" />
          ) : (
            <div className="photo-placeholder" onClick={() => document.getElementById('photo-input').click()}>
              +
            </div>
          )}
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="photo-input"
          />
          <button 
            type="button" 
            className="photo-button"
            onClick={() => document.getElementById('photo-input').click()}
          >
            {cv.personal.photo ? 'Trocar foto' : 'Adicionar foto'}
          </button>
        </div>
        
        <input
          className="input"
          type="text"
          placeholder="Como você gosta de ser chamado?"
          value={cv.personal.name}
          onChange={(e) => updatePersonal('name', e.target.value)}
        />
        
        <input
          className="input"
          type="email"
          placeholder="Seu melhor email para contato"
          value={cv.personal.email}
          onChange={(e) => updatePersonal('email', e.target.value)}
        />
        
        <input
          className="input"
          type="tel"
          placeholder="WhatsApp ou telefone preferido"
          value={cv.personal.phone}
          onChange={(e) => updatePersonal('phone', e.target.value)}
        />
        
        <input
          className="input"
          type="text"
          placeholder="Onde você mora? (Cidade, Estado)"
          value={cv.personal.address}
          onChange={(e) => updatePersonal('address', e.target.value)}
        />
        
        <textarea
          className="input textarea"
          placeholder="Conte um pouco sobre você... O que te motiva? Quais são seus sonhos profissionais?"
          value={cv.personal.summary}
          onChange={(e) => updatePersonal('summary', e.target.value)}
        />
      </div>

      <div className="form-section">
        <div className="section-title">
          Sua jornada profissional
          <button className="btn-secondary" onClick={addExperience} style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '15px', padding: '0.5rem 1rem'}}>
            Adicionar experiência
          </button>
        </div>
        <p style={{fontSize: '0.9rem', color: '#4a5568', marginBottom: '1.5rem', fontStyle: 'italic'}}>
          Cada trabalho foi um aprendizado. Conte suas conquistas com orgulho!
        </p>
        
        {cv.experience.map(exp => (
          <div key={exp.id} className="experience-item">
            <button 
              className="btn-danger"
              onClick={() => removeExperience(exp.id)}
            >
              ×
            </button>
            
            <input
              className="input"
              type="text"
              placeholder="Nome da empresa que teve sorte de te ter"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
            />
            
            <input
              className="input"
              type="text"
              placeholder="Qual era seu papel lá?"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
            />
            
            <input
              className="input"
              type="text"
              placeholder="Quando foi essa aventura? (ex: Jan 2020 - Dez 2023)"
              value={exp.period}
              onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
            />
            
            <textarea
              className="input textarea"
              placeholder="Conte suas conquistas! O que você fez de especial? Como impactou a empresa?"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="section-title">Seus superpoderes</div>
        <p style={{fontSize: '0.9rem', color: '#4a5568', marginBottom: '1rem', fontStyle: 'italic'}}>
          Não seja modesto! Liste tudo que você sabe fazer bem
        </p>
        <textarea
          className="input textarea"
          placeholder="Ex: JavaScript, Liderança, Photoshop, Comunicação, Excel... (separe por vírgula)"
          value={cv.skills.join(', ')}
          onChange={(e) => updateSkills(e.target.value)}
        />
      </div>
    </div>
  );
}

// Componente CVPreview
function CVPreview({ cv }) {
  // Determinar qual template está sendo usado baseado no ID
  const getTemplateClass = () => {
    switch(cv.templateId) {
      case 1: return 'cv-modern';
      case 2: return 'cv-executive';
      case 3: return 'cv-creative';
      default: return 'cv-modern';
    }
  };

  const templateClass = getTemplateClass();

  return (
    <div className="preview-panel">
      <div id="cv-preview" className={`cv-preview ${templateClass}`}>
        <div className="cv-header">
          {templateClass === 'cv-executive' ? (
            // Layout executivo com foto ao lado
            <>
              {cv.personal.photo && (
                <img src={cv.personal.photo} alt="Foto" className="cv-photo" />
              )}
              <div>
                <h1 className="cv-name">{cv.personal.name || 'Seu Nome'}</h1>
                <div className="cv-contact">
                  <div>{cv.personal.email}</div>
                  <div>{cv.personal.phone}</div>
                  <div>{cv.personal.address}</div>
                </div>
              </div>
            </>
          ) : (
            // Layout padrão centralizado
            <>
              {cv.personal.photo && (
                <img src={cv.personal.photo} alt="Foto" className="cv-photo" />
              )}
              <h1 className="cv-name">{cv.personal.name || 'Seu Nome'}</h1>
              <div className="cv-contact">
                <span>{cv.personal.email}</span>
                <span>{cv.personal.phone}</span>
                <span>{cv.personal.address}</span>
              </div>
            </>
          )}
        </div>

        <div className="cv-body">
          {cv.personal.summary && (
            <div className="cv-section">
              <h2 className="cv-section-title">Resumo Profissional</h2>
              <p style={{lineHeight: '1.6', color: '#555'}}>{cv.personal.summary}</p>
            </div>
          )}

          {cv.experience.length > 0 && (
            <div className="cv-section">
              <h2 className="cv-section-title">Experiência Profissional</h2>
              {cv.experience.map(exp => (
                <div key={exp.id} className="experience-entry">
                  <div className="experience-header">
                    <div className="position">{exp.position}</div>
                    <div className="period">{exp.period}</div>
                  </div>
                  <div className="company">{exp.company}</div>
                  {exp.description && (
                    <p style={{color: '#555', lineHeight: '1.5', marginTop: '0.5rem'}}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {cv.skills.length > 0 && (
            <div className="cv-section">
              <h2 className="cv-section-title">Habilidades</h2>
              <div className="skills-container">
                {cv.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Renderizar a aplicação
ReactDOM.render(<App />, document.getElementById('root'));