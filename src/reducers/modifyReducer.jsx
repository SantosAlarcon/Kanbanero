// Reducer utilizado para cambiar la tarea que se utilizará
// el modal de modificación.

const modifyReducer = (tareaMod, accion) => {
    switch(accion.type) {
        case "cambiarTareaMod":
            return {...tareaMod, tarea: accion.payload};
        case "abrirModal":
            return {...tareaMod, visible: accion.payload};
        case "cerrarModal":
            return {...tareaMod, visible: accion.payload};
        default:
            return tareaMod;
    }
}

export default modifyReducer;
