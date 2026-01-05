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
            excerpt: "Standard deployments typically require service restarts, which can violate SLA windows. This documents how we configured Kubernetes RollingUpdate strategy to avoid downtime during releases, with GitHub Actions handling the CI/CD orchestration.",
            pillar: "operational-readiness",
            project: "MERN-CI-CD-Kube",
            technologies: ["Kubernetes", "RollingUpdate", "CI/CD", "Zero-Downtime"],
            readTime: "12 min read",
            publishedAt: "2025-01-15",
            featured: true,
            slug: "kubernetes-zero-downtime-deployments",
            metrics: ["~99.99% uptime observed", "~80% faster deploys", "No user-facing interruptions"],
            icon: "🚀",
            content: {
                problemStatement: "Standard deployments typically require service restarts. For a real-time chat service, even brief interruptions can violate SLA windows and degrade user experience. We needed a deployment approach that avoided service gaps entirely.",
                architecturalChoice: "We configured Kubernetes RollingUpdate for both client and API deployments. The key constraint was maxUnavailable: 0, which prevents Kubernetes from terminating old pods until new ones pass health checks. GitHub Actions handles the build, push, and rollout trigger. This isn't novel—it's documented Kubernetes behavior—but getting the probe timings and replica counts right took iteration.",
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
                measurableOutcome: "Based on monitoring data, the service has maintained ~99.99% uptime since this configuration was deployed. Deployment time dropped from around 15 minutes (manual) to about 3 minutes (automated). We haven't observed user-facing interruptions during deploys, though the window is still relatively short for strong statistical claims.",
                keyTakeaways: [
                    "RollingUpdate with maxUnavailable: 0 prevents pod termination until replacements are healthy",
                    "Readiness probes need realistic timeouts—too aggressive and healthy pods fail checks",
                    "GitHub Actions automates the pipeline, but the deploy logic lives in K8s manifests",
                    "Three replicas gave us headroom for surge during rollout",
                    "This approach is well-documented in K8s docs; the work was in tuning it for our workload"
                ]
            }
        },
        'aes-256-gcm-encryption': {
            id: 2,
            title: "AES-256-GCM Implementation Notes: Authenticated Encryption with TDD Validation",
            excerpt: "Financial document storage requires encryption that covers both confidentiality and integrity. This documents how we implemented AES-256-GCM with a test-driven approach, and what we learned about IV handling and auth tag validation.",
            pillar: "security-domain",
            project: "SecureFinData",
            technologies: ["AES-256-GCM", "TDD", "Node.js Crypto", "Jest"],
            readTime: "15 min read",
            publishedAt: "2025-01-12",
            featured: true,
            slug: "aes-256-gcm-encryption",
            metrics: ["AES-256-GCM (authenticated)", "85%+ test coverage", "No critical bugs in crypto module"],
            icon: "🔒",
            content: {
                problemStatement: "The platform stores sensitive financial documents (Excel, PDF). Standard encryption without authentication doesn't detect tampering, which is a compliance concern. We also needed test coverage to catch implementation errors before they reached production.",
                architecturalChoice: "We chose AES-256-GCM because it provides authenticated encryption—both confidentiality and integrity in one pass. The authentication tag detects any modification to the ciphertext. We wrote the crypto module test-first using Jest, which caught several IV-reuse bugs during development. Final coverage landed at 85%+, focused on the encryption/decryption paths.",
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
                measurableOutcome: "Encryption of a 300KB file completes in roughly 10ms on our test hardware—fast enough that it doesn't bottleneck uploads. The TDD approach caught two IV-handling bugs before merge. No critical security issues have surfaced in the crypto module since deployment, validated by the 85% test coverage baseline.",
                keyTakeaways: [
                    "GCM mode provides authentication, which detects ciphertext tampering",
                    "IV must be unique per encryption operation—reuse breaks security guarantees",
                    "Test-first development caught bugs that would have been hard to detect in production",
                    "Auth tag must be retrieved after cipher.final(), not before",
                    "85% coverage focused on crypto paths; diminishing returns beyond that"
                ]
            }
        },
        'web3-event-indexing': {
            id: 3,
            title: "Event-Driven DApps: Using Node.js/Express as a Real-Time Indexer for Solidity Contract Events",
            excerpt: "Querying blockchain state directly for large datasets is slow and expensive. This documents how we built an off-chain indexer that listens to Solidity events and stores them in MongoDB for faster reads.",
            pillar: "web3-dapp",
            project: "FluxTrade",
            technologies: ["Web3.js", "Solidity", "Event Listening", "Off-Chain Indexing"],
            readTime: "18 min read",
            publishedAt: "2025-01-10",
            featured: true,
            slug: "web3-event-indexing",
            metrics: ["<100ms indexed queries", "Real-time sync via events", "Full event history preserved"],
            icon: "🌐",
            content: {
                problemStatement: "Fetching a user's full trade history directly from the blockchain is slow—often several seconds—and costs gas for complex queries. For a portfolio dashboard that users check frequently, this wasn't acceptable.",
                architecturalChoice: "We added a Node.js service that subscribes to contract events via Web3.js and writes them to MongoDB. The React client queries MongoDB instead of the chain. This introduces an indexing delay (events aren't instant), but for our use case—historical analytics—the tradeoff made sense. We kept the blockchain as the source of truth; the index is just a read optimization.",
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
                measurableOutcome: "Portfolio queries that took ~5 seconds against the chain now return in under 100ms from the MongoDB index. The indexer stays in sync via event subscription, though we added a periodic reconciliation job to catch any missed events. Event history is preserved for audit purposes.",
                keyTakeaways: [
                    "Off-chain indexing trades latency for query speed—acceptable for analytics, not for real-time trading",
                    "Web3.js event subscriptions work well but can miss events during network issues",
                    "MongoDB aggregation handles the analytics queries efficiently",
                    "The blockchain remains the source of truth; the index is a read cache",
                    "Periodic reconciliation catches any sync gaps"
                ]
            }
        },
        'nextjs-typescript-architecture': {
            id: 4,
            title: "Architecting Educational SaaS: Performance and Type Safety with Next.js 14 & TypeScript",
            excerpt: "An interactive code editor platform faced two problems: slow initial loads from client-side rendering, and frequent runtime errors in a growing codebase. This documents how we approached both with SSR and strict TypeScript.",
            pillar: "quality-assurance",
            project: "CodeCommons",
            technologies: ["Next.js 14", "TypeScript", "SSR", "Monaco Editor"],
            readTime: "14 min read",
            publishedAt: "2025-01-08",
            featured: true,
            slug: "nextjs-typescript-architecture",
            metrics: ["95+ Lighthouse score", "~90% fewer runtime errors", "Strict TypeScript across 150+ components"],
            icon: "✅",
            content: {
                problemStatement: "The platform includes a collaborative code editor (Monaco), which is heavy. Initial loads were slow, hurting both UX and SEO. Separately, as more contributors joined, null/undefined errors became a recurring problem—the kind that only surface in production.",
                architecturalChoice: "We enforced strict TypeScript across the entire codebase to catch type errors at build time. For performance, we used Next.js 14 Server Components for static content (course listings, dashboards) and dynamically imported Monaco only on pages that need it. This split the bundle and moved most rendering to the server.",
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
                measurableOutcome: "Lighthouse performance scores improved to 95+ after moving to SSR for static content. Runtime errors dropped significantly—roughly 90% fewer based on error tracking—after enforcing TypeScript across all 150+ components. The main tradeoff was slower build times and a steeper onboarding curve for new contributors.",
                keyTakeaways: [
                    "Strict TypeScript catches null/undefined errors at build time, not in production",
                    "Server Components reduce client bundle size and improve initial load",
                    "Dynamic imports keep heavy dependencies (Monaco) out of the critical path",
                    "The 90% error reduction is an estimate based on tracking data, not a guarantee",
                    "Tradeoff: stricter types slow down development initially but pay off as the team grows"
                ]
            }
        },
        'mern-production-deployment': {
            id: 5,
            title: "Production-Ready MERN Stack: From Development to Deployment",
            excerpt: "Moving a MERN application from local development to production surfaced gaps in error handling and observability. This documents the patterns we added to make the system easier to debug and recover when things go wrong.",
            pillar: "architecture",
            project: "CodeCommons",
            technologies: ["MERN Stack", "Production Deployment", "Monitoring", "Error Handling"],
            readTime: "16 min read",
            publishedAt: "2025-01-05",
            featured: true,
            slug: "mern-production-deployment",
            metrics: ["~99.9% uptime observed", "Structured logging", "Health check endpoints"],
            icon: "⚡",
            content: {
                problemStatement: "The application worked fine locally, but production exposed problems: errors were logged inconsistently, there was no way to check service health externally, and debugging issues required SSH access to read logs. We needed better observability without overengineering.",
                architecturalChoice: "We added structured logging with Winston, a global error handler that catches unhandled exceptions, and a /health endpoint for external monitoring. The goal wasn't to build a complex microservices architecture—it was to make the existing monolith easier to operate. Health checks enable automated restarts when the service becomes unresponsive.",
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
                measurableOutcome: "Uptime has been around 99.9% since adding health checks and automated restarts. More importantly, debugging time dropped—structured logs with request IDs make it possible to trace issues without guessing. Manual intervention for routine issues is now rare.",
                keyTakeaways: [
                    "Structured logging (JSON format) makes logs searchable and parseable",
                    "A global error handler prevents unhandled exceptions from crashing the process silently",
                    "Health endpoints enable external monitoring and automated recovery",
                    "Request IDs in logs help trace issues across the request lifecycle",
                    "This is standard operational hygiene, not a complex architecture"
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
