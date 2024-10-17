import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { CoatOfArmsMapData, MapOffset } from '@/topic/Heraldry/types';

import { CoatOfArms } from './layers/CoatOfArms';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let currentFrameHash = '';
let coatOfArmsList: CoatOfArms[] = [];
let coatSize = 40;
let mapOffset: MapOffset = {
  minLatTop: 90,
  maxLatTop: -90,
  minLonLeft: -180,
  maxLonLeft: 180,
};
const cachedSprites: {
  [key: string]: HTMLImageElement,
} = {};

type FrameStampData = {
  coatSize: number;
  coatOfArmsIds: string[];
  mapOffset: string;
  canvasWidth: number;
  shouldSkipChangeCheck: boolean,
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

  if (a.shouldSkipChangeCheck !== b.shouldSkipChangeCheck) {
    return 'shouldSkipChangeCheck';
  }

  return '';
}

const getFrameStampData = ({ shouldSkipChangeCheck }: { shouldSkipChangeCheck: boolean}): FrameStampData => {
  return {
    coatSize,
    coatOfArmsIds: coatOfArmsList.map(({ id }) => id),
    mapOffset: JSON.stringify(mapOffset),
    canvasWidth: canvas?.width || 0,
    shouldSkipChangeCheck,
  }
};

let lastFrameStampData = getFrameStampData({ shouldSkipChangeCheck: false });

const redrawItems = (redrawFrameHash: string, index: number) => {
  /*
    Looks like a reasonable solution https://stackoverflow.com/a/37514084/6743808

    It is a recursive function iterating through the current list of coat of arms with setTimeout(),
    freeing up the main thread if necessary.

    If the current frame changes, it stops iterating further.
    Using setTimout forEach or for () here would still iterate through all of the CoA. 
  */
  const shouldDropFrame = currentFrameHash !== redrawFrameHash;
  if (shouldDropFrame) {
    console.log(`  - Old frame (${redrawFrameHash}) rendering was stoped at ${index}`);

    return;
  }

  if (coatOfArmsList[index]) {
    const renderAtOnce = 40;

    for (let i = 0; i <= renderAtOnce; i++) {
      coatOfArmsList[index + i]?.draw();
    } 

    setTimeout(() => redrawItems(redrawFrameHash, index + renderAtOnce), 0);
  }
}

const renderFrame = ({ shouldSkipChangeCheck = false }: { shouldSkipChangeCheck?: boolean } = {}) => {
  const frameStampData = getFrameStampData({ shouldSkipChangeCheck });

  if (!shouldSkipChangeCheck) {
    const frameChange = getFirstFrameChangeDetected(lastFrameStampData, frameStampData);

    if (!frameChange) {
      console.log('  - New frame skipped');
      return;
    } else {
      console.log(`  - New frame (${frameChange} did change)`);
    }
  } else {
    console.log('  - New frame (change skipped)');
  }

  lastFrameStampData = frameStampData;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  currentFrameHash = [
    'frame',
    coatOfArmsList.length,
    new Date().getTime(),
    coatSize,
    canvas.width,
  ].join('-')

  redrawItems(currentFrameHash, 0);
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
  // Size is optional, but we calc it once here for all CoAs
  const size = canvas.getClientRects()[0];

  coatOfArmsList.forEach((item) => {
    item.onResize(mapOffset, size);
  });

  if (canvas) {
    setCanvasAttributes(canvas);
  }
  
  renderFrame();
}

export const render = ({ canvas: initCanvas, ctx: initCtx, mapOffset: initMapOffset, coatSize: initCoatSize }: {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mapOffset: MapOffset,
  coatSize: number,
}) => {
  canvas = initCanvas;
  if (canvas) {
    setCanvasAttributes(canvas);
  }
  ctx = initCtx;
  ctx.imageSmoothingQuality = "high";

  if (wasInited) {
    console.log('✨ Canvas reinitialized ✨');
    renderFrame({ shouldSkipChangeCheck: true });

    return;
  }

  wasInited = true;
  console.log('✨ Canvas initialized ✨');

  mapOffset = initMapOffset;
  coatSize = initCoatSize;

  renderFrame();
  initEventListeners();
};

export const setCoatOfArms = async (units: CoatOfArmsMapData[]) => {
  coatOfArmsList = [];
  let coatOfArmsSpritesUrls: string[] = [];

  const newCoatOfArmsList = units.filter((unit) => (unit?.imagesList || []).length > 0).map((unit) => {
    const lonX = unit?.place?.coordinates?.lon ?? 0;
    const latY = unit?.place?.coordinates?.lat ?? 0;

    const imageSprite = getSpriteDataFromUnit(unit);

    const spriteSrc = imageSprite.url;

    if (!cachedSprites[spriteSrc]) {
      const image = new Image();
      coatOfArmsSpritesUrls.push(spriteSrc)
      image.src = spriteSrc;
      cachedSprites[spriteSrc] = image;
    }

    return new CoatOfArms({
      canvas,
      ctx,
      lonX,
      latY,
      id: unit.id,
      image: cachedSprites[imageSprite.url],
      imageSprite,
      coatSize,
      mapOffset,
    });
  }).filter(Boolean);
  
  await Promise.all(coatOfArmsSpritesUrls.map((src) => {
    if (cachedSprites[src].complete) {
      return Promise.resolve()
    }

    cachedSprites[src].onload = () => {
      return Promise.resolve();
    }

    cachedSprites[src].onerror = () => {
      console.error(`Error while fetching sprite ${src}`);

      return Promise.resolve();
    }
  }));

  coatOfArmsList = newCoatOfArmsList;

  renderFrame();
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
