import React, { useEffect, useRef, useState } from 'react';
import ThreeBackground from './ThreeBackground';
import './Portfolio.css';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef([]);
  const totalSections = 5; // Hero, About, Projects, Skills, Contact

  // Snap scroll to section
  const scrollToSection = (index) => {
    if (index < 0 || index >= totalSections || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // Wheel event for snap scrolling
  useEffect(() => {
    let timeout;
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, [currentSection, isScrolling]);

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Neural AI Platform',
      description: 'Real-time machine learning dashboard with predictive analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      tags: ['AI', 'Python', 'TensorFlow', 'React'],
      year: '2024',
    },
    {
      id: 2,
      title: 'Metaverse Hub',
      description: 'Immersive 3D virtual world with blockchain integration',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
      tags: ['Web3', 'Three.js', 'Solidity', 'WebRTC'],
      year: '2024',
    },
    {
      id: 3,
      title: 'Quantum Interface',
      description: 'Next-gen quantum computing visualization platform',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
      tags: ['Quantum', 'React', 'D3.js', 'WebGL'],
      year: '2023',
    },
    {
      id: 4,
      title: 'DeFi Exchange',
      description: 'Decentralized trading platform with automated market making',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
      tags: ['DeFi', 'Ethereum', 'Smart Contracts', 'React'],
      year: '2023',
    },
  ];

  // Skills data
  const skills = [
    { name: 'React & Next.js', level: 98, icon: '⚛️' },
    { name: 'Three.js & WebGL', level: 95, icon: '🎨' },
    { name: 'Node.js & Python', level: 92, icon: '⚡' },
    { name: 'Blockchain & Web3', level: 88, icon: '🔗' },
    { name: 'AI/ML & TensorFlow', level: 85, icon: '🤖' },
    { name: 'Cloud & DevOps', level: 90, icon: '☁️' },
  ];

  return (
    <div className="portfolio-wrapper">
      {/* Three.js 3D Background */}
      <ThreeBackground currentSection={currentSection} />

      {/* Section Progress Indicator */}
      <div className="section-progress">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ width: `${(currentSection / (totalSections - 1)) * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <div className="nav-brand">
          <span className="brand-text">NC</span>
          <span className="brand-dot"></span>
        </div>
        <div className="nav-menu">
          <button onClick={() => scrollToSection(1)} className="nav-item">About</button>
          <button onClick={() => scrollToSection(2)} className="nav-item">Work</button>
          <button onClick={() => scrollToSection(4)} className="nav-item">Contact</button>
        </div>
        <button className="nav-cta-button" onClick={() => scrollToSection(4)}>
          <span>Let's Talk</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Section 0: Hero */}
      <section 
        className="section hero-section" 
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="hero-content">
          <div className="hero-label">
            <span className="status-indicator"></span>
            <span>Available for select projects</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Crafting</span>
            <span className="title-line gradient-title">Digital</span>
            <span className="title-line">Experiences</span>
          </h1>

          <p className="hero-subtitle">
            Award-winning developer specializing in immersive
            <br />
            web experiences, 3D interfaces, and next-gen applications
          </p>

          <div className="hero-cta">
            <button className="primary-button" onClick={() => scrollToSection(2)}>
              <span>View Selected Work</span>
              <div className="button-glow"></div>
            </button>
            <button className="secondary-button" onClick={() => scrollToSection(4)}>
              <span>Get In Touch</span>
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-value">50+</div>
              <div className="metric-label">Projects Launched</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <div className="metric-value">5+</div>
              <div className="metric-label">Years Crafting</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <div className="metric-value">15+</div>
              <div className="metric-label">Awards Earned</div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line-wrapper">
            <div className="scroll-line"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* Section 1: About */}
      <section 
        className="section about-section" 
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Building the
            <span className="gradient-title"> Future</span>
          </h2>
          <p className="section-subtitle">
            Blending creativity with code to craft experiences that push boundaries
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              I'm a full-stack developer and creative technologist with a passion for building 
              immersive digital experiences. My work spans 3D web applications, blockchain platforms, 
              and AI-powered interfaces.
            </p>
            <p className="about-paragraph">
              With expertise in React, Three.js, and emerging web technologies, I transform complex 
              ideas into elegant, user-centric solutions that captivate and inspire.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: `${skill.level}%` }}
                  >
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Projects - Horizontal Scroll */}
      <section 
        className="section projects-section" 
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="projects-header">
          <h2 className="section-title">
            Selected
            <span className="gradient-title"> Work</span>
          </h2>
          <p className="projects-hint">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Scroll horizontally
          </p>
        </div>

        <div className="projects-horizontal-scroll">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card-horizontal">
              <div className="project-number">0{index + 1}</div>
              <div className="project-year">{project.year}</div>
              
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay">
                  <button className="project-view-button">
                    <span>View Project</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Skills Grid */}
      <section 
        className="section skills-section" 
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Expertise &
            <span className="gradient-title"> Mastery</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="expertise-grid">
          <div className="expertise-card">
            <h3 className="expertise-title">Frontend</h3>
            <p className="expertise-desc">React, Next.js, Three.js, WebGL, GSAP</p>
          </div>
          <div className="expertise-card">
            <h3 className="expertise-title">Backend</h3>
            <p className="expertise-desc">Node.js, Python, GraphQL, PostgreSQL</p>
          </div>
          <div className="expertise-card">
            <h3 className="expertise-title">Web3</h3>
            <p className="expertise-desc">Solidity, Ethers.js, IPFS, Smart Contracts</p>
          </div>
          <div className="expertise-card">
            <h3 className="expertise-title">AI/ML</h3>
            <p className="expertise-desc">TensorFlow, PyTorch, OpenAI, Computer Vision</p>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section 
        className="section contact-section" 
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="contact-container">
          <h2 className="section-title">
            Let's Create
            <span className="gradient-title"> Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's bring your vision to life
          </p>

          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <select>
                <option>Web Application</option>
                <option>3D Experience</option>
                <option>Blockchain/Web3</option>
                <option>AI/ML Platform</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="6" placeholder="Tell me about your project..."></textarea>
            </div>

            <button type="submit" className="submit-button">
              <span>Send Message</span>
              <div className="button-glow"></div>
            </button>
          </form>

          <div className="social-links-container">
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Dribbble</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>© 2025 Nabin Chapagain. Designed & engineered with passion.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
