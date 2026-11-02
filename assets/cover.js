/**
 * JavaScript-based Animated Cover Photo Generator
 * Creates a dynamic, animated SVG cover for GitHub profile
 * 
 * Features:
 * - Animated gradient background
 * - Pulsing text effects
 * - Floating particles
 * - Responsive design
 * 
 * Usage:
 * 1. Run this script in a browser to generate the SVG
 * 2. Copy the generated SVG to your README.md
 * 3. Or use the pre-generated cover.svg
 */

// Configuration
const config = {
  width: 1200,
  height: 675,
  title: "Sajid Islam",
  subtitle: "Co-Founder at CybrCraft | Forward Deployed Engineer",
  tagline: "Building AI-driven applications & scalable systems",
  colors: {
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#06b6d4",
    text: "#ffffff",
    subtitle: "rgba(255, 255, 255, 0.9)",
    tagline: "rgba(255, 255, 255, 0.8)"
  },
  particles: {
    count: 15,
    size: 4,
    color: "rgba(255, 255, 255, 0.6)",
    speed: 0.5
  },
  animation: {
    duration: 3,
    delay: 0.5
  }
};

// Generate animated SVG
function generateCoverSVG() {
  const particles = generateParticles();
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${config.width} ${config.height}" width="${config.width}" height="${config.height}">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.colors.primary}">
        <animate attributeName="stop-color" values="${config.colors.primary};${config.colors.secondary};${config.colors.accent};${config.colors.primary}" dur="${config.animation.duration * 2}s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="${config.colors.secondary}">
        <animate attributeName="stop-color" values="${config.colors.secondary};${config.colors.accent};${config.colors.primary};${config.colors.secondary}" dur="${config.animation.duration * 2}s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="${config.colors.accent}">
        <animate attributeName="stop-color" values="${config.colors.accent};${config.colors.primary};${config.colors.secondary};${config.colors.accent}" dur="${config.animation.duration * 2}s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
    
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    
    <style type="text/css">
      <![CDATA[
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .title { animation: pulse ${config.animation.duration}s ease-in-out infinite; }
        .subtitle { animation: fadeIn 1s ease-out ${config.animation.delay}s forwards; }
        .tagline { animation: fadeIn 1s ease-out ${config.animation.delay + 0.3}s forwards; }
        .particle { animation: float ${config.animation.duration * 1.5}s ease-in-out infinite; }
      ]]>
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)" />
  
  <!-- Particles -->
  ${particles}
  
  <!-- Content -->
  <g transform="translate(${config.width / 2}, ${config.height / 2})" text-anchor="middle">
    <text x="0" y="-100" class="title" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="${config.colors.text}">${config.title}</text>
    <text x="0" y="-20" class="subtitle" font-family="Arial, sans-serif" font-size="36" fill="${config.colors.subtitle}">${config.subtitle}</text>
    <text x="0" y="40" class="tagline" font-family="Arial, sans-serif" font-size="24" fill="${config.colors.tagline}">${config.tagline}</text>
    <text x="0" y="100" font-family="Arial, sans-serif" font-size="20" fill="${config.colors.tagline}">Portfolio: sajid-ul-islam.vercel.app | LinkedIn: @sajidislamchowdhury</text>
  </g>
  
  <!-- JavaScript-powered label -->
  <text x="${config.width - 200}" y="${config.height - 20}" font-family="Arial, sans-serif" font-size="14" fill="rgba(255, 255, 255, 0.7)">
    <tspan x="${config.width - 200}" dy="0">⚡ Powered by JavaScript</tspan>
  </text>
</svg>`;
}

// Generate floating particles
function generateParticles() {
  let particles = [];
  const count = config.particles.count;
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * config.width;
    const y = Math.random() * config.height;
    const size = config.particles.size + Math.random() * 2;
    const delay = Math.random() * config.animation.duration;
    const duration = config.animation.duration * (0.8 + Math.random() * 0.4);
    
    particles.push(`
      <circle cx="${x}" cy="${y}" r="${size}" fill="${config.particles.color}" class="particle" 
        style="animation-delay: ${delay}s; animation-duration: ${duration}s;" />
    `);
  }
  
  return particles.join('\n');
}

// Export for Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateCoverSVG, config };
} else if (typeof window !== 'undefined') {
  // Browser environment
  window.CoverGenerator = {
    generate: generateCoverSVG,
    config: config
  };
  
  // Auto-generate and display if run in browser
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cover-container');
    if (container) {
      container.innerHTML = generateCoverSVG();
    }
  });
}

// Generate and log SVG if run directly
console.log('JavaScript Cover Photo Generator');
console.log('==============================');
console.log('Generated SVG:');
console.log(generateCoverSVG());
