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

  // Projects data - REAL PROJECTS
  const projects = [
    {
      id: 1,
      title: 'CodeCommons',
      description: 'A modern collaborative platform for managing and tracking academic projects with cosmic-themed interface. Recognized by Jain University for innovation.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      tags: ['Next.js', 'MongoDB', 'Express.js', 'TypeScript', 'Socket.IO'],
      year: '2025',
      github: 'https://github.com/nabin00012/codecommons',
      live: 'https://codecommons-delta.vercel.app',
      recognition: '🏆 Recognized by Jain University',
    },
    {
      id: 2,
      title: 'ChapChat',
      description: 'Real-time chat application allowing users to connect and communicate instantly with modern UI/UX and seamless messaging experience.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
      tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Real-time'],
      year: '2024',
      github: 'https://github.com/nabin00012/Chap-Chat',
      live: '#',
    },
    {
      id: 3,
      title: 'LocalMart',
      description: 'Hyperlocal marketplace where users within same pin code can rent or sell items to their neighbors, promoting sustainable local commerce.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
      tags: ['Next.js', 'MongoDB', 'Geolocation', 'REST API', 'Tailwind'],
      year: '2024',
      github: 'https://github.com/nabin00012/local-mart',
      live: '#',
    },
  ];

  // Skills data - REAL SKILLS
  const skills = [
    { name: 'JavaScript & TypeScript', level: 95, icon: '📘', color: '#3178C6', description: 'Core languages for modern web' },
    { name: 'React & Next.js', level: 98, icon: '⚛️', color: '#61DAFB', description: 'Building scalable web apps' },
    { name: 'Node.js & Express.js', level: 92, icon: '⚡', color: '#339933', description: 'Backend API development' },
    { name: 'MongoDB', level: 90, icon: '🍃', color: '#47A248', description: 'Schema design & optimization' },
    { name: 'Three.js & 3D', level: 88, icon: '🎨', color: '#000000', description: '3D web experiences' },
    { name: 'RESTful APIs', level: 93, icon: '🔌', color: '#E10098', description: 'API design & development' },
    { name: 'Git & GitHub', level: 96, icon: '🐙', color: '#F05032', description: 'Version control & collaboration' },
    { name: 'JWT & Stripe', level: 89, icon: '🔐', color: '#635BFF', description: 'Authentication & payments' },
  ];

  // Experience data
  const experience = [
    {
      id: 1,
      role: 'Full-Stack Development Intern',
      company: 'Octanet Services',
      period: 'Extended from 2 to 6 months',
      highlight: '⭐ Performance exceeded expectations - Extended 3x due to outstanding work',
      description: 'Built complete user dashboard using React.js 18.2.0 with functional components. Implemented useState and useEffect hooks for state management and API calls. Created profile edit form with Formik library for form handling and Yup for validation schema.',
      achievements: [
        'User Dashboard & Profile Management System shipped to production',
        'Zero critical issues in production deployment',
        'Became go-to intern for complex React component development',
        'Integrated Axios for HTTP requests to Node.js/Express backend APIs',
        'Used React Router v6 for client-side navigation'
      ],
      technologies: ['React.js 18.2.0', 'Formik', 'Yup', 'Axios', 'Express.js', 'React Router v6'],
      offerLetter: true,
    },
  ];

  // Certifications data - REAL CERTIFICATIONS
  const certifications = [
    {
      id: 1,
      title: 'Microsoft Azure AI Essentials Professional Certificate',
      issuer: 'Microsoft & LinkedIn',
      date: 'Sep 2025',
      icon: '☁️',
      color: '#0078D4',
      skills: 'Machine Learning, Azure, NLP, Generative AI',
      pdfLink: '/certificates/azure-ai-essentials.pdf'
    },
    {
      id: 2,
      title: 'Microsoft Azure AI Essentials: Workloads and ML',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '🤖',
      color: '#0A66C2',
      skills: 'Azure AI Foundry',
      pdfLink: '/certificates/azure-ml-workloads.pdf'
    },
    {
      id: 3,
      title: 'Practical GitHub Actions',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '⚙️',
      color: '#2088FF',
      skills: 'GitHub, CI/CD',
      pdfLink: '/certificates/github-actions.pdf'
    },
    {
      id: 4,
      title: 'Practical GitHub Code Search',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '🔍',
      color: '#2088FF',
      skills: 'GitHub',
      pdfLink: '/certificates/github-code-search.pdf'
    },
    {
      id: 5,
      title: 'Practical GitHub Copilot',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '🤖',
      color: '#2088FF',
      skills: 'GitHub Copilot, AI Coding',
      pdfLink: '/certificates/github-copilot.pdf'
    },
    {
      id: 6,
      title: 'Practical GitHub Project Management',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '📊',
      color: '#0A66C2',
      skills: 'GitHub, Project Management',
      pdfLink: '/certificates/github-project-mgmt.pdf'
    },
    {
      id: 7,
      title: 'SEO Foundations',
      issuer: 'LinkedIn',
      date: 'Sep 2025',
      icon: '🔍',
      color: '#0A66C2',
      skills: 'SEO, Web Optimization',
      pdfLink: '/certificates/seo-foundations.pdf'
    },
    {
      id: 8,
      title: 'Introduction to Networking',
      issuer: 'NVIDIA',
      date: 'Aug 2025',
      icon: '🌐',
      color: '#76B900',
      skills: 'Networking Fundamentals',
      pdfLink: '/certificates/nvidia-networking.pdf'
    },
    {
      id: 9,
      title: 'Intro to Operating Systems: Virtualization',
      issuer: 'Codio',
      date: 'Nov 2024',
      icon: '💻',
      color: '#FF6B35',
      skills: 'OS, Virtualization',
      pdfLink: '/certificates/os-virtualization.pdf'
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
          <button onClick={() => scrollToSection(2)} className="nav-item">Experience</button>
          <button onClick={() => scrollToSection(5)} className="nav-item">Projects</button>
          <button onClick={() => scrollToSection(6)} className="nav-item">Contact</button>
        </div>
        <a 
          href="/resume-nabin-chapagain.pdf" 
          download="Nabin_Chapagain_Resume.pdf"
          className="nav-resume-button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Resume</span>
        </a>
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
            <span className="title-line">Nabin</span>
            <span className="title-line gradient-title">Chapagain</span>
          </h1>

          <p className="hero-subtitle">
            BTech CS Student at Jain University
            <br />
            Full-Stack Developer | 3D Web Enthusiast | #1 on Coding Ninjas
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
              <div className="metric-value">#1</div>
              <div className="metric-label">Coding Ninjas Rank</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <div className="metric-value">10+</div>
              <div className="metric-label">Certifications</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <div className="metric-value">6M</div>
              <div className="metric-label">Internship Extended</div>
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
            About
            <span className="gradient-title"> Me</span>
          </h2>
          <p className="section-subtitle">
            Web enthusiast turning ideas into real, working applications
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              Hi there! I'm a web enthusiast who loves turning ideas into real, working applications. 
              My main tools of choice are <strong>React, Next.js, Node.js, TypeScript, Express.js</strong> and <strong>MongoDB</strong>, 
              with <strong>Tailwind CSS</strong> for that clean, modern look. I focus on building apps that are not just 
              functional but also easy and enjoyable to use.
            </p>
            <p className="about-paragraph">
              Right now, I'm studying <strong>Computer Science at Jain (Deemed-to-be University)</strong>, where I'm 
              blending theory with hands-on experience by working on personal projects and solving real problems. 
              I enjoy learning new tech, tackling challenges, and finding clever solutions that make life easier for users.
            </p>
            <p className="about-paragraph">
              I believe good software doesn't need to be complicated – it should just work. And I'm on a mission 
              to build exactly that. <strong>Always coding, always improving, always curious.</strong>
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
                {job.highlight && (
                  <div className="job-highlight">{job.highlight}</div>
                )}
                <p className="job-description">{job.description}</p>
                {job.achievements && (
                  <div className="job-achievements">
                    <h5 className="achievements-title">Key Achievements:</h5>
                    <ul className="achievements-list">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="job-tech">
                  {job.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                {job.offerLetter && (
                  <a href="/offer-letter-octanet.pdf" download className="offer-letter-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V4C3 3.45 3.19567 2.979 3.587 2.587C3.979 2.19567 4.45 2 5 2H14L21 9V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM13 10V4H5V20H19V10H13Z" fill="currentColor"/>
                    </svg>
                    View Offer Letter
                  </a>
                )}
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
              <p className="cert-skills">{cert.skills}</p>
              <span className="cert-date">{cert.date}</span>
              <a href={cert.pdfLink} download className="cert-download-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download PDF
              </a>
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
                  <div className="project-overlay-buttons">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-view-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    {project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-view-button live-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-info">
                {project.recognition && (
                  <div className="project-recognition">{project.recognition}</div>
                )}
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
            <a href="https://github.com/nabin00012" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nabin-chapagain-nab12in/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://www.codingninjas.com/studio/profile/nabin00012" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
              Coding Ninjas #1
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>© 2025 Nabin Chapagain | BTech CS @ Jain University | Built with React, Three.js & ❤️</p>
        <div className="footer-links">
          <a href="https://github.com/nabin00012" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/nabin-chapagain-nab12in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <a href="/resume-nabin-chapagain.pdf" download>Resume</a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
