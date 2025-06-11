import React, { useState } from "react";
import { H3 } from "../../../common/components/Typography";
import CheckboxGroup from "../../../common/components/CheckboxGroup";

const CheckboxDemo: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react"]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
  ];

  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ];

  const toolOptions = [
    { value: "vscode", label: "VS Code" },
    { value: "webstorm", label: "WebStorm" },
    { value: "sublime", label: "Sublime Text" },
    { value: "atom", label: "Atom" },
    { value: "vim", label: "Vim" },
  ];

  return (
    <section className="space-y-6">
      <H3>Componentes Checkbox</H3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Lenguajes de programación */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Lenguajes de Programación</h4>
          <CheckboxGroup
            options={languageOptions}
            selected={selectedLanguages}
            onChange={setSelectedLanguages}
            minSelected={0}
          />
          <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
            <strong>Seleccionados:</strong> {selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "Ninguno"}
          </div>
        </div>

        {/* Frameworks */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Frameworks Frontend</h4>
          <CheckboxGroup
            options={frameworkOptions}
            selected={selectedFrameworks}
            onChange={setSelectedFrameworks}
            minSelected={1}
          />
          <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
            <strong>Seleccionados:</strong> {selectedFrameworks.length > 0 ? selectedFrameworks.join(", ") : "Ninguno"}
          </div>
        </div>

        {/* Herramientas */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Editores de Código</h4>
          <CheckboxGroup
            options={toolOptions}
            selected={selectedTools}
            onChange={setSelectedTools}
            minSelected={0}
          />
          <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
            <strong>Seleccionados:</strong> {selectedTools.length > 0 ? selectedTools.join(", ") : "Ninguno"}
          </div>
        </div>
      </div>

      {/* Información de uso */}
      <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
        <h5 className="font-semibold text-green-300 mb-2">💡 Consejos de Uso</h5>
        <ul className="text-sm text-green-200 space-y-1">
          <li>• Los CheckboxGroup son ideales para selecciones múltiples</li>
          <li>• Cada grupo puede tener valores predeterminados</li>
          <li>• Se pueden usar para filtros, preferencias y configuraciones</li>
          <li>• Puedes configurar un mínimo de selecciones requeridas</li>
        </ul>
      </div>
    </section>
  );
};

export default CheckboxDemo; 