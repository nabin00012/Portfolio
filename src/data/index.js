/**
 * Data Module Index
 * 
 * Central export for all typed data models.
 */

export {
  systemHealthData,
  SystemStatus,
  getSystemSummary,
  getStatusColor,
} from './systemHealth.js';

export {
  caseStudies,
  getCaseStudyById,
  getCaseStudiesByDomain,
} from './caseStudies.js';

export {
  engineeringLogs,
  LogCategory,
  LogDifficulty,
  getLogById,
  getLogsByCategory,
  getLogsForCaseStudy,
  getCategoryInfo,
} from './engineeringLogs.js';
