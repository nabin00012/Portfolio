/**
 * Case Studies Data Model
 * 
 * Projects rewritten as Problem → Action → Result format.
 * Each case study demonstrates engineering decisions, not just features.
 */

/**
 * @typedef {Object} Decision
 * @property {string} decision - What was decided
 * @property {string} rationale - Why this decision was made
 * @property {string} [tradeoff] - What was sacrificed or risked
 */

/**
 * @typedef {Object} Metric
 * @property {string} metric - What was measured
 * @property {string} before - State before implementation
 * @property {string} after - State after implementation
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} id - Unique identifier
 * @property {string} title - Case study title
 * @property {string} domain - Engineering domain
 * @property {Object} problem - Problem definition
 * @property {Object} action - Actions taken
 * @property {Object} result - Measurable outcomes
 * @property {string[]} technologies - Tech stack used
 * @property {string[]} linkedLogs - Related engineering log slugs
 * @property {string} repository - GitHub URL
 * @property {string} [live] - Live demo URL
 */

/** @type {CaseStudy[]} */
export const caseStudies = [
  {
    id: 'mern-ci-cd-kube',
    title: 'Zero-Downtime MERN Deployment with Kubernetes Orchestration',
    domain: 'DevOps / Infrastructure',
    linkedSystems: ['infrastructure'], // Links to System Health layer
    
    problem: {
      headline: 'Service restarts during deployment caused user disconnections',
      context: `A real-time chat application required continuous availability. Traditional deployment methods (stop → deploy → start) created a 30-90 second window where active WebSocket connections dropped.`,
      constraints: [
        'MongoDB state must persist across pod restarts',
        'WebSocket connections cannot be interrupted mid-session',
        'Deployment must be automated (no manual kubectl)',
        'Rollback must complete in under 60 seconds',
      ],
      failureMode: 'Users experienced "connection lost" errors during every deployment',
    },
    
    action: {
      headline: 'Implemented RollingUpdate strategy with health-gated traffic routing',
      decisions: [
        {
          decision: 'Set maxUnavailable: 0 in Deployment spec',
          rationale: 'Ensures no pods terminate until replacements pass readiness checks',
          tradeoff: 'Requires 2x resource headroom during rollout',
        },
        {
          decision: 'Added HTTP readiness probe on /api/health endpoint',
          rationale: 'Kubernetes routes traffic only after app confirms database connection',
          tradeoff: 'Added 5-10 second delay to pod startup',
        },
        {
          decision: 'Used MongoDB StatefulSet with PersistentVolumeClaim',
          rationale: 'Pod identity and storage persist across restarts',
          tradeoff: 'Cannot scale horizontally without replica set configuration',
        },
        {
          decision: 'GitHub Actions workflow triggers on main branch push',
          rationale: 'Eliminates manual deployment steps; audit trail in git history',
          tradeoff: 'Requires Docker registry credentials in GitHub Secrets',
        },
      ],
      logReference: 'kubernetes-zero-downtime-deployments',
    },
    
    result: {
      headline: 'Achieved zero-downtime deployments with automated release pipeline',
      metrics: [
        { metric: 'Deployment downtime', before: '30-90 seconds', after: '0 seconds (observed)' },
        { metric: 'Release cycle', before: 'Manual SSH + restart', after: 'Git push triggers deploy' },
        { metric: 'Rollback capability', before: 'Manual redeploy required', after: 'kubectl rollout undo' },
        { metric: 'Deployment failures', before: 'Discovered in production', after: 'Caught at readiness probe' },
      ],
      validation: 'Verified by observing active WebSocket connections during deployments—no disconnections.',
    },
    
    knownLimitations: {
      notSolved: 'Cross-region failover was not implemented due to operational complexity.',
      assumptions: [
        'Assumes single-region deployment',
        'MongoDB replica set requires manual configuration for horizontal scaling',
      ],
      wouldBreakIf: 'Node failure during rollout could leave system in degraded state until new pod passes readiness.',
    },
    
    technologies: ['Kubernetes', 'Docker', 'GitHub Actions', 'MongoDB StatefulSet', 'Express.js', 'Socket.IO'],
    linkedLogs: ['kubernetes-zero-downtime-deployments'],
    repository: 'https://github.com/nabin00012/mern-ci-cd-kube',
    live: 'https://mern-ci-cd-kube.vercel.app/',
  },
  
  {
    id: 'securefindata',
    title: 'AES-256-GCM Encryption with TDD Security Validation',
    domain: 'Security / Cryptography',
    linkedSystems: ['security', 'testing'], // Links to System Health layers
    
    problem: {
      headline: 'Financial documents required encryption that could prove integrity',
      context: `A fintech API needed to encrypt sensitive Excel/PDF documents at rest. Standard AES-CBC encryption provides confidentiality but not integrity—an attacker could modify ciphertext without detection.`,
      constraints: [
        'Must detect tampering (not just encrypt)',
        'Key management must not leak keys in logs',
        'Encryption/decryption must complete in < 50ms for 300KB files',
        'Security module requires 85%+ test coverage before merge',
      ],
      failureMode: 'Without authenticated encryption, modified ciphertext decrypts to corrupted data silently',
    },
    
    action: {
      headline: 'Implemented AES-256-GCM with Jest TDD workflow',
      decisions: [
        {
          decision: 'Selected AES-256-GCM over AES-256-CBC',
          rationale: 'GCM provides authenticated encryption—authentication tag validates integrity',
          tradeoff: 'Slightly higher computational overhead (negligible at scale)',
        },
        {
          decision: 'Generated unique IV per encryption operation',
          rationale: 'IV reuse with same key breaks GCM security guarantees',
          tradeoff: 'Must store IV alongside ciphertext (16 bytes overhead)',
        },
        {
          decision: 'Wrote tests before implementation (TDD)',
          rationale: 'Security code must be correct by construction',
          tradeoff: 'Slower initial development; faster debugging',
        },
        {
          decision: 'Implemented RBAC middleware for document access',
          rationale: 'Encryption at rest is insufficient—must control decryption requests',
          tradeoff: 'Added latency for permission checks',
        },
      ],
      logReference: 'aes-256-gcm-encryption',
    },
    
    result: {
      headline: 'Security module fully tested with authenticated encryption',
      metrics: [
        { metric: 'Test coverage', before: 'No tests', after: 'Jest coverage report confirms 85%+' },
        { metric: 'Encryption performance', before: 'N/A', after: 'Completes under latency constraint' },
        { metric: 'Tampering detection', before: 'Not possible (CBC)', after: 'Auth tag rejects modified ciphertext' },
      ],
      validation: 'Tests include intentional ciphertext corruption—GCM auth tag correctly rejects.',
    },
    
    knownLimitations: {
      notSolved: 'Key rotation mechanism is manual; automated rotation was deferred.',
      assumptions: [
        'Keys are stored in environment variables, not a dedicated secrets manager',
        'Single encryption key per document type',
      ],
      wouldBreakIf: 'Key compromise requires manual re-encryption of all affected documents.',
    },
    
    technologies: ['Node.js Crypto', 'AES-256-GCM', 'Jest', 'Express.js', 'RBAC'],
    linkedLogs: ['aes-256-gcm-encryption'],
    repository: 'https://github.com/nabin00012/secure-fin-data',
  },
  
  {
    id: 'codecommons',
    title: 'Collaborative Coding Platform with SSR and Type Safety',
    domain: 'Frontend Architecture / Full-Stack',
    linkedSystems: ['frontend', 'api'], // Links to System Health layers
    
    problem: {
      headline: 'Large client bundles caused slow initial loads and runtime errors',
      context: `A collaborative coding platform with Monaco Editor faced two issues: (1) Heavy client-side rendering caused 4+ second initial loads, and (2) A growing codebase without type safety produced frequent null/undefined errors.`,
      constraints: [
        'Monaco Editor cannot be server-rendered (Web Worker dependency)',
        'Real-time collaboration requires Socket.IO on client',
        'Lighthouse Performance score must exceed 90',
        'TypeScript must catch errors at build time',
      ],
      failureMode: 'Users on slow connections abandoned the site; runtime errors broke editing sessions',
    },
    
    action: {
      headline: 'Hybrid SSR architecture with strict TypeScript enforcement',
      decisions: [
        {
          decision: 'Server-render static content; dynamic import Monaco',
          rationale: 'Initial paint contains navigable content; heavy editor loads after interaction',
          tradeoff: 'Editor shows loading state for 1-2 seconds on slow connections',
        },
        {
          decision: 'Enforced strict TypeScript with no implicit any',
          rationale: 'Build fails on type errors—runtime null errors become compile-time failures',
          tradeoff: 'Higher upfront typing effort',
        },
        {
          decision: 'Used Next.js 14 App Router with Server Components',
          rationale: 'Server Components reduce client JS bundle; streaming improves TTFB',
          tradeoff: 'Learning curve for Server/Client boundaries',
        },
        {
          decision: 'Socket.IO connection deferred until user enters coding room',
          rationale: 'No WebSocket overhead on landing page',
          tradeoff: 'Slight delay when entering collaborative mode',
        },
      ],
      logReference: 'nextjs-typescript-architecture',
    },
    
    result: {
      headline: 'Lighthouse Performance 95+ with TypeScript eliminating null errors at build time',
      metrics: [
        { metric: 'Lighthouse Performance', before: 'Not measured', after: '95+ (verifiable via PageSpeed Insights)' },
        { metric: 'Null/undefined errors', before: 'Runtime crashes', after: 'Caught at compile time' },
        { metric: 'Bundle strategy', before: 'Single large bundle', after: 'Monaco dynamically imported' },
        { metric: 'Initial content', before: 'Blank until JS loads', after: 'Server-rendered HTML' },
      ],
      validation: 'Lighthouse score verifiable at PageSpeed Insights; strict TypeScript enforced in tsconfig.',
      recognition: 'Recognized by Jain University faculty',
    },
    
    knownLimitations: {
      notSolved: 'Concurrent editing conflict resolution is basic; no operational transform or CRDT.',
      assumptions: [
        'Socket.IO server runs single-instance; horizontal scaling requires sticky sessions',
        'Monaco Editor performance degrades on files larger than ~10K lines',
      ],
      wouldBreakIf: 'Two users edit the same line simultaneously—last write wins, no merge.',
    },
    
    technologies: ['Next.js 14', 'TypeScript', 'Socket.IO', 'Monaco Editor', 'Three.js'],
    linkedLogs: ['nextjs-typescript-architecture'],
    repository: 'https://github.com/nabin00012/codecommons',
    live: 'https://codecommons-delta.vercel.app',
  },
  
  {
    id: 'fluxtrade',
    title: 'Web3 Trading Platform with Off-Chain Event Indexing',
    domain: 'Web3 / Blockchain',
    linkedSystems: ['web3', 'data'], // Links to System Health layers
    
    problem: {
      headline: 'Direct blockchain queries were too slow for portfolio analytics',
      context: `A DeFi trading platform needed to display user portfolio history. Direct blockchain reads for transaction history took 5+ seconds, making the UX unacceptable for real-time analytics.`,
      constraints: [
        'Must maintain data consistency with blockchain state',
        'Portfolio queries must return in < 200ms',
        'Cannot lose events during indexer downtime',
        'Gas costs for on-chain storage are prohibitive',
      ],
      failureMode: 'Users waited 5+ seconds for portfolio to load; often abandoned before data appeared',
    },
    
    action: {
      headline: 'Built Node.js event indexer with MongoDB aggregation layer',
      decisions: [
        {
          decision: 'Listen to Solidity events via Web3.js, store in MongoDB',
          rationale: 'Off-chain indexing enables fast queries without blockchain latency',
          tradeoff: 'Introduces eventual consistency window',
        },
        {
          decision: 'Implemented event replay from specific block on restart',
          rationale: 'Ensures no events lost during indexer downtime',
          tradeoff: 'Startup time increases with chain history',
        },
        {
          decision: 'MongoDB aggregation pipeline for portfolio calculations',
          rationale: 'Complex analytics computed server-side, not in browser',
          tradeoff: 'Server resource usage for aggregation',
        },
      ],
      logReference: 'web3-event-indexing',
    },
    
    result: {
      headline: 'Portfolio queries return in milliseconds instead of seconds',
      metrics: [
        { metric: 'Portfolio load', before: 'Direct RPC call (~5s)', after: 'MongoDB query (sub-second)' },
        { metric: 'Event consistency', before: 'N/A', after: 'Indexer replays from last block on restart' },
        { metric: 'Data freshness', before: 'Manual refresh required', after: 'Events indexed as emitted' },
      ],
      validation: 'Response times observable in browser DevTools; indexed data validated against on-chain state.',
    },
    
    technologies: ['Web3.js', 'Solidity', 'Node.js', 'MongoDB', 'Express.js'],
    linkedLogs: ['web3-event-indexing'],
    repository: 'https://github.com/nabin00012/fluxtrade',
    live: 'https://flux-trade-nine.vercel.app/',
  },
];

/**
 * Get case study by ID
 * @param {string} id
 * @returns {CaseStudy|undefined}
 */
export function getCaseStudyById(id) {
  return caseStudies.find((study) => study.id === id);
}

/**
 * Get case studies by domain
 * @param {string} domain
 * @returns {CaseStudy[]}
 */
export function getCaseStudiesByDomain(domain) {
  return caseStudies.filter((study) => 
    study.domain.toLowerCase().includes(domain.toLowerCase())
  );
}
