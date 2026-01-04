import React, { useState } from 'react';
import {
  systemHealthData,
  SystemStatus,
  getSystemSummary,
  getStatusColor,
} from '../data/systemHealth.js';
import './SystemHealth.css';

/**
 * SystemHealth Dashboard
 * 
 * Displays capabilities as operational systems rather than skill percentages.
 * Each metric maps to real engineering outcomes with evidence links.
 * 
 * Semantic HTML structure:
 * - <section> with aria-labelledby for landmark navigation
 * - <details>/<summary> for collapsible layers (native accessibility)
 * - <dl>/<dt>/<dd> for metric key-value pairs
 */
const SystemHealth = () => {
  const [expandedLayers, setExpandedLayers] = useState(new Set(['infrastructure', 'security']));
  const summary = getSystemSummary();

  const toggleLayer = (layerId) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const handleEvidenceClick = (e, evidence) => {
    e.stopPropagation();
    if (evidence) {
      window.history.pushState({}, '', evidence);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="system-health" aria-labelledby="system-health-heading">
      {/* Section Header */}
      <header className="system-health-header">
        <h2 id="system-health-heading" className="system-health-title">
          System Health
        </h2>
        <p className="system-health-subtitle">
          Capabilities represented as operational systems—each metric maps to production outcomes.
        </p>
      </header>

      {/* Status Summary Bar */}
      <div className="system-summary" role="status" aria-live="polite">
        <div className="summary-stat">
          <span 
            className="summary-indicator" 
            style={{ backgroundColor: getStatusColor(SystemStatus.OPERATIONAL) }}
            aria-hidden="true"
          />
          <span className="summary-count">{summary.operational}</span>
          <span className="summary-label">Operational</span>
        </div>
        <div className="summary-stat">
          <span 
            className="summary-indicator" 
            style={{ backgroundColor: getStatusColor(SystemStatus.STABLE) }}
            aria-hidden="true"
          />
          <span className="summary-count">{summary.stable}</span>
          <span className="summary-label">Stable</span>
        </div>
        <div className="summary-stat">
          <span 
            className="summary-indicator" 
            style={{ backgroundColor: getStatusColor(SystemStatus.LEARNING) }}
            aria-hidden="true"
          />
          <span className="summary-count">{summary.learning}</span>
          <span className="summary-label">Learning</span>
        </div>
        <div className="summary-total">
          <span className="summary-count">{summary.total}</span>
          <span className="summary-label">Total Systems</span>
        </div>
      </div>

      {/* System Layers Grid */}
      <div className="system-layers">
        {systemHealthData.map((layer) => (
          <article 
            key={layer.id} 
            className={`system-layer ${expandedLayers.has(layer.id) ? 'expanded' : ''}`}
            aria-labelledby={`layer-${layer.id}-heading`}
          >
            {/* Layer Header - Clickable */}
            <button
              className="layer-header"
              onClick={() => toggleLayer(layer.id)}
              aria-expanded={expandedLayers.has(layer.id)}
              aria-controls={`layer-${layer.id}-content`}
            >
              <div className="layer-info">
                <h3 id={`layer-${layer.id}-heading`} className="layer-name">
                  {layer.name}
                </h3>
                <p className="layer-description">{layer.description}</p>
              </div>
              <div className="layer-status">
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: `${getStatusColor(layer.overallStatus)}20`,
                    color: getStatusColor(layer.overallStatus),
                    borderColor: getStatusColor(layer.overallStatus),
                  }}
                >
                  {layer.overallStatus}
                </span>
                <span className="metric-count">
                  {layer.metrics.length} {layer.metrics.length === 1 ? 'system' : 'systems'}
                </span>
                <span className="expand-icon" aria-hidden="true">
                  {expandedLayers.has(layer.id) ? '−' : '+'}
                </span>
              </div>
            </button>

            {/* Layer Metrics - Collapsible */}
            <div 
              id={`layer-${layer.id}-content`}
              className="layer-content"
              hidden={!expandedLayers.has(layer.id)}
            >
              <dl className="metrics-list">
                {layer.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <dt className="metric-name">
                      <span 
                        className="metric-status-dot"
                        style={{ backgroundColor: getStatusColor(metric.status) }}
                        aria-label={`Status: ${metric.status}`}
                      />
                      {metric.name}
                    </dt>
                    <dd className="metric-details">
                      <div className="metric-row">
                        <span className="metric-label">Last deployed:</span>
                        <span className="metric-value">{metric.lastDeployed}</span>
                      </div>
                      {metric.outcome && (
                        <div className="metric-row metric-outcome">
                          <span className="metric-label">Outcome:</span>
                          <span className="metric-value">{metric.outcome}</span>
                        </div>
                      )}
                      <div className="metric-row">
                        <span className="metric-label">Dependencies:</span>
                        <span className="metric-value metric-deps">
                          {metric.dependencies.map((dep, i) => (
                            <span key={i} className="dep-tag">{dep}</span>
                          ))}
                        </span>
                      </div>
                      {metric.evidence && (
                        <button
                          className="evidence-link"
                          onClick={(e) => handleEvidenceClick(e, metric.evidence)}
                          aria-label={`View evidence for ${metric.name}`}
                        >
                          View implementation details →
                        </button>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* Legend */}
      <footer className="system-legend" aria-label="Status legend">
        <span className="legend-item">
          <span 
            className="legend-dot" 
            style={{ backgroundColor: getStatusColor(SystemStatus.OPERATIONAL) }}
            aria-hidden="true"
          />
          <span>Operational — Actively used in production</span>
        </span>
        <span className="legend-item">
          <span 
            className="legend-dot" 
            style={{ backgroundColor: getStatusColor(SystemStatus.STABLE) }}
            aria-hidden="true"
          />
          <span>Stable — Proven, not currently active</span>
        </span>
        <span className="legend-item">
          <span 
            className="legend-dot" 
            style={{ backgroundColor: getStatusColor(SystemStatus.LEARNING) }}
            aria-hidden="true"
          />
          <span>Learning — Currently developing</span>
        </span>
      </footer>
    </section>
  );
};

export default SystemHealth;
