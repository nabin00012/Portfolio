import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './Portfolio.css';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const lenisRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

    // Initialize Lenis smooth scroll with enhanced settings
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.07, // Lower = smoother and more momentum (0.1 default, 0.05-0.07 for buttery smooth)
            duration: 1.5, // Longer duration for more weight
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scroll / scrollableHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', handleMouseMove);
    
    // Add cursor hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

    // Intersection Observer for fade-in animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

  // Projects data with categories
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory and payment processing',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'web',
      year: '2024',
    },
    {
      id: 2,
      title: 'AI Analytics Dashboard',
      description: 'Machine learning powered analytics with predictive insights and data visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
      category: 'ai',
      year: '2024',
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'Real-time social platform with messaging, stories, and AI-powered content moderation',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['React Native', 'Firebase', 'WebRTC'],
      category: 'mobile',
      year: '2023',
    },
    {
      id: 4,
      title: 'Blockchain Wallet',
      description: 'Secure cryptocurrency wallet with multi-chain support and DeFi integration',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      tags: ['Web3', 'Solidity', 'React', 'Ethers.js'],
      category: 'web3',
      year: '2023',
    },
    {
      id: 5,
      title: 'Design System',
      description: 'Comprehensive UI component library with documentation and Figma integration',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      tags: ['React', 'Storybook', 'TypeScript', 'Figma'],
      category: 'design',
      year: '2024',
    },
    {
      id: 6,
      title: 'Real-time Collaboration Tool',
      description: 'Multiplayer workspace with live cursors, comments, and version control',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      tags: ['WebSocket', 'React', 'Node.js', 'Redis'],
      category: 'web',
      year: '2023',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

    // Skills data
    const skills = [
        { icon: '⚛️', name: 'React', level: 95 },
        { icon: '📱', name: 'React Native', level: 90 },
        { icon: '🟢', name: 'Node.js', level: 92 },
        { icon: '🐍', name: 'Python', level: 88 },
        { icon: '🎨', name: 'UI/UX Design', level: 85 },
        { icon: '☁️', name: 'Cloud (AWS)', level: 87 },
        { icon: '🔗', name: 'Blockchain', level: 82 },
        { icon: '🤖', name: 'AI/ML', level: 80 },
    ];

  // Text scramble effect
  const scrambleText = (element, finalText) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    
    const interval = setInterval(() => {
      element.innerText = finalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <div className="portfolio">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${cursorVariant}`}
      ></div>
      <div 
        ref={cursorDotRef}
        className="custom-cursor-dot"
      ></div>

      {/* Scroll Progress */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Animated Navigation */}
      <nav className="main-nav">
        <div className="nav-logo">
          <span className="logo-text">NC</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <button className="nav-cta magnetic-btn">Let's Talk</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
                <div className="hero-background">
                    <div
                        className="gradient-orb orb-1"
                        style={{
                            transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
                        }}
                    />
                    <div
                        className="gradient-orb orb-2"
                        style={{
                            transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.25}px) scale(${1 + scrollY * 0.0003})`,
                        }}
                    />
                    <div
                        className="gradient-orb orb-3"
                        style={{
                            transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.4}px)`,
                        }}
                    />
                    <div className="noise-overlay"></div>
                </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for Freelance
          </div>
          <h1 
            className="hero-title"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0, 1 - scrollY / 600),
            }}
          >
            Building Digital
            <br />
            <span className="gradient-text typing-effect">Experiences</span>
          </h1>
          <p 
            className="hero-subtitle"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 500),
            }}
          >
            Award-winning developer & designer crafting
            <br />
            immersive web experiences that captivate
          </p>
          <div 
            className="hero-cta"
            style={{
              transform: `translateY(${scrollY * 0.25}px)`,
              opacity: Math.max(0, 1 - scrollY / 450),
            }}
          >
            <button className="cta-button primary magnetic-btn">
              <span>Explore Work</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="cta-button secondary magnetic-btn">
              <span>Get in Touch</span>
            </button>
          </div>
          
          {/* Hero Stats */}
          <div 
            className="hero-stats"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 400),
            }}
          >
            <div className="stat-box">
              <h3 className="stat-number">50+</h3>
              <p className="stat-text">Projects Delivered</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <h3 className="stat-number">5+</h3>
              <p className="stat-text">Years Experience</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <h3 className="stat-number">15+</h3>
              <p className="stat-text">Awards Won</p>
            </div>
          </div>
        </div>
                <div
                    className="scroll-indicator"
                    style={{
                        opacity: Math.max(0, 1 - scrollY / 300),
                    }}
                >
                    <div className="scroll-line"></div>
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section fade-in-section" ref={aboutRef}>
                <div className="about-background">
                    <div
                        className="gradient-orb orb-4"
                        style={{
                            transform: `translate(${(scrollY - 800) * 0.1}px, ${(scrollY - 800) * 0.2}px)`,
                        }}
                    />
                    <div
                        className="gradient-orb orb-5"
                        style={{
                            transform: `translate(${-(scrollY - 800) * 0.15}px, ${(scrollY - 800) * 0.15}px)`,
                        }}
                    />
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <p className="about-description">
                            I'm a passionate full-stack developer with a keen eye for design and a love for creating
                            seamless digital experiences. With over 5 years of experience, I specialize in building
                            modern web applications that combine stunning visuals with robust functionality.
                        </p>
                        <p className="about-description">
                            My approach is simple: understand the problem, design the solution, and deliver excellence.
                            I believe in clean code, intuitive interfaces, and experiences that leave a lasting impression.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <h3 className="stat-number">50+</h3>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">5+</h3>
                                <p className="stat-label">Years Experience</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">30+</h3>
                                <p className="stat-label">Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

      {/* Projects Section */}
      <section className="projects-section fade-in-section" id="work" ref={projectsRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Selected <span className="gradient-text">Works</span>
            </h2>
            <div className="project-filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Work
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                onClick={() => setActiveFilter('web')}
              >
                Web Apps
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveFilter('mobile')}
              >
                Mobile
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'web3' ? 'active' : ''}`}
                onClick={() => setActiveFilter('web3')}
              >
                Web3
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
                onClick={() => setActiveFilter('design')}
              >
                Design
              </button>
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card tilt-card"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="project-number">0{index + 1}</div>
                <div className="project-year">{project.year}</div>
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <button className="project-view-btn magnetic-btn">
                      <span>View Project</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                  </div>
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
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section fade-in-section" ref={skillsRef}>
                <div className="container">
                    <h2 className="section-title">
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="skill-card"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <div className="skill-icon">{skill.icon}</div>
                                <h3 className="skill-name">{skill.name}</h3>
                                <div className="skill-bar">
                                    <div
                                        className="skill-progress"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                                <span className="skill-level">{skill.level}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section fade-in-section" ref={contactRef}>
                <div className="container">
                    <h2 className="section-title">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="contact-subtitle">
                        Have a project in mind? Let's bring your ideas to life.
                    </p>
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="How can I help?"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder="Tell me about your project..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                    <div className="social-links">
                        <a href="#" className="social-link">GitHub</a>
                        <a href="#" className="social-link">LinkedIn</a>
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">Dribbble</a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 Your Name. Designed & Built with passion.</p>
            </footer>
        </div>
    );
};

export default Portfolio;

