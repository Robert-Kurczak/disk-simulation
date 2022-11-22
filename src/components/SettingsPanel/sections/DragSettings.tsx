import React from "react";

interface Props{
	canvasWidth: number;

	normalViscosity: number;
	updateNormalViscosity: React.FormEventHandler<HTMLInputElement>;

	maxViscosity: number;
	updateMaxViscosity: React.FormEventHandler<HTMLInputElement>;

	viscositySlope: number;
	updateViscositySlope: React.FormEventHandler<HTMLInputElement>;

	highVpositionX: number;
	updateHighVpositionX: React.FormEventHandler<HTMLInputElement>;

	visualizeDrag: boolean;
	updateVisualizeDrag: React.FormEventHandler<HTMLInputElement>;
}

function DragSettings(props: Props){
	const {
		canvasWidth,

		normalViscosity,
		updateNormalViscosity,

		maxViscosity,
		updateMaxViscosity,

		viscositySlope,
		updateViscositySlope,

		highVpositionX,
		updateHighVpositionX,

		visualizeDrag,
		updateVisualizeDrag
	} = props;


	return(
		<React.Fragment>
			<div className="setting">
				<p>Normal viscosity [Pa⋅s]:</p>
				<input
					type="number"
					step={0.01}
					
					value={normalViscosity}
					onChange={updateNormalViscosity}
				/>
			</div>

			<div className="setting">
				<p>Max viscosity [Pa⋅s]:</p>
				<input
					type="number"
					step={0.01}
					
					value={maxViscosity}
					onChange={updateMaxViscosity}
				/>
			</div>

			<div className="setting">
				<p>Viscosity slope:</p>
				<input
					type="number"
					step={0.00001}
					min={0}

					value={viscositySlope}
					onChange={updateViscositySlope}
				/>
			</div>

			<div className="setting">
				<p>High viscosity position</p>
				<input
					type="range"
					min={0}
					max={canvasWidth}
					step={1}
					
					value={highVpositionX}
					onChange={updateHighVpositionX}
				/>
			</div>

			<div className="setting">
				<p>Visualize field:</p>
				<input
					type="checkbox"
					checked={visualizeDrag}
					onChange={updateVisualizeDrag}
				/>
			</div>
		</React.Fragment>
	);
}

export default DragSettings;