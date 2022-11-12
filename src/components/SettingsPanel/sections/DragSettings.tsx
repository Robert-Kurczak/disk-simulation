import React from "react";

interface Props{
	defaultViscosity: number;
	updateViscHandler: React.FormEventHandler<HTMLInputElement>;

	defaultViscositySlope: number;
	updateViscSlopeHandler: React.FormEventHandler<HTMLInputElement>;
}

function DragSettings(props: Props){
	const {
		defaultViscosity,
		updateViscHandler,

		defaultViscositySlope,
		updateViscSlopeHandler
	} = props;


	return(
		<React.Fragment>
			<div className="settings-section">
				<p>Viscosity [Pa⋅s]:</p>
				<input
					type="number"
					step={0.0001}
					
					defaultValue={defaultViscosity}
					onChange={updateViscHandler}
				/>
			</div>

			<div className="settings-section">
				<p>Viscosity change slope:</p>
				<input
					type="number"
					step={0.0001}

					defaultValue={defaultViscositySlope}
					onChange={updateViscSlopeHandler}
				/>
			</div>
		</React.Fragment>
	);
}

export default DragSettings;