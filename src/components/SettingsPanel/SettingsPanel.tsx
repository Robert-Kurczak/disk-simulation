import { ChangeEvent } from "react";
import SimulationCanvas from "../MainCanvas/SimulationCanvas";

import "../../styles/SettingsPanel.css";

interface Props{
	mainCanvas: SimulationCanvas
}

function SettingsPanel(props: Props){
	let disksAmount: number = 1000;

	const {mainCanvas} = props;

	const updateAmount = (e:ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value);

		if(value >= 0) disksAmount = value;
	}

	const generate = () => {
		mainCanvas.simulate(disksAmount);
	}

	return(
		<div className="settings-panel">
			<h3>Settings</h3>
			
			<p>Disks amount:</p>
			<input type="number" defaultValue={disksAmount} min={0} onChange={updateAmount}/>

			<button onClick={generate}>Generate</button>
		</div>
	);
}

export default SettingsPanel;