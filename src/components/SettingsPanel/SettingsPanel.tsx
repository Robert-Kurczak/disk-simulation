import { ChangeEvent } from "react";
import SimulationCanvas from "../MainCanvas/SimulationCanvas";

import "../../styles/SettingsPanel.css";

interface Props{
	mainCanvas: SimulationCanvas
}

function SettingsPanel(props: Props){
	let disksAmount: number = 1000;
	let gConst: number = 6.67e-11;
	let bigMassValue: number = 2.0e16;

	const {mainCanvas} = props;

	//---Updaters---
	const updateAmount = (e:ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		if(value >= 0) disksAmount = value;
	};

	const updateGconst = (e:ChangeEvent<HTMLInputElement>) => {
		gConst = parseFloat(e.target.value);
	};

	const updateBigMass = (e:ChangeEvent<HTMLInputElement>) => {
		const value: number = parseFloat(e.target.value);

		if(value > 0) bigMassValue = value;
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
				<input type="number" defaultValue={disksAmount} min={0} onChange={updateAmount}/>
			</div>

			<div className="settings-section">
				<p>Gravitational constant [<sup>Nm<sup>2</sup></sup>&frasl;<sub>kg<sup>2</sup></sub>]:</p>
				<input type="number" defaultValue={gConst} onChange={updateGconst}/>
			</div>

			<div className="settings-section">
				<p>Big Mass [kg]:</p>
				<input type="number" defaultValue={bigMassValue} min={0} onChange={updateBigMass}/>
			</div>

			<button onClick={generate}>Generate</button>
		</div>
	);
}

export default SettingsPanel;