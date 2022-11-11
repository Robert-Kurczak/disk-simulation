import React from "react"

interface Props{
	defaultGconstant: number;
	updateGconstantHandler: React.FormEventHandler<HTMLInputElement>;

	defaultBigMass: number;
	updateBigMassHandler: React.FormEventHandler<HTMLInputElement>;
}

function GravitySettings(props: Props){
	const {
		defaultGconstant,
		updateGconstantHandler,

		defaultBigMass,
		updateBigMassHandler
	}= props;

	return(
		<React.Fragment>
			<div className="settings-section">
				<p>Gravitational constant [<sup>Nm<sup>2</sup></sup>&frasl;<sub>kg<sup>2</sup></sub>]:</p>
				<input
					type="number"
					defaultValue={defaultGconstant}
					step={1e-13}
					onInput={updateGconstantHandler}
				/>
			</div>

			<div className="settings-section">
				<p>Big Mass [kg]:</p>
				<input
					type="number"
					defaultValue={defaultBigMass}
					step={1e+18}
					min={0}
					onInput={updateBigMassHandler}
				/>
			</div>
		</React.Fragment>
	);
}

export default GravitySettings;