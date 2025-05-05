import React from "react";

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  minSelected?: number;
  className?: string;
}

/**
 * Componente para mostrar un grupo de checkboxes
 */
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selected,
  onChange,
  minSelected = 1,
  className = "",
}) => {
  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      // Si ya está seleccionado, quitarlo (si no viola el mínimo)
      if (selected.length > minSelected) {
        onChange(selected.filter((item) => item !== value));
      }
    } else {
      // Si no está seleccionado, añadirlo
      onChange([...selected, value]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600 rounded bg-gray-700 border-gray-600"
            checked={selected.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <span className="ml-2 text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
