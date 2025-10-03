import React, { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import ThreeBackground from './ThreeBackground';
import './Portfolio.css';

const Portfolio = () => {
  const scrollY = useSmoothScroll(0.1); // Custom smooth scroll with momentum
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const progress = (scrollY / scrollableHeight) * 100;
    setScrollProgress(Math.min(progress, 100));
  }, [scrollY]);

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Neural Network Dashboard',
      description: 'Real-time AI monitoring system with predictive analytics and deep learning visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      tags: ['AI', 'Python', 'TensorFlow', 'React'],
      year: '2024',
    },
    {
      id: 2,
      title: 'Metaverse Platform',
      description: 'Immersive 3D virtual world with blockchain integration and real-time multiplayer',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
      tags: ['Web3', 'Three.js', 'Solidity', 'WebRTC'],
      year: '2024',
    },
    {
      id: 3,
      title: 'Quantum Computing UI',
      description: 'Interface for quantum algorithm development with real-time qubit visualization',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
      tags: ['Quantum', 'React', 'D3.js', 'WebGL'],
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
    <div className="portfolio-container">
      {/* Three.js 3D Background */}
      <ThreeBackground />

      {/* Scroll Progress */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <div className="nav-brand">
          <span className="brand-text">NC</span>
          <span className="brand-dot"></span>
        </div>
        <div className="nav-menu">
          <a href="#work" className="nav-item">Work</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>
        </div>
        <button className="nav-cta-button">
          <span>Let's Talk</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-content"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 700),
          }}
        >
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
            <button className="primary-button">
              <span>View Selected Work</span>
              <div className="button-glow"></div>
            </button>
            <button className="secondary-button">
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

        <div 
          className="scroll-hint"
          style={{
            opacity: Math.max(0, 1 - scrollY / 400),
          }}
        >
          <div className="scroll-line-wrapper">
            <div className="scroll-line"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div 
          className="section-header"
          style={{
            transform: `translateY(${(scrollY - 600) * 0.2}px)`,
          }}
        >
          <h2 className="section-title">
            Building the
            <span className="gradient-title"> Future</span>
          </h2>
          <p className="section-subtitle">
            Blending creativity with code to craft experiences that push boundaries
          </p>
        </div>

        <div className="about-content">
          <div 
            className="about-text"
            style={{
              transform: `translateY(${(scrollY - 700) * 0.15}px)`,
            }}
          >
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
              <div 
                key={index} 
                className="skill-item"
                style={{
                  transform: `translateY(${(scrollY - 900) * 0.1}px)`,
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
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

      {/* Projects Section */}
      <section className="projects-section" id="work">
        <div className="section-header">
          <h2 className="section-title">
            Selected
            <span className="gradient-title"> Work</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of my most impactful projects
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{
                transform: `translateY(${(scrollY - 1400 - index * 200) * 0.08}px)`,
              }}
            >
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

      {/* Contact Section */}
      <section className="contact-section" id="contact">
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
