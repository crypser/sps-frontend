import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-text-secondary mb-1.5 tracking-[-0.01em]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-[10px] border bg-surface-sunken px-3.5 py-2.5 text-sm font-medium text-text-primary placeholder:text-text-tertiary placeholder:font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 ${
            error
              ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-400'
              : 'border-border hover:border-text-tertiary'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[13px] text-red-400 font-medium">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
