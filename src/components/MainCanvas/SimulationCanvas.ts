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
		this.velocity = velocity;
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
				x: Math.random() * 4 - 2,
				y: Math.random() * 4 - 2
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

			for(let i = 0; i < diskArray.length; i++){
				const currentDisk: Disk = diskArray[i];

				const potentialPosition: vector2 = {
					x: currentDisk.position.x += currentDisk.velocity.x,
					y: currentDisk.position.y += currentDisk.velocity.y
				}

				//---Border collisions---
				//x
				if(potentialPosition.x + currentDisk.radius > this.width){
					potentialPosition.x  = this.width - currentDisk.radius
					currentDisk.velocity.x *= -1;
				}
				else if(potentialPosition.x - currentDisk.radius < 0){
					potentialPosition.x = currentDisk.radius;
					currentDisk.velocity.x *= -1;
				}

				//y
				if(potentialPosition.y + currentDisk.radius > this.height){
					potentialPosition.y  = this.height - currentDisk.radius
					currentDisk.velocity.y *= -1;
				}
				else if(potentialPosition.y - currentDisk.radius < 0){
					potentialPosition.y = currentDisk.radius;
					currentDisk.velocity.y *= -1;
				}
				//------

				currentDisk.position = potentialPosition;
			}
		}, 0);
	}
	//------


}

export default SimulationCanvas;