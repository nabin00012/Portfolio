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
                <h3 className="github-activity-title">
                    <span className="activity-icon">📊</span>
                    Days I Code
                </h3>
        <p className="github-activity-subtitle">
          My GitHub contribution activity for {new Date().getFullYear()}
        </p>
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

