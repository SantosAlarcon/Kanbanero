import React, { useState } from "react";
import Tarea from "./Tarea/Tarea";
import ModalNuevaTarea from "./ModalNuevaTarea/ModalNuevaTarea";
import useTasks from "../hooks/useTasks";
import { motion, AnimatePresence } from "framer-motion"

/**
 * El cuadro de estado muestra un cuadro con el estado de la tarea y las tareas correspondientes a ese
 * estado. Cuando una tarea se arrastre a otro estado, éste cambia su estado.
 **/
const CuadroEstado = ({ titulo, tareasEstado }) => {
    const [tituloEstado, setTituloEstado] = useState(titulo);

    // Se extrae la función cambiarEstado del hook.
    const { cambiarEstado } = useTasks();

    // Esta función se encargará de la lógica cuando ha terminado de arrastrar una tarea de un estado u otro.
    const handleDragEnd = (ev) => {
        ev.preventDefault();
    }

    const handleDrop = (event, estado) => {
        event.preventDefault();
        event.stopPropagation();

        // Se obtiene el titulo de la tarea, convirtiendola primero en un objeto JSON.
        const titulo = JSON.parse(event.dataTransfer.getData("tarea")).titulo;

        // Se cambia el estado de la tarea pasando el título y el nuevo estado.
        cambiarEstado(titulo, estado);
        event.target.style.background = "";
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDragEnter = (ev) => {
        ev.target.style.background = "#0062";
    }

    const handleDragLeave = (ev) => {
        ev.target.style.background = "";
    }

    return (
        <div className="bg-sky-400 flex flex-col gap-4 p-2 rounded-xl select-none shadow-lg">
            <h2 className="font-bold text-2xl pt-2">{titulo}</h2>

            {/* Este contenedor actuará como zona de suelte (dropzone) y además se mostrarán las tareas. */}
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    layout
                    key={tareasEstado}
                    exit={{scale: 0}}
                    transition={{duration: 1, type: "spring"}}
                    onDrop={(e) => handleDrop(e, tituloEstado)}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    className="bg-sky-200 rounded-xl p-4 gap-4 flex flex-col h-full transition" name={titulo}>
                    {/* Aquí se renderizarán las tareas que coinciden con ese estado. */}
                    {tareasEstado.map((t) => {
                        return <Tarea key={t.id} tarea={t} esVisible={true} />;
                    })}
                    {/* Solo se mostrará el botón de 'Nueva tarea' en la lista de tareas pendientes. */}
                    {titulo === "Pendiente" && <ModalNuevaTarea />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CuadroEstado;
