


# Documentación de Arquitectura y Estructura del Proyecto

Este documento describe la arquitectura, estructura y patrones de diseño utilizados en el desarrollo del Sistema.

Backend para la coneccion [NestJS-Template](https://github.com/marcodavidd020/NestJS-Template)

## Índice

1. [Tecnologías Principales](#tecnologías-principales)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Patrones de Diseño](#patrones-de-diseño)
5. [Gestión de Estado](#gestión-de-estado)
6. [Componentes Principales](#componentes-principales)
7. [Flujos de Datos](#flujos-de-datos)
8. [Manejo de Errores](#manejo-de-errores)
9. [Testing](#testing)
10. [Deployment](#deployment)

## Tecnologías Principales

- **Framework**: React v18
- **Lenguaje**: TypeScript
- **Bundler/Builder**: Vite
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: Zustand + immer
- **Comunicación con API**: Axios
- **Validación de Datos**: Zod
- **UI Components**: HeadlessUI
- **Testing**: Vitest + Testing Library

## Arquitectura del Proyecto

La aplicación sigue una **arquitectura basada en características** (feature-based architecture) con una clara separación de responsabilidades. Este enfoque organiza el código alrededor de funcionalidades de negocio en lugar de roles técnicos, lo que facilita la escalabilidad y el mantenimiento.

### Principios Arquitectónicos

1. **Separación de Responsabilidades**: Cada módulo tiene una responsabilidad única y bien definida.
2. **Independencia de Características**: Las características (features) son independientes y pueden ser desarrolladas, probadas y mantenidas por separado.
3. **Capas de Abstracción**: La aplicación está dividida en capas que facilitan el flujo de datos y la separación de preocupaciones.
4. **Modelos de Dominio**: Uso de tipos y modelos de dominio específicos para cada característica.
5. **Abstracción de APIs**: Capa de acceso a datos centralizada con repositorios específicos por dominio.

## Estructura de Carpetas

```
src/
│
├── app/ - Configuración global de la aplicación
│   ├── layouts/ - Layouts reutilizables (dashboard, auth, etc.)
│   ├── providers/ - Providers de React Context
│   └── routes/ - Configuración de rutas
│
├── assets/ - Recursos estáticos (imágenes, iconos, etc.)
│
├── common/ - Código compartido entre características
│   ├── components/ - Componentes UI genéricos reutilizables
│   ├── hooks/ - Hooks personalizados reutilizables
│   └── utils/ - Utilidades y funciones helpers
│
├── core/ - Código central de la aplicación (no específico de características)
│   ├── api/ - Configuración base de API y tipos relacionados
│   ├── auth/ - Lógica de autenticación central
│   └── utils/ - Utilidades globales
│
├── features/ - Módulos de funcionalidades específicas
│   ├── auth/ - Autenticación y autorización
│   │   ├── api/ - Comunicación con API de auth
│   │   ├── components/ - Componentes específicos de auth
│   │   └── store/ - Estado global de auth (Zustand)
│   │
│   ├── users/ - Gestión de usuarios
│   │   ├── api/ - Comunicación con API de usuarios
│   │   │   └── repositories/ - Repositorios de datos
│   │   ├── components/ - Componentes específicos de usuarios
│   │   ├── hooks/ - Hooks personalizados para usuarios
│   │   ├── pages/ - Páginas relacionadas con usuarios
│   │   ├── services/ - Servicios para lógica de negocio
│   │   ├── store/ - Estado global de usuarios (Zustand)
│   │   └── types/ - Tipos y interfaces específicos
│   │
│   └── events/ - Gestión de eventos
│       ├── ...estructura similar a users/
│
├── lib/ - Librerías y utilidades externas
│   ├── i18n/ - Internacionalización
│   └── api/ - Configuración de clientes API
│
├── config/ - Configuraciones de la aplicación
│   ├── constants.ts - Constantes globales
│   ├── routes.ts - Definición de rutas
│   └── apiClient.ts - Cliente HTTP centralizado
│
└── types/ - Tipos globales TypeScript
```

## Patrones de Diseño

### 1. Patrón Repositorio

Utilizado para abstraer la comunicación con la API. Cada entidad del dominio tiene su propio repositorio que encapsula la lógica de acceso a datos.

```typescript
// Ejemplo: userRepository.ts
class UserRepository {
  async getUsers(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get('/users', { params: { page, limit } });
    return response;
  }
  
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }
}
```

### 2. Patrón Servicio

Implementa la lógica de negocio independiente de la UI, realizando validaciones y operaciones complejas.

```typescript
// Ejemplo: userService.ts
class UserService {
  async createUser(data: CreateUserData): Promise<User> {
    // Validar datos
    const validData = await validateUserCreate(data);
    
    // Crear usuario usando el repositorio
    return await userRepository.createUser(validData);
  }
}
```

### 3. Custom Hooks

Para encapsular lógica reutilizable y separar las preocupaciones en los componentes.

```typescript
// Ejemplo: useUserForm.tsx
const useUserForm = (type: "create" | "update", initialData?: User) => {
  const [formData, setFormData] = useState<UserFormData>({/*...*/});
  
  // Lógica para manejar formulario, validaciones, etc.
  
  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
    // ...otros valores y métodos
  };
}
```

### 4. Componentes Compuestos

Para crear APIs flexibles y componentes relacionados como familias.

```tsx
// Ejemplo: estructura de componente Table
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeadCell>Nombre</Table.HeadCell>
      {/* ... */}
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {/* ... */}
  </Table.Body>
</Table>
```

## Gestión de Estado

La aplicación utiliza **Zustand** con **immer** para la gestión de estado global, proporcionando un enfoque simple pero potente.

### Estructura de Store

Cada característica tiene su propio store que contiene:

1. **Estado**: Datos actuales y flags (loading, error)
2. **Acciones**: Funciones para modificar el estado
3. **Efectos**: Operaciones asíncronas como llamadas a la API

```typescript
// Ejemplo: usersStore.ts
interface UsersState {
  // Estado
  users: UserProfile[];
  isLoading: boolean;
  error: string | null;
  formError: string | null;
  
  // Acciones
  fetchUsers: (page?: number) => Promise<void>;
  createUser: (data: CreateUserData) => Promise<void>;
  // ...otras acciones
}

const useUsersStore = create<UsersState>()(
  immer((set) => ({
    // Estado inicial
    users: [],
    isLoading: false,
    error: null,
    formError: null,
    
    // Acciones
    fetchUsers: async (page = 1) => {
      try {
        set({ isLoading: true, error: null });
        const response = await userService.getUsers(page);
        set((state) => {
          state.users = response.data;
          state.isLoading = false;
        });
      } catch (error) {
        set({ isLoading: false, error: "Error al cargar usuarios" });
      }
    },
    // ...otras acciones
  }))
);
```

### Separación de Errores

Diferentes tipos de errores están separados:
- `error`: Errores generales de operaciones (carga de listas, operaciones globales)
- `formError`: Errores específicos de formularios y validaciones
- `fieldErrors`: Errores por campo específico en formularios

## Componentes Principales

### Estructura de Componentes

Los componentes siguen una estructura jerárquica:

1. **Páginas**: Contenedores de nivel superior para rutas específicas
2. **Componentes de Característica**: Implementan funcionalidad específica del dominio
3. **Componentes UI Comunes**: Elementos de interfaz reutilizables (botones, inputs, modales)

### Componentes Base

- **Modal**: Componente para diálogos y formularios modales.
- **Form**: Familia de componentes para construir formularios.
- **Button**: Botones con diferentes variantes y estados.
- **Input**: Campos de entrada con validación y estados.
- **Table**: Componente para mostrar datos tabulares.
- **Card**: Contenedor para mostrar contenido encapsulado.

### Patrones de Componentes

- **Composición sobre herencia**: Preferimos componer componentes pequeños.
- **Prop Drilling minimizado**: Uso de contexto y hooks para evitar prop drilling excesivo.
- **Componentes controlados**: La mayoría de componentes son controlados para mayor flexibilidad.
- **Renderizado condicional**: Uso extensivo de renderizado condicional para diferentes estados.

## Flujos de Datos

### Flujo Unidireccional

La aplicación sigue un flujo de datos unidireccional:

1. **Usuario interactúa** con la interfaz
2. **Componentes** llaman a acciones del store o servicios
3. **Store/Servicios** realizan operaciones y actualizan estado
4. **UI se renderiza** nuevamente basándose en el nuevo estado

### Capa API

La comunicación con el backend está estructurada en capas:

1. **apiClient**: Cliente HTTP centralizado con interceptores
2. **repositories**: Abstraen endpoints específicos
3. **services**: Implementan lógica de negocio y validaciones
4. **stores**: Manejan estado global y acciones
5. **componentes/hooks**: Consumen datos y acciones

## Manejo de Errores

### Estrategia de Errores

- **Errores de API**: Capturados y transformados por interceptores y servicios
- **Errores de Validación**: Manejados por esquemas Zod y componentes de formulario
- **Errores de UI**: Mensajes claros para guiar al usuario
- **Errores Globales**: Mensajes de error en la parte superior de la página
- **Errores de Formulario**: Errores específicos por campo y mensajes globales

### Implementación

```typescript
// Ejemplo de captura de errores en store
try {
  // Operación que puede fallar
} catch (error) {
  if (error instanceof ValidationError) {
    set({
      isLoading: false,
      formError: error.message,
      fieldErrors: error.fieldErrors || null,
    });
  } else {
    set({
      isLoading: false,
      error: error instanceof Error ? error.message : "Error inesperado",
    });
  }
}
```

## Testing

### Enfoque de Testing

1. **Tests Unitarios**: Para lógica aislada (hooks, utilidades, servicios)
2. **Tests de Integración**: Para interacciones de componentes
3. **Tests de Interfaz**: Para verificar el comportamiento visual
4. **Tests E2E**: Para flujos críticos de usuario

### Herramientas

- **Vitest**: Framework de testing
- **Testing Library**: Para testing basado en accesibilidad y comportamiento
- **MSW**: Para simular respuestas de API
- **Cypress**: Para tests E2E (opcional)

## Deployment

### Pipeline CI/CD

1. **Linting**: ESLint para verificar estilo y problemas potenciales
2. **Testing**: Ejecución de tests automatizados
3. **Build**: Construcción de artefactos optimizados
4. **Deploy**: Publicación en el entorno correspondiente

### Configuración de Entornos

- **Desarrollo**: Variables de entorno para desarrollo local
- **Staging**: Entorno de pre-producción para QA
- **Producción**: Entorno de producción con optimizaciones

## Guía de Estilo

Para información detallada sobre el diseño visual, componentes UI y guía de estilo, consulte [STYLEGUIDE.md](./STYLEGUIDE.md).

## Contribución

Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para obtener información sobre cómo contribuir al proyecto, incluyendo estándares de código, proceso de pull request y otros lineamientos importantes.

---

© 2023 Comunidad de Desarrollo de Software (CDS)
