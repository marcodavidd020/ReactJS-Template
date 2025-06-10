import React from "react";
import Button from "../../../common/components/Button";
import Container from "../../../common/components/Container";
import {
  TypographyDemo,
  ButtonDemo,
  FormDemo,
  TableDemo,
  CardDemo,
  ModalDemo,
} from "../components";
import { H1, H2 } from "../../../common/components/Typography";

/**
 * Layout de demostración que muestra tipografías, botones y componentes básicos.
 */
const DemoLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <Container className="py-6 space-y-4">
          <div>
            <H1>Guía de Componentes</H1>
            <H2 className="text-gray-400">Ejemplos reutilizables</H2>
          </div>
          <div className="space-x-2">
            <Button variant="primary">Principal</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Texto</Button>
            <Button variant="danger">Peligro</Button>
          </div>
        </Container>
      </header>
      <main className="flex-grow py-8">
        <Container className="space-y-12">
          <TypographyDemo />
          <ButtonDemo />
          <CardDemo />
          <FormDemo />
          <TableDemo />
          <ModalDemo />
        </Container>
      </main>
      <footer className="bg-gray-800 border-t border-gray-700">
        <Container className="py-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Comunidad de Desarrollo de Software
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default DemoLayout;
