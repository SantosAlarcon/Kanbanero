import Estados from "../models/EstadosTarea";

class Tarea {
    constructor(nombre, descripcion, prioridad, fechaCreacion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = Estados.NORMAL;
        this.fechaCreacion = this.fechaCreacion;
    }
}

export default Tarea;
