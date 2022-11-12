import MainCanvas from './MainCanvas/MainCanvas';

import "../styles/App.css";
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { useState } from 'react';
import SimulationCanvas from './MainCanvas/Simulation/SimulationCanvas';

function App(){
	const [mainCanvas, setMainCanvas] = useState<SimulationCanvas | null>(null);

	return(
		<div id="app">
			<MainCanvas
				setMainCanvas={setMainCanvas as React.Dispatch<React.SetStateAction<SimulationCanvas>>}
			/>

			{mainCanvas && 
				<SettingsPanel
					mainCanvas={mainCanvas as SimulationCanvas}
				/>
			}
		</div>
	);
}

export default App;
