import React, { useState, useRef, useContext, useEffect } from "react";
import { Modal, Button, Input, Select } from "react-daisyui";
import Prioridad from "../../models/PrioridadTarea";
import useTasks from "../../hooks/useTasks";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import { contextoTareaMod } from "../../App";

const ModalModificarTarea2 = () => {   
    const { modificarTarea } = useTasks();
    const {actualizarTareaModal, cerrarModal} = useModal();
    const tareaMod = useContext(contextoTareaMod);

    const estadoOriginal = useRef();
    estadoOriginal.current = tareaMod.tarea;
    const [nuevaTarea, setNuevaTarea] = useState(estadoOriginal.current);

    useEffect(() => {
        estadoOriginal.current = tareaMod.tarea;
        setNuevaTarea(estadoOriginal.current);
    }, [tareaMod.tarea]);

    // La función llama a la función 'modificarTarea' del hook pasando el id y la nueva tarea.
    // Se actualiza la referencia con la tarea nueva.
    // Se cierra la ventana cuando se termina la operación.
    const handleModificarTarea = () => {
        modificarTarea(tareaMod.tarea.id, nuevaTarea);
        toast.success(`La tarea '${nuevaTarea.titulo}' se ha modificado con éxito`);
        estadoOriginal.current = nuevaTarea;
        cerrarModal();
    };

    // Cuando el usuario le da al botón Cancelar, solo se cierra la ventana.
    const cancelar = () => {
        cerrarModal();
        setNuevaTarea(estadoOriginal.current);
    };

    return (
        <div className="backdrop-filter">
            <Modal className="w-11/12 max-w-5xl text-white z-50" open={tareaMod.visible}>
                <Modal.Header className="font-bold">
                    Modificar tarea existente
                </Modal.Header>
                <Modal.Body className="text-left flex flex-col gap-8">
                    <Input
                        type="text"
                        placeholder="Introduce el titulo de la tarea (obligatorio)"
                        onChange={(e) =>
                            setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })
                        }
                        value={nuevaTarea.titulo}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Introduce la descripción de la tarea (obligatorio)"
                        onChange={(e) =>
                            setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
                        }
                        value={nuevaTarea.descripcion}
                        required
                    />
                    <Select
                        defaultValue={tareaMod.tarea.prioridad}
                        onChange={(e) =>
                            setNuevaTarea({ ...nuevaTarea, prioridad: e.target.value })
                        }
                    >
                        <option value={Prioridad.NORMAL}>Normal</option>
                        <option value={Prioridad.URGENTE}>Urgente</option>
                        <option value={Prioridad.BLOQUEANDO}>Bloqueando</option>
                    </Select>
                </Modal.Body>
                <Modal.Actions>
                    <Button onClick={cancelar}>Cancelar</Button>
                    <Button onClick={handleModificarTarea}>Modificar tarea</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ModalModificarTarea2;
