import React, { ReactNode, FormEvent } from "react";

interface FormProps {
  id?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Componente Form que provee estructura básica y manejo de envío
 */
const Form: React.FC<FormProps> = ({
  id,
  onSubmit,
  children,
  className = "",
}) => {
  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};

export default Form;
