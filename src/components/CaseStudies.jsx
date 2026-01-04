import React, { useState } from 'react';
import { caseStudies } from '../data/caseStudies.js';
import { systemHealthData } from '../data/systemHealth.js';
import './CaseStudies.css';

/**
 * CaseStudies Component
 * 
 * Renders engineering case studies in Problem → Action → Result format.
 * Each case study links to relevant System Health layers.
 * 
 * Semantic structure:
 * - <section> for the overall case studies section
 * - <article> for each individual case study
 * - <h3> for Problem/Action/Result headings
 * - <dl> for decision lists (definition list for key-value pairs)
 */

// Only show the 3 required case studies
const FEATURED_CASE_STUDIES = ['mern-ci-cd-kube', 'securefindata', 'codecommons'];

const CaseStudies = () => {
  const [expandedStudy, setExpandedStudy] = useState(null);

  const featuredStudies = caseStudies.filter(
    (study) => FEATURED_CASE_STUDIES.includes(study.id)
  );

  const getSystemName = (systemId) => {
    const system = systemHealthData.find((s) => s.id === systemId);
    return system ? system.name : systemId;
  };

  const toggleStudy = (studyId) => {
    setExpandedStudy((prev) => (prev === studyId ? null : studyId));
  };

  const handleLogLink = (e, logSlug) => {
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState({}, '', `/article?slug=${logSlug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="case-studies" aria-labelledby="case-studies-heading">
      <header className="case-studies-header">
        <h2 id="case-studies-heading" className="case-studies-title">
          Engineering Case Studies
        </h2>
        <p className="case-studies-subtitle">
          Production decisions documented as Problem → Action → Result
        </p>
      </header>

      <div className="case-studies-grid">
        {featuredStudies.map((study) => (
          <article
            key={study.id}
            className={`case-study-card ${expandedStudy === study.id ? 'expanded' : ''}`}
            aria-labelledby={`study-${study.id}-title`}
          >
            {/* Card Header - Always Visible */}
            <button
              className="case-study-header"
              onClick={() => toggleStudy(study.id)}
              aria-expanded={expandedStudy === study.id}
              aria-controls={`study-${study.id}-content`}
            >
              <div className="case-study-meta">
                <span className="case-study-domain">{study.domain}</span>
                <div className="case-study-systems">
                  {study.linkedSystems?.map((sysId) => (
                    <span key={sysId} className="system-link-tag">
                      {getSystemName(sysId)}
                    </span>
                  ))}
                </div>
              </div>
              <h3 id={`study-${study.id}-title`} className="case-study-title">
                {study.title}
              </h3>
              <p className="case-study-problem-preview">
                <strong>Problem:</strong> {study.problem.headline}
              </p>
              <span className="expand-indicator" aria-hidden="true">
                {expandedStudy === study.id ? 'Collapse' : 'Expand details'}
              </span>
            </button>

            {/* Expanded Content */}
            <div
              id={`study-${study.id}-content`}
              className="case-study-content"
              hidden={expandedStudy !== study.id}
            >
              {/* Problem Section */}
              <section className="case-section problem-section" aria-labelledby={`problem-${study.id}`}>
                <h4 id={`problem-${study.id}`} className="section-label">Problem</h4>
                <p className="problem-context">{study.problem.context}</p>
                
                <div className="problem-details">
                  <div className="constraints">
                    <h5>Constraints</h5>
                    <ul>
                      {study.problem.constraints.map((constraint, i) => (
                        <li key={i}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="failure-mode">
                    <h5>Failure Mode</h5>
                    <p>{study.problem.failureMode}</p>
                  </div>
                </div>
              </section>

              {/* Action Section */}
              <section className="case-section action-section" aria-labelledby={`action-${study.id}`}>
                <h4 id={`action-${study.id}`} className="section-label">Action</h4>
                <p className="action-headline">{study.action.headline}</p>
                
                <dl className="decisions-list">
                  {study.action.decisions.map((decision, i) => (
                    <div key={i} className="decision-item">
                      <dt className="decision-what">{decision.decision}</dt>
                      <dd className="decision-details">
                        <div className="decision-rationale">
                          <span className="detail-label">Rationale:</span>
                          <span>{decision.rationale}</span>
                        </div>
                        {decision.tradeoff && (
                          <div className="decision-tradeoff">
                            <span className="detail-label">Tradeoff:</span>
                            <span>{decision.tradeoff}</span>
                          </div>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Result Section */}
              <section className="case-section result-section" aria-labelledby={`result-${study.id}`}>
                <h4 id={`result-${study.id}`} className="section-label">Result</h4>
                <p className="result-headline">{study.result.headline}</p>
                
                {study.result.metrics && study.result.metrics.length > 0 && (
                  <table className="metrics-table" aria-label="Outcome metrics">
                    <thead>
                      <tr>
                        <th scope="col">Metric</th>
                        <th scope="col">Before</th>
                        <th scope="col">After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.result.metrics.map((metric, i) => (
                        <tr key={i}>
                          <td>{metric.metric}</td>
                          <td className="metric-before">{metric.before}</td>
                          <td className="metric-after">{metric.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                
                <p className="validation">{study.result.validation}</p>
              </section>

              {/* Known Limitations Section */}
              {study.knownLimitations && (
                <section className="case-section limitations-section" aria-labelledby={`limitations-${study.id}`}>
                  <h4 id={`limitations-${study.id}`} className="section-label">Known Constraints</h4>
                  <div className="limitations-content">
                    <p className="limitation-not-solved">
                      <strong>Deliberately not solved:</strong> {study.knownLimitations.notSolved}
                    </p>
                    {study.knownLimitations.assumptions && (
                      <div className="limitation-assumptions">
                        <strong>Assumptions:</strong>
                        <ul>
                          {study.knownLimitations.assumptions.map((assumption, i) => (
                            <li key={i}>{assumption}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="limitation-break">
                      <strong>Would break if:</strong> {study.knownLimitations.wouldBreakIf}
                    </p>
                  </div>
                </section>
              )}

              {/* Footer Links */}
              <footer className="case-study-footer">
                <div className="tech-stack">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="case-study-links">
                  {study.action.logReference && (
                    <button
                      className="log-link"
                      onClick={(e) => handleLogLink(e, study.action.logReference)}
                    >
                      View Engineering Log →
                    </button>
                  )}
                  <a
                    href={study.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    Source Code ↗
                  </a>
                  {study.live && (
                    <a
                      href={study.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-link"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
