import Disk from "./Disk";
import { DragField, GravityField } from "./Fields";
import { Vector2 } from "./Vector";

class SimulationCanvas{
	private width: number;
	private height: number;

	private canvasWrapper: HTMLDivElement;

	private canvasNode: HTMLCanvasElement;
	private canvasCTX: CanvasRenderingContext2D;

	private simulationInterval: ReturnType<typeof setInterval> | null = null;

	private deltaT = 0.004;
	private destructableDisks = true;

	//---Gravity properties---
	private gravityFields: Array<GravityField> = [];

	private useGravity: boolean = false;
	//------

	//---Drag properties---
	private dragFields: Array<DragField> = [];

	private useDrag: boolean = false;
	//------

	constructor(width: number, height: number, wrapperID: string, canvasClass: string){
		this.width = width;
		this.height = height;

		//---Setting wrapper---
		this.canvasWrapper = document.getElementById(wrapperID) as HTMLDivElement;
		this.canvasWrapper.innerHTML = "";
		//------

		//---Constructing canvas---
		this.canvasNode = document.createElement("canvas") as HTMLCanvasElement;
		this.canvasNode.width = width;
		this.canvasNode.height = height;
		this.canvasNode.setAttribute("class", canvasClass);

		this.canvasCTX = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
		
		this.canvasWrapper.appendChild(this.canvasNode);
		//------

		this.gravityFields.push(
			new GravityField(
				6.67e-11,
				new Vector2(this.width / 2, this.height / 2),
				2e18
			)
		);

		this.dragFields.push(
			new DragField(
				8.9e-2,
				1e-4,
				new Vector2(this.width / 2, this.height / 2)
			)
		);
	}

	//---Setters---
	public setGconstant(value: number){this.gravityFields[0].gConstant = value}
	public setBigMass(value: number){this.gravityFields[0].mass = value}
	public setUseGravity(value: boolean){this.useGravity = value}

	public setViscosity(value: number){this.dragFields[0].viscosity = value}
	public setViscositySlope(value: number){this.dragFields[0].viscositySlope = value}
	public setUseDrag(value: boolean){this.useDrag = value}
	//------

	//---Getters---
	public getGconstant(){return this.gravityFields[0].gConstant}
	public getBigMass(){return this.gravityFields[0].mass}
	public getUseGravity(){return this.useGravity}

	public getViscosity(){return this.dragFields[0].viscosity}
	public getViscositySlope(){return this.dragFields[0].viscositySlope}
	public getUseDrag(){return this.useDrag}
	//---

	//---Private methods---
	private generateDisks(diskAmount: number){
		const diskArray: Array<Disk> = [];

		for(let i = 0; i < diskAmount; i++){
			const randRadius: number = Math.random() * this.width / 100;

			const randMass: number = (Math.random() * 19 + 1);

			const randPosition: Vector2 = new Vector2(
				Math.random() * (this.width -2 * randRadius) + randRadius,
				Math.random() * (this.height -2 * randRadius) + randRadius
			);

			const randVelocity: Vector2 = new Vector2(
				Math.random() * 400 - 200,
				Math.random() * 400 - 200
			);

			const color: string = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

			diskArray.push(new Disk(randRadius, randMass, randPosition, randVelocity, color));
		}

		return diskArray;
	}

	private drawDisks(diskArray: Array<Disk>){
		for(let i = 0; i < diskArray.length; i++){
			const currentDisk: Disk = diskArray[i];

			this.canvasCTX.beginPath();
			this.canvasCTX.arc(currentDisk.position.x, currentDisk.position.y, currentDisk.radius, 0, 2 * Math.PI);
			this.canvasCTX.fillStyle = currentDisk.color;
			this.canvasCTX.fill();
		}
	}
	//------

	//---Public methods---
	public simulate(diskAmount: number){
		if(this.simulationInterval){
			clearInterval(this.simulationInterval);
		}

		const diskArray: Array<Disk> = this.generateDisks(diskAmount);

		this.simulationInterval = setInterval(() => {
			this.canvasCTX.clearRect(0, 0, this.width, this.height);
			this.drawDisks(diskArray);

			this.canvasCTX.beginPath();
			this.canvasCTX.arc(
				this.gravityFields[0].fieldCenter.x,
				this.gravityFields[0].fieldCenter.y,
				5,
				0,
				2 * Math.PI
			);
			this.canvasCTX.fillStyle = "#ff0044";
			this.canvasCTX.fill();

			for(let i = diskArray.length - 1; i >= 0; i--){
				const disk = diskArray[i];

				//Removing disk that are too close to big mass
				if(this.destructableDisks && this.useGravity){
					if(this.gravityFields[0].getDistance(disk.position) <= 15){
						console.log(diskArray.length)
						diskArray.splice(i, 1);
						continue;
					}
				}

				let acceleration: Vector2 = new Vector2(0, 0);

				if(this.useGravity){
					const gravityAcceleration = this.gravityFields[0].getAcceleration(disk);
					acceleration.x += gravityAcceleration.x;
					acceleration.y += gravityAcceleration.y;
				}

				if(this.useDrag){
					const dragAcceleration = this.dragFields[0].getAcceleration(disk);

					acceleration.x += dragAcceleration.x;
					acceleration.y += dragAcceleration.y;
				}

				disk.velocity.x += acceleration.x * this.deltaT;
				disk.velocity.y += acceleration.y * this.deltaT;

				const potentialPosition: Vector2 = new Vector2(
					disk.position.x += disk.velocity.x * this.deltaT,
					disk.position.y += disk.velocity.y * this.deltaT
				)

				//---Border collisions---
				//x
				if(potentialPosition.x + disk.radius >= this.width){
					potentialPosition.x  = this.width - disk.radius;

					disk.velocity.x *= -1;
				}
				else if(potentialPosition.x - disk.radius < 0){
					potentialPosition.x = disk.radius;

					disk.velocity.x *= -1;
				}

				//y
				if(potentialPosition.y + disk.radius >= this.height){
					potentialPosition.y  = this.height - disk.radius

					disk.velocity.y *= -1;
				}
				else if(potentialPosition.y - disk.radius <= 0){
					potentialPosition.y = disk.radius;

					disk.velocity.y *= -1;
				}
				//------
			}

			//Cleaning from dead particles
			if(this.destructableDisks && this.useGravity){
				for(let i = 0; i < diskArray.length; i++){
					if(diskArray[i].toDestroy){
						diskArray.splice(i, 1);
					}
				}
			}

		}, this.deltaT * 1000);
	}
	//------


}

export default SimulationCanvas;