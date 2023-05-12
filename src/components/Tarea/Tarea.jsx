import React, { useState } from "react";
import ExpandMore from "../icons/ExpandMore";
import DeleteIcon from "../icons/DeleteIcon";
import useTasks from "../../hooks/useTasks";
import Prioridad from "../../models/PrioridadTarea";
import ModalModificarTarea from "../ModalModificarTarea/ModalModificarTarea";
import Estado from "../../models/EstadosTarea";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Tarea = ({ tarea, esVisible }) => {
    const { borrarTarea } = useTasks();
    const [expandido, setExpandido] = useState(false);
    const [modalModVisible, setModalModVisible] = useState(false);

    // Cuando se comienza a arrastrar la tarea, se establece el efecto de arrastre en "move" y
    // se añaden los datos de la tarea y el estado previo al evento.
    const handleDragStart = (event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("tarea", JSON.stringify(tarea));
        console.log("Estoy arrastrando...");
    };

    // Esta función borra la tarea en cuestión. Sale un mensaje de confirmación preguntando si quiere borrar
    // la tarea. Se borra si el usuario confirma.
    const handleDelete = () => {
        if (confirm("¿Estás segur@ de borrar la tarea?")) {
            borrarTarea(tarea.id);
            toast.success("La tarea se ha borrado con éxito");
        }
    };

    // Esto cambia el estado de visibilidad del modal de "Modificar tarea" cuando el usuario hace doble
    // click en una tarea.
    const handleModify = () => setModalModVisible(!modalModVisible);
    const handleModifyError = () => toast.error("No se puede modificar una tarea completada.");

    const variants = {
        expandedmoreBtn: {
            rotate: 0,
        },
        expandedlessBtn: {
            rotate: -180,
        },
        expandedmore: {
            display: "none",
        },
        expandedless: {
            display: "flex",
        },
    };

    return ( 
        <div
            // La animación se aplicará cuando el estado de la clave cambia.
            // Si la tarea está completada, no se puede arrastrar ni
            // modificar.
            onDragStart={
                tarea.estado !== Estado.COMPLETADA
                    ? (e) => handleDragStart(e)
                    : null
            }
            onDoubleClick={
                tarea.estado !== Estado.COMPLETADA ? handleModify : handleModifyError
            }
            className={`rounded-lg p-2 text-left shadow-lg text-black hover:cursor-pointer active:cursor-grabbing transition flex flex-col
        {// El fondo de las tareas cambiará en función de su prioridad.}
        ${tarea.estado === Estado.COMPLETADA ? "bg-gray-300" 
                : tarea.prioridad === Prioridad.NORMAL
                    ? "bg-gray-200"
                    : "" || tarea.prioridad === Prioridad.URGENTE
                        ? "bg-yellow-400"
                        : "" || tarea.prioridad === Prioridad.BLOQUEANDO
                            ? "bg-red-400"
                            : ""
                }`}
        >
            <div
                className="flex justify-between transition items-center"
                /* Las tareas completadas NO SE PUEDEN ARRASTRAR. */
                draggable={tarea.estado !== Estado.COMPLETADA ? true : false}
            >
                <motion.button
                    animate={expandido ? "expandedlessBtn" : "expandedmoreBtn"}
                    variants={variants}
                    transition={{ duration: 0.2 }}
                    className="m-0 p-2 bg-transparent focus:outline-none hover:border-none border-none"
                    onClick={() => setExpandido(!expandido)}
                >
                    <ExpandMore />
                </motion.button>
                <p className="self-center text-[1.1em] font-semibold">{tarea.titulo}</p>
                <button
                    className="p-0 bg-transparent border-none outline-none focus:border-none focus:outline-none hover:border-none"
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </button>
            </div>

            {/* Si está expandida la tarea, se mostrará la descripción de la misma. */}
            <motion.div
                animate={expandido ? "expandedless" : "expandedmore"}
                variants={variants}
                transition={{ duration: 0.5 }}
                className="flex justify-center mt-2 transition rounded-lg border-[#0003] border py-2"
            >
                <span className="font-[1.1em]">{tarea.descripcion}</span>
            </motion.div>

            <ModalModificarTarea tarea={tarea} open={modalModVisible} />
        </div>
    );
};

export default Tarea;
