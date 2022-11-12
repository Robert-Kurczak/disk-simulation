import { Vector2 } from "./Vector";

class Disk{
	radius: number;
	mass: number;
	position: Vector2;
	velocity: Vector2;
	color: string;

	constructor(radius: number, mass: number, position: Vector2, velocity: Vector2, color: string){
		this.radius = radius;
		this.mass = mass;
		this.position = position;
		this.velocity = velocity
		this.color = color;
	}

	public toDestroy: boolean = false;
}

export default Disk;