import ImageEurope from '../assets/europe.svg';



export class Map {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  zoomLevel: number;

  constructor ({ canvas, ctx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.zoomLevel = 1;
  }

  draw({ screenOffsetX = 0, screenOffsetY = 0 }: { screenOffsetX?: number, screenOffsetY?: number } = {}) {
    const image = new Image();
    image.src = ImageEurope;

    // console.log({
    //   a: this.canvas.width, b: this.canvas.height
    // })

    // height="520" width="680" 
    const imageWidth = this.canvas.width;
    const imageHeight = imageWidth / (680 / 520);

    const x = screenOffsetX;
    const y = screenOffsetY;

    console.log({
      screenOffsetX,
      screenOffsetY,
    })

    // console.log([
    //   image,
    //   -screenOffsetX, 
    //   -screenOffsetY,
    //   imageWidth,
    //   imageHeight,
    //   x,
    //   y,
    //   imageWidth * this.zoomLevel,
    //   imageHeight * this.zoomLevel,
    // ])

    this.ctx.drawImage(
      image,
      0,
      0,
      imageWidth,
      imageHeight,
      x,
      y,
      imageWidth * this.zoomLevel,
      imageHeight * this.zoomLevel,
    );
  }

  setZoom(zoomLevel: number) {
    this.zoomLevel = zoomLevel;
  }
}