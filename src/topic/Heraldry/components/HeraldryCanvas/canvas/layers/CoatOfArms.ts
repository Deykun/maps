import { SettingsParams } from '../../types';
import { spriteSize, spriteOffset } from '@/topic/Heraldry/constants'
import { MapOffset } from '@/topic/Heraldry/types';

const minLonX = -177.5;
const maxLonX = 180;

//   function getCanvasY(latX: number, rawMapHeight: number, settings: SettingsParams) {
//     const mapHeight = rawMapHeight * (settings.mapHeightStreech ?? 1);
//     const topPadding = settings.latTop / 100 * mapHeight;
//     // Earth's radius in meters (mean radius)
//     const R = 6378137;

//     // Convert latitude from degrees to radians
//     const latRadians = (latX + settings.latShift) * (Math.PI / 180);

//     // Mercator projection formula to find y coordinate
//     const y = R * Math.log(Math.tan((Math.PI / 4) + (latRadians / 2)));

//     // Scale the y value to fit within the map's height
//     // Normalize y to be within the range of the map's height
//     const mapY = topPadding + (mapHeight / 2) - (y / (2 * Math.PI * R) * mapHeight);

//     return mapY;
// }

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
  imageSprint: {
    url: string,
    index: number
  };
  image: HTMLImageElement;
  imageIsLoaded: boolean;

  constructor ({
    canvas,
    ctx,
    lonX,
    latY,
    title,
    imageUrl,
    imageSprint,
    settings,
    coatSize,
    mapOffset,
  }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    lonX: number,
    latY: number,
    title: string,
    imageUrl: string,
    imageSprint: {
      url: string,
      index: number
    },
    settings: SettingsParams,
    coatSize: number,
    mapOffset: MapOffset,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.title = title;
    this.imageUrl = imageUrl;
    this.imageSprint = imageSprint;

    const image = new Image();
    image.src = this.imageSprint.url;
    this.image = image;
    this.imageIsLoaded = false;
    this.image.onload = () => {
      this.imageIsLoaded = true;
      this.draw();
    }

    this.width = coatSize;
    this.height = coatSize;

    this.lonX = lonX;
    this.latY = latY;

    this.x = 0;
    this.y = 0;

    this.onResize(settings, mapOffset);
  }

  onResize(settings: SettingsParams, mapOffset: MapOffset) {
    const {
      minLatTop,
      maxLatTop,
      minLonLeft,
      maxLonLeft,

      // minLatTop: 49,
      // maxLatTop: 54.95,
      // minLonLeft: 13.98,
      // maxLonLeft: 24.25,
    } = mapOffset;

    const widthLon = Math.abs(minLonLeft - maxLonLeft);
    const heightLat = Math.abs(minLatTop - maxLatTop);

    const percentageX = (this.lonX - minLonLeft) / widthLon;
    const percentageY = (maxLatTop - this.latY) / heightLat;

    // const mapWidth = Math.abs(maxRight - maxLeft);
    // const mapHeight = Math.abs(maxTop - maxBottom);

    // const percentageX =  (this.lonX - maxLeft) / mapWidth;
    // const percentageY = (this.latY - maxTop) / mapHeight;

    this.x = this.canvas.width * percentageX;
    this.y = this.canvas.height * percentageY;

    console.log({
      percentageX,
      percentageY,
      widthLon,
      heightLat,
      w: this.canvas.width,
      h: this.canvas.height,
      lonX: this.lonX,
      latY: this.latY,
      x: this.x,
      y: this.y,
    })


  }

  setSize(size: number) {
    this.width = size;
    this.height = size;
  }

  draw() {
    if (!this.imageIsLoaded) {
      return;
    }

    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    this.ctx.shadowBlur = 7;
    this.ctx.shadowOffsetY = 5;

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    this.ctx.shadowBlur = 7;
    this.ctx.shadowOffsetY = 5;

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    this.ctx.shadowBlur = 7;
    this.ctx.shadowOffsetY = 5;

    const frameY = spriteSize * this.imageSprint.index + spriteOffset * this.imageSprint.index;

    this.ctx.drawImage(
      this.image,
      0, // frameX
      frameY,
      spriteSize, // frameWidth
      spriteSize, // frameHeight
      this.x - (this.width / 2),
      this.y - (this.width / 2),
      this.width,
      this.height,
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

    // TODO: add a check for elements to detect transparency

    return true;
  }
}
