import { spriteSize, spriteOffset } from '@/topic/Heraldry/constants'
import { MapOffset } from '@/topic/Heraldry/types';
import { getXYfromLatLon } from '@/topic/Heraldry/utils/getPosition';

export class CoatOfArms {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  lonX: number;
  latY: number;
  id: string;
  imageSprite: {
    url: string,
    indexX: number,
    indexY: number,
  };
  image: HTMLImageElement;
  mapOffset: MapOffset;

  constructor ({
    canvas,
    ctx,
    lonX,
    latY,
    id,
    image,
    imageSprite,
    coatSize,
    mapOffset,
  }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    lonX: number,
    latY: number,
    id: string,
    image: HTMLImageElement,
    imageSprite: {
      url: string,
      indexX: number,
      indexY: number,
    },
    coatSize: number,
    mapOffset: MapOffset,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.id = id;
    this.imageSprite = imageSprite;
    this.image = image;
    this.width = coatSize;
    this.height = coatSize;

    this.lonX = lonX;
    this.latY = latY;

    this.x = 0;
    this.y = 0;
    this.mapOffset = mapOffset;

    this.onResize();
  }

  onResize(params?: { size?: { width: number, height: number }}) {
    const position = getXYfromLatLon({
      cordinates: {
        lonX: this.lonX,
        latY: this.latY,
      },
      mapOffset: this.mapOffset,
      pixelRatio: window.devicePixelRatio,
      canvas: params?.size || this.canvas,
    });

    this.x = position.x;
    this.y = position.y;
  }

  setSize(size: number) {
    this.width = size;
    this.height = size;
  }

  updateCanvas({
    canvas,
    ctx,
  }: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.draw();
  }

  draw() {
    if (!this.image.complete || this.width === 0) {
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 3;
      this.ctx.shadowBlur = 3;
      this.ctx.shadowColor = 'rgba(47, 121, 121, 0.1)';

      this.ctx.fillStyle = '#a62727';
      this.ctx.fillRect(
        this.x - 1,
        this.y - 1,
        3, // width
        3, // height
      );

      return;
    }

    const frameX = spriteSize * this.imageSprite.indexX + spriteOffset * this.imageSprite.indexX;
    const frameY = spriteSize * this.imageSprite.indexY + spriteOffset * this.imageSprite.indexY;
   
    // Bottom border
    // this.ctx.filter = 'grayscale(1) brightness(0.5) opacity(0.5)';

    // this.ctx.drawImage(
    //   this.image,
    //   0, // frameX
    //   frameY,
    //   spriteSize, // frameWidth
    //   spriteSize, // frameHeight
    //   this.x - (this.width / 2),
    //   this.y - (this.width / 2) + 2,
    //   this.width,
    //   this.height,
    // );

    // this.ctx.drawImage(
    //   this.image,
    //   0, // frameX
    //   frameY,
    //   spriteSize, // frameWidth
    //   spriteSize, // frameHeight
    //   this.x - (this.width / 2),
    //   this.y - (this.width / 2) + 1,
    //   this.width,
    //   this.height,
    // );

    // this.ctx.filter = 'grayscale(0) brightness(1)';
    
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 4;
    this.ctx.shadowColor = 'rgba(104, 67, 67, 0.16)';

    this.ctx.drawImage(
      this.image,
      frameX,
      frameY,
      spriteSize, // frameWidth
      spriteSize, // frameHeight
      this.x - (this.width / 2),
      this.y - (this.width / 2),
      this.width,
      this.height,
    );

    if (this.id) {
      // this.ctx.textBaseline = "top";
      // this.ctx.fillStyle = 'black';
      // this.ctx.font = `16px Arial`;
      // this.ctx.fillText(this.id, this.x + 20, this.y);
    }
  }

  isRenderedAt(objectRaw?: { x: number, y: number }) {
    if (!objectRaw) {
      return false;
    }

    // const scaledMapPadding = mapPadding * window.devicePixelRatio;
    const scaledMapPadding = 0;

    const clicableWidth = Math.max(6, this.width);
    const clicableHeight = Math.max(6, this.height);

    // Is rendered simillary to translate(-50%, -50%);
    const object = {
      x: objectRaw.x + (clicableWidth/ 2) + scaledMapPadding,
      y: objectRaw.y + (clicableHeight / 2) + scaledMapPadding,
    };

    if (object.x > this.x + clicableWidth || object.x < this.x || object.y > this.y + clicableHeight || object.y < this.y) {
      return false;
    }

    // TODO: add a check for elements to detect transparency
    // comment: I could pull it off, but having quicker hover counter is better that having super precise one
    // const xInImage = object.x - this.x;
    // const yInImage = object.y - this.y;

    // const canvas = document.createElement("canvas");

    // try {
    //   document.body.appendChild(canvas);
    //   canvas.width = this.width * this.zoomLevel;
    //   canvas.height = this.height * this.zoomLevel;
    //   const context = canvas.getContext("2d");

    //   if (context) {
    //     context.drawImage(this.image, 0, 0, this.width, this.height);
    //     canvas.remove();
    
    //     return context.getImageData(xInImage, yInImage, 1, 1).data[3] > 0
    //   }
    // } catch {
    // }
    
    // canvas.remove();

    return true;
  }
}
