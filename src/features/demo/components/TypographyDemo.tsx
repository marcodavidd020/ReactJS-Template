import React from "react";
import { H1, H2, H3, H4, H5, H6, Text } from "../../../common/components/Typography";

/**
 * Sección de demostración de tipografías
 */
const TypographyDemo: React.FC = () => (
  <section className="space-y-2">
    <H2>Tipografía</H2>

    <div className="space-y-1">
      <H1>Encabezado H1</H1>
      <H2>Encabezado H2</H2>
      <H3>Encabezado H3</H3>
      <H4>Encabezado H4</H4>
      <H5>Encabezado H5</H5>
      <H6>Encabezado H6</H6>
    </div>

    <Text>
      Este es un párrafo de texto de ejemplo siguiendo las pautas del sistema de diseño.
    </Text>
  </section>
);

export default TypographyDemo;
