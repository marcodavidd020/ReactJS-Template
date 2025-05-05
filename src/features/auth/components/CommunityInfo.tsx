import React from "react";
import { COMMUNITY_INFO } from "../../../config/constants";

/**
 * Componente que muestra información sobre la comunidad en la página de login
 */
const CommunityInfo: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 text-center md:text-left px-4 md:pr-12">
      <div className="hidden md:flex items-center gap-3 mb-4">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        <span className="text-gray-400 uppercase text-sm tracking-wider font-medium">
          Bienvenido a
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text tracking-tight mb-4">
        {COMMUNITY_INFO.name}
      </h1>

      <p className="text-gray-300 text-lg mb-6">{COMMUNITY_INFO.description}</p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0 mb-8">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="text-cds-blue-400 font-bold text-xl mb-1">
            {COMMUNITY_INFO.stats.developers}
          </div>
          <div className="text-gray-400 text-sm">Desarrolladores</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="text-cds-purple-500 font-bold text-xl mb-1">
            {COMMUNITY_INFO.stats.projects}
          </div>
          <div className="text-gray-400 text-sm">Proyectos activos</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="text-cds-cyan-400 font-bold text-xl mb-1">
            {COMMUNITY_INFO.stats.events}
          </div>
          <div className="text-gray-400 text-sm">Eventos mensuales</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <div className="text-cds-pink-500 font-bold text-xl mb-1">
            {COMMUNITY_INFO.stats.technologies}
          </div>
          <div className="text-gray-400 text-sm">Tecnologías</div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs">
              JD
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
              MR
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs">
              AL
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">
              +
            </div>
          </div>
          <span>Únete a miles de desarrolladores en nuestra comunidad</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
