import { SettingsParams } from '../../types';
import { spriteSize, spriteOffset, mapPadding } from '@/topic/Heraldry/constants'
import { MapOffset } from '@/topic/Heraldry/types';

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
    } = mapOffset;

    const widthLon = Math.abs(minLonLeft - maxLonLeft);
    const heightLat = Math.abs(minLatTop - maxLatTop);

    const percentageX = (this.lonX - minLonLeft) / widthLon;
    const percentageY = (maxLatTop - this.latY) / heightLat;

    const scaledMapPadding = mapPadding * window.devicePixelRatio;

    const canvas = this.canvas.getClientRects()[0];

    this.x = ((canvas.width * window.devicePixelRatio) - (2 * scaledMapPadding)) * percentageX + scaledMapPadding;
    this.y = ((canvas.height * window.devicePixelRatio) - (2 * scaledMapPadding)) * percentageY + scaledMapPadding;
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

    // const scaledMapPadding = mapPadding * window.devicePixelRatio;
    const scaledMapPadding = 0;



    // Is rendered simillary to translate(-50%, -50%);
    const object = {
      x: objectRaw.x + (this.width / 2) + scaledMapPadding,
      y: objectRaw.y + (this.height / 2) + scaledMapPadding,
    };



    if (object.x > this.x + this.width || object.x < this.x || object.y > this.y + this.height || object.y < this.y) {
      return false;
    }

    // console.log({
    //   ob: JSON.stringify(objectRaw),
    //   x: this.x,
    //   y: this.y,
    // });

    // TODO: add a check for elements to detect transparency

    return true;
  }
}
