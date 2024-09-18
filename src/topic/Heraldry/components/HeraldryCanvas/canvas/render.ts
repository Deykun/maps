import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { AdministrativeUnit, MapOffset } from '@/topic/Heraldry/types';

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

// const fps = 0.5;

// const startAnimation = () => {
//   setTimeout(() => {
//     // window.requestAnimationFrame(renderFrame);
//     renderFrame();
//   }, 1000 / fps);
// }

type FrameStampData = {
  coatSize: number;
  coatOfArmsIds: string[];
  mapOffset: string;
  canvasWidth: number;
};

const getFirstFrameChangeDetected = (a: FrameStampData, b: FrameStampData) => {
  if (a.canvasWidth !== b.canvasWidth) {
    return 'canvasWidth';
  }

  if (a.coatSize !== b.coatSize) {
    return 'coatSize';
  }

  if (a.coatOfArmsIds.length !== b.coatOfArmsIds.length) {
    return 'coatOfArmsIds.length';
  }

  if (a.coatOfArmsIds.length > 0 && a.coatOfArmsIds.some((aId) => !b.coatOfArmsIds.includes(aId))) {
    return 'coatOfArmsIds';
  }

  if (a.mapOffset !== b.mapOffset) {
    return 'mapOffset';
  }

  return '';
}

const getFrameStampData = (): FrameStampData => {
  return {
    coatSize,
    coatOfArmsIds: coatOfArmsList.map(({ id }) => id),
    mapOffset: JSON.stringify(mapOffset),
    canvasWidth: canvas?.width || 0,
  }
};

let lastFrameStampData = getFrameStampData();

const renderFrame = () => {
  const frameStampData = getFrameStampData();
  const frameChange = getFirstFrameChangeDetected(lastFrameStampData, frameStampData);

  if (canvas.width === 0) {
    return;
  }

  if (!frameChange) {
    return;
  } else {
    console.log(`  - New frame (${frameChange} did change)`);
  }

  lastFrameStampData = frameStampData;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coatOfArmsList.forEach((item) => {
    // TODO: Add logic to drop 1. make it async and unlock the thread 2. drop the loop when next frame was requested
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

const setCanvasAttributes = (canvas: HTMLCanvasElement) => {
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

export const onResize = (mapOffset: MapOffset) => {
  // Size is optional, but we do it once here for all CoA
  const size = canvas.getClientRects()[0];

  coatOfArmsList.forEach((item) => {
    item.onResize(mapOffset, size);
  });

  if (canvas) {
    setCanvasAttributes(canvas);
  }
  
  renderFrame();
}

export const render = ({ canvas: initCanvas, ctx: gameCtx, mapOffset: initMapOffset, coatSize: initCoatSize }: {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mapOffset: MapOffset,
  coatSize: number,
}) => {
  if (wasInited) {
    return;
  }

  console.log('✨ Canvas initialized ✨');

  wasInited = true;
  canvas = initCanvas;

  if (canvas) {
    setCanvasAttributes(canvas);
  }

  mapOffset = initMapOffset;
  coatSize = initCoatSize;
  ctx = gameCtx;
  ctx.imageSmoothingQuality = "high";

  renderFrame();
  initEventListeners();
};

export const setCoatOfArms = (units: AdministrativeUnit[]) => {
  coatOfArmsList = [];
  
  coatOfArmsList = units.filter((unit) => (unit?.imagesList || []).length > 0).map((unit) => {
    const lonX = unit?.place?.coordinates?.lon ?? 0;
    const latY = unit?.place?.coordinates?.lat ?? 0;

    const image = (unit.imagesList || []).find(({ width }) => width === '80w' );

    return new CoatOfArms({
      canvas,
      ctx,
      lonX,
      latY,
      id: unit.id,
      imageUrl: image?.path || '', // aserted in filter
      imageSprint: getSpriteDataFromUnit(unit),
      coatSize,
      mapOffset,
    });
  }).filter(Boolean);

  renderFrame();
  // startAnimation();
};

export const getCoatOfArmsForXandY = ({ x, y }: { x: number, y: number }) => {
  const selectedIds = coatOfArmsList.filter((coatOfArms)=> {
    return coatOfArms.isRenderedAt({ x, y });
  }).map(({ id }) => id);

  return selectedIds;
}

export const setCoatSize = (newCoatSize: number) => {
  if (newCoatSize === coatSize) {
    return;
  }

  coatSize = newCoatSize;

  coatOfArmsList.forEach((item) => {
    item.setSize(coatSize);
  });

  renderFrame();
}
