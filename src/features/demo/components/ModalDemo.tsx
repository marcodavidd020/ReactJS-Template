import React, { useState } from "react";
import Button from "../../../common/components/Button";
import Modal, { ModalFooter } from "../../../common/components/Modal";
import { H2 } from "../../../common/components/Typography";

/**
 * Sección de demostración de modales
 */
const ModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="space-y-4">
      <H2>Modal</H2>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Ejemplo de Modal"
        footer={
          <ModalFooter
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
            confirmText="Aceptar"
          />
        }
      >
        <p className="text-gray-300">Contenido del modal de demostración.</p>
      </Modal>
    </section>
  );
};

export default ModalDemo;
