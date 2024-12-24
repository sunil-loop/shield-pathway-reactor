import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

const ShieldPath = () => {
  const pathRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!pathRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - windowHeight;
      const scrollPercentage = (scrollPosition / maxScroll) * 100;
      
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
    
    // Calculate position based on scroll or mouse drag
    const position = isDragging 
      ? mousePosition.y - path.getBoundingClientRect().top
      : (pathLength * scrollProgress) / 100;

    // Ensure shield stays within path bounds
    const clampedPosition = Math.max(0, Math.min(position, pathLength));
    shield.style.transform = `translateY(${clampedPosition}px)`;
  }, [scrollProgress, mousePosition, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!pathRef.current) return;
    setIsDragging(true);
    const pathRect = pathRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - pathRect.left, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !pathRef.current) return;
    const pathRect = pathRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - pathRect.left, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="fixed left-1/2 top-0 h-full w-px"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={pathRef} className="relative h-full">
        {/* Path segments with accurate spacing */}
        <div className="absolute left-0 top-0 h-1/4 w-px bg-shield-primary opacity-100" />
        <div className="absolute left-0 top-1/4 h-1/4 w-px bg-transparent" />
        <div className="absolute left-0 top-2/4 h-1/4 w-px bg-shield-primary opacity-100" />
        <div className="absolute left-0 top-3/4 h-1/4 w-px bg-transparent" />
        
        {/* Interactive shield */}
        <div 
          ref={shieldRef}
          className="absolute -left-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          style={{ transition: isDragging ? 'none' : 'transform 0.5s ease-out' }}
        >
          <Shield 
            className="h-8 w-8 text-shield-primary animate-shield-floating" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default ShieldPath;