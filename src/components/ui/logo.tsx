
import React from "react";
import { cn } from "@/lib/utils";

export const Logo = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("font-bold flex items-center", sizeClasses[size], className)}>
      <span className="text-pickle">Pickleball</span>
      <span className="text-pickle-dark">Official</span>
    </div>
  );
};
