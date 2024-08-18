import { SettingsParams } from '../../types';
import { spriteSize, spriteOffset } from '@/topic/Heraldry/constants'

const minLonX = -177.5;
const maxLonX = 180;

  function getCanvasY(latX: number, rawMapHeight: number, settings: SettingsParams) {
    const mapHeight = rawMapHeight * (settings.mapHeightStreech ?? 1);
    const topPadding = settings.latTop / 100 * mapHeight;
    // Earth's radius in meters (mean radius)
    const R = 6378137;

    // Convert latitude from degrees to radians
    const latRadians = (latX + settings.latShift) * (Math.PI / 180);

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
  imageSprint: {
    url: string,
    index: number
  };
  settings: SettingsParams;
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

    this.settings = settings;

    this.onResize(settings);
  }

  onResize(settings: SettingsParams) {
    this.settings = settings;

    this.x = (this.lonX - minLonX) / mapWidth * this.canvas.width;
    // 1.16 because Equator is not at for current map :D
    this.y = getCanvasY(this.latY, this.canvas.height * 1.16, settings);
  }

  setSize(size: number) {
    this.width = size;
    this.height = size;
  }

  draw() {
    if (!this.imageIsLoaded) {
      return;
    }

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
