import React from "react";
import Button from "../../../common/components/Button";
import Input from "../../../common/components/Input";
import { ROUTES, SOCIAL_AUTH } from "../../../config/constants";
import useLoginForm from "../hooks/useLoginForm";

/**
 * Componente para mostrar el encabezado del formulario de login
 */
const LoginHeader: React.FC = () => (
  <div className="flex flex-col items-center mb-8">
    <img
      src="/src/assets/logo-cds.png"
      alt="Logo CDS"
      className="w-24 h-24 mb-4"
    />
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text tracking-tight">
      Iniciar Sesión
    </h2>
    <p className="text-gray-400 text-sm font-light tracking-wide mt-1">
      Accede a recursos exclusivos
    </p>
  </div>
);

/**
 * Componente para mostrar opciones de login social
 */
const SocialLoginOptions: React.FC<{
  onSocialLogin: (provider: string) => void;
}> = ({ onSocialLogin }) => {
  if (!SOCIAL_AUTH.github.enabled && !SOCIAL_AUTH.google.enabled) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center mb-4">
        <div className="flex-1 h-px bg-gray-700"></div>
        <p className="mx-4 text-xs text-gray-500">O continúa con</p>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>
      <div className="flex gap-2">
        {SOCIAL_AUTH.github.enabled && (
          <Button
            variant="secondary"
            fullWidth
            onClick={() => onSocialLogin("GitHub")}
          >
            GitHub
          </Button>
        )}
        {SOCIAL_AUTH.google.enabled && (
          <Button
            variant="secondary"
            fullWidth
            onClick={() => onSocialLogin("Google")}
          >
            Google
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Componente principal del formulario de inicio de sesión
 */
const LoginForm: React.FC = () => {
  const {
    credentials,
    isLoading,
    error,
    validationErrors,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  } = useLoginForm();

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
      {/* Logo y título */}
      <LoginHeader />

      {/* Mensaje de error global */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          value={credentials.email}
          onChange={handleChange}
          error={validationErrors.email}
        />

        <div>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleChange}
            error={validationErrors.password}
          />
          <div className="flex justify-end mt-1">
            <a
              href={ROUTES.forgotPassword}
              className="text-xs text-gray-400 hover:text-gray-300"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} fullWidth>
          Ingresar
        </Button>
      </form>

      {/* Registro */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{" "}
          <a
            href={ROUTES.register}
            className="font-medium bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>

      {/* Social login */}
      <SocialLoginOptions onSocialLogin={handleSocialLogin} />
    </div>
  );
};

export default LoginForm;
