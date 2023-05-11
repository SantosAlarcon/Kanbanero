const ModalAyudaTitulo = `Bienvenid@ a Kanbanero`;

const ModalAyudaCuerpo = () => {
	return (
		<>
			<b>¡Bienvenid@ a Kanbanero!</b> 
            <br/>
            <br/>
            Una aplicación que te permite organizarte
			en tu día a día basándose en la filosofía <b>Kanban</b>. En ella puedes
			crear tus propias tareas y estados, cambiar el estado de las mismas
			arrastrándolas a otros estados.
			<br />
			<br />
			El panel está dividido en varios estados: <b>[Pendiente, En desarrollo, Completado]</b>.<br />
			Para cambiar el estado de la tarea, tan sólo hay que arrastrarla de un
			estado a otro. Cuando la tarea se haya <b>completado</b>, no se podrá
			volver a los estados anteriores. Sólo se podrá eliminar.
			<br />
			<br />
            Cada tarea, además, se le puede cambiar la <b>prioridad</b> de la misma. Están la prioridad <b>Normal</b>, <b>Urgente</b> y <b>Bloqueando</b>. Las <b>tareas urgentes</b> [amarillas] son tareas que hay que completar ya mismo, y las <b>bloqueantes</b> [rojas] son aquellas que están empezadas pero que cuesta avanzar en las mismas para completarse.
            <br />
            <br />
			¡Espero que disfrutes usando esta aplicación y que te ayude a organizar tu
			vida!
			<br />
		</>
	);
};

export { ModalAyudaTitulo, ModalAyudaCuerpo };
