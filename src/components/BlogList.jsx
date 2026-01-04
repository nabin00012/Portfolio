import React, { useState, useEffect, useRef } from 'react';
import './BlogList.css';

const BlogList = () => {
    const [selectedPillar, setSelectedPillar] = useState('all');
    const [hoveredArticle, setHoveredArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Blog articles data - matching the 5 high-impact posts with optimized titles
    const blogArticles = [
        {
            id: 1,
            title: "Zero-Downtime Deployments: Orchestrating MERN Apps with Kubernetes StatefulSets",
            excerpt: "Master production-grade deployments with zero downtime. Learn to orchestrate MERN applications using Kubernetes StatefulSets, GitHub Actions CI/CD, and automated rolling updates for enterprise-scale reliability.",
            pillar: "operational-readiness",
            project: "MERN-CI-CD-Kube",
            technologies: ["Kubernetes", "Docker", "GitHub Actions", "MongoDB"],
            readTime: "12 min read",
            publishedAt: "2025-01-15",
            featured: true,
            slug: "kubernetes-zero-downtime-deployments",
            metrics: ["99.9% uptime", "Zero downtime", "Auto-scaling"],
            icon: "🚀",
            difficulty: "Advanced",
            category: "DevOps & Infrastructure"
        },
        {
            id: 2,
            title: "Military-Grade Encryption in Production: Implementing AES-256-GCM with RSA Key Wrapping",
            excerpt: "Secure financial applications with military-grade encryption. Implement AES-256-GCM with RSA key wrapping, Zero-Trust architecture, and comprehensive audit trails for enterprise security compliance.",
            pillar: "security-domain",
            project: "SecureFinData",
            technologies: ["AES-256-GCM", "RSA", "Zero-Trust", "RBAC"],
            readTime: "15 min read",
            publishedAt: "2025-01-12",
            featured: true,
            slug: "aes-256-gcm-encryption",
            metrics: ["Military-grade", "Zero-Trust", "Audit trails"],
            icon: "🔒",
            difficulty: "Expert",
            category: "Security & Cryptography"
        },
        {
            id: 3,
            title: "Test-Driven Development in High-Stakes Environments: Achieving 85%+ Coverage with Jest",
            excerpt: "Master TDD for critical applications. Learn advanced Jest testing patterns, achieve 85%+ coverage, and implement robust testing strategies for production-ready financial systems.",
            pillar: "quality-assurance",
            project: "SecureFinData",
            technologies: ["Jest", "TDD", "Unit Testing", "Coverage"],
            readTime: "10 min read",
            publishedAt: "2025-01-10",
            featured: true,
            slug: "tdd-high-stakes-environments",
            metrics: ["85%+ coverage", "Zero bugs", "TDD workflow"],
            icon: "✅",
            difficulty: "Intermediate",
            category: "Testing & Quality"
        },
        {
            id: 4,
            title: "Gas-Optimized Smart Contracts: Building Production-Ready DApps with Web3.js Integration",
            excerpt: "Build enterprise-grade DApps with optimized smart contracts. Master Web3.js integration, gas optimization techniques, and real-time blockchain event handling for scalable DeFi applications.",
            pillar: "web3-dapp",
            project: "FluxTrade",
            technologies: ["Web3.js", "Solidity", "Gas Optimization", "DeFi"],
            readTime: "18 min read",
            publishedAt: "2025-01-08",
            featured: true,
            slug: "gas-optimized-smart-contracts",
            metrics: ["Gas optimized", "DeFi ready", "Event listening"],
            icon: "🌐",
            difficulty: "Advanced",
            category: "Web3 & Blockchain"
        },
        {
            id: 5,
            title: "Next.js 14 Performance Optimization: SSR, TypeScript, and Core Web Vitals Mastery",
            excerpt: "Achieve lightning-fast web applications with Next.js 14. Master Server-Side Rendering, TypeScript integration, and Core Web Vitals optimization for superior user experience and SEO performance.",
            pillar: "architecture",
            project: "CodeCommons",
            technologies: ["Next.js 14", "TypeScript", "SSR", "Performance"],
            readTime: "14 min read",
            publishedAt: "2025-01-05",
            featured: true,
            slug: "nextjs-14-performance-optimization",
            metrics: ["90% faster", "Perfect CWV", "SSR optimized"],
            icon: "⚡",
            difficulty: "Advanced",
            category: "Frontend Architecture"
        }
    ];

    const pillars = [
        { id: 'all', name: 'All Articles', icon: '📚', color: '#00d4ff' },
        { id: 'operational-readiness', name: 'Operational Readiness', icon: '🚀', color: '#00d4ff' },
        { id: 'security-domain', name: 'Security Domain', icon: '🔒', color: '#ff0080' },
        { id: 'quality-assurance', name: 'Quality Assurance', icon: '✅', color: '#00ff88' },
        { id: 'web3-dapp', name: 'Web3/DApp', icon: '🌐', color: '#ff6b00' },
        { id: 'architecture', name: 'Architecture', icon: '⚡', color: '#8b5cf6' }
    ];

    const filteredArticles = selectedPillar === 'all'
        ? blogArticles
        : blogArticles.filter(article => article.pillar === selectedPillar);

    const getPillarConfig = (pillar) => {
        const configs = {
            'operational-readiness': {
                gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                bgColor: 'rgba(0, 212, 255, 0.1)',
                borderColor: '#00d4ff'
            },
            'security-domain': {
                gradient: 'linear-gradient(135deg, #ff0080 0%, #ff4444 100%)',
                bgColor: 'rgba(255, 0, 128, 0.1)',
                borderColor: '#ff0080'
            },
            'quality-assurance': {
                gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                bgColor: 'rgba(0, 255, 136, 0.1)',
                borderColor: '#00ff88'
            },
            'web3-dapp': {
                gradient: 'linear-gradient(135deg, #ff6b00 0%, #ff9900 100%)',
                bgColor: 'rgba(255, 107, 0, 0.1)',
                borderColor: '#ff6b00'
            },
            'architecture': {
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                bgColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: '#8b5cf6'
            }
        };
        return configs[pillar] || configs['operational-readiness'];
    };

    return (
        <div className={`blog-list-container ${isLoaded ? 'loaded' : ''}`} ref={containerRef}>
            {/* Animated Background Elements */}
            <div className="blog-background">
                <div className="floating-orbs">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={`orb orb-${i + 1}`} style={{ '--delay': `${i * 0.5}s` }} />
                    ))}
                </div>
                <div className="grid-pattern"></div>
            </div>

            {/* Header Section */}
            <header className="blog-header">
                <div className="blog-header-content">
                    <div className="blog-badge">
                        <span className="badge-icon">📝</span>
                        <span className="badge-text">Engineering Insights</span>
                        <div className="badge-glow"></div>
                    </div>

                    <h1 className="blog-title">
                        <span className="title-line">Technical</span>
                        <span className="title-line gradient-title">Deep Dives</span>
                    </h1>

                    <p className="blog-subtitle">
                        From showcase to thought leadership. Explore the engineering decisions,
                        architectural choices, and measurable outcomes behind production-grade applications.
                    </p>

                    <div className="blog-stats">
                        <div className="stat-item">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Expert Articles</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Core Pillars</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Production Tested</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pillar Filter */}
            <div className="pillar-filter">
                <div className="filter-container">
                    {pillars.map((pillar) => (
                        <button
                            key={pillar.id}
                            className={`pillar-button ${selectedPillar === pillar.id ? 'active' : ''}`}
                            onClick={() => setSelectedPillar(pillar.id)}
                            style={{
                                '--pillar-color': pillar.color,
                                '--pillar-gradient': getPillarConfig(pillar.id).gradient
                            }}
                        >
                            <span className="pillar-icon">{pillar.icon}</span>
                            <span className="pillar-name">{pillar.name}</span>
                            {selectedPillar === pillar.id && (
                                <div className="pillar-glow"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="articles-grid">
                {filteredArticles.map((article, index) => {
                    const pillarConfig = getPillarConfig(article.pillar);

                    return (
                        <article
                            key={article.id}
                            className={`article-card ${hoveredArticle === article.id ? 'hovered' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setHoveredArticle(article.id)}
                            onMouseLeave={() => setHoveredArticle(null)}
                        >
                            {/* Floating Particles */}
                            <div className="article-particles">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="particle"
                                        style={{
                                            '--particle-delay': `${i * 0.2}s`,
                                            '--particle-color': pillarConfig.borderColor
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Pillar Badge */}
                            <div
                                className="pillar-badge"
                                style={{
                                    background: pillarConfig.gradient,
                                    borderColor: pillarConfig.borderColor
                                }}
                            >
                                <span className="pillar-badge-icon">{article.icon}</span>
                                <span className="pillar-badge-text">
                                    {pillars.find(p => p.id === article.pillar)?.name}
                                </span>
                            </div>

                            {/* Article Content */}
                            <div className="article-content">
                                <div className="article-meta">
                                    <span className="article-date">{article.publishedAt}</span>
                                    <span className="article-read-time">{article.readTime}</span>
                                    {article.featured && (
                                        <span className="featured-badge">Featured</span>
                                    )}
                                </div>

                                <h2 className="article-title">{article.title}</h2>
                                <p className="article-excerpt">{article.excerpt}</p>

                                {/* Project Integration Widget */}
                                <div
                                    className="project-widget"
                                    style={{
                                        background: pillarConfig.bgColor,
                                        borderColor: pillarConfig.borderColor
                                    }}
                                >
                                    <div className="project-widget-header">
                                        <span className="project-icon">🔗</span>
                                        <span className="project-name">{article.project}</span>
                                    </div>
                                    <div className="project-metrics">
                                        {article.metrics.map((metric, idx) => (
                                            <span key={idx} className="metric-tag">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="article-technologies">
                                    {article.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Read More Button - Inside content for proper flex */}
                                <div className="article-actions">
                                    <a
                                        href={`/article?slug=${article.slug}`}
                                        className="read-more-button"
                                        style={{
                                            '--button-gradient': pillarConfig.gradient,
                                            '--button-color': pillarConfig.borderColor
                                        }}
                                    >
                                        <span>Read Article</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div
                                className="article-glow"
                                style={{
                                    background: `radial-gradient(circle at center, ${pillarConfig.borderColor}20 0%, transparent 70%)`
                                }}
                            />
                        </article>
                    );
                })}
            </div>

            {/* Call to Action */}
            <div className="blog-cta">
                <div className="cta-content">
                    <h3 className="cta-title">Ready to dive deeper?</h3>
                    <p className="cta-subtitle">
                        Each article includes live code examples, architecture diagrams, and production metrics.
                    </p>
                    <button className="cta-button">
                        <span>Explore All Articles</span>
                        <div className="button-glow"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
