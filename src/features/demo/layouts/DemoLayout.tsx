import React from "react";
import Button from "../../../common/components/Button";
import Container from "../../../common/components/Container";
import {
  TypographyDemo,
  ButtonDemo,
  FormDemo,
  TableDemo,
} from "../components";
import { H1, H2 } from "../../../common/components/Typography";

/**
 * Layout de demostración que muestra tipografías, botones y componentes básicos.
 */
const DemoLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <H1 className="mb-1">Título Principal</H1>
        <H2 className="mb-4 text-gray-400">Subtítulo</H2>
        <div className="space-x-2">
          <Button variant="primary">Principal</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Texto</Button>
          <Button variant="danger">Peligro</Button>
        </div>
      </header>
      <main className="flex-grow p-4">
        <Container className="space-y-10">
          <TypographyDemo />
          <ButtonDemo />
          <FormDemo />
          <TableDemo />
        </Container>
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Comunidad de Desarrollo de Software
        </p>
      </footer>
    </div>
  );
};

export default DemoLayout;
