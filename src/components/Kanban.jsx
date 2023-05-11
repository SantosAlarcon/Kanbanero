import React, { useState, useContext } from "react";
import CuadroEstado from "./CuadroEstado";
import {contextoTareas} from "../App";

const Kanban = () => {
	const tareas = useContext(contextoTareas);
    const estados = ["Pendiente", "En desarrollo", "Completada"];

	return (
		<div className="grid grid-cols-3 gap-5 px-10">
			{estados.map((estado) => {
				// Se obtienen las tareas que tienen ese estado.
				const tareasFiltradas = tareas.filter((t) => t.estado === estado);

				return (
					// Se pinta un cuadro con el título del estado y las tareas.
					<CuadroEstado
						key={estados.indexOf(estado)}
						titulo={estado}
						tareasEstado={tareasFiltradas}
                        name={estado}
					/>
				);
			})}
		</div>
	);
};

export default Kanban;
