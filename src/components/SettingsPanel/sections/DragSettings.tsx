import React from "react";

interface Props{
	canvasWidth: number;

	defaultNormalViscosity: number;
	updateNormalViscHandler: React.FormEventHandler<HTMLInputElement>;

	defaultMaxViscosity: number;
	updateMaxViscHandler: React.FormEventHandler<HTMLInputElement>;

	defaultViscositySlope: number;
	updateViscSlopeHandler: React.FormEventHandler<HTMLInputElement>;

	defaultHighVpositionX: number;
	updateHighVpositionXHandler: React.FormEventHandler<HTMLInputElement>;

	defaultVisualizeDrag: boolean;
	updateVisualizeDragHandler: React.FormEventHandler<HTMLInputElement>;
}

function DragSettings(props: Props){
	const {
		canvasWidth,

		defaultNormalViscosity,
		updateNormalViscHandler,

		defaultMaxViscosity,
		updateMaxViscHandler,

		defaultViscositySlope,
		updateViscSlopeHandler,

		defaultHighVpositionX,
		updateHighVpositionXHandler,

		defaultVisualizeDrag,
		updateVisualizeDragHandler
	} = props;


	return(
		<React.Fragment>
			<div className="settings-section">
				<p>Normal viscosity [Pa⋅s]:</p>
				<input
					type="number"
					step={0.01}
					
					defaultValue={defaultNormalViscosity}
					onChange={updateNormalViscHandler}
				/>
			</div>

			<div className="settings-section">
				<p>Max viscosity [Pa⋅s]:</p>
				<input
					type="number"
					step={0.01}
					
					defaultValue={defaultMaxViscosity}
					onChange={updateMaxViscHandler}
				/>
			</div>

			<div className="settings-section">
				<p>Viscosity slope:</p>
				<input
					type="number"
					step={0.001}

					defaultValue={defaultViscositySlope}
					onChange={updateViscSlopeHandler}
				/>
			</div>

			<div className="settings-section">
				<p>High viscosity position</p>
				<input
					type="range"
					min={0}
					max={canvasWidth}
					step={1}
					
					defaultValue={defaultHighVpositionX}
					onChange={updateHighVpositionXHandler}
				/>
			</div>

			<div className="settings-section">
				<p>Visualize field:</p>
				<input
					type="checkbox"
					defaultChecked={defaultVisualizeDrag}
					onClick={updateVisualizeDragHandler}
				/>
			</div>
		</React.Fragment>
	);
}

export default DragSettings;