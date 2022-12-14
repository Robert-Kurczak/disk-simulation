import Disk from "./Disk";
import { Vector2 } from "./Vector";

export class GravityField{
	public gConstant: number;
	public fieldCenter: Vector2;
	public mass: number;

	constructor(gConstant: number, fieldCenter: Vector2, mass: number){
		this.gConstant = gConstant;
		this.fieldCenter = fieldCenter;
		this.mass = mass;
	}

	public getDistance(position: Vector2){
		return ((position.x - this.fieldCenter.x)**2 + (position.y - this.fieldCenter.y)**2)**0.5;
	}

	public getAcceleration(disk: Disk){
		//distance vector between disk and big mass
		let distanceVec: Vector2 = new Vector2(
			this.fieldCenter.x - disk.position.x,
			this.fieldCenter.y - disk.position.y
		);
		
		//value of distance vector
		let distanceVal: number = ((distanceVec.x)**2 + (distanceVec.y)**2)**0.5;

		let acceleration: Vector2 = new Vector2(
			(this.gConstant * this.mass) / ((distanceVal**2 + 10))**1.5 * distanceVec.x,
			(this.gConstant * this.mass) / ((distanceVal**2 + 10))**1.5 * distanceVec.y
		);

		return acceleration;
	}
}

export class DragField{
	public normalViscosity: number;
	public maxViscosity: number;
	public viscositySlope: number;
	public highVpositionX: number;

	constructor(normalViscosity: number, maxViscosity: number, viscositySlope: number, highVpositionX: number){
		this.normalViscosity = normalViscosity;
		this.maxViscosity = maxViscosity;
		this.viscositySlope = viscositySlope;
		this.highVpositionX = highVpositionX;
	}

	public viscosityFromPosition(position: Vector2){
		const quadricResult: number = -this.viscositySlope * (position.x - this.highVpositionX)**2 + this.maxViscosity;
		
		return Math.max(this.normalViscosity, quadricResult);
	}

	public getAcceleration(disk: Disk){
		let a: number = (-6 * Math.PI * this.viscosityFromPosition(disk.position) * disk.radius) / disk.mass;

		//Acceleration by drag have to be negative
		if(a > 0) return new Vector2(0, 0);

		let acceleration: Vector2 = new Vector2(
			a * disk.velocity.x,
			a * disk.velocity.y
		);

		return acceleration;
	}
}