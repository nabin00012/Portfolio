import React from 'react';
import './TableOfContents.css';

const TableOfContents = ({ headings, activeHeading, onClose, pillarConfig }) => {
    const scrollToHeading = (headingId) => {
        const element = document.getElementById(headingId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <div className="toc-floating">
            <div className="toc-header">
                <h3 className="toc-title">Table of Contents</h3>
                <button className="toc-close" onClick={onClose}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <nav className="toc-nav">
                <ul className="toc-list">
                    {headings.map((heading, index) => (
                        <li
                            key={heading.id}
                            className={`toc-item ${activeHeading === heading.id ? 'active' : ''}`}
                            style={{ '--pillar-color': pillarConfig.borderColor }}
                        >
                            <button
                                className="toc-link"
                                onClick={() => scrollToHeading(heading.id)}
                                style={{
                                    paddingLeft: `${(heading.level - 2) * 16 + 8}px`
                                }}
                            >
                                <span className="toc-link-text">{heading.text}</span>
                                {activeHeading === heading.id && (
                                    <div className="toc-active-indicator"></div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="toc-footer">
                <div className="toc-progress">
                    <div
                        className="toc-progress-bar"
                        style={{
                            background: pillarConfig.gradient,
                            width: `${((headings.findIndex(h => h.id === activeHeading) + 1) / headings.length) * 100}%`
                        }}
                    />
                </div>
                <span className="toc-progress-text">
                    {headings.findIndex(h => h.id === activeHeading) + 1} of {headings.length}
                </span>
            </div>
        </div>
    );
};

export default TableOfContents;
