import { FlaskConical } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = "" }: SpinnerProps) {
  // Combine base animations with any provided classes (like text color, size)
  const wrapperClass = `inline-flex items-center justify-center animate-pulse ${className}`;
  
  return (
    <div className={wrapperClass}>
      <FlaskConical className="w-full h-full animate-[wiggle_1.5s_ease-in-out_infinite]" />
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
