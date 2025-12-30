import React from "react";
import { useLocation } from "wouter";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  };

  const [, navigate] = useLocation();
  
  const handleClick = () => {
    navigate('/');
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`flex items-center gap-2 font-heading font-bold text-primary-600 dark:text-primary-500 ${className} cursor-pointer`}
    >
      <div className={`${sizeClasses[size]} rounded-md text-white flex items-center justify-center`}>
      </div>
      <span>Moustapha Sambe</span>
    </div>
  );
};
