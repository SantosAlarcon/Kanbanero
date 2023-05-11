import { useContext, useState } from "react";
import {contextoDispatchTareas, contextoTareas} from "../App";

function useTasks() {
    const tareas = useContext(contextoTareas);
    const dispatch = useContext(contextoDispatchTareas);
    
    const [siguienteId, setSiguienteId] = useState(5);

    // Función que devuelve un nuevo número de ID.
    function obtenerSiguienteId() {
        let id = 0;

        // El bucle se repetirá hasta que el número de ID no está dentro
        // de la lista de tareas.
        while (tareas.find(t => t.id === id)) {
            id++;
        }

        return id;
    }

	function crearTarea(tarea) {
		dispatch({ type: "crearTarea", payload: tarea });
        setSiguienteId(obtenerSiguienteId());
	};

	function modificarTarea(id, tareaNueva) {
		dispatch({ type: "modificarTarea", payload: id, tareaNueva });
	};

    function cambiarEstado(titulo, estadoNuevo) {
        dispatch({type: "cambiarEstado", payload: {titulo, estadoNuevo}});
    }

	function borrarTarea(id) {
		dispatch({ type: "borrarTarea", payload: id });
	};

    return {crearTarea, modificarTarea, cambiarEstado, borrarTarea, siguienteId};
}

export default useTasks;
