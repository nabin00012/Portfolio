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
            category: "DevOps & Infrastructure",
            problemStatement: "Traditional deployments often require service restarts, leading to unacceptable Service Level Agreement (SLA) violations and poor user experience, especially for real-time applications like a chat service.",
            architecturalChoice: "We leverage Kubernetes' RollingUpdate Strategy for our client and API Deployments. This ensures the old version's Pods are drained only after new Pods are healthy, guaranteeing zero service interruption.",
            measurableOutcome: "Achieved 99.99% uptime for the RealChat service. Deployment time reduced by 80% (from 15 minutes to 3 minutes), now executed automatically on every push to the main branch with zero service interruption verified by K8s readiness probes."
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
            category: "Security & Cryptography",
            problemStatement: "Financial platforms require military-grade security to protect sensitive documents (Excel, PDF). Standard encryption without authentication (integrity check) and rigorous testing leaves the system vulnerable to data tampering and non-compliance.",
            architecturalChoice: "We chose AES-256-GCM (Authenticated Encryption) for both confidentiality and integrity. All cryptographic logic was developed using a Test-Driven Development (TDD) workflow with Jest, achieving 85%+ unit test coverage.",
            measurableOutcome: "Encryption of 300KB files achieved in ~10ms, maintaining high throughput. The TDD approach ensured zero critical security bugs in the cryptography module, validated by an immutable 85% unit test coverage baseline."
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
            category: "Web3 & Blockchain",
            problemStatement: "Direct blockchain reads for large datasets (like a user's entire trade history) are slow and expensive. DApps need a way to provide lightning-fast, real-time portfolio analytics without querying the blockchain for every metric.",
            architecturalChoice: "We use a dedicated Node.js/Express API layer as an Off-Chain Indexer. This API listens to key Solidity Events using Web3.js, aggregates the data, and stores it in MongoDB for fast querying.",
            measurableOutcome: "Portfolio loading time reduced from ~5 seconds (direct blockchain query) to < 100ms (indexed MongoDB API query). Successfully handles real-time updates for analytics dashboard and ensures auditable data lineage."
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
            category: "Frontend Architecture",
            problemStatement: "Building a complex, interactive platform (like a collaborative code editor) faces dual challenges: A) Slow initial load times (poor SEO/UX) due to heavy client-side rendering, and B) High risk of runtime errors in a large, multi-contributor codebase.",
            architecturalChoice: "We enforce TypeScript across the stack to virtually eliminate null/undefined errors. We utilize Next.js 14 Server-Side Rendering (SSR) for all static content to ensure a perfect Lighthouse Technical SEO score and fast FCP.",
            measurableOutcome: "Achieved a 95+ Lighthouse Performance Score by minimizing client-side load. Runtime errors were reduced by an estimated 90% due to mandatory TypeScript usage across all 150+ components, ensuring long-term maintainability."
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
            category: "Full-Stack Architecture",
            problemStatement: "Scaling a MERN application from development to production requires careful orchestration of multiple services, proper error handling, monitoring, and deployment strategies to ensure enterprise-grade reliability and performance.",
            architecturalChoice: "We implement a microservices architecture with proper separation of concerns, comprehensive error handling, real-time monitoring, and automated deployment pipelines with health checks and rollback capabilities.",
            measurableOutcome: "Achieved 99.9% uptime with enterprise-grade monitoring and alerting. Implemented comprehensive error tracking and automated recovery mechanisms, reducing manual intervention by 95% and ensuring seamless user experience."
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
            <main className="articles-grid">
                {filteredArticles.map((article, index) => {
                    const pillarConfig = getPillarConfig(article.pillar);

                    return (
                        <article
                            key={article.id}
                            className={`article-card ${hoveredArticle === article.id ? 'hovered' : ''}`}
                            style={{
                                animationDelay: `${index * 0.15}s`,
                                '--pillar-color': pillarConfig.borderColor,
                                '--pillar-gradient': pillarConfig.gradient
                            }}
                            onMouseEnter={() => setHoveredArticle(article.id)}
                            onMouseLeave={() => setHoveredArticle(null)}
                        >
                            {/* Card Background Effects */}
                            <div className="card-background">
                                <div className="card-gradient" style={{ background: pillarConfig.gradient }}></div>
                                <div className="card-pattern"></div>
                            </div>

                            {/* Floating Particles */}
                            <div className="article-particles">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="particle"
                                        style={{
                                            '--particle-delay': `${i * 0.3}s`,
                                            '--particle-color': pillarConfig.borderColor
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Card Header */}
                            <header className="card-header">
                                <div className="pillar-badge" style={{ background: pillarConfig.gradient }}>
                                    <span className="pillar-badge-icon">{article.icon}</span>
                                    <span className="pillar-badge-text">
                                        {pillars.find(p => p.id === article.pillar)?.name}
                                    </span>
                                </div>

                                <div className="article-meta">
                                    <div className="meta-left">
                                        <span className="article-date">{article.publishedAt}</span>
                                        <span className="article-read-time">{article.readTime}</span>
                                    </div>
                                    <div className="meta-right">
                                        {article.featured && (
                                            <span className="featured-badge">Featured</span>
                                        )}
                                        <span className="difficulty-badge" style={{
                                            background: article.difficulty === 'Expert' ? '#ff0080' :
                                                article.difficulty === 'Advanced' ? '#ff6b00' : '#00ff88',
                                            color: '#000'
                                        }}>
                                            {article.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </header>

                            {/* Card Content */}
                            <div className="card-content">
                                <div className="article-category">
                                    <span className="category-text">{article.category}</span>
                                </div>

                                <h2 className="article-title">{article.title}</h2>
                                <p className="article-excerpt">{article.excerpt}</p>

                                {/* Project Integration Widget */}
                                <div className="project-widget" style={{ borderColor: pillarConfig.borderColor }}>
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
                            </div>

                            {/* Card Footer */}
                            <footer className="card-footer">
                                <a
                                    href={`/article?slug=${article.slug}`}
                                    className="read-more-button"
                                    style={{ '--button-gradient': pillarConfig.gradient }}
                                >
                                    <span>Read Article</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </footer>

                            {/* Hover Glow Effect */}
                            <div
                                className="article-glow"
                                style={{
                                    background: `radial-gradient(circle at center, ${pillarConfig.borderColor}15 0%, transparent 70%)`
                                }}
                            />
                        </article>
                    );
                })}
            </main>

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
