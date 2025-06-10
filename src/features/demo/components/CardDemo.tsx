import React from "react";
import Card from "../../../common/components/Card";
import { H2 } from "../../../common/components/Typography";

/**
 * Sección de demostración de tarjetas con sus variantes
 */
const CardDemo: React.FC = () => (
  <section className="space-y-4">
    <H2>Tarjetas</H2>
    <div className="grid gap-4 md:grid-cols-3">
      <Card>Predeterminada</Card>
      <Card variant="outlined">Outlined</Card>
      <Card variant="elevated">Elevated</Card>
    </div>
  </section>
);

export default CardDemo;
