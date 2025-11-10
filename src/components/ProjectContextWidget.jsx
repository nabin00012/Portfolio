import React, { useState } from 'react';
import './ProjectContextWidget.css';

const ProjectContextWidget = ({ project, metrics, technologies, pillarConfig }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const projectData = {
        'MERN-CI-CD-Kube': {
            description: 'Enterprise DevOps platform with containerized MERN on Kubernetes.',
            demoLink: 'https://mern-ci-cd-kube.vercel.app/',
            githubLink: 'https://github.com/nabin00012/mern-ci-cd-kube',
            architecture: 'Kubernetes, Docker, GitHub Actions',
            features: ['Zero-downtime deployments', 'Auto-scaling', 'StatefulSets', 'Rolling updates']
        },
        'SecureFinData': {
            description: 'Fintech platform with AES-256-GCM encryption and Zero-Trust security.',
            demoLink: '#',
            githubLink: 'https://github.com/nabin00012/secure-fin-data',
            architecture: 'AES-256-GCM, Zero-Trust, RBAC',
            features: ['Military-grade encryption', 'Audit trails', '85%+ test coverage', 'Zero-Trust RBAC']
        },
        'FluxTrade': {
            description: 'Web3 trading platform with blockchain integration and DeFi support.',
            demoLink: 'https://flux-trade-nine.vercel.app/',
            githubLink: 'https://github.com/nabin00012/fluxtrade',
            architecture: 'Web3.js, Solidity, Gas Optimization',
            features: ['Gas-optimized contracts', 'Real-time events', 'DeFi integration', 'Portfolio analytics']
        },
        'CodeCommons': {
            description: 'Collaborative coding platform with Next.js 14 and TypeScript.',
            demoLink: 'https://codecommons-delta.vercel.app',
            githubLink: 'https://github.com/nabin00012/codecommons',
            architecture: 'Next.js 14, TypeScript, SSR',
            features: ['Real-time collaboration', 'Monaco Editor', 'Three.js integration', '90% faster performance']
        }
    };

    const currentProject = projectData[project] || projectData['CodeCommons'];

    return (
        <div
            className="project-context-widget"
            style={{
                background: pillarConfig.bgColor,
                borderColor: pillarConfig.borderColor,
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                overflow: 'visible'
            }}
        >
            <div className="widget-header" style={{ width: '100%', flexWrap: 'wrap' }}>
                <div className="widget-icon">
                    <span>✅</span>
                </div>
                <div className="widget-title" style={{ 
                    flex: 1, 
                    minWidth: 0, 
                    overflow: 'visible',
                    maxWidth: 'calc(100% - 80px)'
                }}>
                    <h4 style={{ 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal'
                    }}>Related Project</h4>
                    <p className="project-name" style={{ 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal'
                    }}>{project}</p>
                </div>
                <button
                    className="expand-button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ '--pillar-color': pillarConfig.borderColor }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="widget-content" style={{ width: '100%', overflow: 'visible' }}>
                <p className="project-description" style={{ 
                    wordWrap: 'break-word', 
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    width: '100%'
                }}>{currentProject.description}</p>

                <div className="project-metrics">
                    <h5 className="metrics-title">Key Metrics</h5>
                    <div className="metrics-grid">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="metric-item">
                                <span className="metric-value">{metric}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {isExpanded && (
                    <div className="widget-expanded">
                        <div className="project-architecture">
                            <h5 className="architecture-title">Architecture</h5>
                            <p className="architecture-text">{currentProject.architecture}</p>
                        </div>

                        <div className="project-features">
                            <h5 className="features-title">Key Features</h5>
                            <ul className="features-list">
                                {currentProject.features.map((feature, idx) => (
                                    <li key={idx} className="feature-item">
                                        <span className="feature-bullet"></span>
                                        <span className="feature-text">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="project-technologies">
                            <h5 className="technologies-title">Technologies</h5>
                            <div className="technologies-grid">
                                {technologies.map((tech, idx) => (
                                    <span key={idx} className="tech-badge">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="widget-actions">
                {currentProject.demoLink !== '#' && (
                    <a
                        href={currentProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button demo-button"
                        style={{
                            '--button-gradient': pillarConfig.gradient,
                            '--button-color': pillarConfig.borderColor
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Live Demo</span>
                    </a>
                )}

                <a
                    href={currentProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button github-button"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                </a>
            </div>

            <div
                className="widget-glow"
                style={{
                    background: `radial-gradient(circle at center, ${pillarConfig.borderColor}20 0%, transparent 70%)`
                }}
            />
        </div>
    );
};

export default ProjectContextWidget;
