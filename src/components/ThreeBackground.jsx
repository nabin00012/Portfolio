import { useEffect, useRef } from 'react';

const ThreeBackground = ({ currentSection = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // No cleanup needed for static background
  }, [currentSection]);

  return (
    <div
      ref={containerRef}
      className="creative-brand-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        background: 'radial-gradient(ellipse at 50% 50%, #0f0f14 0%, #0a0a0a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient mesh - organic look */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(circle at center, rgba(0, 163, 255, 0.15) 0%, rgba(0, 163, 255, 0.05) 30%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'organicFloat1 25s ease-in-out infinite alternate',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        }}
      />
      
      {/* Second gradient orb with different shape */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '55%',
          height: '65%',
          background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.12) 0%, rgba(0, 255, 136, 0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'organicFloat2 30s ease-in-out infinite alternate',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      />

      {/* Third accent orb - purple/pink */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '20%',
          width: '35%',
          height: '45%',
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'organicFloat3 20s ease-in-out infinite alternate',
          borderRadius: '50% 50% 60% 40% / 50% 60% 40% 50%',
        }}
      />

      {/* Geometric shapes layer - dots pattern */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="rgba(0, 163, 255, 0.3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite" />
        </rect>
      </svg>

      {/* Floating geometric shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Shape 1 - Triangle */}
        <svg
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '120px',
            height: '120px',
            opacity: 0.15,
            animation: 'floatShape1 15s ease-in-out infinite',
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,90 10,90" fill="none" stroke="rgba(0, 163, 255, 0.6)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="3s" repeatCount="indefinite" />
          </polygon>
        </svg>

        {/* Shape 2 - Circle */}
        <svg
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '100px',
            height: '100px',
            opacity: 0.12,
            animation: 'floatShape2 18s ease-in-out infinite',
          }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(0, 255, 136, 0.6)" strokeWidth="2">
            <animate attributeName="r" values="30;40;30" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Shape 3 - Hexagon */}
        <svg
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '90px',
            height: '90px',
            opacity: 0.1,
            animation: 'floatShape3 20s ease-in-out infinite',
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,5 93,25 93,75 50,95 7,75 7,25" fill="none" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="3.5s" repeatCount="indefinite" />
          </polygon>
        </svg>

        {/* Shape 4 - Square */}
        <svg
          style={{
            position: 'absolute',
            top: '35%',
            right: '30%',
            width: '80px',
            height: '80px',
            opacity: 0.08,
            animation: 'floatShape4 22s ease-in-out infinite',
          }}
          viewBox="0 0 100 100"
        >
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="2" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="25s" repeatCount="indefinite" />
          </rect>
        </svg>

        {/* Shape 5 - Star-like */}
        <svg
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '40%',
            width: '70px',
            height: '70px',
            opacity: 0.1,
            animation: 'floatShape5 16s ease-in-out infinite',
          }}
          viewBox="0 0 100 100"
        >
          <path d="M50,15 L60,40 L85,45 L65,65 L70,90 L50,75 L30,90 L35,65 L15,45 L40,40 Z" fill="none" stroke="rgba(0, 163, 255, 0.5)" strokeWidth="2">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Particle effect layer - Responsive particle count */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 25 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: `rgba(${i % 2 === 0 ? '0, 163, 255' : '0, 255, 136'}, 0.4)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle${(i % 3) + 1} ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 10px rgba(${i % 2 === 0 ? '0, 163, 255' : '0, 255, 136'}, 0.5)`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 163, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 163, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.3,
          animation: 'gridSlide 60s linear infinite',
        }}
      />

      {/* Fine grain texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes organicFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            borderRadius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          33% {
            transform: translate(40px, -50px) scale(1.1) rotate(10deg);
            borderRadius: 60% 40% 50% 50% / 50% 60% 40% 60%;
          }
          66% {
            transform: translate(-30px, -30px) scale(0.95) rotate(-5deg);
            borderRadius: 50% 50% 60% 40% / 60% 40% 50% 50%;
          }
        }

        @keyframes organicFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            borderRadius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          33% {
            transform: translate(-50px, 40px) scale(1.08) rotate(-8deg);
            borderRadius: 40% 60% 50% 50% / 50% 50% 60% 40%;
          }
          66% {
            transform: translate(30px, 20px) scale(1.05) rotate(5deg);
            borderRadius: 50% 50% 40% 60% / 40% 60% 50% 50%;
          }
        }

        @keyframes organicFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            borderRadius: 50% 50% 60% 40% / 50% 60% 40% 50%;
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
            borderRadius: 60% 40% 50% 50% / 40% 50% 60% 50%;
          }
        }

        @keyframes floatShape1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -40px) rotate(15deg); }
        }

        @keyframes floatShape2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.15); }
        }

        @keyframes floatShape3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 35px) rotate(-20deg); }
        }

        @keyframes floatShape4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, -30px) rotate(10deg); }
        }

        @keyframes floatShape5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(35px, 25px) scale(1.2); }
        }

        @keyframes particle1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(30px, -50px); opacity: 0.6; }
        }

        @keyframes particle2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(-40px, 40px); opacity: 0.7; }
        }

        @keyframes particle3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(25px, 35px); opacity: 0.5; }
        }

        @keyframes gridSlide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }

        /* Mobile Performance Optimization */
        @media (max-width: 768px) {
          @keyframes organicFloat1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              borderRadius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            }
            50% {
              transform: translate(20px, -25px) scale(1.05);
              borderRadius: 60% 40% 50% 50% / 50% 60% 40% 60%;
            }
          }

          @keyframes organicFloat2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              borderRadius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              transform: translate(-25px, 20px) scale(1.04);
              borderRadius: 40% 60% 50% 50% / 50% 50% 60% 40%;
            }
          }

          @keyframes organicFloat3 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              borderRadius: 50% 50% 60% 40% / 50% 60% 40% 50%;
            }
            50% {
              transform: translate(-15px, 15px) scale(1.05);
              borderRadius: 60% 40% 50% 50% / 40% 50% 60% 50%;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeBackground;

