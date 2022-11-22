import React from "react"
import { Vector2 } from "../../MainCanvas/Simulation/Vector";

interface Props{
	bigMassAmount: number;

	currentGravityFieldID: number;
	updateCurrentGravityField: React.FormEventHandler<HTMLSelectElement>;

	canvasWidth: number;
	canvasHeight: number;

	currentGravityFieldPosition: Vector2;
	updateCurrentGravityFieldPositionX: React.FormEventHandler<HTMLInputElement>;
	updateCurrentGravityFieldPositionY: React.FormEventHandler<HTMLInputElement>;

	gConstant: number;
	updateGconstant: React.FormEventHandler<HTMLInputElement>;

	bigMass: number;
	updateBigMass: React.FormEventHandler<HTMLInputElement>;

	destDisks: boolean;
	updateDestDisks: React.FormEventHandler<HTMLInputElement>;

	visualizeGravity: boolean;
	updateVisualizeGravity: React.FormEventHandler<HTMLInputElement>;

}

function GravitySettings(props: Props){
	const {
		bigMassAmount,

		currentGravityFieldID,
		updateCurrentGravityField,

		canvasWidth,
		canvasHeight,

		currentGravityFieldPosition,
		updateCurrentGravityFieldPositionX,
		updateCurrentGravityFieldPositionY,

		gConstant,
		updateGconstant,

		bigMass,
		updateBigMass,

		destDisks,
		updateDestDisks,

		visualizeGravity,
		updateVisualizeGravity
	}= props;

	const bigMassArray = [];
	for(let i = 0; i < bigMassAmount; i++){
		bigMassArray.push(
			<option key={i}>Big Mass {i}</option>
		)
	}

	return(
		<React.Fragment>
			<div className="setting">
				<p>Big mass number: </p>
				<select onChange={updateCurrentGravityField}>
					{
						[...Array(bigMassAmount)].map((x, i) =>
							<option selected={i === currentGravityFieldID} key={i}>Big mass {i}</option>
						)
					}
				</select>
			</div>

			<div className="setting">
				<p>Big mass X position: </p>
				<input
					type="range"
					min={0}
					max={canvasWidth}
					step={1}
					
					value={currentGravityFieldPosition.x}
					onChange={updateCurrentGravityFieldPositionX}
				/>
			</div>

			<div className="setting">
				<p>Big mass Y position: </p>
				<input
					type="range"
					min={0}
					max={canvasHeight}
					step={1}
					
					value={currentGravityFieldPosition.y}
					onChange={updateCurrentGravityFieldPositionY}
				/>
			</div>

			<div className="setting">
				<p>Gravitational constant [<sup>Nm<sup>2</sup></sup>&frasl;<sub>kg<sup>2</sup></sub>]:</p>
				<input
					type="number"
					step={1e-13}

					value={gConstant.toExponential()}
					onChange={updateGconstant}
				/>
			</div>

			<div className="setting">
				<p>Big Mass [kg]:</p>
				<input
					type="number"
					step={1e+18}
					min={0}

					value={bigMass.toExponential()}
					onChange={updateBigMass}
				/>
			</div>

			<div className="setting">
				<p>Destructable disks:</p>
				<input
					type="checkbox"
					checked={destDisks}
					onChange={updateDestDisks}
				/>
			</div>

			<div className="setting">
				<p>Visualize field:</p>
				<input
					type="checkbox"
					checked={visualizeGravity}
					onChange={updateVisualizeGravity}
				/>
			</div>
		</React.Fragment>
	);
}

export default GravitySettings;