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

    this.onResize(mapOffset);
  }

  onResize(mapOffset: MapOffset, canvas?: { width: number, height: number }) {
    const position = getXYfromLatLon({
      cordinates: {
        lonX: this.lonX,
        latY: this.latY,
      },
      mapOffset,
      pixelRatio: window.devicePixelRatio,
      canvas: canvas || this.canvas,
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
    if (!this.image.complete) {
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



    // Is rendered simillary to translate(-50%, -50%);
    const object = {
      x: objectRaw.x + (this.width / 2) + scaledMapPadding,
      y: objectRaw.y + (this.height / 2) + scaledMapPadding,
    };



    if (object.x > this.x + this.width || object.x < this.x || object.y > this.y + this.height || object.y < this.y) {
      return false;
    }

    // TODO: add a check for elements to detect transparency
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
