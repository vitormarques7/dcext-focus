import { forwardRef } from 'react';

// Simple Button component without external dependencies
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const SimpleButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-sm',
      lg: 'h-10 rounded-md px-6',
      icon: 'h-9 w-9'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

SimpleButton.displayName = 'SimpleButton';

// Simple Card component without external dependencies
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SimpleCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm ${className}`}
        {...props}
      />
    );
  }
);

SimpleCard.displayName = 'SimpleCard';

// Simple Input component without external dependencies
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SimpleInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm transition-colors placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 ${className}`}
        {...props}
      />
    );
  }
);

SimpleInput.displayName = 'SimpleInput';

// Simple Badge component without external dependencies
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const SimpleBadge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium';
    
    const variants = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
      destructive: 'bg-red-600 text-white',
      outline: 'border border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-100'
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

SimpleBadge.displayName = 'SimpleBadge';