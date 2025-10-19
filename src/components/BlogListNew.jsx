import React, { useState, useEffect, useRef } from 'react';
import './BlogListNew.css';

const BlogListNew = () => {
    const [selectedPillar, setSelectedPillar] = useState('all');
    const [hoveredArticle, setHoveredArticle] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeNeuralNode, setActiveNeuralNode] = useState(null);
    const [quantumState, setQuantumState] = useState(0);
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        setIsLoaded(true);

        // Initialize quantum particle system
        initQuantumParticles();

        // Start neural network animation
        startNeuralAnimation();

        // Initialize matrix rain
        initMatrixRain();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            updateParticleField(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const initQuantumParticles = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create quantum particles
        particlesRef.current = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
            quantum: Math.random() * Math.PI * 2
        }));

        animateQuantumParticles();
    };

    const animateQuantumParticles = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle, i) => {
            // Quantum field effects
            particle.quantum += 0.02;
            particle.x += particle.vx + Math.sin(particle.quantum) * 0.1;
            particle.y += particle.vy + Math.cos(particle.quantum) * 0.1;

            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle with quantum glow
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.shadowBlur = 20;
            ctx.shadowColor = particle.color;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Draw connections to nearby particles
            particlesRef.current.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });

        animationRef.current = requestAnimationFrame(animateQuantumParticles);
    };

    const updateParticleField = (mouseX, mouseY) => {
        particlesRef.current.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150 * 0.5;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
        });
    };

    const startNeuralAnimation = () => {
        setInterval(() => {
            setQuantumState(prev => (prev + 1) % 360);
        }, 50);
    };

    const initMatrixRain = () => {
        // Matrix rain effect will be handled by CSS animations
    };

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
        { id: 'all', name: 'All Articles', icon: '📚', color: '#00d4ff', neuralPattern: 'spiral' },
        { id: 'operational-readiness', name: 'Operational Readiness', icon: '🚀', color: '#00d4ff', neuralPattern: 'grid' },
        { id: 'security-domain', name: 'Security Domain', icon: '🔒', color: '#ff0080', neuralPattern: 'hexagon' },
        { id: 'quality-assurance', name: 'Quality Assurance', icon: '✅', color: '#00ff88', neuralPattern: 'triangle' },
        { id: 'web3-dapp', name: 'Web3 & DApp', icon: '🌐', color: '#ff6b35', neuralPattern: 'circle' },
        { id: 'architecture', name: 'Architecture', icon: '⚡', color: '#9d4edd', neuralPattern: 'diamond' }
    ];

    const filteredArticles = selectedPillar === 'all'
        ? blogArticles
        : blogArticles.filter(article => article.pillar === selectedPillar);

    const pillarConfig = {
        'operational-readiness': {
            gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)',
            borderColor: '#00d4ff',
            glowColor: '#00d4ff',
            neuralColor: '#00d4ff'
        },
        'security-domain': {
            gradient: 'linear-gradient(135deg, #ff0080, #cc0066)',
            borderColor: '#ff0080',
            glowColor: '#ff0080',
            neuralColor: '#ff0080'
        },
        'quality-assurance': {
            gradient: 'linear-gradient(135deg, #00ff88, #00cc66)',
            borderColor: '#00ff88',
            glowColor: '#00ff88',
            neuralColor: '#00ff88'
        },
        'web3-dapp': {
            gradient: 'linear-gradient(135deg, #ff6b35, #cc5528)',
            borderColor: '#ff6b35',
            glowColor: '#ff6b35',
            neuralColor: '#ff6b35'
        },
        'architecture': {
            gradient: 'linear-gradient(135deg, #9d4edd, #7b2cbf)',
            borderColor: '#9d4edd',
            glowColor: '#9d4edd',
            neuralColor: '#9d4edd'
        }
    };

    return (
        <div className="blog-list-container" ref={containerRef}>
            {/* Quantum Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="quantum-particle-canvas"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Matrix Rain Background */}
            <div className="matrix-rain">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="matrix-column"
                        style={{
                            left: `${i * 2}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        {Array.from({ length: 20 }).map((_, j) => (
                            <div
                                key={j}
                                className="matrix-char"
                                style={{
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            >
                                {String.fromCharCode(0x30A0 + Math.random() * 96)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Holographic Header */}
            <div className="holographic-header">
                <div className="neural-network-bg">
                    <svg className="neural-svg" viewBox="0 0 800 200">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <g key={i}>
                                <circle
                                    cx={50 + (i % 10) * 80}
                                    cy={50 + Math.floor(i / 10) * 100}
                                    r="3"
                                    fill="currentColor"
                                    className="neural-node"
                                    style={{
                                        animationDelay: `${i * 0.1}s`,
                                        color: pillars[i % pillars.length]?.color || '#00d4ff'
                                    }}
                                />
                                {i < 19 && (
                                    <line
                                        x1={50 + (i % 10) * 80}
                                        y1={50 + Math.floor(i / 10) * 100}
                                        x2={50 + ((i + 1) % 10) * 80}
                                        y2={50 + Math.floor((i + 1) / 10) * 100}
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="neural-connection"
                                        style={{
                                            animationDelay: `${i * 0.1}s`,
                                            color: pillars[i % pillars.length]?.color || '#00d4ff'
                                        }}
                                    />
                                )}
                            </g>
                        ))}
                    </svg>
                </div>

                <div className="header-content">
                    <h1 className="blog-title">
                        <span className="title-text">NEURAL</span>
                        <span className="title-accent">BLOG</span>
                        <span className="title-subtitle">MATRIX</span>
                    </h1>
                    <p className="blog-subtitle">
                        Diving deep into the quantum realm of engineering excellence
                    </p>
                </div>
            </div>

            {/* Holographic Pillar Navigation */}
            <div className="pillar-navigation">
                {pillars.map((pillar) => (
                    <button
                        key={pillar.id}
                        className={`pillar-button ${selectedPillar === pillar.id ? 'active' : ''}`}
                        onClick={() => setSelectedPillar(pillar.id)}
                        style={{
                            '--pillar-color': pillar.color,
                            '--neural-pattern': pillar.neuralPattern
                        }}
                    >
                        <div className="pillar-icon">{pillar.icon}</div>
                        <div className="pillar-name">{pillar.name}</div>
                        <div className="pillar-glow"></div>
                        <div className="neural-pattern"></div>
                    </button>
                ))}
            </div>

            {/* 3D Holographic Article Grid */}
            <div className="articles-grid">
                {filteredArticles.map((article, index) => {
                    const config = pillarConfig[article.pillar] || pillarConfig['operational-readiness'];
                    return (
                        <div
                            key={article.id}
                            className={`article-card holographic ${isLoaded ? 'loaded' : ''}`}
                            style={{
                                '--card-gradient': config.gradient,
                                '--card-border': config.borderColor,
                                '--card-glow': config.glowColor,
                                '--neural-color': config.neuralColor,
                                '--card-index': index,
                                animationDelay: `${index * 0.1}s`
                            }}
                            onMouseEnter={() => setHoveredArticle(article.id)}
                            onMouseLeave={() => setHoveredArticle(null)}
                        >
                            {/* Holographic Card Background */}
                            <div className="card-bg-hologram"></div>

                            {/* Neural Network Overlay */}
                            <div className="neural-overlay">
                                <svg viewBox="0 0 100 100" className="neural-svg-small">
                                    <defs>
                                        <radialGradient id={`neuralGrad-${article.id}`} cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor={config.neuralColor} stopOpacity="0.8" />
                                            <stop offset="100%" stopColor={config.neuralColor} stopOpacity="0.1" />
                                        </radialGradient>
                                    </defs>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <circle
                                            key={i}
                                            cx={20 + (i % 4) * 20}
                                            cy={20 + Math.floor(i / 4) * 20}
                                            r="2"
                                            fill={`url(#neuralGrad-${article.id})`}
                                            className="neural-node-small"
                                        />
                                    ))}
                                </svg>
                            </div>

                            {/* Pillar Tag with Holographic Effect */}
                            <div className="pillar-tag holographic-tag">
                                <span className="tag-icon">{article.icon}</span>
                                <span className="tag-text">{article.category}</span>
                                <div className="tag-glow"></div>
                            </div>

                            {/* Article Content */}
                            <div className="article-content">
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-excerpt">{article.excerpt}</p>

                                {/* Technology Tags */}
                                <div className="tech-tags">
                                    {article.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="tech-tag"
                                            style={{ animationDelay: `${techIndex * 0.1}s` }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Metrics with Holographic Display */}
                                <div className="metrics-display">
                                    {article.metrics.map((metric, metricIndex) => (
                                        <div
                                            key={metricIndex}
                                            className="metric-item"
                                            style={{ animationDelay: `${metricIndex * 0.2}s` }}
                                        >
                                            <div className="metric-value">{metric}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Read More Button with Quantum Effect */}
                                <a
                                    href={`/article?slug=${article.slug}`}
                                    className="read-more-button quantum-button"
                                    style={{
                                        '--button-gradient': config.gradient,
                                        '--button-color': config.borderColor
                                    }}
                                >
                                    <span className="button-text">ENTER MATRIX</span>
                                    <div className="button-particles">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="particle" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="button-icon">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>

                            {/* Holographic Border Animation */}
                            <div className="holographic-border">
                                <div className="border-segment"></div>
                                <div className="border-segment"></div>
                                <div className="border-segment"></div>
                                <div className="border-segment"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quantum State Indicator */}
            <div className="quantum-state-indicator">
                <div className="quantum-ring" style={{ transform: `rotate(${quantumState}deg)` }}>
                    <div className="quantum-dot"></div>
                </div>
                <div className="quantum-text">QUANTUM STATE: {quantumState}°</div>
            </div>
        </div>
    );
};

export default BlogListNew;