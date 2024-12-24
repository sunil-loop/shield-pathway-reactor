import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

const ShieldPath = () => {
  const pathRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!pathRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!pathRef.current || !shieldRef.current) return;

    const path = pathRef.current;
    const shield = shieldRef.current;
    const pathLength = path.offsetHeight;
    
    const position = (pathLength * scrollProgress) / 100;
    shield.style.transform = `translateY(${position}px)`;
  }, [scrollProgress]);

  return (
    <div className="fixed left-1/2 top-0 h-full w-px">
      <div ref={pathRef} className="relative h-full">
        {/* Visible line segments */}
        <div className="absolute left-0 top-0 h-1/4 w-px bg-shield-primary" />
        <div className="absolute left-0 top-1/2 h-1/4 w-px bg-shield-primary" />
        
        {/* Shield icon */}
        <div 
          ref={shieldRef}
          className="absolute -left-4 top-0 animate-shield-floating"
          style={{ transition: "transform 0.5s ease-out" }}
        >
          <Shield 
            className="h-8 w-8 text-shield-primary" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default ShieldPath;