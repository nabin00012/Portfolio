import React from 'react';
import './CertificatesPage.css';

const CertificatesPage = () => {
  const certifications = [
    {
      id: 1,
      title: 'Microsoft Azure AI Essentials Professional Certificate',
      issuer: 'Microsoft & LinkedIn',
      icon: '☁️',
      color: '#0078D4',
      skills: 'AI API Integration, Azure Cognitive Services, OpenAI API, NLP, ML Models',
      pdfLink: '/certificates/azure-ai-essentials.pdf',
      thumbnail: '/images/nabinchapagain-azure-ai-essentials-cert.png',
      isImage: true
    },
    {
      id: 2,
      title: 'Microsoft Azure AI Essentials: Workloads and ML',
      issuer: 'LinkedIn',
      icon: '🤖',
      color: '#0A66C2',
      skills: 'Azure AI Foundry, ML Deployment, Model Integration, REST APIs',
      pdfLink: '/certificates/azure-ml-workloads.pdf',
      thumbnail: '/images/nabinchapagain-azure-ml-workloads-cert.png',
      isImage: true
    },
    {
      id: 3,
      title: 'Practical GitHub Actions',
      issuer: 'LinkedIn',
      icon: '⚙️',
      color: '#2088FF',
      skills: 'GitHub, CI/CD',
      pdfLink: '/certificates/github-actions.pdf',
      thumbnail: '/images/nabinchapagain-github-actions-cert.png',
      isImage: true
    },
    {
      id: 4,
      title: 'Practical GitHub Code Search',
      issuer: 'LinkedIn',
      icon: '🔍',
      color: '#2088FF',
      skills: 'GitHub',
      pdfLink: '/certificates/github-code-search.pdf',
      thumbnail: '/images/nabinchapagain-github-code-search-cert.png',
      isImage: true
    },
    {
      id: 5,
      title: 'Practical GitHub Copilot',
      issuer: 'LinkedIn',
      icon: '🤖',
      color: '#2088FF',
      skills: 'GitHub Copilot, AI Coding',
      pdfLink: '/certificates/github-copilot.pdf',
      thumbnail: '/images/nabinchapagain-github-copilot-cert.png',
      isImage: true
    },
    {
      id: 6,
      title: 'Practical GitHub Project Management',
      issuer: 'LinkedIn',
      icon: '📊',
      color: '#0A66C2',
      skills: 'GitHub, Project Management',
      pdfLink: '/certificates/github-project-mgmt.pdf',
      thumbnail: '/images/nabinchapagain-github-project-mgmt-cert.png',
      isImage: true
    },
    {
      id: 7,
      title: 'SEO Foundations',
      issuer: 'LinkedIn',
      icon: '⚡',
      color: '#0A66C2',
      skills: 'Technical SEO, Next.js Performance, Core Web Vitals, Structured Data',
      pdfLink: '/certificates/seo-foundations.pdf',
      thumbnail: '/images/nabinchapagain-seo-foundations-cert.png',
      isImage: true
    },
    {
      id: 8,
      title: 'Introduction to Networking',
      issuer: 'NVIDIA',
      icon: '🌐',
      color: '#76B900',
      skills: 'Networking Fundamentals',
      pdfLink: '/images/nabinchapagain-nvidia-cert.png',
      thumbnail: '/images/nabinchapagain-nvidia-cert.png',
      isImage: true
    },
    {
      id: 9,
      title: 'Intro to Operating Systems: Virtualization',
      issuer: 'Codio',
      icon: '💻',
      color: '#FF6B35',
      skills: 'OS, Virtualization',
      pdfLink: '/images/nabinchapagain-codio-cert.png',
      thumbnail: '/images/nabinchapagain-codio-cert.png',
      isImage: true
    },
    {
      id: 10,
      title: 'Node.js Essential Training',
      issuer: 'LinkedIn',
      icon: '🟢',
      color: '#339933',
      skills: 'Node.js, Server-side JavaScript',
      pdfLink: '/certificates/nodejs-essential-training.pdf',
      thumbnail: '/images/nabinchapagain-nodejs-essential-training-cert.png',
      isImage: true
    },
  ];

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="certificates-page">
      <header className="certificates-header">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Home
        </button>
        <h1 className="certificates-title">
          Certificates & <span className="gradient-text">Achievements</span>
        </h1>
        <p className="certificates-subtitle">
          Industry-recognized credentials and leaderboard highlights
        </p>
      </header>

      <div className="certificates-grid">
        {/* Coding Ninjas Leaderboard Achievement Card */}
        <div className="cert-card">
          <a href="/images/nabinchapagain-codingninjas-leaderboard.png" target="_blank" rel="noopener noreferrer" className="cert-thumbnail-wrapper" style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              src="/images/nabinchapagain-codingninjas-leaderboard.png" 
              alt="Nabin Chapagain - Coding Ninjas Code360 Leaderboard Rank 1" 
              className="cert-thumbnail" 
              style={{ objectFit: 'cover', background: '#fff' }}
              loading="lazy"
            />
            <div className="cert-thumbnail-overlay">
              <span className="view-full-text">View Leaderboard</span>
            </div>
          </a>
          <div className="cert-content">
            <div className="cert-icon-wrapper" style={{ background: '#FF660020', borderColor: '#FF6600' }}>
              <span className="cert-icon" style={{ color: '#FF6600' }}>🏆</span>
            </div>
            <h3 className="cert-title">Coding Ninjas Code360 Leaderboard</h3>
            <p className="cert-issuer">Ranked 1st • Code360 Weekly Challenge</p>
            <p className="cert-skills">Competitive Programming, Problem Solving, Consistency</p>
            <a href="/images/nabinchapagain-codingninjas-leaderboard.png" target="_blank" rel="noopener noreferrer" className="cert-view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
              </svg>
              View Leaderboard
            </a>
          </div>
        </div>

        {/* Certificates */}
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer" className="cert-thumbnail-wrapper" style={{ display: 'block', cursor: 'pointer' }}>
              <img src={cert.thumbnail} alt={`Nabin Chapagain - ${cert.title} Certificate`} className="cert-thumbnail" loading="lazy" />
              <div className="cert-thumbnail-overlay">
                <span className="view-full-text">Click to view full certificate</span>
              </div>
            </a>
            <div className="cert-content">
              <div className="cert-icon-wrapper" style={{ background: `${cert.color}20`, borderColor: cert.color }}>
                <span className="cert-icon" style={{ color: cert.color }}>{cert.icon}</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-skills">{cert.skills}</p>
              <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer" className="cert-view-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
                </svg>
                View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesPage;
