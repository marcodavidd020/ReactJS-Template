import React, { useState } from "react";
import Button from "../../../common/components/Button";
import Container from "../../../common/components/Container";
import {
  TypographyDemo,
  ButtonDemo,
  FormDemo,
  TableDemo,
  CardDemo,
  ModalDemo,
  InputDemo,
  UtilityDemo,
  PaginationDemo,
  CheckboxDemo,
} from "../components";
import { H1, H2 } from "../../../common/components/Typography";

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  category: "basic" | "form" | "navigation" | "utility";
}

const componentSections: ComponentSection[] = [
  {
    id: "typography",
    title: "Tipografía",
    description: "Títulos, párrafos y estilos de texto",
    component: TypographyDemo,
    category: "basic",
  },
  {
    id: "buttons",
    title: "Botones",
    description: "Botones interactivos con diferentes variantes",
    component: ButtonDemo,
    category: "basic",
  },
  {
    id: "cards",
    title: "Tarjetas",
    description: "Contenedores de contenido con estilos predefinidos",
    component: CardDemo,
    category: "basic",
  },
  {
    id: "inputs",
    title: "Campos de Entrada",
    description: "Inputs para formularios y captura de datos",
    component: InputDemo,
    category: "form",
  },
  {
    id: "checkboxes",
    title: "Checkboxes",
    description: "Grupos de checkboxes para selecciones múltiples",
    component: CheckboxDemo,
    category: "form",
  },
  {
    id: "forms",
    title: "Formularios",
    description: "Estructuras completas de formularios",
    component: FormDemo,
    category: "form",
  },
  {
    id: "tables",
    title: "Tablas",
    description: "Tablas de datos con funcionalidades avanzadas",
    component: TableDemo,
    category: "navigation",
  },
  {
    id: "pagination",
    title: "Paginación",
    description: "Navegación entre páginas de contenido",
    component: PaginationDemo,
    category: "navigation",
  },
  {
    id: "modals",
    title: "Modales",
    description: "Ventanas emergentes y overlays",
    component: ModalDemo,
    category: "utility",
  },
  {
    id: "utilities",
    title: "Utilidades",
    description: "Componentes auxiliares: spinners, avatares, badges",
    component: UtilityDemo,
    category: "utility",
  },
];

const categories = {
  basic: { name: "Básicos", color: "bg-blue-600" },
  form: { name: "Formularios", color: "bg-green-600" },
  navigation: { name: "Navegación", color: "bg-purple-600" },
  utility: { name: "Utilidades", color: "bg-orange-600" },
};

/**
 * Layout de demostración completo que muestra todos los componentes disponibles.
 * Organizado por categorías con navegación y ejemplos interactivos.
 */
const DemoLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("typography");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredSections = selectedCategory === "all" 
    ? componentSections 
    : componentSections.filter(section => section.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <Container className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <H1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Guía de Componentes
              </H1>
              <H2 className="text-gray-400">
                Biblioteca completa de componentes reutilizables
              </H2>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">
                <span className="flex items-center gap-2">
                  📚 Documentación
                </span>
              </Button>
              <Button variant="outline" size="sm">
                <span className="flex items-center gap-2">
                  💾 Descargar
                </span>
              </Button>
              <Button variant="secondary" size="sm">
                <span className="flex items-center gap-2">
                  🔗 GitHub
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">CATEGORÍAS</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === "all" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  🌟 Todos ({componentSections.length})
                </button>
                {Object.entries(categories).map(([key, category]) => {
                  const count = componentSections.filter(s => s.category === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        selectedCategory === key 
                          ? `${category.color} text-white` 
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Component Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">COMPONENTES</h3>
              <nav className="space-y-1">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs opacity-75 mt-1">{section.description}</div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <Container className="py-8 max-w-6xl">
            {/* Welcome Section */}
            <div className="mb-12 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-300">
                🚀 Bienvenido a la Guía de Componentes
              </h2>
              <p className="text-gray-300 mb-4">
                Esta es una colección completa de todos los componentes disponibles en el sistema de diseño. 
                Cada componente incluye ejemplos interactivos, variaciones y consejos de uso.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {Object.entries(categories).map(([key, category]) => {
                  const count = componentSections.filter(s => s.category === key).length;
                  return (
                    <div key={key} className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <div className={`w-3 h-3 ${category.color} rounded-full mx-auto mb-2`}></div>
                      <div className="font-semibold text-sm">{category.name}</div>
                      <div className="text-xs text-gray-400">{count} componentes</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Component Sections */}
            <div className="space-y-16">
              {filteredSections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-1 h-8 ${categories[section.category].color} rounded-full`}></div>
                    <div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      <p className="text-gray-400">{section.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                    <section.component />
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-16 p-6 bg-gray-800/30 border border-gray-700 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-3">💡 ¿Cómo usar esta guía?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
                <div>
                  <div className="text-blue-400 font-semibold mb-2">1. Explorar</div>
                  <p>Navega por las categorías y componentes usando la barra lateral.</p>
                </div>
                <div>
                  <div className="text-green-400 font-semibold mb-2">2. Interactuar</div>
                  <p>Prueba los componentes directamente en los ejemplos interactivos.</p>
                </div>
                <div>
                  <div className="text-purple-400 font-semibold mb-2">3. Implementar</div>
                  <p>Copia los patrones de uso para implementar en tu proyecto.</p>
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 mt-16">
        <Container className="py-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Comunidad de Desarrollo de Software • 
            Guía de Componentes v2.0 • 
            {componentSections.length} Componentes Disponibles
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default DemoLayout;
