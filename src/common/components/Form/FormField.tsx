import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Componente reutilizable para campos de formulario
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  helper,
  required,
  children
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helper && !error && <p className="mt-1 text-sm text-gray-400">{helper}</p>}
    </div>
  );
};

export default FormField; 