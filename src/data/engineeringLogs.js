/**
 * Engineering Logs Data Model
 * 
 * Reframed blog posts as engineering documentation.
 * Each log connects to case studies and system health metrics.
 */

/**
 * @typedef {Object} EngineeringLog
 * @property {string} id - Unique identifier (matches existing slug)
 * @property {string} logNumber - LOG-001, LOG-002, etc.
 * @property {string} title - Display title
 * @property {string} category - DEVOPS | SECURITY | WEB3 | FRONTEND | ARCHITECTURE
 * @property {string} summary - One-line description
 * @property {string} [linkedCaseStudy] - Related case study ID
 * @property {string[]} linkedSystems - Related system health metric IDs
 * @property {string} publishedAt - Publication date
 * @property {string} readTime - Estimated read time
 * @property {string} difficulty - INTERMEDIATE | ADVANCED | EXPERT
 */

export const LogCategory = {
  DEVOPS: 'DEVOPS',
  SECURITY: 'SECURITY',
  WEB3: 'WEB3',
  FRONTEND: 'FRONTEND',
  ARCHITECTURE: 'ARCHITECTURE',
};

export const LogDifficulty = {
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT',
};

/** @type {EngineeringLog[]} */
export const engineeringLogs = [
  {
    id: 'kubernetes-zero-downtime-deployments',
    logNumber: 'LOG-001',
    title: 'Zero-Downtime Deployment Architecture',
    category: LogCategory.DEVOPS,
    summary: 'RollingUpdate configuration with maxUnavailable: 0 to avoid service gaps during releases.',
    linkedCaseStudy: 'mern-ci-cd-kube',
    linkedSystems: ['infrastructure'],
    publishedAt: '2025-01-15',
    readTime: '12 min',
    difficulty: LogDifficulty.ADVANCED,
  },
  {
    id: 'aes-256-gcm-encryption',
    logNumber: 'LOG-002',
    title: 'AES-256-GCM Implementation Notes',
    category: LogCategory.SECURITY,
    summary: 'Authenticated encryption for document storage, developed test-first to catch IV-handling bugs.',
    linkedCaseStudy: 'securefindata',
    linkedSystems: ['security', 'testing'],
    publishedAt: '2025-01-12',
    readTime: '15 min',
    difficulty: LogDifficulty.EXPERT,
  },
  {
    id: 'web3-event-indexing',
    logNumber: 'LOG-003',
    title: 'Off-Chain Event Indexing for Web3',
    category: LogCategory.WEB3,
    summary: 'Node.js indexer that subscribes to Solidity events and stores them in MongoDB for faster reads.',
    linkedCaseStudy: 'fluxtrade',
    linkedSystems: ['web3', 'data'],
    publishedAt: '2025-01-10',
    readTime: '18 min',
    difficulty: LogDifficulty.ADVANCED,
  },
  {
    id: 'nextjs-typescript-architecture',
    logNumber: 'LOG-004',
    title: 'SSR + TypeScript Migration Strategy',
    category: LogCategory.FRONTEND,
    summary: 'Server Components for static content, strict TypeScript to catch errors at build time.',
    linkedCaseStudy: 'codecommons',
    linkedSystems: ['frontend'],
    publishedAt: '2025-01-08',
    readTime: '14 min',
    difficulty: LogDifficulty.ADVANCED,
  },
  {
    id: 'mern-production-deployment',
    logNumber: 'LOG-005',
    title: 'Production Deployment Patterns',
    category: LogCategory.ARCHITECTURE,
    summary: 'Structured logging, global error handling, and health endpoints for better observability.',
    linkedCaseStudy: 'codecommons',
    linkedSystems: ['infrastructure', 'api'],
    publishedAt: '2025-01-05',
    readTime: '16 min',
    difficulty: LogDifficulty.EXPERT,
  },
];

/**
 * Get engineering log by ID
 * @param {string} id
 * @returns {EngineeringLog|undefined}
 */
export function getLogById(id) {
  return engineeringLogs.find((log) => log.id === id);
}

/**
 * Get logs by category
 * @param {string} category
 * @returns {EngineeringLog[]}
 */
export function getLogsByCategory(category) {
  return engineeringLogs.filter((log) => log.category === category);
}

/**
 * Get logs linked to a specific case study
 * @param {string} caseStudyId
 * @returns {EngineeringLog[]}
 */
export function getLogsForCaseStudy(caseStudyId) {
  return engineeringLogs.filter((log) => log.linkedCaseStudy === caseStudyId);
}

/**
 * Get category display info
 * @param {string} category
 * @returns {{ label: string, color: string }}
 */
export function getCategoryInfo(category) {
  const info = {
    [LogCategory.DEVOPS]: { label: 'DevOps', color: '#00d4ff' },
    [LogCategory.SECURITY]: { label: 'Security', color: '#ff0080' },
    [LogCategory.WEB3]: { label: 'Web3', color: '#ff6b35' },
    [LogCategory.FRONTEND]: { label: 'Frontend', color: '#00ff88' },
    [LogCategory.ARCHITECTURE]: { label: 'Architecture', color: '#9d4edd' },
  };
  return info[category] || { label: category, color: '#8b949e' };
}
