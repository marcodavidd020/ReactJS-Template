import React from "react";
import Button from "../../../common/components/Button";

/**
 * Sección de demostración de botones con sus variantes
 */
const ButtonDemo: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">Botones</h2>
    <div className="space-x-2">
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="text">Texto</Button>
      <Button variant="danger">Peligro</Button>
    </div>
  </section>
);

export default ButtonDemo;
