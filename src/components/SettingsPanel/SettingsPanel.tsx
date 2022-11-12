import { ChangeEvent, useState } from "react";
import SimulationCanvas from "../MainCanvas/Simulation/SimulationCanvas";

import "../../styles/SettingsPanel.css";
import GravitySettings from "./sections/GravitySettings";

interface Props{
	mainCanvas: SimulationCanvas
}

function SettingsPanel(props: Props){
	const {mainCanvas} = props;

	const [showGravitySettings, setShowGravitySettings] = useState(mainCanvas.getUseGravity());
	const [showDragSettings, setShowDragSettings] = useState(mainCanvas.getUseDrag());

	let disksAmount: number = 1000;

	const toggleGravitySettings = () => {
		mainCanvas.setUseGravity(!showGravitySettings);
		setShowGravitySettings(!showGravitySettings);
	}

	const toggleDragSettings = () => {
		mainCanvas.setUseDrag(!showDragSettings);
		setShowDragSettings(!showDragSettings);
	}

	//---Updaters---
	const updateAmount = (e:ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		if(value >= 0) disksAmount = value;
	};

	const updateGconstant = (e:ChangeEvent<HTMLInputElement>) => {
		mainCanvas.setGconstant(parseFloat(e.target.value));
	};

	const updateBigMass = (e:ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		if(value > 0) mainCanvas.setBigMass(value);
	};
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
				/>
			}

			<div className="settings-section">
				<p>Use drag: </p>
				<input type="checkbox" defaultChecked={showDragSettings} onClick={toggleDragSettings}></input>
			</div>


			<button onClick={generate}>Generate</button>
		</div>
	);
}

export default SettingsPanel;