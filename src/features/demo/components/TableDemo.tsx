import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from "../../../common/components/Table";

/**
 * Sección de demostración de tablas
 */
const TableDemo: React.FC = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">Tabla</h2>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Nombre</TableHeadCell>
          <TableHeadCell>Correo</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Juan Pérez</TableCell>
          <TableCell>juan@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ana García</TableCell>
          <TableCell>ana@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
);

export default TableDemo;
