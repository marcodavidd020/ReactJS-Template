import React from "react";
import Modal, { ModalFooter } from "../../../common/components/Modal";
import { UserProfile } from "../types/userTypes";

interface DeleteUserModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

/**
 * Modal de confirmación para eliminar un usuario
 */
const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar eliminación"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onConfirm}
          cancelText="Cancelar"
          confirmText="Eliminar"
          confirmVariant="danger"
          isLoading={isLoading}
        />
      }
    >
      <div className="mb-4 text-gray-300">
        <p className="mb-2">
          ¿Está seguro que desea eliminar el siguiente usuario?
        </p>
        <div className="bg-gray-800 p-3 rounded border border-gray-700 mt-2">
          <p>
            <span className="font-semibold">Nombre:</span> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
      <p className="text-red-400 text-sm mb-6">
        Esta acción no se puede deshacer.
      </p>
    </Modal>
  );
};

export default DeleteUserModal;
