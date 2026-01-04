/**
 * System Health Data Model
 * 
 * Represents capabilities as operational systems rather than skill percentages.
 * Each metric maps to real engineering outcomes with evidence links.
 * 
 * Status values:
 * - OPERATIONAL: Actively used in production projects
 * - STABLE: Proven in multiple projects, not currently active
 * - LEARNING: Currently developing proficiency
 */

export const SystemStatus = {
  OPERATIONAL: 'OPERATIONAL',
  STABLE: 'STABLE',
  LEARNING: 'LEARNING',
};

/**
 * @typedef {Object} SystemMetric
 * @property {string} name - Capability name
 * @property {string} status - OPERATIONAL | STABLE | LEARNING
 * @property {string} lastDeployed - Project where this was most recently used
 * @property {string} [outcome] - Measurable result or validation
 * @property {string[]} dependencies - Related technologies
 * @property {string} [evidence] - Link to case study or log
 */

/**
 * @typedef {Object} SystemLayer
 * @property {string} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} description - Brief description of the layer
 * @property {string} overallStatus - Aggregate status
 * @property {SystemMetric[]} metrics - Individual capabilities
 */

/** @type {SystemLayer[]} */
export const systemHealthData = [
  {
    id: 'infrastructure',
    name: 'Infrastructure Layer',
    description: 'Container orchestration, CI/CD pipelines, deployment automation',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'Kubernetes Orchestration',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'MERN-CI-CD-Kube',
        outcome: 'Deployments complete without interrupting active user connections',
        dependencies: ['Docker', 'kubectl', 'YAML'],
        evidence: '/article?slug=kubernetes-zero-downtime-deployments',
      },
      {
        name: 'CI/CD Pipeline',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'MERN-CI-CD-Kube',
        outcome: 'Git push triggers automated build, test, and deploy',
        dependencies: ['GitHub Actions', 'Docker Registry'],
        evidence: '/article?slug=kubernetes-zero-downtime-deployments',
      },
      {
        name: 'Container Runtime',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'All Projects',
        outcome: 'Consistent dev/prod parity across environments',
        dependencies: ['Docker', 'Docker Compose'],
      },
    ],
  },
  {
    id: 'security',
    name: 'Security Layer',
    description: 'Authentication, encryption, access control, audit systems',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'Encryption at Rest',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'SecureFinData',
        outcome: 'AES-256-GCM with authenticated encryption',
        dependencies: ['Node.js Crypto', 'Key Management'],
        evidence: '/article?slug=aes-256-gcm-encryption',
      },
      {
        name: 'JWT Auth System',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'CodeCommons',
        outcome: 'Token rotation with session invalidation',
        dependencies: ['jsonwebtoken', 'bcrypt'],
      },
      {
        name: 'RBAC Implementation',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'SecureFinData',
        outcome: 'Role-based document access control',
        dependencies: ['Express Middleware', 'MongoDB'],
        evidence: '/article?slug=aes-256-gcm-encryption',
      },
    ],
  },
  {
    id: 'api',
    name: 'API Layer',
    description: 'REST design, real-time communication, error handling',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'REST API Design',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'All Projects',
        outcome: 'Consistent error contracts, validation middleware',
        dependencies: ['Express.js', 'Joi/Zod'],
      },
      {
        name: 'Real-time Layer',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'CodeCommons',
        outcome: 'Socket.IO with reconnection handling',
        dependencies: ['Socket.IO', 'WebSocket'],
        evidence: '/article?slug=nextjs-typescript-architecture',
      },
      {
        name: 'API Documentation',
        status: SystemStatus.STABLE,
        lastDeployed: 'SecureFinData',
        outcome: 'OpenAPI spec generation',
        dependencies: ['Swagger', 'Postman'],
      },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Layer',
    description: 'React architecture, SSR, state management, accessibility',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'Next.js SSR',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'CodeCommons',
        outcome: 'Initial page content is rendered before client-side hydration begins',
        dependencies: ['Next.js 14', 'React 18'],
        evidence: '/article?slug=nextjs-typescript-architecture',
      },
      {
        name: 'TypeScript Integration',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'CodeCommons',
        outcome: 'Most null/undefined errors caught at build time',
        dependencies: ['TypeScript', 'Zod'],
        evidence: '/article?slug=nextjs-typescript-architecture',
      },
      {
        name: 'React State Management',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'All Projects',
        outcome: 'Context + hooks patterns, no unnecessary deps',
        dependencies: ['React Context', 'useReducer'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data Layer',
    description: 'Database design, caching, indexing strategies',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'MongoDB Operations',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'All Projects',
        outcome: 'StatefulSet persistence, replica configuration',
        dependencies: ['MongoDB', 'Mongoose'],
      },
      {
        name: 'Off-chain Indexing',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'FluxTrade',
        outcome: 'Portfolio queries avoid direct blockchain reads',
        dependencies: ['Web3.js Events', 'MongoDB'],
        evidence: '/article?slug=web3-event-indexing',
      },
    ],
  },
  {
    id: 'testing',
    name: 'Quality Assurance',
    description: 'TDD workflow, integration tests, security validation',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'TDD Workflow',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'SecureFinData',
        outcome: 'Critical security logic is exercised by automated tests before merge',
        dependencies: ['Jest', 'Supertest'],
        evidence: '/article?slug=aes-256-gcm-encryption',
      },
      {
        name: 'Integration Testing',
        status: SystemStatus.STABLE,
        lastDeployed: 'MERN-CI-CD-Kube',
        outcome: 'API endpoint validation in CI',
        dependencies: ['Jest', 'Supertest'],
      },
    ],
  },
  {
    id: 'web3',
    name: 'Web3 Layer',
    description: 'Smart contracts, blockchain integration, DApp development',
    overallStatus: SystemStatus.OPERATIONAL,
    metrics: [
      {
        name: 'Smart Contract Integration',
        status: SystemStatus.OPERATIONAL,
        lastDeployed: 'FluxTrade',
        outcome: 'Web3.js transaction handling, event listening',
        dependencies: ['Web3.js', 'ethers.js'],
        evidence: '/article?slug=web3-event-indexing',
      },
      {
        name: 'Solidity Development',
        status: SystemStatus.STABLE,
        lastDeployed: 'FluxTrade',
        outcome: 'Gas-optimized contract patterns',
        dependencies: ['Solidity', 'Hardhat'],
      },
    ],
  },
];

/**
 * Get overall system status summary
 * @returns {{ operational: number, stable: number, learning: number, total: number }}
 */
export function getSystemSummary() {
  let operational = 0;
  let stable = 0;
  let learning = 0;

  systemHealthData.forEach((layer) => {
    layer.metrics.forEach((metric) => {
      if (metric.status === SystemStatus.OPERATIONAL) operational++;
      else if (metric.status === SystemStatus.STABLE) stable++;
      else if (metric.status === SystemStatus.LEARNING) learning++;
    });
  });

  return {
    operational,
    stable,
    learning,
    total: operational + stable + learning,
  };
}

/**
 * Get status color for UI
 * @param {string} status
 * @returns {string} CSS color value
 */
export function getStatusColor(status) {
  switch (status) {
    case SystemStatus.OPERATIONAL:
      return '#00ff88';
    case SystemStatus.STABLE:
      return '#00d4ff';
    case SystemStatus.LEARNING:
      return '#ffd700';
    default:
      return '#8b949e';
  }
}
