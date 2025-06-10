import React from "react";
import { Form, FormField, FormRow, FormActions } from "../../../common/components/Form";
import Input from "../../../common/components/Input";
import Button from "../../../common/components/Button";

/**
 * Sección de demostración de formularios
 */
const FormDemo: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">Formulario</h2>
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormRow cols={2}>
        <FormField label="Nombre" name="nombre">
          <Input placeholder="Ingresa tu nombre" />
        </FormField>
        <FormField label="Correo" name="correo">
          <Input type="email" placeholder="correo@ejemplo.com" />
        </FormField>
      </FormRow>
      <FormRow cols={1}>
        <FormField label="Mensaje" name="mensaje">
          <textarea
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            placeholder="Escribe tu mensaje"
            rows={4}
          />
        </FormField>
      </FormRow>
      <FormActions>
        <Button type="submit">Enviar</Button>
      </FormActions>
    </Form>
  </section>
);

export default FormDemo;
