import React, { useState } from "react";
import { H3 } from "../../../common/components/Typography";
import Button from "../../../common/components/Button";

/**
 * Sección de demostración de botones con sus variantes
 */
const ButtonDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <section className="space-y-8">
      <H3>Componentes Button</H3>
      
      {/* Variantes de Botones */}
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-4">Variantes de Botones</h4>
          <div className="flex flex-wrap gap-4 p-6 bg-gray-800 rounded-lg">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        {/* Tamaños */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Tamaños</h4>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-800 rounded-lg">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Estados */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Estados</h4>
          <div className="flex flex-wrap gap-4 p-6 bg-gray-800 rounded-lg">
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" isLoading={isLoading} onClick={handleLoadingDemo}>
              {isLoading ? "Cargando..." : "Loading Demo"}
            </Button>
          </div>
        </div>

        {/* Con Iconos */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Botones con Iconos</h4>
          <div className="flex flex-wrap gap-4 p-6 bg-gray-800 rounded-lg">
            <Button 
              variant="primary" 
              leftIcon={<span>📁</span>}
            >
              Con Ícono Izquierdo
            </Button>
            <Button 
              variant="secondary" 
              rightIcon={<span>🚀</span>}
            >
              Con Ícono Derecho
            </Button>
            <Button 
              variant="outline" 
              leftIcon={<span>💾</span>} 
              rightIcon={<span>⬇️</span>}
            >
              Con Ambos Íconos
            </Button>
          </div>
        </div>

        {/* Ancho Completo */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Ancho Completo</h4>
          <div className="space-y-3 p-6 bg-gray-800 rounded-lg">
            <Button variant="primary" fullWidth>
              Botón de Ancho Completo Primary
            </Button>
            <Button variant="outline" fullWidth>
              Botón de Ancho Completo Outline
            </Button>
          </div>
        </div>

        {/* Ejemplos de Uso Común */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Ejemplos de Uso Común</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Formulario */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="font-medium mb-3">Acciones de Formulario</h5>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Guardar</Button>
                <Button variant="outline" size="sm">Cancelar</Button>
              </div>
            </div>

            {/* Navegación */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="font-medium mb-3">Navegación</h5>
              <div className="flex gap-2">
                <Button variant="text" size="sm" leftIcon={<span>←</span>}>Anterior</Button>
                <Button variant="primary" size="sm" rightIcon={<span>→</span>}>Siguiente</Button>
              </div>
            </div>

            {/* Acciones Destructivas */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="font-medium mb-3">Acciones Destructivas</h5>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" leftIcon={<span>🗑️</span>}>Eliminar</Button>
                <Button variant="outline" size="sm">Cancelar</Button>
              </div>
            </div>

            {/* Herramientas */}
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="font-medium mb-3">Herramientas</h5>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" leftIcon={<span>⚙️</span>}>Configurar</Button>
                <Button variant="text" size="sm" leftIcon={<span>📊</span>}>Estadísticas</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de uso */}
      <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h5 className="font-semibold text-blue-300 mb-2">💡 Consejos de Uso</h5>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• <strong>Primary:</strong> Para acciones principales (enviar, guardar, confirmar)</li>
          <li>• <strong>Secondary:</strong> Para acciones secundarias importantes</li>
          <li>• <strong>Outline:</strong> Para acciones alternativas o de cancelación</li>
          <li>• <strong>Text:</strong> Para acciones sutiles o enlaces de navegación</li>
          <li>• <strong>Danger:</strong> Para acciones destructivas (eliminar, rechazar)</li>
          <li>• Usa <code>isLoading</code> para operaciones asíncronas</li>
          <li>• Los íconos mejoran la comprensión y usabilidad</li>
        </ul>
      </div>
    </section>
  );
};

export default ButtonDemo;
