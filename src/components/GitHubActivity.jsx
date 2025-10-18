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
      <div className="github-activity-header">
        <div className="header-top">
          <h3 className="github-activity-title">
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {totalContributions} contributions in {new Date().getFullYear()}
          </h3>
          
          {/* Live Update Badge */}
          <div className="live-update-badge">
            <span className="pulse-dot"></span>
            <span className="live-text">Updates automatically</span>
          </div>
        </div>
        
        <p className="github-activity-subtitle">
          A year of code, one commit at a time. Every green square represents hours of problem-solving, learning, and building.
        </p>

        {/* Visit GitHub Button */}
        <a 
          href="https://github.com/nabin00012" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-visit-btn"
        >
          <svg className="github-icon-btn" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          View on GitHub
          <svg className="arrow-icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1z"/>
          </svg>
        </a>
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

