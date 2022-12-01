import Disk from "./Disk";
import { DragField, GravityField } from "./Fields";
import { Vector2 } from "./Vector";

class SimulationCanvas{
	private width: number;
	private height: number;

	private canvasWrapper: HTMLDivElement;

	private canvasNode: HTMLCanvasElement;
	private canvasCTX: CanvasRenderingContext2D;

	private gravityCanvasNode: HTMLCanvasElement;
	private gravityCanvasCTX: CanvasRenderingContext2D;

	private dragCanvasNode: HTMLCanvasElement;
	private dragCanvasCTX: CanvasRenderingContext2D;

	private simulationInterval: ReturnType<typeof setInterval> | null = null;

	private deltaT = 0.004;

	private disksCollisions = false;
	private destructableDisks = false;

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

		this.canvasWrapper.style.width = `${this.width}px`;
		this.canvasWrapper.style.height = `${this.height}px`;
		this.canvasWrapper.style.position = "relative";
		//------

		//---Constructing canvas---
		this.canvasNode = document.createElement("canvas") as HTMLCanvasElement;
		this.canvasNode.width = width;
		this.canvasNode.height = height;

		this.canvasNode.style.position = "absolute";

		//For custom, user styling
		this.canvasNode.setAttribute("class", canvasClass);

		this.canvasCTX = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
		
		this.canvasWrapper.appendChild(this.canvasNode);
		//------

		//---Constructing gravity canvas---
		this.gravityCanvasNode = this.canvasNode.cloneNode() as HTMLCanvasElement;
		this.gravityCanvasCTX = this.gravityCanvasNode.getContext("2d") as CanvasRenderingContext2D;
		
		this.canvasWrapper.insertBefore(this.gravityCanvasNode, this.canvasNode);
		//------

		//---Constructing drag canvas---
		this.dragCanvasNode = this.canvasNode.cloneNode() as HTMLCanvasElement;
		this.dragCanvasCTX = this.dragCanvasNode.getContext("2d") as CanvasRenderingContext2D;
		
		this.canvasWrapper.insertBefore(this.dragCanvasNode, this.canvasNode);
		//------

		this.gravityFields.push(
			new GravityField(
				6.67e-11,
				new Vector2(this.width / 2, this.height / 2),
				2e16
			)
		);

