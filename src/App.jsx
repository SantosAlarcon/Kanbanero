import { useState, createContext, useReducer } from "react";
import "./App.css";
import Kanban from "./components/Kanban";
import Navbar from "./components/Navbar";
import tareaReducer from "./reducers/TareaReducer";
import TareasIniciales from "./data/tareas.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const contextoTareas = createContext(null);
export const contextoDispatchTareas = createContext(null);

function App() {
	const [tareas, dispatch] = useReducer(tareaReducer, TareasIniciales);

	return (
		<contextoTareas.Provider value={tareas}>
			<contextoDispatchTareas.Provider value={dispatch}>
				<div className="App">
					<ToastContainer
                        position="bottom-center"
						autoClose={2000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						draggable
						theme="dark"
					/>

					<Navbar />
					<h1 className="text-6xl font-extrabold mb-5">Kanbanero</h1>
					<p className="mb-5">
						Organiza tu vida como un@ <b>PROFESIONAL</b>.
					</p>
					<Kanban />
				</div>
			</contextoDispatchTareas.Provider>
		</contextoTareas.Provider>
	);
}

export default App;
