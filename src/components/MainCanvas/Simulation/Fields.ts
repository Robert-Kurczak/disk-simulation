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

		//unit vector (versor) that show direction to big mass
		let distanceVer: Vector2 = new Vector2(
			distanceVec.x / distanceVal,
			distanceVec.y / distanceVal
		);

		let acceleration: Vector2 = new Vector2(
			((this.gConstant * this.mass) / (distanceVal**2 + 0.01)**1.5) * distanceVer.x,
			((this.gConstant * this.mass) / (distanceVal**2 + 0.01)**1.5) * distanceVer.y
		);

		return acceleration;
	}
}

export class DragField{
	public viscosity: number;
	public viscositySlope: number;
	public fieldCenter: Vector2;

	constructor(viscosity: number, viscositySlope: number, fieldCenter: Vector2){
		this.viscosity = viscosity;
		this.viscositySlope = viscositySlope;
		this.fieldCenter = fieldCenter;
	}

	private viscosityFromPosition(position: Vector2){
		let r: number = ((this.fieldCenter.x - position.x)**2 + (this.fieldCenter.y - position.y)**2)**0.5;
		return this.viscosity + this.viscositySlope * r;
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