import React, { useState } from "react";
import { H3 } from "../../../common/components/Typography";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import UserAvatar from "../../../common/components/UserAvatar";
import RoleBadge from "../../../common/components/RoleBadge";
import ErrorMessage from "../../../common/components/ErrorMessage";
import ProfileField from "../../../common/components/ProfileField";
import SocialLink from "../../../common/components/SocialLink";
import Button from "../../../common/components/Button";

const UtilityDemo: React.FC = () => {
  const [showSpinners, setShowSpinners] = useState(true);
  const [selectedSpinnerColor, setSelectedSpinnerColor] = useState<'blue' | 'purple' | 'green' | 'red' | 'yellow'>('blue');

  return (
    <section className="space-y-8">
      <H3>Componentes de Utilidad</H3>
      
      <div className="space-y-8">
        {/* Loading Spinners */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Loading Spinners</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSpinners(!showSpinners)}
              >
                {showSpinners ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </div>
          
          <div className="p-6 bg-gray-800 rounded-lg">
            {/* Controles de Color */}
            <div className="mb-6">
              <h5 className="text-sm font-medium mb-3">Colores Disponibles:</h5>
              <div className="flex flex-wrap gap-2">
                {(['blue', 'purple', 'green', 'red', 'yellow'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedSpinnerColor(color)}
                    className={`px-3 py-1 rounded text-sm capitalize transition-colors ${
                      selectedSpinnerColor === color 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Spinners por Tamaño */}
            {showSpinners && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h5 className="text-sm font-medium mb-4">Small (sm)</h5>
                  <div className="flex justify-center">
                    <LoadingSpinner size="sm" color={selectedSpinnerColor} />
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="text-sm font-medium mb-4">Medium (md)</h5>
                  <div className="flex justify-center">
                    <LoadingSpinner size="md" color={selectedSpinnerColor} />
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="text-sm font-medium mb-4">Large (lg)</h5>
                  <div className="flex justify-center">
                    <LoadingSpinner size="lg" color={selectedSpinnerColor} />
                  </div>
                </div>
              </div>
            )}

            {/* Spinner de Página Completa */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <h5 className="text-sm font-medium mb-3">Spinner de Página Completa:</h5>
              <LoadingSpinner size="md" color={selectedSpinnerColor} fullPage />
            </div>
          </div>
        </div>

        {/* Grid de Componentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Avatars */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Avatares de Usuario</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserAvatar firstName="Juan" lastName="Pérez" size="sm" />
                  <div>
                    <div className="font-medium">Juan Pérez</div>
                    <div className="text-sm text-gray-400">Pequeño</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar firstName="María" lastName="García" size="md" />
                  <div>
                    <div className="font-medium">María García</div>
                    <div className="text-sm text-gray-400">Mediano</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar firstName="Carlos" lastName="López" size="lg" />
                  <div>
                    <div className="font-medium">Carlos López</div>
                    <div className="text-sm text-gray-400">Grande</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    firstName="Ana" 
                    lastName="Martínez" 
                    size="md" 
                    avatarUrl="https://via.placeholder.com/150" 
                  />
                  <div>
                    <div className="font-medium">Ana Martínez</div>
                    <div className="text-sm text-gray-400">Con imagen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Badges */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Badges de Rol</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Administrador</span>
                  <RoleBadge role="admin" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Usuario</span>
                  <RoleBadge role="user" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Moderador</span>
                  <RoleBadge role="moderator" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Invitado</span>
                  <RoleBadge role="guest" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Mensajes de Error</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Error de Validación:</h5>
                  <ErrorMessage message="Este campo es requerido" />
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Error de Red:</h5>
                  <ErrorMessage message="No se pudo conectar con el servidor" />
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Error de Autorización:</h5>
                  <ErrorMessage message="No tienes permisos para realizar esta acción" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Campos de Perfil</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-3">
                <ProfileField label="Nombre" value="Juan Pérez" />
                <ProfileField label="Email" value="juan@ejemplo.com" />
                <ProfileField label="Teléfono" value="+1 234 567 8900" />
                <ProfileField label="Ubicación" value="Ciudad de México" />
                <ProfileField label="Empresa" value="Tech Solutions Inc." />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Sociales</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-3">
                <SocialLink label="🐙 GitHub" url="https://github.com/usuario" />
                <SocialLink label="💼 LinkedIn" url="https://linkedin.com/in/usuario" />
                <SocialLink label="🐦 Twitter" url="https://twitter.com/usuario" />
                <SocialLink label="📷 Instagram" url="https://instagram.com/usuario" />
                <SocialLink label="🌐 Website" url="https://miwebsite.com" />
              </div>
            </div>
          </div>

          {/* Componente Adicional - Status Indicators */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Indicadores de Estado</h4>
            <div className="p-6 bg-gray-800 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Conectado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Ausente</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Desconectado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>Inactivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de uso */}
      <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
        <h5 className="font-semibold text-green-300 mb-2">💡 Consejos de Uso</h5>
        <ul className="text-sm text-green-200 space-y-1">
          <li>• <strong>LoadingSpinner:</strong> Usa diferentes tamaños según el contexto (sm para botones, lg para pantallas completas)</li>
          <li>• <strong>UserAvatar:</strong> Incluye initiales automáticas cuando no hay imagen disponible</li>
          <li>• <strong>RoleBadge:</strong> Ideal para mostrar permisos y roles de usuario de forma visual</li>
          <li>• <strong>ErrorMessage:</strong> Proporciona feedback claro sobre errores de validación</li>
          <li>• <strong>ProfileField:</strong> Estructura consistente para mostrar información de usuario</li>
          <li>• <strong>SocialLink:</strong> Enlaces externos con apertura en nueva pestaña automática</li>
        </ul>
      </div>
    </section>
  );
};

export default UtilityDemo; 