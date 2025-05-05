import { useState, useCallback, useEffect } from "react";

/**
 * Hook personalizado para manejar datos en localStorage
 * con tipado seguro y sincronización entre pestañas
 *
 * @param key Clave para almacenar en localStorage
 * @param initialValue Valor inicial si no hay datos guardados
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para mantener el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Intentar recuperar el valor desde localStorage
      const item = window.localStorage.getItem(key);
      // Analizarlo o devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer ${key} desde localStorage:`, error);
      return initialValue;
    }
  });

  // Función para establecer el valor en localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Permitir que el valor sea una función (como en setState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Guardar valor en el estado
        setStoredValue(valueToStore);

        // Guardar en localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Disparar evento para sincronizar entre pestañas
          window.dispatchEvent(
            new StorageEvent("storage", {
              key,
              newValue: JSON.stringify(valueToStore),
            })
          );
        }
      } catch (error) {
        console.error(`Error al guardar ${key} en localStorage:`, error);
      }
    },
    [key, storedValue]
  );

  // Eliminar el valor de localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error al eliminar ${key} de localStorage:`, error);
    }
  }, [key, initialValue]);

  // Escuchar cambios en localStorage de otras pestañas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(JSON.parse(event.newValue));
      } else if (event.key === key && event.newValue === null) {
        // El valor se eliminó en otra pestaña
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

export default useLocalStorage;
