import React, { useState, useEffect } from 'react';
import './BlogListNew.css';

const BlogListNew = () => {
    const [selectedPillar, setSelectedPillar] = useState('all');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Blog articles data - Production-ready technical deep dives showcasing real expertise
    const blogArticles = [
        {
            id: 1,
            title: "Zero-Downtime MERN Deployments with Kubernetes RollingUpdate",
            excerpt: "Standard deployments typically require service restarts, which can violate SLA windows. This documents how we configured Kubernetes RollingUpdate to avoid downtime during releases.",
            pillar: "operational-readiness",
            project: "MERN-CI-CD-Kube",
            technologies: ["Kubernetes", "RollingUpdate", "CI/CD"],
            readTime: "12 min read",
            publishedAt: "2025-01-15",
            featured: true,
            slug: "kubernetes-zero-downtime-deployments",
            metrics: ["~99.99% uptime", "~80% faster deploys", "No observed interruptions"],
            icon: "",
            difficulty: "Advanced",
            category: "DevOps"
        },
        {
            id: 2,
            title: "AES-256-GCM Implementation: Authenticated Encryption with TDD",
            excerpt: "Financial document storage requires encryption that covers both confidentiality and integrity. This documents how we implemented AES-256-GCM with a test-driven approach.",
            pillar: "security-domain",
            project: "SecureFinData",
            technologies: ["AES-256-GCM", "TDD", "Node.js Crypto", "Jest"],
            readTime: "15 min read",
            publishedAt: "2025-01-12",
            featured: true,
            slug: "aes-256-gcm-encryption",
            metrics: ["Authenticated encryption", "85%+ test coverage", "No critical bugs"],
            icon: "",
            difficulty: "Expert",
            category: "Security"
        },
        {
            id: 3,
            title: "Off-Chain Event Indexing for Solidity Contracts with Node.js",
            excerpt: "Querying blockchain state directly for large datasets is slow and expensive. This documents how we built an off-chain indexer that stores events in MongoDB for faster reads.",
            pillar: "web3-dapp",
            project: "FluxTrade",
            technologies: ["Web3.js", "Solidity", "MongoDB", "Event Indexing"],
            readTime: "18 min read",
            publishedAt: "2025-01-10",
            featured: true,
            slug: "web3-event-indexing",
            metrics: ["<100ms queries", "Event-driven sync", "Full history preserved"],
            icon: "",
            difficulty: "Advanced",
            category: "Web3"
        },
        {
            id: 4,
            title: "Next.js 14 SSR + TypeScript: Performance and Type Safety Tradeoffs",
            excerpt: "An interactive code editor platform faced slow initial loads and frequent runtime errors. This documents how we approached both with SSR and strict TypeScript.",
            pillar: "quality-assurance",
            project: "CodeCommons",
            technologies: ["Next.js 14", "TypeScript", "SSR", "Monaco Editor"],
            readTime: "14 min read",
            publishedAt: "2025-01-08",
            featured: true,
            slug: "nextjs-typescript-architecture",
            metrics: ["95+ Lighthouse", "~90% fewer errors", "150+ typed components"],
            icon: "",
            difficulty: "Advanced",
            category: "Frontend"
        },
        {
            id: 5,
            title: "Production MERN Stack: Error Handling and Observability Patterns",
            excerpt: "Moving a MERN application from local to production surfaced gaps in error handling and observability. This documents the patterns we added to make the system easier to debug.",
            pillar: "architecture",
            project: "CodeCommons",
            technologies: ["MERN Stack", "Winston", "Health Checks", "Error Handling"],
            readTime: "16 min read",
            publishedAt: "2025-01-05",
            featured: true,
            slug: "mern-production-deployment",
            metrics: ["~99.9% uptime", "Structured logging", "Health endpoints"],
            icon: "",
            difficulty: "Expert",
            category: "Architecture"
        }
    ];

    const pillars = [
        { id: 'all', name: 'All Articles', icon: '', color: '#00d4ff' },
        { id: 'operational-readiness', name: 'DevOps', icon: '', color: '#00d4ff' },
        { id: 'security-domain', name: 'Security', icon: '', color: '#ff0080' },
        { id: 'quality-assurance', name: 'Quality', icon: '', color: '#00ff88' },
        { id: 'web3-dapp', name: 'Web3', icon: '', color: '#ff6b35' },
        { id: 'architecture', name: 'Architecture', icon: '', color: '#9d4edd' }
    ];

    const filteredArticles = selectedPillar === 'all'
        ? blogArticles
        : blogArticles.filter(article => article.pillar === selectedPillar);

    const pillarConfig = {
        'operational-readiness': {
            gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)',
            borderColor: '#00d4ff',
            glowColor: '#00d4ff'
        },
        'security-domain': {
            gradient: 'linear-gradient(135deg, #ff0080, #cc0066)',
            borderColor: '#ff0080',
            glowColor: '#ff0080'
        },
        'quality-assurance': {
            gradient: 'linear-gradient(135deg, #00ff88, #00cc66)',
            borderColor: '#00ff88',
            glowColor: '#00ff88'
        },
        'web3-dapp': {
            gradient: 'linear-gradient(135deg, #ff6b35, #cc5528)',
            borderColor: '#ff6b35',
            glowColor: '#ff6b35'
        },
        'architecture': {
            gradient: 'linear-gradient(135deg, #9d4edd, #7b2cbf)',
            borderColor: '#9d4edd',
            glowColor: '#9d4edd'
        }
    };

    return (
        <div className="blog-list-container">
            {/* Clean Creative Header */}
            <div className="blog-header">
                <div className="header-content">
                    <h1 className="blog-title">
                        <span className="title-main">Engineering</span>
                        <span className="title-accent">Notes</span>
                    </h1>
                    <p className="blog-subtitle">
                        Implementation notes and architectural decisions from production systems
                    </p>
                    <div className="header-stats">
                        <div className="stat">
                            <span className="stat-number">5</span>
                            <span className="stat-label">Technical Articles</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">99.9%</span>
                            <span className="stat-label">Uptime Focus</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">85%+</span>
                            <span className="stat-label">Test Coverage</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clean Pillar Navigation */}
            <div className="pillar-navigation">
                {pillars.map((pillar) => (
                    <button
                        key={pillar.id}
                        className={`pillar-button ${selectedPillar === pillar.id ? 'active' : ''}`}
                        onClick={() => setSelectedPillar(pillar.id)}
                        style={{ '--pillar-color': pillar.color }}
                    >
                        {pillar.icon && <span className="pillar-icon">{pillar.icon}</span>}
                        <span className="pillar-name">{pillar.name}</span>
                    </button>
                ))}
            </div>

            {/* Clean Article Grid */}
            <div className="articles-grid">
                {filteredArticles.map((article, index) => {
                    const config = pillarConfig[article.pillar] || pillarConfig['operational-readiness'];
                    return (
                        <article
                            key={article.id}
                            className={`article-card ${isLoaded ? 'loaded' : ''}`}
                            style={{
                                '--card-gradient': config.gradient,
                                '--card-border': config.borderColor,
                                '--card-glow': config.glowColor,
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Pillar Tag */}
                            <div className="pillar-tag" style={{ background: config.gradient }}>
                                {article.icon && <span className="tag-icon">{article.icon}</span>}
                                <span className="tag-text">{article.category}</span>
                            </div>

                            {/* Article Content */}
                            <div className="article-content">
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-excerpt">{article.excerpt}</p>

                                {/* Technology Tags */}
                                <div className="tech-tags">
                                    {article.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Metrics */}
                                <div className="metrics-display">
                                    {article.metrics.map((metric, metricIndex) => (
                                        <div key={metricIndex} className="metric-item">
                                            {metric}
                                        </div>
                                    ))}
                                </div>

                                {/* Read More Button */}
                                <a
                                    href={`/article?slug=${article.slug}`}
                                    className="read-more-button"
                                    style={{
                                        background: config.gradient,
                                        borderColor: config.borderColor
                                    }}
                                >
                                    <span>Read Article</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogListNew;