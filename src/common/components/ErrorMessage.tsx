import React from 'react';
import Card from './Card';

interface ErrorMessageProps {
  message: string;
  details?: string;
}

/**
 * Componente para mostrar mensajes de error
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details }) => {
  return (
    <Card>
      <div className="text-center py-8">
        <p className="text-red-400">
          {message}
        </p>
        {details && <p className="text-red-400 mt-2 text-sm">{details}</p>}
      </div>
    </Card>
  );
};

export default ErrorMessage; 