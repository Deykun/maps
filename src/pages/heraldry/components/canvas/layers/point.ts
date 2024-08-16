import ImageEurope from '../assets/europe.svg';
import ImagePoint from '../assets/herb-gminy-opatow-powiat-klobucki-x4.webp';


``
export class Point {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;

  constructor ({ canvas, ctx, lat, lon }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lat: number, lon: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = lat;
    this.y = lon;
  }

  draw({ screenOffsetX = 0, screenOffsetY = 0 }: { screenOffsetX?: number, screenOffsetY?: number } = {}) {
    const image = new Image();
    image.src = ImagePoint;

    // console.log({
    //   a: this.canvas.width, b: this.canvas.height
    // })

    // height="520" width="680" 
    // const imageWidth = this.canvas.width;
    // const imageHeight = imageWidth / (680 / 520);
    const imageWidth = 200;
    const imageHeight = 200;

    const x = screenOffsetX;
    const y = screenOffsetY;

    // console.log({
    //   screenOffsetX,
    //   screenOffsetY,
    // })

    // console.log([
    //   image,
    //   -screenOffsetX, 
    //   -screenOffsetY,
    //   imageWidth,
    //   imageHeight,
    //   x,
    //   y,
    //   imageWidth * this.scaleLevel,
    //   imageHeight * this.scaleLevel,
    // ])

    this.ctx.drawImage(
      image,
      this.x,
      this.y,
      imageWidth,
      imageHeight,
      // x,
      // y,
      // imageWidth * this.scaleLevel,
      // imageHeight * this.scaleLevel,
    );
  }

  setScale(scaleLevel: number) {
    // this.scaleLevel = scaleLevel;
  }
}