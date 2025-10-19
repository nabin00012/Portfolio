import React, { useState, useEffect, useRef } from 'react';
import TableOfContents from './TableOfContents';
import ProjectContextWidget from './ProjectContextWidget';
import './ArticlePage.css';

const ArticlePage = ({ articleSlug }) => {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeHeading, setActiveHeading] = useState('');
    const [showTOC, setShowTOC] = useState(false);
    const contentRef = useRef(null);
    const headingsRef = useRef([]);

    // Production-ready article data with real technical content
    const articlesData = {
        'kubernetes-zero-downtime-deployments': {
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
            content: {
                problemStatement: "Traditional deployments often require service restarts, leading to unacceptable Service Level Agreement (SLA) violations and poor user experience, especially for real-time applications like a chat service.",
                architecturalChoice: "We leverage Kubernetes' RollingUpdate Strategy for our client and API Deployments. This ensures the old version's Pods are drained only after new Pods are healthy, guaranteeing zero service interruption. Our automated GitHub Actions CI/CD pipeline orchestrates the Docker build, push, and K8s update.",
                codeWalkthrough: `# K8s Deployment Manifest for Zero-Downtime (Focus on the strategy block)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: realchat-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: realchat-server
  strategy:
    type: RollingUpdate # 1. The key strategy type
    rollingUpdate:
      maxSurge: 1       # 2. Allow one extra Pod beyond 3 replicas
      maxUnavailable: 0 # 3. CRITICAL: Ensures no Pods are taken down until new ones are ready
  template:
    # ... Pod spec ...
    spec:
      containers:
      - name: express-api
        image: your-registry/realchat-api:latest
        ports:
        - containerPort: 5000
        # CRITICAL: Liveness/Readiness probes ensure the Pod is actually functional
        readinessProbe:
          httpGet:
            path: /api/health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 10`,
                measurableOutcome: "Achieved 99.99% uptime for the RealChat service. Deployment time reduced by 80% (from 15 minutes to 3 minutes), now executed automatically on every push to the main branch with zero service interruption verified by K8s readiness probes.",
                keyTakeaways: [
                    "RollingUpdate strategy ensures zero-downtime deployments",
                    "maxUnavailable: 0 prevents service interruption",
                    "Readiness probes validate pod health before traffic routing",
                    "GitHub Actions automates the entire CI/CD pipeline",
                    "Health checks ensure only healthy pods receive traffic"
                ]
            }
        },
        'aes-256-gcm-encryption': {
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
            content: {
                problemStatement: "Financial platforms require military-grade security to protect sensitive documents (Excel, PDF). Standard encryption without authentication (integrity check) and rigorous testing leaves the system vulnerable to data tampering and non-compliance.",
                architecturalChoice: "We chose AES-256-GCM (Authenticated Encryption) for both confidentiality and integrity. All cryptographic logic was developed using a Test-Driven Development (TDD) workflow with Jest, achieving 85%+ unit test coverage to rigorously validate security protocols before production deployment.",
                codeWalkthrough: `// Core AES-256-GCM Encryption in Node.js (Correct Implementation)
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;  // 128-bit Nonce/IV

function encrypt(data, key) {
  const iv = crypto.randomBytes(IV_LENGTH); // MUST be unique per operation
  // ✅ Use createCipheriv for explicit IV handling
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv); 
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // ✅ Get the Authentication Tag AFTER finalization
  const tag = cipher.getAuthTag(); 
  
  return {
    encrypted,
    iv: iv.toString('hex'), // Store/transmit the IV
    tag: tag.toString('hex') // Store/transmit the Tag
  };
}

// (Decryption function would correctly use createDecipheriv and setAuthTag)`,
                measurableOutcome: "Encryption of 300KB files achieved in ~10ms, maintaining high throughput. The TDD approach ensured zero critical security bugs in the cryptography module, validated by an immutable 85% unit test coverage baseline.",
                keyTakeaways: [
                    "AES-256-GCM provides both confidentiality and integrity",
                    "TDD workflow ensures security protocols are rigorously validated",
                    "85%+ test coverage prevents critical security bugs",
                    "Authenticated encryption prevents data tampering",
                    "Proper IV handling is critical for security"
                ]
            }
        },
        'web3-event-indexing': {
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
            content: {
                problemStatement: "Direct blockchain reads for large datasets (like a user's entire trade history) are slow and expensive. DApps need a way to provide lightning-fast, real-time portfolio analytics without querying the blockchain for every metric.",
                architecturalChoice: "We use a dedicated Node.js/Express API layer as an Off-Chain Indexer. This API listens to key Solidity Events using Web3.js, aggregates the data, and stores it in MongoDB for fast querying. The React client then queries the fast MongoDB index instead of the slow blockchain.",
                codeWalkthrough: `// Node.js Web3.js Indexer Service (Simplified)
const Web3 = require('web3');
const { TradeExchangeContract } = require('./contracts/abi');

// Connect to the local hardhat node
const web3 = new Web3('http://127.0.0.1:8545'); 
const exchangeContract = new web3.eth.Contract(TradeExchangeContract.abi, CONTRACT_ADDRESS);

function startEventListening() {
  // Listen for the 'TradeExecuted' event from the smart contract
  exchangeContract.events.TradeExecuted({
      fromBlock: 'latest'
  })
  .on('data', async (event) => {
    console.log(\`New Trade Event: \${event.returnValues.trader}\`);
    
    // Save the trade data to MongoDB for fast indexing
    const newTrade = new TradeModel({
      txHash: event.transactionHash,
      tokenIn: event.returnValues.tokenIn,
      amountOut: event.returnValues.amountOut,
      // ... other data ...
    });
    await newTrade.save();
  })
  .on('error', (error) => console.error('Web3 Event Error:', error));
}

startEventListening();`,
                measurableOutcome: "Portfolio loading time reduced from ~5 seconds (direct blockchain query) to < 100ms (indexed MongoDB API query). Successfully handles real-time updates for analytics dashboard and ensures auditable data lineage.",
                keyTakeaways: [
                    "Off-chain indexing provides lightning-fast query performance",
                    "Web3.js event listening enables real-time data synchronization",
                    "MongoDB provides fast aggregation and analytics capabilities",
                    "Event-driven architecture ensures data consistency",
                    "Auditable data lineage maintains blockchain transparency"
                ]
            }
        },
        'nextjs-typescript-architecture': {
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
            content: {
                problemStatement: "Building a complex, interactive platform (like a collaborative code editor) faces dual challenges: A) Slow initial load times (poor SEO/UX) due to heavy client-side rendering, and B) High risk of runtime errors in a large, multi-contributor codebase.",
                architecturalChoice: "We enforce TypeScript across the stack to virtually eliminate null/undefined errors. We utilize Next.js 14 Server-Side Rendering (SSR) for all static content to ensure a perfect Lighthouse Technical SEO score and fast FCP, while complex components (like the Monaco Editor) are dynamically imported client-side.",
                codeWalkthrough: `// TypeScript enforced Server Component in Next.js 14

// 1. Define strict type for the project data
interface ProjectData {
  id: string;
  title: string;
  course: string;
  status: 'pending' | 'completed';
}

// 2. Component function strictly typed (async is valid for Server Components)
async function ProjectDashboard({ userId }: { userId: string }) {
  // 3. Server-side data fetching for optimal performance (no client hydration delay)
  const projects: ProjectData[] = await fetchProjectsForUser(userId);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Your {projects.length} Projects</h1>
      {projects.map(p => (
        <div key={p.id} className="p-4 border">
          <h2 className="text-xl">{p.title}</h2>
          {/* TypeScript ensures p.status is only one of the defined literals */}
          <span className={\`status-\${p.status}\`}>{p.status.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
}`,
                measurableOutcome: "Achieved a 95+ Lighthouse Performance Score by minimizing client-side load. Runtime errors were reduced by an estimated 90% due to mandatory TypeScript usage across all 150+ components, ensuring long-term maintainability for the educational platform.",
                keyTakeaways: [
                    "TypeScript eliminates null/undefined runtime errors",
                    "Next.js 14 SSR provides optimal performance and SEO",
                    "Server Components enable server-side data fetching",
                    "Dynamic imports optimize client-side bundle size",
                    "Type safety ensures long-term maintainability"
                ]
            }
        },
        'mern-production-deployment': {
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
            content: {
                problemStatement: "Scaling a MERN application from development to production requires careful orchestration of multiple services, proper error handling, monitoring, and deployment strategies to ensure enterprise-grade reliability and performance.",
                architecturalChoice: "We implement a microservices architecture with proper separation of concerns, comprehensive error handling, real-time monitoring, and automated deployment pipelines with health checks and rollback capabilities.",
                codeWalkthrough: `// Production-Ready Error Handling and Monitoring
const express = require('express');
const winston = require('winston');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Comprehensive logging configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled Error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    requestId: req.id,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});`,
                measurableOutcome: "Achieved 99.9% uptime with enterprise-grade monitoring and alerting. Implemented comprehensive error tracking and automated recovery mechanisms, reducing manual intervention by 95% and ensuring seamless user experience.",
                keyTakeaways: [
                    "Microservices architecture enables independent scaling",
                    "Comprehensive error handling prevents system failures",
                    "Real-time monitoring provides proactive issue detection",
                    "Automated deployment pipelines ensure consistent releases",
                    "Health checks enable automated recovery mechanisms"
                ]
            }
        }
    };

    useEffect(() => {
        // Simulate loading article data
        const loadArticle = async () => {
            setIsLoading(true);
            // In real implementation, this would fetch from MDX files
            const articleData = articlesData[articleSlug];
            if (articleData) {
                setArticle(articleData);
                // Extract headings for TOC
                const headings = [
                    { id: 'problem-statement', text: 'Problem Statement', level: 2 },
                    { id: 'architectural-choice', text: 'The Architectural Choice', level: 2 },
                    { id: 'code-walkthrough', text: 'Code Walkthrough & Snippets', level: 2 },
                    { id: 'measurable-outcome', text: 'Measurable Outcome', level: 2 },
                    { id: 'key-takeaways', text: 'Key Takeaways', level: 2 }
                ];
                setArticle(prev => ({ ...prev, headings }));
            }
            setIsLoading(false);
        };

        loadArticle();
    }, [articleSlug]);

    useEffect(() => {
        const handleScroll = () => {
            const headings = headingsRef.current;
            const scrollPosition = window.scrollY + 100;

            for (let i = headings.length - 1; i >= 0; i--) {
                const heading = headings[i];
                if (heading && heading.offsetTop <= scrollPosition) {
                    setActiveHeading(heading.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [article]);

    const getPillarConfig = (pillar) => {
        const configs = {
            'operational-readiness': {
                gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                bgColor: 'rgba(0, 212, 255, 0.1)',
                borderColor: '#00d4ff',
                name: 'Operational Readiness'
            },
            'security-domain': {
                gradient: 'linear-gradient(135deg, #ff0080 0%, #ff4444 100%)',
                bgColor: 'rgba(255, 0, 128, 0.1)',
                borderColor: '#ff0080',
                name: 'Security Domain'
            },
            'quality-assurance': {
                gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                bgColor: 'rgba(0, 255, 136, 0.1)',
                borderColor: '#00ff88',
                name: 'Quality Assurance'
            },
            'web3-dapp': {
                gradient: 'linear-gradient(135deg, #ff6b00 0%, #ff9900 100%)',
                bgColor: 'rgba(255, 107, 0, 0.1)',
                borderColor: '#ff6b00',
                name: 'Web3/DApp'
            },
            'architecture': {
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                bgColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: '#8b5cf6',
                name: 'Architecture'
            }
        };
        return configs[pillar] || configs['operational-readiness'];
    };

    if (isLoading) {
        return (
            <div className="article-loading">
                <div className="loading-spinner"></div>
                <p>Loading article...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="article-not-found">
                <h1>Article Not Found</h1>
                <p>The article you're looking for doesn't exist.</p>
            </div>
        );
    }

    const pillarConfig = getPillarConfig(article.pillar);

    return (
        <div className="article-page">
            {/* Floating TOC Toggle */}
            <button
                className={`toc-toggle ${showTOC ? 'active' : ''}`}
                onClick={() => setShowTOC(!showTOC)}
                style={{ '--pillar-color': pillarConfig.borderColor }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Contents</span>
            </button>

            {/* Floating Table of Contents */}
            {showTOC && (
                <TableOfContents
                    headings={article.headings || []}
                    activeHeading={activeHeading}
                    onClose={() => setShowTOC(false)}
                    pillarConfig={pillarConfig}
                />
            )}

            {/* Article Header */}
            <header className="article-header">
                <div className="article-header-content">
                    {/* Breadcrumb */}
                    <nav className="article-breadcrumb">
                        <a href="/blog" className="breadcrumb-link">Blog</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{pillarConfig.name}</span>
                    </nav>

                    {/* Pillar Badge */}
                    <div
                        className="article-pillar-badge"
                        style={{
                            background: pillarConfig.gradient,
                            borderColor: pillarConfig.borderColor
                        }}
                    >
                        <span className="pillar-icon">{article.icon}</span>
                        <span className="pillar-name">{pillarConfig.name}</span>
                    </div>

                    {/* Article Meta */}
                    <div className="article-meta">
                        <span className="article-date">{article.publishedAt}</span>
                        <span className="article-read-time">{article.readTime}</span>
                        {article.featured && (
                            <span className="featured-badge">Featured</span>
                        )}
                    </div>

                    {/* Article Title */}
                    <h1 className="article-title">{article.title}</h1>

                    {/* Article Excerpt */}
                    <p className="article-excerpt">{article.excerpt}</p>

                    {/* Technologies */}
                    <div className="article-technologies">
                        {article.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="article-content" ref={contentRef}>
                <div className="article-body">
                    {/* Problem Statement */}
                    <section
                        id="problem-statement"
                        className="article-section"
                        ref={el => headingsRef.current[0] = el}
                    >
                        <h2 className="section-title">
                            <span className="section-icon">🎯</span>
                            Problem Statement
                        </h2>
                        <div className="section-content">
                            <p>{article.content.problemStatement}</p>
                        </div>
                    </section>

                    {/* The Architectural Choice */}
                    <section
                        id="architectural-choice"
                        className="article-section"
                        ref={el => headingsRef.current[1] = el}
                    >
                        <h2 className="section-title">
                            <span className="section-icon">🏗️</span>
                            The Architectural Choice
                        </h2>
                        <div className="section-content">
                            <p>{article.content.architecturalChoice}</p>
                        </div>
                    </section>

                    {/* Code Walkthrough */}
                    <section
                        id="code-walkthrough"
                        className="article-section"
                        ref={el => headingsRef.current[2] = el}
                    >
                        <h2 className="section-title">
                            <span className="section-icon">💻</span>
                            Code Walkthrough & Snippets
                        </h2>
                        <div className="section-content">
                            <div className="code-block">
                                <div className="code-header">
                                    <span className="code-language">
                                        {article.pillar === 'operational-readiness' ? 'YAML' : 'JavaScript'}
                                    </span>
                                    <button className="copy-button">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" />
                                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                                <pre className="code-content">
                                    <code>{article.content.codeWalkthrough}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Measurable Outcome */}
                    <section
                        id="measurable-outcome"
                        className="article-section"
                        ref={el => headingsRef.current[3] = el}
                    >
                        <h2 className="section-title">
                            <span className="section-icon">📊</span>
                            Measurable Outcome
                        </h2>
                        <div className="section-content">
                            <p>{article.content.measurableOutcome}</p>
                        </div>
                    </section>

                    {/* Key Takeaways */}
                    <section
                        id="key-takeaways"
                        className="article-section"
                        ref={el => headingsRef.current[4] = el}
                    >
                        <h2 className="section-title">
                            <span className="section-icon">🚀</span>
                            Key Takeaways
                        </h2>
                        <div className="section-content">
                            <ul className="takeaways-list">
                                {article.content.keyTakeaways.map((takeaway, idx) => (
                                    <li key={idx} className="takeaway-item">
                                        <span className="takeaway-bullet"></span>
                                        <span className="takeaway-text">{takeaway}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Project Context Widget */}
                <aside className="article-sidebar">
                    <ProjectContextWidget
                        project={article.project}
                        metrics={article.metrics}
                        technologies={article.technologies}
                        pillarConfig={pillarConfig}
                    />
                </aside>
            </main>

            {/* Article Footer */}
            <footer className="article-footer">
                <div className="article-footer-content">
                    <div className="article-actions">
                        <button className="action-button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Share Article</span>
                        </button>
                        <a href="/blog" className="action-button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Back to Blog</span>
                        </a>
                    </div>

                    <div className="article-navigation">
                        <p className="nav-text">Ready to implement this solution?</p>
                        <a
                            href={`https://github.com/nabin00012/${article.project.toLowerCase()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>View on GitHub</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ArticlePage;
