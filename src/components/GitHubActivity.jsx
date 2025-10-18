import React, { useEffect, useState } from 'react';

const GitHubActivity = ({ username = 'nabin00012' }) => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubContributions();
  }, []);

  const fetchGitHubContributions = async () => {
    try {
      // Get current year
      const currentYear = new Date().getFullYear();
      
      // Fetch contribution data for current year only (Jan-Dec)
      // Add cache-busting parameter to force fresh data
      const cacheBuster = new Date().getTime();
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}&_=${cacheBuster}`,
        { cache: 'no-store' }
      );
      const data = await response.json();

      if (!data || !data.contributions) {
        throw new Error('Failed to fetch contributions');
      }

      // Filter to only show Jan 1 - Dec 31 of current year
      const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear, 11, 31);
      
      const contributionData = [];
      let total = 0;
      
      data.contributions.forEach(contribution => {
        const date = new Date(contribution.date);
        
        // Only include dates from current year
        if (date >= yearStart && date <= yearEnd) {
          contributionData.push({
            date: contribution.date,
            count: contribution.count,
            day: date.getDay(),
            month: date.getMonth(),
          });
          total += contribution.count;
        }
      });

      setContributions(contributionData);
      setTotalContributions(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      // Fallback to mock data for demo
      generateMockData();
    }
  };

  const generateMockData = () => {
    const currentYear = new Date().getFullYear();
    const mockData = [];
    let total = 0;
    
    // Generate data for current year only (Jan 1 - today)
    const yearStart = new Date(currentYear, 0, 1);
    const today = new Date();
    
    for (let d = new Date(yearStart); d <= today; d.setDate(d.getDate() + 1)) {
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
      total += count;
      mockData.push({
        date: d.toISOString().split('T')[0],
        count,
        day: d.getDay(),
        month: d.getMonth(),
      });
    }
    
    setContributions(mockData);
    setTotalContributions(total);
    setLoading(false);
  };

    const getContributionLevel = (count) => {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 8) return 3;
        return 4;
    };

    const getMonthLabel = (monthIndex) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex];
    };

    // Group contributions by week
    const weeks = [];
    let currentWeek = [];

    contributions.forEach((day, index) => {
        if (day.day === 0 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(day);

        if (index === contributions.length - 1) {
            weeks.push(currentWeek);
        }
    });

    // Get month labels for display
    const monthLabels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
        const firstDay = week[0];
        if (firstDay && firstDay.month !== lastMonth) {
            monthLabels.push({
                month: getMonthLabel(firstDay.month),
                weekIndex
            });
            lastMonth = firstDay.month;
        }
    });

    if (loading) {
        return (
            <div className="github-activity-loading">
                <div className="loading-spinner"></div>
                <p>Loading contribution data...</p>
            </div>
        );
    }

  return (
    <div className="github-activity-container">
      {/* Crazy Background Effects */}
      <div className="github-crazy-bg">
        <div className="crazy-gradient-1"></div>
        <div className="crazy-gradient-2"></div>
        <div className="crazy-gradient-3"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="github-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle-dot"
            style={{
              '--particle-x': `${Math.random() * 100}%`,
              '--particle-y': `${Math.random() * 100}%`,
              '--particle-delay': `${Math.random() * 3}s`,
              '--particle-duration': `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="matrix-rain">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="matrix-column"
            style={{
              left: `${i * 7}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            {[...Array(10)].map((_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(33 + Math.floor(Math.random() * 93))}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="github-activity-header">
        <div className="title-wrapper-crazy">
          <div className="title-glow-effect"></div>
          <h3 className="github-activity-title github-title-crazy">
            <span className="activity-icon activity-icon-crazy">💻</span>
            <span className="title-text-animated">
              <span className="title-word">Days</span>
              <span className="title-word">I</span>
              <span className="title-word">Code</span>
            </span>
            <span className="activity-icon activity-icon-crazy">🔥</span>
          </h3>
          
          {/* Live Update Badge */}
          <div className="live-update-badge">
            <span className="pulse-dot"></span>
            <span className="live-text">Auto-updates on every git push</span>
            <svg className="live-icon" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <p className="github-activity-subtitle github-subtitle-crazy">
          My GitHub contribution activity for {new Date().getFullYear()}
        </p>

        {/* Visit GitHub Button */}
        <a 
          href="https://github.com/nabin00012" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-visit-btn"
        >
          <span className="btn-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </span>
          <span className="btn-text">Visit My GitHub</span>
          <span className="btn-arrow">→</span>
          <div className="btn-glow"></div>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="github-stats-grid github-stats-single">
        <div className="stat-card stat-card-large">
          <div className="stat-icon">💻</div>
          <div className="stat-content">
            <div className="stat-value">{totalContributions}</div>
            <div className="stat-label">Total Contributions in {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>

            {/* Contribution Graph */}
            <div className="contribution-graph-wrapper">
                <div className="contribution-graph">
                    {/* Month Labels */}
                    <div className="month-labels">
                        {monthLabels.map((label, index) => (
                            <div
                                key={index}
                                className="month-label"
                                style={{ gridColumn: label.weekIndex + 1 }}
                            >
                                {label.month}
                            </div>
                        ))}
                    </div>

                    {/* Day Labels */}
                    <div className="day-labels">
                        <div className="day-label">Mon</div>
                        <div className="day-label">Wed</div>
                        <div className="day-label">Fri</div>
                    </div>

                    {/* Contribution Grid */}
                    <div className="contribution-grid">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="contribution-week">
                                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                                    const day = week.find(d => d.day === dayIndex);
                                    const level = day ? getContributionLevel(day.count) : 0;

                                    return (
                                        <div
                                            key={dayIndex}
                                            className={`contribution-day level-${level}`}
                                            data-count={day?.count || 0}
                                            data-date={day?.date || ''}
                                            title={day ? `${day.count} contributions on ${day.date}` : ''}
                                        >
                                            <div className="day-glow"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="contribution-legend">
                    <span className="legend-label">Less</span>
                    <div className="contribution-day level-0"></div>
                    <div className="contribution-day level-1"></div>
                    <div className="contribution-day level-2"></div>
                    <div className="contribution-day level-3"></div>
                    <div className="contribution-day level-4"></div>
                    <span className="legend-label">More</span>
                </div>
            </div>
        </div>
    );
};

export default GitHubActivity;

