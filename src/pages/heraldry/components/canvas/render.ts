import { Map } from './layers/map';
import { roundWithPrecision, clamp } from './utils/math';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let map = undefined as unknown as Map;
let zoomLevel = 1;
let screenOffsetX = 0;
let screenOffsetY = 0;
let isMousePressed = false;

const fps = 30;
const renderFrame = () => {
  setTimeout(() => {

    window.requestAnimationFrame(renderFrame);
  }, 1000 / fps);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.draw({ screenOffsetX, screenOffsetY });
  // drawLevel();
  // drawPlayer();
}



const initEventListeners = () => {
  window.addEventListener("resize",function(){
    // TODO: add trottle
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  });

  canvas.addEventListener('wheel', (event) => {
    console.log('event.delta', event.deltaY);
    if (event.deltaY < 0) {
      zoomLevel = roundWithPrecision(zoomLevel * 1.1, 2);
    } else {
      zoomLevel = roundWithPrecision(zoomLevel * 0.9, 2);
    }

    zoomLevel = clamp(2, zoomLevel, 30);

    const x = event.offsetX;
    const y = event.offsetY;
    // screenOffsetX = event.offsetX / 2;
    // screenOffsetY = event.offsetY / 2;

    console.log({
      x,
      y
    })

    const scaledWidth = canvas.width * zoomLevel;
    const scaledHeight = canvas.height * zoomLevel;

    const scaleOffsetX = -(scaledWidth - canvas.width) / 2;
    const scaleOffsetY = -(scaledHeight - canvas.height) / 2;

    const moveX = scaleOffsetX - event.offsetX;
    const moveY = scaleOffsetY - event.offsetY;

    // screenOffsetX = clamp(-canvas.width, screenOffsetX - moveX, canvas.width);
    // screenOffsetY = clamp(-canvas.height, screenOffsetY - moveY, canvas.height);


    // const x = event.offsetX - screenOffsetX;
    // const y = event.offsetY - screenOffsetY;

    // screenOffsetX = scaleOffsetX;
    // screenOffsetY = scaleOffsetY;
    // ctx.scale(zoomLevel, zoomLevel);

    map.setZoom(zoomLevel);
  });

  let mousedownX = 0;
  let mousedownY = 0;

  canvas.addEventListener('mousedown', (event) => {
    isMousePressed = true;
    mousedownX = event.offsetX;
    mousedownY = event.offsetY;
  });

  canvas.addEventListener('mousemove', (event) => {
    if (isMousePressed) {
      const moveX = mousedownX - event.offsetX;
      const moveY = mousedownY - event.offsetY;
      screenOffsetX = clamp(-canvas.width, screenOffsetX - moveX, canvas.width);
      screenOffsetY = clamp(-canvas.height, screenOffsetY - moveY, canvas.height);
      mousedownX = event.offsetX;
      mousedownY = event.offsetY;
    }
  });

  canvas.addEventListener('mouseup', (event) => {
    isMousePressed = false;
    // mousedownX = 0;
    // mousedownY = 0;
    // const moveX = mousedownX - event.offsetX;
    // const moveY = mousedownX - event.offsetX;

    // console.log({
    //   moveX,
    //   moveY,
    // });
    // // const x = event.offsetX;
    // // const y = event.offsetY;
    // // ctx.translate(event.offsetX, event.offsetY);

    // screenOffsetX = event.offsetX;
    // screenOffsetY = event.offsetY;
  })


}

let wasInited = false;

export const render = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  if (wasInited) {
    return;
  }

  wasInited = true;
  console.log('ININIT');
  canvas = gameCanvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx = gameCtx;

  map = new Map({ canvas, ctx });

  // setMap(defaultMap);

  // drawMap();
  renderFrame();
  initEventListeners();
};