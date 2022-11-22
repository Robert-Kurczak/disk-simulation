import { ChangeEvent, useState } from "react";
import SimulationCanvas from "../MainCanvas/Simulation/SimulationCanvas";
import GravitySettings from "./sections/GravitySettings";
import DragSettings from "./sections/DragSettings";

import "../../styles/SettingsPanel.css";
import { Vector2 } from "../MainCanvas/Simulation/Vector";

interface Props{
	mainCanvas: SimulationCanvas
}

function SettingsPanel(props: Props){
	const {mainCanvas} = props;

	
	//---Single source of truth---
	const [disksAmount, setDisksAmount] = useState(200);
	const [useGravity, setUseGravity] = useState(mainCanvas.getUseGravity());
	
	const [destDisks, setDestDisks] = useState(mainCanvas.getDestructableDisks());
	const [visualizeGravity, setVisualizeGravity] = useState(false);

	const [currentGravityField, setCurrentGravityField] = useState({
		ID: 0,
		position: mainCanvas.getGravityFieldPosition(0),
		gConstant: mainCanvas.getGconstant(0),
		bigMass: mainCanvas.getBigMass(0),
	});

	const [useDrag, setUseDrag] = useState(mainCanvas.getUseDrag());
	const [normalViscosity, setNormalViscosity] = useState(mainCanvas.getNormalViscosity());
	const [maxViscosity, setMaxViscosity] = useState(mainCanvas.getMaxViscosity());
	const [viscositySlope, setViscositySlope] = useState(mainCanvas.getViscositySlope());
	const [highVpositionX, setHighVpositionX] = useState(mainCanvas.getHighVpositionX());
	const [visualizeDrag, setVisualizeDrag] = useState(false);
	//------

	//---Updaters---
	//-Gravity-
	const updateDisksAmount = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);
		setDisksAmount(value);
	}

	const updateCurrentGravityField = (e: ChangeEvent<HTMLSelectElement>) => {
		const value: number = e.target.selectedIndex;

		setCurrentGravityField({
			ID: value,
			position: mainCanvas.getGravityFieldPosition(value),
			gConstant: mainCanvas.getGconstant(value),
			bigMass: mainCanvas.getBigMass(value)
		});
	}

	const updateCurrentGravityFieldPositionX = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		const ID: number = currentGravityField.ID
		const positionY: number = currentGravityField.position.y;
		const newPosition: Vector2 = new Vector2(value, positionY);

		mainCanvas.setGravityFieldPosition(newPosition, ID);
		if(visualizeGravity){mainCanvas.printGravityFieldImg()}
		
		setCurrentGravityField({...currentGravityField, position: newPosition});
	}

	const updateCurrentGravityFieldPositionY = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		const ID: number = currentGravityField.ID;
		const positionX: number = currentGravityField.position.x;
		const newPosition: Vector2 = new Vector2(positionX, value);

		mainCanvas.setGravityFieldPosition(newPosition, ID);
		if(visualizeGravity){mainCanvas.printGravityFieldImg()}

		setCurrentGravityField({...currentGravityField, position: newPosition});
	}

	const updateUseGravity = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		mainCanvas.setUseGravity(value);
		setUseGravity(value);
	}

	const updateGconstant = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		mainCanvas.setGconstant(value, currentGravityField.ID);
		if(visualizeGravity){mainCanvas.printGravityFieldImg()}

		setCurrentGravityField({...currentGravityField, gConstant: value});
	}

	const updateBigMass = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		mainCanvas.setBigMass(value, currentGravityField.ID);
		if(visualizeGravity){mainCanvas.printGravityFieldImg()}

		setCurrentGravityField({...currentGravityField, bigMass: value});
	}

	const updateDestDisks = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		mainCanvas.setDestructableDisks(value);
		setDestDisks(value);
	}

	const updateVisualizeGravity = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		if(value){
			mainCanvas.printGravityFieldImg();
		}
		else{
			mainCanvas.clearGravityFieldImg();
		}

		setVisualizeGravity(value);
	}
	//--

	//-Drag-
	const updateUseDrag = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		mainCanvas.setUseDrag(value);
		setUseDrag(value);
	}

	const updateNormalViscosity = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		mainCanvas.setNormalViscosity(value);
		if(visualizeDrag){mainCanvas.printDragFieldImg()}

		setNormalViscosity(value);
	}

	const updateMaxViscosity = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		mainCanvas.setMaxViscosity(value);
		if(visualizeDrag){mainCanvas.printDragFieldImg()}

		setMaxViscosity(value);
	}

	const updateViscositySlope = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		mainCanvas.setViscositySlope(value);
		if(visualizeDrag){mainCanvas.printDragFieldImg()}

		setViscositySlope(value);
	}

	const updateHighVpositionX = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		mainCanvas.setHighVpositionX(value);
		if(visualizeDrag){mainCanvas.printDragFieldImg()}

		setHighVpositionX(value);
	}

	const updateVisualizeDrag = (e: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = e.target.checked;

		if(value){
			mainCanvas.printDragFieldImg();
		}
		else{
			mainCanvas.clearDragFieldImg();
		}

		setVisualizeDrag(value);

	}
	//--
	//------

	const generate = () => {
		mainCanvas.simulate(disksAmount);
	};

	return(
		<div className="settings-panel">
			<div className="settings-section">
				<h3>Settings</h3>
				<div className="setting">
					<p>Disks amount:</p>
					<input type="number" value={disksAmount} onChange={updateDisksAmount}/>
				</div>

				<div className="setting">
					<p>Use gravity: </p>
					<input type="checkbox" checked={useGravity} onChange={updateUseGravity}/>
				</div>

				{useGravity &&
					<GravitySettings
						bigMassAmount={mainCanvas.getGravityFieldsAmount()}

						canvasWidth={mainCanvas.getWidth()}
						canvasHeight={mainCanvas.getHeight()}

						currentGravityFieldPosition={currentGravityField.position}
						updateCurrentGravityFieldPositionX={updateCurrentGravityFieldPositionX}
						updateCurrentGravityFieldPositionY={updateCurrentGravityFieldPositionY}

						currentGravityFieldID={currentGravityField.ID}
						updateCurrentGravityField={updateCurrentGravityField}

						gConstant={currentGravityField.gConstant}
						updateGconstant={updateGconstant}

						bigMass={currentGravityField.bigMass}
						updateBigMass={updateBigMass}

						destDisks={destDisks}
						updateDestDisks={updateDestDisks}

						visualizeGravity={visualizeGravity}
						updateVisualizeGravity={updateVisualizeGravity}
					/>
				}

				<div className="section-divider"></div>

				<div className="setting">
					<p>Use drag: </p>
					<input type="checkbox" checked={useDrag} onChange={updateUseDrag}/>
				</div>

				{useDrag &&
					<DragSettings
						canvasWidth={mainCanvas.getWidth()}

						normalViscosity={normalViscosity}
						updateNormalViscosity={updateNormalViscosity}

						maxViscosity={maxViscosity}
						updateMaxViscosity={updateMaxViscosity}

						viscositySlope={viscositySlope}
						updateViscositySlope={updateViscositySlope}

						highVpositionX={highVpositionX}
						updateHighVpositionX={updateHighVpositionX}

						visualizeDrag={visualizeDrag}
						updateVisualizeDrag={updateVisualizeDrag}
					/>
				}
			</div>

			<button onClick={generate}>Generate</button>
		</div>
	);
}

export default SettingsPanel;