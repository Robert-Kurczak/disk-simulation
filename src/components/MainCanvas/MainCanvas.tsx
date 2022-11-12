import { useEffect } from "react";
import SimulationCanvas from "./Simulation/SimulationCanvas";

import "../../styles/MainCanvas.css";

interface Props{
    setMainCanvas: React.Dispatch<React.SetStateAction<SimulationCanvas>>
}

function MainCanvas(props: Props){
    const {setMainCanvas} = props;

    const wrapperID: string = "canvas-wrapper";
	const canvasClass: string = "main-canvas";

    useEffect(() => {
		setMainCanvas(new SimulationCanvas(960, 600, wrapperID, canvasClass));
	}, [setMainCanvas]);

    return(
        <div id={wrapperID}/>
    );
}

export default MainCanvas;