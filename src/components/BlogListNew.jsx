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
            title: "From Main Branch to Microservice: Orchestrating Zero-Downtime MERN Deployments with Kubernetes",
            excerpt: "Traditional deployments often require service restarts, leading to unacceptable SLA violations. Learn how to leverage Kubernetes RollingUpdate Strategy for zero-downtime deployments with automated GitHub Actions CI/CD pipeline orchestration.",
            pillar: "operational-readiness",
            project: "MERN-CI-CD-Kube",
            technologies: ["Kubernetes", "RollingUpdate", "CI/CD", "Zero-Downtime"],
            readTime: "12 min read",
            publishedAt: "2025-01-15",
            featured: true,
            slug: "kubernetes-zero-downtime-deployments",
            metrics: ["99.99% uptime", "80% faster deployment", "Zero service interruption"],
            icon: "🚀",
            difficulty: "Advanced",
            category: "DevOps & Infrastructure"
        },
        {
            id: 2,
            title: "Military-Grade Data-at-Rest: Implementing AES-256-GCM with TDD Validation in a Fintech API",
            excerpt: "Financial platforms require military-grade security to protect sensitive documents. Learn how to implement AES-256-GCM (Authenticated Encryption) with Test-Driven Development workflow achieving 85%+ unit test coverage for rigorous security validation.",
            pillar: "security-domain",
            project: "SecureFinData",
            technologies: ["AES-256-GCM", "TDD", "Zero-Trust", "Jest"],
            readTime: "15 min read",
            publishedAt: "2025-01-12",
            featured: true,
            slug: "aes-256-gcm-encryption",
            metrics: ["Military-grade security", "85%+ test coverage", "Zero critical bugs"],
            icon: "🔒",
            difficulty: "Expert",
            category: "Security & Cryptography"
        },
        {
            id: 3,
            title: "Event-Driven DApps: Using Node.js/Express as a Real-Time Indexer for Solidity Contract Events",
            excerpt: "Direct blockchain reads for large datasets are slow and expensive. Learn how to use Node.js/Express as an Off-Chain Indexer that listens to Solidity Events using Web3.js, providing lightning-fast portfolio analytics without querying the blockchain.",
            pillar: "web3-dapp",
            project: "FluxTrade",
            technologies: ["Web3.js", "Solidity", "Event Listening", "Off-Chain Indexing"],
            readTime: "18 min read",
            publishedAt: "2025-01-10",
            featured: true,
            slug: "web3-event-indexing",
            metrics: ["< 100ms response", "Real-time updates", "Auditable data lineage"],
            icon: "🌐",
            difficulty: "Advanced",
            category: "Web3 & Blockchain"
        },
        {
            id: 4,
            title: "Architecting Educational SaaS: Achieving Performance and Type Safety with Next.js 14 & TypeScript",
            excerpt: "Building complex, interactive platforms faces dual challenges: slow initial load times and high risk of runtime errors. Learn how to enforce TypeScript across the stack and utilize Next.js 14 SSR for perfect Lighthouse scores and 90% error reduction.",
            pillar: "quality-assurance",
            project: "CodeCommons",
            technologies: ["Next.js 14", "TypeScript", "SSR", "Monaco Editor"],
            readTime: "14 min read",
            publishedAt: "2025-01-08",
            featured: true,
            slug: "nextjs-typescript-architecture",
            metrics: ["95+ Lighthouse Score", "90% error reduction", "Type safety"],
            icon: "✅",
            difficulty: "Advanced",
            category: "Frontend Architecture"
        },
        {
            id: 5,
            title: "Production-Ready MERN Stack: From Development to Enterprise Deployment",
            excerpt: "Scaling a MERN application from development to production requires careful orchestration of multiple services. Learn how to implement proper error handling, monitoring, and deployment strategies for enterprise-grade applications with 99.9% uptime.",
            pillar: "architecture",
            project: "CodeCommons",
            technologies: ["MERN Stack", "Production Deployment", "Monitoring", "Error Handling"],
            readTime: "16 min read",
            publishedAt: "2025-01-05",
            featured: true,
            slug: "mern-production-deployment",
            metrics: ["99.9% uptime", "Enterprise-grade", "Scalable architecture"],
            icon: "⚡",
            difficulty: "Expert",
            category: "Full-Stack Architecture"
        }
    ];

    const pillars = [
        { id: 'all', name: 'All Articles', icon: '📚', color: '#00d4ff' },
        { id: 'operational-readiness', name: 'Operational Readiness', icon: '🚀', color: '#00d4ff' },
        { id: 'security-domain', name: 'Security Domain', icon: '🔒', color: '#ff0080' },
        { id: 'quality-assurance', name: 'Quality Assurance', icon: '✅', color: '#00ff88' },
        { id: 'web3-dapp', name: 'Web3 & DApp', icon: '🌐', color: '#ff6b35' },
        { id: 'architecture', name: 'Architecture', icon: '⚡', color: '#9d4edd' }
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
                        <span className="title-accent">Insights</span>
                    </h1>
                    <p className="blog-subtitle">
                        Where code meets creativity • Technical deep-dives from the trenches of production systems
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
                        <span className="pillar-icon">{pillar.icon}</span>
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
                                <span className="tag-icon">{article.icon}</span>
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