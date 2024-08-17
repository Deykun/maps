import { SettingsParams } from '../../types';
import ImageCoatOfArms200 from '../assets/herb-helu-x2.webp';

const minLonX = -177.5;
const maxLonX = 180;

  function getCanvasY(latX: number, rawMapHeight: number, rates: SettingsParams) {
    const mapHeight = rawMapHeight * (rates.mapHeightStreech ?? 1);
    const topPadding = rates.latTop / 100 * mapHeight;
    // Earth's radius in meters (mean radius)
    const R = 6378137;

    // Convert latitude from degrees to radians
    const latRadians = (latX + rates.latShift) * (Math.PI / 180);

    // Mercator projection formula to find y coordinate
    const y = R * Math.log(Math.tan((Math.PI / 4) + (latRadians / 2)));

    // Scale the y value to fit within the map's height
    // Normalize y to be within the range of the map's height
    const mapY = topPadding + (mapHeight / 2) - (y / (2 * Math.PI * R) * mapHeight);

    return mapY;
}

const mapWidth = maxLonX - minLonX;

export class CoatOfArms {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  lonX: number;
  latY: number;
  title: string;
  imageUrl: string;
  rates: SettingsParams;

  constructor ({
    canvas,
    ctx,
    lonX,
    latY,
    title,
    imageUrl,
  }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lonX: number, latY: number, title: string, imageUrl: string }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.title = title;
    this.imageUrl = imageUrl;
    this.width = 20;
    this.height = 20;

    this.lonX = lonX;
    this.latY = latY;

    this.x = 0;
    this.y = 0;

    this.rates = {
      latTop: 0,
      latShift: 0,
      mapHeightStreech: 0,
    }
  }

  onResize(rates: SettingsParams) {
    this.rates = rates;

    this.x = (this.lonX - minLonX) / mapWidth * this.canvas.width;
    // 1.16 because Equator is not at for current map :D
    this.y = getCanvasY(this.latY, this.canvas.height * 1.16, rates);
  }

  draw() {
    const image = new Image();
    // image.src = ImageCoatOfArms200;
    image.src = this.imageUrl;

    this.ctx.drawImage(
      image,
      this.x - (this.width / 2),
      this.y - (this.width / 2),
      this.width,
      this.width,
      // x,
      // y,
      // imageWidth * this.scaleLevel,
      // imageHeight * this.scaleLevel,
    );

    if (this.title) {
      // this.ctx.textBaseline = "top";
      // this.ctx.fillStyle = 'black';
      // this.ctx.font = `16px Arial`;
      // this.ctx.fillText(this.title, this.x + 20, this.y);
    }
  }

  isRenderedAt(objectRaw?: { x: number, y: number }) {
    if (!objectRaw) {
      return false;
    }

    // Is rendered simillary to translate(-50%, -50%);
    const object = {
      x: objectRaw.x + (this.width / 2),
      y: objectRaw.y + (this.height / 2),
    };

    if (object.x > this.x + this.width || object.x < this.x || object.y > this.y + this.height || object.y < this.y) {
      return false;
    }

    return true;
  }
}
