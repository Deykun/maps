import ImageCoatOfArms200 from '../assets/herb-helu-x2.webp';

const minLonX = -177.5;
const maxLonX = 180;

// function getCanvasY(latitude, canvasHeight, rates) {
//     const reversedLatitude = 90 - latitude;
//     const topStatic = rates.staticTop ?? 0;
//     const topPadding = rates.latTop * canvasHeight;

//     // const rate = 6.568 / 1000 * canvasHeight;
//     const rate = rates.latRate / 100 * canvasHeight;
//     const latDependedRate = rates.latDynamic / 100 * reversedLatitude * canvasHeight;

    

//     // const base = topPadding + (reversedLatitude * rate) - latDependedRate;
//     const base = topStatic + topPadding + (latitude * rate) - latDependedRate;

//     const response = base;

//     // console.log(response);
  
//     return response;
//   }

  function getCanvasY(lat, rawMapHeight, rates) {
    const mapHeight = rawMapHeight * (rates.mapHeightStreech ?? 1);
    const topPadding = rates.latTop / 100 * mapHeight;
    // Earth's radius in meters (mean radius)
    const R = 6378137;

    // Convert latitude from degrees to radians
    const latRadians = (lat + rates.latShift) * (Math.PI / 180);

    // Mercator projection formula to find y coordinate
    const y = R * Math.log(Math.tan((Math.PI / 4) + (latRadians / 2)));

    // Scale the y value to fit within the map's height
    // Normalize y to be within the range of the map's height
    const mapY = topPadding + (mapHeight / 2) - (y / (2 * Math.PI * R) * mapHeight);

    return mapY;
}

  window.gg = getCanvasY;

const minLatY = 90;
const maxLatY = -90;

const streechY = 1;
const streechX = 1;

const mapWidth = (maxLonX - minLonX) * streechX;
const mapHeight = 180;

// Translates degrees to meters. It is just a hack, not a proper projection.
// originLat and originLon should be the "center" of our area of interest or
// close to it
var lonCorrection = 1;
var rMajor = 6378137.0;


export class CoatOfArms {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  lonX: number;
  latY: number;
  title: string;

  constructor ({ canvas, ctx, lonX, latY, title }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lonX: number, latY: number, title: string }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.title = title;

    this.lonX = lonX;
    this.latY = latY;

    this.x = 0;
    this.y = 0;
    this.onResize({
      latTop: 0.112326,
      latRate: -0.004884,
      latDynamic: -0.010116,
    });
  }

  onResize(rates) {
    const screetchY = 1.54;
    const offsetY = 0.1052;
    this.rate = rates;
    this.x = (this.lonX - minLonX) / mapWidth * this.canvas.width;
    // this.y = (offsetY * this.canvas.width) + (screetchY * (90 - this.latY) / mapWidth * this.canvas.width);

    const lat = this.latY;

    // this.y = 300 + 0.1 * ((Math.log( (Math.sin(lat) + 1.0) / Math.cos(lat))) + (Math.PI) ) / (2 * Math.PI) * this.canvas.height;

    // this.y = getCanvasY(this.latY, this.canvas.height * 1.16, 50, 220, this.canvas.height * 0.5);
    this.y = getCanvasY(this.latY, this.canvas.height * 1.16, rates);
    // this.y = getCanvasY(this.latY, this.canvas.height * 1.16, 15, 120, this.canvas.height * 0.5);

    if (this.title?.startsWith('Oslo')) {
      window.oslo = this.y;
    }

    if (this.title?.startsWith('Barcelona')) {
      window.barcelona = this.y;

      // console.log(window.barcelona - window.oslo);
    }
  }

  draw() {
    const image = new Image();
    image.src = ImageCoatOfArms200;

    const imageWidth = 6;
    const imageHeight = 6;

    this.ctx.drawImage(
      image,
      this.x - (imageWidth / 2),
      this.y - (imageWidth / 2),
      imageWidth,
      imageHeight,
      // x,
      // y,
      // imageWidth * this.scaleLevel,
      // imageHeight * this.scaleLevel,
    );

    if (this.title) {
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = 'black';
      this.ctx.font = `16px Arial`;
      this.ctx.fillText(this.title, this.x + 20, this.y);
      // this.ctx.fillText(this.title, this.x + 20, this.y);
      // this.ctx.fillText(this.title, this.x + this.y - 5, this.y);
    }
  }

  setScale(scaleLevel: number) {
    // this.scaleLevel = scaleLevel;
  }
}