		this.dragFields.push(
			new DragField(
				0.1,
				0.3,
				1e-5,
				3 * this.width / 4
			)
		);
	}

	//---Setters---
	public setDisksCollision(value: boolean){this.disksCollisions = value}
	public setGravityFieldPosition(value: Vector2, fieldID: number){this.gravityFields[fieldID].fieldCenter = value}
	public setDestructableDisks(value: boolean){this.destructableDisks = value}
	public setGconstant(value: number, fieldID: number){this.gravityFields[fieldID].gConstant = value}
	public setBigMass(value: number, fieldID: number){this.gravityFields[fieldID].mass = value;}
	public setUseGravity(value: boolean){this.useGravity = value}

	public setNormalViscosity(value: number){this.dragFields[0].normalViscosity = value}
	public setMaxViscosity(value: number){this.dragFields[0].maxViscosity = value}
	public setViscositySlope(value: number){this.dragFields[0].viscositySlope = value}
	public setHighVpositionX(value: number){this.dragFields[0].highVpositionX = value}
	public setUseDrag(value: boolean){this.useDrag = value}
	//------

	//---Getters---
	public getWidth(){return this.width}
	public getHeight(){return this.height}
	public getGravityFieldsAmount(){return this.gravityFields.length}
	public getGravityFieldPosition(fieldID: number){return this.gravityFields[fieldID].fieldCenter}

	public getDisksCollisions(){return this.disksCollisions}
	public getDestructableDisks(){return this.destructableDisks}
	public getGconstant(fieldID: number){return this.gravityFields[fieldID].gConstant}
	public getBigMass(fieldID: number){return this.gravityFields[fieldID].mass}
	public getUseGravity(){return this.useGravity}
	
	public getNormalViscosity(){return this.dragFields[0].normalViscosity}
	public getMaxViscosity(){return this.dragFields[0].maxViscosity}
	public getViscositySlope(){return this.dragFields[0].viscositySlope}
	public getHighVpositionX(){return this.dragFields[0].highVpositionX}
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
	public addGravityField(){
		this.gravityFields.push(
			new GravityField(
				6.67e-11,
				new Vector2(this.width / 2, this.height / 2),
				2e16
			)
		);
	}

	public removeGravityField(fieldID: number){
		this.gravityFields.splice(fieldID, 1);
	}

	public simulate(diskAmount: number){
		if(this.simulationInterval){
			clearInterval(this.simulationInterval);
		}

		const diskArray: Array<Disk> = this.generateDisks(diskAmount);

		this.simulationInterval = setInterval(() => {
			this.canvasCTX.clearRect(0, 0, this.width, this.height);
			this.drawDisks(diskArray);

			for(let i = diskArray.length - 1; i >= 0; i--){
				const disk = diskArray[i];

				if(this.disksCollisions){
					for(let j = 0; j < diskArray.length; j++){
						if(i !== j){
							const diskB = diskArray[j];

							let distance = ((disk.position.x - diskB.position.x)**2 + (disk.position.y - diskB.position.y)**2)**0.5;

							if((distance - disk.radius - diskB.radius) <= 0){
								if(distance < Math.max(disk.radius, diskB.radius)){
									const velocityValue = (diskB.velocity.x**2 + diskB.velocity.y**2)**0.5;
									const velocityVersor = new Vector2(
										diskB.velocity.x / velocityValue,
										diskB.velocity.y / velocityValue
									);
	
									const deltaR = 2 * Math.min(disk.radius, diskB.radius);
	
									diskB.position.x -= velocityVersor.x * deltaR;
									diskB.position.y -= velocityVersor.y * deltaR;
									distance += deltaR;
								}

								//Normal versor
								const normalUnitVec = new Vector2(
									(diskB.position.x - disk.position.x) / distance,
									(diskB.position.y - disk.position.y) / distance
								);

								//Tangent versor
								const tangentUnitVec = new Vector2(-normalUnitVec.y, normalUnitVec.x);

								//Scalar velocities in normal direction
								const normalVelA = disk.velocity.x * normalUnitVec.x + disk.velocity.y * normalUnitVec.y
								const normalVelB = diskB.velocity.x * normalUnitVec.x + diskB.velocity.y * normalUnitVec.y

								//Scalar velocities in tangent direction
								const tangentVelA = disk.velocity.x * tangentUnitVec.x + disk.velocity.y * tangentUnitVec.y
								const tangentVelB = diskB.velocity.x * tangentUnitVec.x + diskB.velocity.y * tangentUnitVec.y

								//Vector velocities in tangent direction 
								const resultTangentVelA = new Vector2(
									tangentVelA * tangentUnitVec.x,
									tangentVelA * tangentUnitVec.y
								);

								const resultTangentVelB = new Vector2(
									tangentVelB * tangentUnitVec.x,
									tangentVelB * tangentUnitVec.y
								);
							
								//Scalar values of velocities in normal direction after collision
								const resultNormalVelA = (normalVelA * (disk.mass - diskB.mass) + 2 * diskB.mass * normalVelB) / (disk.mass + diskB.mass);
								const resultNormalVelB = (normalVelB * (diskB.mass - disk.mass) + 2 * disk.mass * normalVelA) / (disk.mass + diskB.mass);

								//Vector values of velocities after collision
								disk.velocity = new Vector2(
									resultNormalVelA * normalUnitVec.x + resultTangentVelA.x,
									resultNormalVelA * normalUnitVec.y + resultTangentVelA.y,
								);

								diskB.velocity = new Vector2(
									resultNormalVelB * normalUnitVec.x + resultTangentVelB.x,
									resultNormalVelB * normalUnitVec.y + resultTangentVelB.y,
								);
							}
						}
					}
				}

				//Removing disk that are too close to big mass
				if(this.destructableDisks && this.useGravity){
					if(this.gravityFields[0].getDistance(disk.position) <= 15){
						diskArray.splice(i, 1);
						continue;
					}
				}

				let acceleration: Vector2 = new Vector2(0, 0);

				if(this.useGravity){
					for(let field of this.gravityFields){
						const gravityAcceleration = field.getAcceleration(disk);
						acceleration.x += gravityAcceleration.x;
						acceleration.y += gravityAcceleration.y;
					}
				}

				if(this.useDrag){
					for(let field of this.dragFields){
						const dragAcceleration = field.getAcceleration(disk);
						acceleration.x += dragAcceleration.x;
						acceleration.y += dragAcceleration.y;
					}
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
		}, this.deltaT * 1000);
	}

	//-Gravity field-
	public printGravityFieldImg(){
		const fieldImg: ImageData = this.gravityCanvasCTX.createImageData(this.width, this.height);

		for(let field of this.gravityFields){
			for(let y = 0; y < this.height; y++){
				for(let x = 0 ; x < this.width; x++){
					const normalizedPotential = (100 / (field.getDistance(new Vector2(x, y)) + 100)) * 255;

					const index: number = (y * this.width + x) * 4;

					//R
					fieldImg.data[index + 0] += normalizedPotential;
					//G
					fieldImg.data[index + 1] = 0;
					//B
					fieldImg.data[index + 2] = 0;
					//A
					fieldImg.data[index + 3] = 150;
				}
			}
		}

		this.gravityCanvasCTX.putImageData(fieldImg, 0, 0);
	}

	public clearGravityFieldImg(){
		this.gravityCanvasCTX.clearRect(0, 0, this.width, this.height);
	}
	//--

	//-Drag field-
	public printDragFieldImg(){
		const fieldImg: ImageData = this.dragCanvasCTX.createImageData(this.width, this.height);

		for(let field of this.dragFields){
			for(let y = 0; y < this.height; y++){
				for(let x = 0 ; x < this.width; x++){
					const index: number = (y * this.width + x) * 4;

					const normalizedViscosity: number = field.viscosityFromPosition(new Vector2(x, y)) * 255 / field.maxViscosity;

					//R
					fieldImg.data[index + 0] = 0;
					//G
					fieldImg.data[index + 1] = 0;
					//B
					fieldImg.data[index + 2] += normalizedViscosity;
					//A
					fieldImg.data[index + 3] = 150;
				}
			}
		}

		this.dragCanvasCTX.putImageData(fieldImg, 0, 0);
	}

	public clearDragFieldImg(){
		this.dragCanvasCTX.clearRect(0, 0, this.width, this.height);
	}
	//--
}

export default SimulationCanvas;