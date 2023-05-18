import { useContext, useState, useRef } from "react";
import { contextoDispatchTareaMod, contextoTareaMod } from "../App";

export function useModal() {
    const tareaMod = useContext(contextoTareaMod);
    const dispatchMod = useContext(contextoDispatchTareaMod);
    
    const actualizarTareaModal = (tarea) => {
        dispatchMod({type: "cambiarTareaMod", payload: tarea})
    }

    const abrirModal = () => {
        dispatchMod({type: "abrirModal", payload: true})
    }

    const cerrarModal = () => {
        dispatchMod({type: "cerrarModal", payload: false})
    }

    return {actualizarTareaModal, abrirModal, cerrarModal};
}

export default useModal;
