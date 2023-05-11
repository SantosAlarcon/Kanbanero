import React, { useState, useRef, useContext } from "react";
import { Modal, Button, Form, Input, Select } from "react-daisyui";
import Prioridad from "../../models/PrioridadTarea";
import useTasks from "../../hooks/useTasks";
import Estado from "../../models/EstadosTarea";

const ModalNuevaTarea = () => {
	const [visible, setVisible] = useState(false);
	const { crearTarea, siguienteId } = useTasks();
	const [error, setError] = useState(false);

	const tareaInicial = {
		id: siguienteId,
		titulo: "",
		descripcion: "",
		prioridad: Prioridad.NORMAL,
		estado: Estado.PENDIENTE,
		fechaCreacion: new Date().toLocaleString(),
	};

	const [nuevaTarea, setNuevaTarea] = useState({ ...tareaInicial });

	const estadoOriginal = useRef();
	estadoOriginal.current = tareaInicial;

	const toggleVisible = () => setVisible(!visible);

	const handleCrearTarea = () => {
		if (nuevaTarea.titulo === "" && nuevaTarea.descripcion === "") {
			return setError(true);
		} else {
			setError(false);
		}

		if (!error) {
			crearTarea(nuevaTarea);
			setNuevaTarea(estadoOriginal.current);
			toggleVisible();
		}
	};

	const cancelar = () => {
		toggleVisible();
		setNuevaTarea(estadoOriginal.current);
	};

	return (
		<div>
			<Button onClick={toggleVisible}>Crear una nueva tarea</Button>
			<Modal className="w-11/12 max-w-5xl" open={visible}>
				<Modal.Header className="font-bold">Crear nueva tarea</Modal.Header>
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
					{error && <p className="text-red-900">El titulo es OBLIGATORIO.</p>}
					<Input
						type="text"
						placeholder="Introduce la descripción de la tarea (obligatorio)"
						onChange={(e) =>
							setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
						}
						value={nuevaTarea.descripcion}
						required
					/>
					{error && <p className="text-red-900">La descripción es OBLIGATORIA.</p>}
					<Select
						defaultValue={0}
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
					<Button onClick={handleCrearTarea}>Crear tarea</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default ModalNuevaTarea;
