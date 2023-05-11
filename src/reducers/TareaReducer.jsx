const tareaReducer = (tareas, accion) => {
	
    switch (accion.type) {
        // Aquí se crea una tarea y se añade a las existentes
		case "crearTarea":
			return [
				...tareas,
				{
					id: accion.payload.id,
					titulo: accion.payload.titulo,
					descripcion: accion.payload.descripcion,
					prioridad: accion.payload.prioridad,
                    estado: accion.payload.estado,
                    fechaCreacion: accion.payload.fechaCreacion
				},
			];
        // Aquí se actualiza la tarea con algunos campos modificados, como el nombre, la descripción y la prioridad.
		case "modificarTarea":
			return tareas.map((t) => {
				if (t.id === accion.payload) {
					return accion.tareaNueva;
				} else {
					return t;
				}
			});
        // Aquí se cambia sólo el estado. Esto sólo se llama cuando se arrastra la tarea de un estado a otro.
        case "cambiarEstado":
            return tareas.map(t => {
                if (t.titulo === accion.payload.titulo) {
                    return {...t, estado: accion.payload.estadoNuevo};
                } else {
                    return t;
                }
            })
        // Aquí se borra la tarea de la lista.
		case "borrarTarea":
			return tareas.filter(t => t.id !== accion.payload);
	}
};

export default tareaReducer;
