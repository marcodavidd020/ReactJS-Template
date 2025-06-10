import React, { useState } from "react";
import { H3 } from "../../../common/components/Typography";
import Input from "../../../common/components/Input";

const InputDemo: React.FC = () => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  return (
    <section className="space-y-6">
      <H3>Componentes Input</H3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input Básico</label>
            <Input
              type="text"
              placeholder="Escribe algo..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Búsqueda</label>
            <Input
              type="search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Input con Error</label>
            <Input
              type="text"
              placeholder="Campo requerido"
              className="border-red-500 focus:border-red-500"
            />
            <span className="text-red-400 text-sm mt-1 block">Este campo es requerido</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Input Deshabilitado</label>
            <Input
              type="text"
              placeholder="Campo deshabilitado"
              disabled
              value="No editable"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputDemo; 