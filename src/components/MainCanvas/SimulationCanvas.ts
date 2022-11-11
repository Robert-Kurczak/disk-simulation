interface vector2{
	x: number,
	y: number
}

class Disk{
	radius: number;
	position: vector2;
	velocity: vector2;
	color: string;

	constructor(radius: number, position: vector2, velocity: vector2, color: string){
		this.radius = radius;
		this.position = position;
		this.velocity = velocity
		this.color = color;
	}
}

class SimulationCanvas{
	private width: number;
	private height: number;

	private canvasWrapper: HTMLDivElement;

	private canvasNode: HTMLCanvasElement;
	private canvasCTX: CanvasRenderingContext2D;

	private simulationInterval: ReturnType<typeof setInterval> | null = null;

	private deltaT = 0.004;
	private gConstant = 0.0000000000667;

	private bigMass = {
		position: {
			x: 0,
			y: 0
		},

		mass: 2e18
	}

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

		this.bigMass.position.x = this.width / 2;
		this.bigMass.position.y = this.height / 2;
	}

	//---Private methods---
	private generateDisks(diskAmount: number){
		const diskArray: Array<Disk> = [];

		for(let i = 0; i < diskAmount; i++){
			const randRadius: number = Math.random() * this.width / 100;
			const randPosition: vector2 = {
				x: Math.random() * (this.width -2 * randRadius) + randRadius,
				y: Math.random() * (this.height -2 * randRadius) + randRadius
			}

			const randVelocity: vector2 = {
				x: Math.random() * 200 - 100,
				y: Math.random() * 200 - 100
			}

			const color: string = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

			diskArray.push(new Disk(randRadius, randPosition, randVelocity, color));
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
			this.canvasCTX.arc(this.bigMass.position.x, this.bigMass.position.y, 5, 0, 2 * Math.PI);
			this.canvasCTX.fillStyle = "#ff0044";
			this.canvasCTX.fill();

			for(let disk of diskArray){

				//distance vector between disk and big mass
				let distanceVec: vector2 = {
					x: this.bigMass.position.x - disk.position.x,
					y: this.bigMass.position.y - disk.position.y
				}

				//value of distance vector
				let distanceVal: number = ((distanceVec.x)**2 + (distanceVec.y)**2)**0.5;

				//unit vector (versor) that show direction to big mass
				let distanceVer: vector2 = {
					x: distanceVec.x / distanceVal,
					y: distanceVec.y / distanceVal
				};

				let acceleration: vector2 = {
					x: ((this.gConstant * this.bigMass.mass) / (distanceVal**2 + 0.01)**1.5) * distanceVer.x,
					y: ((this.gConstant * this.bigMass.mass) / (distanceVal**2 + 0.01)**1.5) * distanceVer.y
				}

				disk.velocity.x += acceleration.x * this.deltaT;
				disk.velocity.y += acceleration.y * this.deltaT;

				const potentialPosition: vector2 = {
					x: disk.position.x += disk.velocity.x * this.deltaT,
					y: disk.position.y += disk.velocity.y * this.deltaT
				}

				//---Border collisions---
				//x
				if(potentialPosition.x + disk.radius > this.width){
					potentialPosition.x  = this.width - disk.radius;

					disk.velocity.x *= -1;
				}
				else if(potentialPosition.x - disk.radius < 0){
					potentialPosition.x = disk.radius;

					disk.velocity.x *= -1;
				}

				//y
				if(potentialPosition.y + disk.radius > this.height){
					potentialPosition.y  = this.height - disk.radius

					disk.velocity.y *= -1;
				}
				else if(potentialPosition.y - disk.radius < 0){
					potentialPosition.y = disk.radius;

					disk.velocity.y *= -1;
				}
				//------

				disk.position = potentialPosition;
			}
		}, this.deltaT * 1000);
	}
	//------


}

export default SimulationCanvas;