import React, { useState, useRef, useContext, useEffect } from "react";
import { Modal, Button, Input, Select } from "react-daisyui";
import Prioridad from "../../models/PrioridadTarea";
import useTasks from "../../hooks/useTasks";
import { toast } from "react-toastify";

const ModalModificarTarea = ({ tarea, open }) => {
	const [visible, setVisible] = useState(open);
	const { modificarTarea } = useTasks();

	const [nuevaTarea, setNuevaTarea] = useState(tarea);

	const estadoOriginal = useRef();
	estadoOriginal.current = tarea;

    // Función para conmutar la visibilidad del modal;
	const toggleModifyVisible = () => {
		setVisible(!visible);
	}

    // La función llama a la función 'modificarTarea' del hook pasando el id y la nueva tarea.
    // Se actualiza la referencia con la tarea nueva.
    // Se cierra la ventana cuando se termina la operación.
	const handleModificarTarea = () => {
		modificarTarea(tarea.id, nuevaTarea);
        toast.success(`La tarea '${nuevaTarea.titulo}' se ha modificado con éxito`);
        estadoOriginal.current = nuevaTarea;
		toggleModifyVisible();
	};

    // Cuando el usuario le da al botón Cancelar, solo se cierra la ventana.
	const cancelar = () => {
		toggleModifyVisible();
        setNuevaTarea(estadoOriginal.current);
	};

	useEffect(() => {
		if (open) {
			toggleModifyVisible();
		}
	}, [open]);

	return (
		<div className="backdrop-filter">
			<Modal className="w-11/12 max-w-5xl text-white z-50" open={visible}>
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
						defaultValue={tarea.prioridad}
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

export default ModalModificarTarea;
