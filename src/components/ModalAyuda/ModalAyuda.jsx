import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { ModalAyudaTitulo, ModalAyudaCuerpo } from "./ModalAyudaText";

const ModalAyuda = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => setVisible(!visible);

	return (
		<div className="backdrop-filter">
			<Button className="" onClick={toggleVisible}>Ayuda</Button>
			<Modal className="w-11/12 max-w-5xl" open={visible}>
				<Modal.Header className="font-bold">{ModalAyudaTitulo}</Modal.Header>
				<Modal.Body className="text-left">
                    {ModalAyudaCuerpo()}
				</Modal.Body>
				<Modal.Actions>
					<Button onClick={toggleVisible}>Gracias</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default ModalAyuda;
