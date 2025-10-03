import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ThreeBackground from './ThreeBackground';
import './Portfolio.css';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);
      
      // Determine current section based on scroll position
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scroll / (windowHeight * 0.8));
      setCurrentSection(Math.min(sectionIndex, sectionsRef.current.length - 1));
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section && lenisRef.current) {
      lenisRef.current.scrollTo(section, { duration: 1.5 });
    }
  };

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

  // Skills data - CRAZY version
  const skills = [
    { name: 'React & Next.js', level: 98, icon: '⚛️', color: '#61DAFB', description: 'Building scalable web apps' },
    { name: 'Three.js & WebGL', level: 95, icon: '🎨', color: '#000000', description: '3D experiences & graphics' },
    { name: 'Node.js & Python', level: 92, icon: '⚡', color: '#339933', description: 'Backend architecture' },
    { name: 'Blockchain & Web3', level: 88, icon: '🔗', color: '#F7931A', description: 'Smart contracts & DeFi' },
    { name: 'AI/ML & TensorFlow', level: 85, icon: '🤖', color: '#FF6F00', description: 'Neural networks & ML' },
    { name: 'Cloud & DevOps', level: 90, icon: '☁️', color: '#FF9900', description: 'AWS, Docker, K8s' },
    { name: 'TypeScript', level: 96, icon: '📘', color: '#3178C6', description: 'Type-safe development' },
    { name: 'GraphQL & REST', level: 91, icon: '🔌', color: '#E10098', description: 'API design & development' },
  ];

  // Experience data
  const experience = [
    {
      id: 1,
      role: 'Senior Full-Stack Developer',
      company: 'Tech Innovators Inc.',
      period: '2022 - Present',
      description: 'Leading development of cutting-edge web applications and 3D experiences',
      technologies: ['React', 'Node.js', 'Three.js', 'AWS'],
    },
    {
      id: 2,
      role: 'Blockchain Developer',
      company: 'CryptoSolutions',
      period: '2021 - 2022',
      description: 'Built DeFi protocols and NFT marketplaces on Ethereum',
      technologies: ['Solidity', 'Web3', 'React', 'Ethers.js'],
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2021',
      description: 'Created award-winning websites and interactive experiences',
      technologies: ['React', 'GSAP', 'WebGL', 'Next.js'],
    },
  ];

  // Certifications data
  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: '☁️',
      color: '#FF9900',
    },
    {
      id: 2,
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2023',
      icon: '🤖',
      color: '#FF6F00',
    },
    {
      id: 3,
      title: 'Certified Kubernetes Administrator',
      issuer: 'CNCF',
      date: '2022',
      icon: '⚙️',
      color: '#326CE5',
    },
    {
      id: 4,
      title: 'Blockchain Developer Certification',
      issuer: 'Blockchain Council',
      date: '2022',
      icon: '🔗',
      color: '#F7931A',
    },
    {
      id: 5,
      title: 'React Advanced Certification',
      issuer: 'Meta',
      date: '2021',
      icon: '⚛️',
      color: '#61DAFB',
    },
    {
      id: 6,
      title: 'Three.js Journey Completion',
      issuer: 'Three.js',
      date: '2021',
      icon: '🎨',
      color: '#000000',
    },
  ];

  return (
    <div className="portfolio-wrapper">
      {/* Three.js 3D Background */}
      <ThreeBackground currentSection={currentSection} />

      {/* Section Progress Indicator */}
      <div className="section-progress">
        {['Hero', 'About', 'Experience', 'Skills', 'Certs', 'Projects', 'Contact'].map((label, index) => (
          <button
            key={index}
            className={`progress-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={label}
            title={label}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ 
            width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
          }}
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
        className="hero-section" 
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
        className="about-section" 
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

        </div>
      </section>

      {/* Section 2: Experience Timeline */}
      <section 
        className="experience-section" 
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Career
            <span className="gradient-title"> Journey</span>
          </h2>
          <p className="section-subtitle">
            My professional path in building digital products
          </p>
        </div>

        <div className="timeline-container">
          {experience.map((job, index) => (
            <div key={job.id} className="timeline-item" data-index={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="job-role">{job.role}</h3>
                  <span className="job-period">{job.period}</span>
                </div>
                <h4 className="job-company">{job.company}</h4>
                <p className="job-description">{job.description}</p>
                <div className="job-tech">
                  {job.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: CRAZY Skills Section */}
      <section 
        className="skills-crazy-section" 
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Technical
            <span className="gradient-title"> Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Cutting-edge technologies I wield to build the future
          </p>
        </div>

        <div className="skills-crazy-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-crazy-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-crazy-inner">
                <div className="skill-crazy-front">
                  <div className="skill-icon-large" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <h3 className="skill-crazy-name">{skill.name}</h3>
                  <div className="skill-level-display">
                    <div className="skill-level-circle" style={{ 
                      background: `conic-gradient(${skill.color} ${skill.level * 3.6}deg, rgba(255,255,255,0.1) 0deg)` 
                    }}>
                      <div className="skill-level-inner">
                        <span className="skill-level-number">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skill-crazy-back" style={{ borderColor: skill.color }}>
                  <p className="skill-description">{skill.description}</p>
                  <div className="skill-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(skill.level / 20) ? 'filled' : ''}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Certifications */}
      <section 
        className="certifications-section" 
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Awards &
            <span className="gradient-title"> Certifications</span>
          </h2>
          <p className="section-subtitle">
            Industry-recognized credentials and achievements
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="cert-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="cert-icon-wrapper" style={{ background: `${cert.color}20`, borderColor: cert.color }}>
                <span className="cert-icon" style={{ color: cert.color }}>{cert.icon}</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
              <div className="cert-shine"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Projects - Horizontal Scroll */}
      <section 
        className="projects-section" 
        ref={(el) => (sectionsRef.current[5] = el)}
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

      {/* Section 6: Contact */}
      <section 
        className="contact-section" 
        ref={(el) => (sectionsRef.current[6] = el)}
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
