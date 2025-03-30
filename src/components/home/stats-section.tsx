
import { useState, useEffect, useRef } from "react";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem = ({ value, label, suffix = "", delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          setTimeout(() => {
            let start = 0;
            const duration = 2000;
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const currentCount = Math.floor(progress * value);
              setCount(currentCount);
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(value);
              }
            };
            
            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => observer.disconnect();
  }, [value, delay]);
  
  return (
    <div className="text-center">
      <div className="flex justify-center items-baseline">
        <span ref={countRef} className="text-4xl md:text-5xl font-bold text-pickle">
          {count}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-pickle ml-1">{suffix}</span>
      </div>
      <p className="text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

export function StatsSection() {
  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Impact</h2>
          <p className="text-muted-foreground">The numbers speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={120} label="Athletes Promoted" delay={0} />
          <StatItem value={85} label="Tournaments Marketed" delay={200} />
          <StatItem value={10} suffix="+" label="Years of Experience" delay={400} />
          <StatItem value={2} suffix="M+" label="Social Media Reach" delay={600} />
        </div>
      </div>
    </section>
  );
}
