export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006ead" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      
      {/* Rounded square background */}
      <rect 
        x="5" 
        y="5" 
        width="90" 
        height="90" 
        rx="20" 
        fill="url(#logoGradient)"
        opacity="0.1"
      />
      
      {/* P letter */}
      <path
        d="M25 30 L25 70 M25 30 L45 30 C52 30 55 35 55 42 C55 49 52 54 45 54 L25 54"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* S letter */}
      <path
        d="M65 35 C65 32 67 30 70 30 L73 30 C76 30 78 32 78 35 C78 38 76 40 73 40 L70 40 C67 40 65 42 65 45 L65 48 C65 51 67 53 70 53 L73 53 C76 53 78 51 78 48"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Decorative dots */}
      <circle cx="60" cy="70" r="3" fill="url(#logoGradient)" opacity="0.6" />
      <circle cx="70" cy="70" r="2.5" fill="url(#logoGradient)" opacity="0.4" />
      <circle cx="78" cy="70" r="2" fill="url(#logoGradient)" opacity="0.3" />
    </svg>
  );
}
