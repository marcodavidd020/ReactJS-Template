import React from "react";
import Card from "../../../common/components/Card";
import Container from "../../../common/components/Container";

/**
 * Página principal de eventos que mostrará la lista de eventos disponibles
 */
const EventsPage: React.FC = () => {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6 text-white">Eventos</h1>

      <div className="mb-6">
        <Card>
          <div className="p-4 text-center">
            <p className="text-gray-300">
              Próximamente: Lista de eventos de la comunidad
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default EventsPage;
