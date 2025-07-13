import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', error, helperText, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm 
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          ref={ref}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm 
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm 
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            {...props}
          />
          <label htmlFor={props.id} className="ml-2 block text-sm text-gray-900">
            {label}
          </label>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, name, options, value, onChange, error 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  helperText?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  label, value, onChange, error, helperText, ...props 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm 
          ${error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          }
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex justify-center items-center font-medium rounded-md focus:outline-none transition-colors';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2 px-6 text-base'
  };
  
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
