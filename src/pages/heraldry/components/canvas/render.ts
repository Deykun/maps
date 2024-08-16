import { Map } from './layers/map';
import { Point } from './layers/point';

import { roundWithPrecision, clamp } from './utils/math';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let map = undefined as unknown as Map;
let point = undefined as unknown as Point;
let scaleLevel = 1;
let screenOffsetX = 0;
let screenOffsetY = 0;
let isMousePressed = false;

const fps = 40;
const renderFrame = () => {
  setTimeout(() => {

    window.requestAnimationFrame(renderFrame);
  }, 1000 / fps);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // map.draw({ screenOffsetX, screenOffsetY });
  point.draw();
  // drawLevel();
  // drawPlayer();
}



const initEventListeners = () => {
  // window.addEventListener("resize",function(){
  //   // TODO: add trottle
  //   canvas.width = canvas.clientWidth;
  //   canvas.height = canvas.clientHeight;
  // });

  // canvas.addEventListener('wheel', (event) => {
  //   const zoomFactor = 0.15;
  //   if (event.deltaY > 0) {
  //     scaleLevel = roundWithPrecision(scaleLevel - zoomFactor, 2);
  //   } else {
  //     scaleLevel = roundWithPrecision(scaleLevel + zoomFactor, 2);
  //   }

  //   // const pointer = {
  //   //   x:  event.offsetX,
  //   //   y:  event.offsetY,
  //   // }

  //   // const mousePointTo = {
  //   //   x: (pointer.x - screenOffsetX) / oldScale,
  //   //   y: (pointer.y - screenOffsetY) / oldScale,
  //   // };

  //   // var newPos = {
  //   //   x: pointer.x - mousePointTo.x * scaleLevel / oldScale,
  //   //   y: pointer.y - mousePointTo.y * oldScale /scaleLevel,
  //   // };

  //   // screenOffsetX += newPos.x;
  //   // screenOffsetY += newPos.y;

  //   // console.log(newPos)

  //   scaleLevel = clamp(0.01, scaleLevel, 30);

  //   screenOffsetX = event.offsetX - (event.offsetX - screenOffsetX) * (scaleLevel / (scaleLevel * (event.deltaY > 0 ? zoomFactor + 1 : 1 / (zoomFactor + 1))));
  //   screenOffsetY = event.offsetY - (event.offsetY - screenOffsetY) * (scaleLevel / (scaleLevel * (event.deltaY > 0 ? zoomFactor + 1 : 1 / (zoomFactor + 1))));


  //   // const scaleDelta = scaleLevel - oldScale;
  //   // console.log(scaleDelta);

  //   // screenOffsetX = screenOffsetX + scaleDelta;


  //   map.setScale(scaleLevel);
  // });

  // let mousedownX = 0;
  // let mousedownY = 0;

  // canvas.addEventListener('mousedown', (event) => {
  //   isMousePressed = true;
  //   mousedownX = event.offsetX;
  //   mousedownY = event.offsetY;
  // });

  // canvas.addEventListener('mousemove', (event) => {
  //   if (isMousePressed) {
  //     const moveX = mousedownX - event.offsetX;
  //     const moveY = mousedownY - event.offsetY;
  //     screenOffsetX = screenOffsetX - moveX;
  //     screenOffsetY = screenOffsetY - moveY;
  //     // screenOffsetX = clamp(-canvas.width * scaleLevel, screenOffsetX - moveX, canvas.width * scaleLevel);
  //     // screenOffsetY = clamp(-canvas.height * scaleLevel, screenOffsetY - moveY, canvas.height * scaleLevel);

  //     screenOffsetX = clamp(-canvas.width, screenOffsetX - moveX, canvas.width);
  //     screenOffsetY = clamp(-canvas.height, screenOffsetY - moveY, canvas.height);
  //     mousedownX = event.offsetX;
  //     mousedownY = event.offsetY;
  //   }
  // });

  // canvas.addEventListener('mouseup', (event) => {
  //   isMousePressed = false;
  //   // mousedownX = 0;
  //   // mousedownY = 0;
  //   // const moveX = mousedownX - event.offsetX;
  //   // const moveY = mousedownX - event.offsetX;

  //   // console.log({
  //   //   moveX,
  //   //   moveY,
  //   // });
  //   // // const x = event.offsetX;
  //   // // const y = event.offsetY;
  //   // // ctx.translate(event.offsetX, event.offsetY);

  //   // screenOffsetX = event.offsetX;
  //   // screenOffsetY = event.offsetY;
  // })

  // canvas.addEventListener('click', (event) => {
  //   // isMousePressed = false;
  //   const x = event.offsetX;
  //   const y = event.offsetY;

  //   const centerX = canvas.width / 2;
  //   const centerY = canvas.height / 2;

  //   const distanceToCenterX = centerX - x;
  //   const distanceToCenterY = centerY - y;

  //   console.log({
  //     distanceToCenterX,
  //     distanceToCenterY,
  //   })
  // })

}

let wasInited = false;

export const onResize = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.width / (680 / 520);;
}

export const render = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  if (wasInited) {
    return;
  }

  wasInited = true;
  console.log('ININIT');
  canvas = gameCanvas;
  onResize();
  ctx = gameCtx;

  // map = new Map({ canvas, ctx });
  point = new Point({ canvas, ctx, lat: 10, lon: 20 });

  // setMap(defaultMap);

  // drawMap();
  renderFrame();
  initEventListeners();
};

const scaleIn = () => {
  scaleLevel + scaleLevel + 1;

  
}