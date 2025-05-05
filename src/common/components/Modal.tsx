import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: React.ReactNode;
}

/**
 * Componente de modal reutilizable
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footer,
}) => {
  // Manejar ESC para cerrar el modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Determinar tamaño del modal
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay de fondo */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-gray-800 border border-gray-700 shadow-xl transition-all`}
              >
                {title && (
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center border-b border-gray-700 px-6 py-4"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {title}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white focus:outline-none"
                      onClick={onClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>
                )}
                <div className="text-gray-200 px-6 py-6">{children}</div>
                {footer && (
                  <div className="border-t border-gray-700 px-6 py-4">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

/**
 * Componente Footer por defecto para el modal con botones de cancelar y confirmar
 */
export const ModalFooter: React.FC<{
  onCancel: () => void;
  onConfirm?: () => void;
  formId?: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: "primary" | "danger" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
}> = ({
  onCancel,
  onConfirm,
  formId,
  cancelText = "Cancelar",
  confirmText = "Aceptar",
  confirmVariant = "primary",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={onCancel}
        type="button"
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      {onConfirm ? (
        <Button
          onClick={onConfirm}
          type="button"
          variant={confirmVariant}
          isLoading={isLoading}
          disabled={disabled}
        >
          {confirmText}
        </Button>
      ) : (
        <Button
          type="submit"
          form={formId}
          variant={confirmVariant}
          isLoading={isLoading}
          disabled={disabled}
        >
          {confirmText}
        </Button>
      )}
    </div>
  );
};

export default Modal;
