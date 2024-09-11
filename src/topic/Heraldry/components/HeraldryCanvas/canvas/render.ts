import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';

import { getPostionForPlace } from '@/topic/Heraldry/utils/getPostionForPlace';

import { CoatOfArms } from './layers/CoatOfArms';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let coatOfArmsList: CoatOfArms[] = [];
let coatSize = 40;
let mapOffset: MapOffset = {
  minLatTop: 90,
  maxLatTop: -90,
  minLonLeft: -180,
  maxLonLeft: 180,
}

const aspectRation = {
  x: 1,
  y: 1,
}

const fps = 0.5;

const startAnimation = () => {
  setTimeout(() => {
    // window.requestAnimationFrame(renderFrame);
    renderFrame();
  }, 1000 / fps);
}

const renderFrame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coatOfArmsList.forEach((item) => {
    // TODO: Add logic to drop setTzmeout when a new frame is requested.
    // setTimeout(() => {
      item.draw();
    // }, 0);
  });
}

const initEventListeners = () => {
  canvas.addEventListener('click', () => {
    // 
  });
};

let wasInited = false;

export const onResize = (mapOffset: MapOffset) => {
  canvas.width = canvas.width;
  canvas.height = canvas.width / (aspectRation.x / aspectRation.y);

  // Size is optional, but we do it once here for all CoA
  const size = canvas.getClientRects()[0];

  coatOfArmsList.forEach((item) => {
    item.onResize(mapOffset, size);
  });

  if (canvas) {
    // Image quality: https://forum.babylonjs.com/t/lossing-quality-of-image-when-scaling-drawimage-dynamic-texture/11826/2
    const dpi = window.devicePixelRatio;
    const styles = window.getComputedStyle(canvas);
    const style = {
      height() {
        return +styles.height.slice(0, -2);
      },
      width() {
        return +styles.width.slice(0, -2);
      }
    };
    canvas.setAttribute('width', (style.width() * dpi).toString());
    canvas.setAttribute('height', (style.height() * dpi).toString());
  }


  
  renderFrame();
}

export const render = ({ canvas: initCanvas, ctx: gameCtx, mapOffset: initMapOffset, coatSize: initCoatSize, aspectX = 1, aspectY = 1 }: {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mapOffset: MapOffset,
  coatSize: number,
  aspectX?: number,
  aspectY?: number,
}) => {
  if (wasInited) {
    return;
  }

  console.log('✨ Canvas initialized ✨');

  wasInited = true;
  canvas = initCanvas;
  mapOffset = initMapOffset;
  coatSize = initCoatSize;
  ctx = gameCtx;
  ctx.imageSmoothingQuality = "high";
  aspectRation.x = aspectX;
  aspectRation.y = aspectY;

  renderFrame();
  initEventListeners();
};

export const setCoatOfArms = (units: AdministrativeUnit[]) => {
  coatOfArmsList = [];
  
  coatOfArmsList = units.filter((unit) => (unit?.imagesList || []).length > 0).map((unit) => {
    const lonX = unit?.place?.coordinates?.lon ?? 0;
    const latY = unit?.place?.coordinates?.lat ?? 0;

    const image = (unit.imagesList || []).find(({ width }) => width === '80w' );

    const coatOfArms = new CoatOfArms({
      canvas,
      ctx,
      lonX,
      latY,
      title: unit.title,
      imageUrl: image?.path || '', // aserted in filter
      imageSprint: getSpriteDataFromUnit(unit),
      coatSize,
      mapOffset,
    });

    return coatOfArms;
  }).filter(Boolean);

  // Uncomment if you want to test the map latitude/longitude

  // const coordinates = [
  //   { city: "Venice", country: "Italy", lat: 45.4408, lon: 12.3155 },
  //   { city: "Hel", country: "Poland", lat: 54.362930, lon: 18.48468 },
  //   { city: "Helsinki", country: "Finland", lat: 60.1692, lon: 24.9402 },
  //   { city: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122 }, // Assumed "Poland" refers to Warsaw
  //   { city: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
  //   { city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
  //   { city: "Barcelona", country: "Spain", lat: 41.7365, lon: 2.1699 },
  //   { city: "Cyprus", country: "Cyprus", lat: 35.0748, lon: 33.273600 },
  //   { city: "Tenerife", country: "Spain", lat: 28.291565, lon: -16.629129 },
  // ];

  // coordinates.forEach(({ lat, lon, city: title }) => {
  //   coatOfArmsList.push(new CoatOfArms({ canvas, ctx, lonX: lon, latY: lat, title: `${title} ${lon.toFixed(1)}x${lat.toFixed(1)}` }));
  // });

  renderFrame();
  startAnimation();
};

export const getCoatOfArmsForXandY = ({ x, y }: { x: number, y: number }) => {
  const selectedTitles = coatOfArmsList.filter((coatOfArms)=> {
    return coatOfArms.isRenderedAt({ x, y });
  }).map(({ title }) => title);

  return selectedTitles;
}

export const setCoatSize = (newCoatSize: number) => {
  coatSize = newCoatSize;

  coatOfArmsList.forEach((item) => {
    item.setSize(coatSize);
  });

  renderFrame();
}
