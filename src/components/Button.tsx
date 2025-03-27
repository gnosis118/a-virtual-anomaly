
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  const variantClasses = {
    primary: 'bg-accent text-black hover:bg-accent/90 active:bg-accent/80',
    secondary: 'bg-secondary text-black hover:bg-secondary/80 active:bg-secondary/90',
    outline: 'bg-transparent border border-accent text-black hover:bg-accent/10 active:bg-accent/20',
    ghost: 'bg-transparent text-black hover:bg-muted active:bg-muted/70',
    link: 'bg-transparent text-black hover:underline p-0 h-auto',
  };

  const sizeClasses = {
    sm: 'text-base px-3 py-1',
    md: 'text-lg px-4 py-2',
    lg: 'text-xl px-6 py-3',
  };

  const baseClasses = [
    'font-bold rounded-md transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variant !== 'link' && sizeClasses[size],
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
  ].join(' ');

  const iconClasses = 'flex items-center gap-2';
  
  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <Link 
        to={href}
        className={cn(baseClasses, icon ? iconClasses : '', className)}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(baseClasses, icon ? iconClasses : '', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
