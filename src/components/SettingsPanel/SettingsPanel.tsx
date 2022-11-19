import { ChangeEvent, useState, useRef } from "react";
import SimulationCanvas from "../MainCanvas/Simulation/SimulationCanvas";

import "../../styles/SettingsPanel.css";
import GravitySettings from "./sections/GravitySettings";
import DragSettings from "./sections/DragSettings";

interface Props{
	mainCanvas: SimulationCanvas
}

function SettingsPanel(props: Props){
	const {mainCanvas} = props;

	const [showGravitySettings, setShowGravitySettings] = useState(mainCanvas.getUseGravity());
	let visualizeGravity = useRef(false);

	const [showDragSettings, setShowDragSettings] = useState(mainCanvas.getUseDrag());
	let visualizeDrag = useRef(false);

	let disksAmount: number = 200;

	const toggleGravitySettings = () => {
		mainCanvas.setUseGravity(!showGravitySettings);
		setShowGravitySettings(!showGravitySettings);
	}

	const toggleDragSettings = () => {
		mainCanvas.setUseDrag(!showDragSettings);
		setShowDragSettings(!showDragSettings);
	}

	//---Updaters---
	const updateAmount = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		if(value >= 0) disksAmount = value;
	};

	//-Gravity-
	const updateGconstant = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setGconstant(parseFloat(e.target.value));

		if(visualizeGravity.current){mainCanvas.printGravityFieldImg()}
	};

	const updateBigMass = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		if(value > 0) mainCanvas.setBigMass(value);
		if(visualizeGravity.current){mainCanvas.printGravityFieldImg()}
	};

	const updateDestDisks = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setDestructableDisks(e.target.checked);
	};

	const updateVisualizeGravityHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		visualizeGravity.current = value;

		if(value){
			mainCanvas.printGravityFieldImg();
		}
		else{
			mainCanvas.clearGravityFieldImg();
		}
	}
	//--

	//-Drag-
	const updateNormalViscHandler = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setNormalViscosity(parseFloat(e.target.value));

		if(visualizeDrag.current){mainCanvas.printDragFieldImg()}
	}

	const updateMaxViscHandler = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setMaxViscosity(parseFloat(e.target.value));

		if(visualizeDrag.current){mainCanvas.printDragFieldImg()}
	}

	const updateViscSlopeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setViscositySlope(parseFloat(e.target.value));

		if(visualizeDrag.current){mainCanvas.printDragFieldImg()}
	}
	
	const updateHighVpositionXHandler = (e: ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setHighVpositionX(parseFloat(e.target.value));

		if(visualizeDrag.current){mainCanvas.printDragFieldImg()}
	}
	
	const updateVisualizeDragHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		visualizeDrag.current = value;

		if(value){
			mainCanvas.printDragFieldImg();
		}
		else{
			mainCanvas.clearDragFieldImg();
		}
	}
	//--
	//------

	const generate = () => {
		mainCanvas.simulate(disksAmount);
	};

	return(
		<div className="settings-panel">
			<h3>Settings</h3>
			<div className="settings-section">
				<p>Disks amount:</p>
				<input type="number" defaultValue={disksAmount} min={0} onInput={updateAmount}/>
			</div>

			<div className="settings-section">
				<p>Use gravity: </p>
				<input type="checkbox" defaultChecked={showGravitySettings} onClick={toggleGravitySettings}></input>
			</div>

			{showGravitySettings &&
				<GravitySettings
					defaultGconstant={mainCanvas.getGconstant()}
					updateGconstantHandler={updateGconstant}

					defaultBigMass={mainCanvas.getBigMass()}
					updateBigMassHandler={updateBigMass}

					defaultDestDisks={mainCanvas.getDestructableDisks()}
					updateDestDisksHandler={updateDestDisks}

					defaultVisualizeGravity={visualizeGravity.current}
					updateVisualizeGravityHandler={updateVisualizeGravityHandler}
				/>
			}

			<div className="section-divider"></div>

			<div className="settings-section">
				<p>Use drag: </p>
				<input type="checkbox" defaultChecked={showDragSettings} onClick={toggleDragSettings}></input>
			</div>

			{showDragSettings &&
				<DragSettings
					canvasWidth={mainCanvas.getWidth()}

					defaultNormalViscosity={mainCanvas.getNormalViscosity()}
					updateNormalViscHandler={updateNormalViscHandler}

					defaultMaxViscosity={mainCanvas.getMaxViscosity()}
					updateMaxViscHandler={updateMaxViscHandler}

					defaultViscositySlope={mainCanvas.getViscositySlope()}
					updateViscSlopeHandler={updateViscSlopeHandler}

					defaultHighVpositionX={mainCanvas.getHighVpositionX()}
					updateHighVpositionXHandler={updateHighVpositionXHandler}

					defaultVisualizeDrag={visualizeDrag.current}
					updateVisualizeDragHandler={updateVisualizeDragHandler}
				/>
			}


			<button onClick={generate}>Generate</button>
		</div>
	);
}

export default SettingsPanel;