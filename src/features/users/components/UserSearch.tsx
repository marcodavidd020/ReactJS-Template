import React, { useState } from "react";
import Button from "../../../common/components/Button";

interface UserSearchProps {
  onSearch: (searchTerm: string) => void;
}

/**
 * Componente para búsqueda de usuarios
 */
const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 
                     text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type="submit">Buscar</Button>
      {searchTerm && (
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            onSearch("");
          }}
        >
          Limpiar
        </Button>
      )}
    </form>
  );
};

export default UserSearch;
