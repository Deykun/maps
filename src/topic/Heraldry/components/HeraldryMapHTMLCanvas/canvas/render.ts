import { getSpriteDataFromUnit } from '@/topic/Heraldry/utils/getSpriteDataFromUnit';
import { CoatOfArmsMapData, MapOffset, ScrollPosition } from '@/topic/Heraldry/types';

import { updateProcessingMap, updateTotalsForImages, updateValueForImages } from '@/topic/Heraldry/stores/progressStore';

import { CoatOfArms } from './layers/CoatOfArms';

let canvasIndex = 0;
let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let currentFrameHash = '';
let coatOfArmsList: CoatOfArms[] = [];
let scrollPosition = undefined as unknown as ScrollPosition;
let coatSize = 40;
let mapOffset: MapOffset = {
  minLatTop: 90,
  maxLatTop: -90,
  minLonLeft: -180,
  maxLonLeft: 180,
};
const cachedSprites: {
  [key: string]: {
    image: HTMLImageElement,
  },
} = {};

type FrameStampData = {
  coatSize: number;
  coatOfArmsIds: string[];
  mapOffset: string;
  canvasIndex: number,
  canvasWidth: number;
  windowWidth: number,
  shouldSkipChangeCheck: boolean,
  fetchedSprites: number,
};

const getFirstFrameChangeDetected = (a: FrameStampData, b: FrameStampData) => {
  if (a.canvasWidth !== b.canvasWidth) {
    return 'canvasWidth';
  }

  if (a.coatSize !== b.coatSize) {
    return 'coatSize';
  }

  if (a.fetchedSprites !== b.fetchedSprites) {
    return 'fetchedSprites'
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

  if (a.windowWidth !== b.windowWidth) {
    return 'windowResized';
  }

  if (a.canvasIndex !== b.canvasIndex) {
    return 'canvasIndex';
  }

  if (a.shouldSkipChangeCheck !== b.shouldSkipChangeCheck) {
    return 'shouldSkipChangeCheck';
  }

  return '';
}

type GetFrameStampDataParams = {
  shouldSkipChangeCheck: boolean,
}

const getShouldPrioritizeVisibleUnits = () => {
  if (!scrollPosition) {
    return false;
  }

  // It isn't worth prioritizing if the ammount is small
  if (coatOfArmsList.length < 3000) {
    return false
  }

  const canvasWidth = canvas?.width || 0;
  const windowWidth = window?.innerWidth || 0;

  if (!canvasWidth || !windowWidth) {
    return false;
  }

  return (canvasWidth * window.devicePixelRatio / windowWidth) > 1.7;
};

const getFrameStampData = ({
  shouldSkipChangeCheck,
}: GetFrameStampDataParams): FrameStampData => {
  const fetchedSprites = Object.values(cachedSprites).filter(({ image }) => image.complete).length;
  
  // All those values should affect currentFrameHash =
  return {
    coatSize,
    coatOfArmsIds: coatOfArmsList.map(({ id }) => id),
    mapOffset: JSON.stringify(mapOffset),
    canvasWidth: canvas?.width || 0,
    windowWidth: window.innerWidth || 0,
    canvasIndex,
    shouldSkipChangeCheck,
    fetchedSprites,
  }
};

let lastFrameStampData = getFrameStampData({ shouldSkipChangeCheck: false });

const redrawItems = (redrawFrameHash: string, index: number, total: number) => {
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
    const renderAtOnce = 45;

    for (let i = 0; i <= renderAtOnce; i++) {
      coatOfArmsList[index + i]?.draw();
    } 

    updateProcessingMap({ value: index + renderAtOnce, total });

    setTimeout(() => redrawItems(redrawFrameHash, index + renderAtOnce, total), 0);
    // setTimeout(() => redrawItems(redrawFrameHash, index + renderAtOnce, total), 300);
  } else {
    console.log('Frame was rendered', currentFrameHash);
  }
}

type RenderFrameParams = {
  shouldSkipChangeCheck?: boolean,
}

const renderFrame = ({ shouldSkipChangeCheck = false }: RenderFrameParams = {}) => {
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
    lastFrameStampData.coatOfArmsIds.length,
    new Date().getTime(),
    lastFrameStampData.coatSize,
    lastFrameStampData.canvasWidth,
    lastFrameStampData.windowWidth,
    lastFrameStampData.fetchedSprites,
    lastFrameStampData.shouldSkipChangeCheck ? 'y' : 'n',
    lastFrameStampData.canvasIndex,
    // JSON.stringify(lastFrameStampData.mapOffset),
  ].join('-');


  const shouldPrioritizeVisibleUnits = scrollPosition && getShouldPrioritizeVisibleUnits();

  console.log('shouldPrioritizeVisibleUnits', shouldPrioritizeVisibleUnits);
  if (shouldPrioritizeVisibleUnits) {
    const minMaxData = {
      xMin: scrollPosition.left,
      xMax: scrollPosition.left + scrollPosition.width,
      yMin: scrollPosition.top,
      yMax: scrollPosition.top + scrollPosition.height,
    };

    coatOfArmsList = coatOfArmsList.sort((a, b) => 
      b.isRenderedIn(minMaxData) && !a.isRenderedIn(minMaxData)
      ? 1 : -1
    );
  }

  updateProcessingMap({ value: 0, total: coatOfArmsList.length });
  redrawItems(currentFrameHash, 0, coatOfArmsList.length);
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

export const onScroll = ({
  scrollData,
}: {
  scrollData: ScrollPosition,
}) => {
  scrollPosition = scrollData;
}

export const onResize = () => {
  // Size is optional, but we calc it once here for all CoAs
  const size = canvas.getClientRects()[0];

  coatOfArmsList.forEach((item) => {
    item.onResize({ size });
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
    coatOfArmsList.forEach((unit) => {
      unit.updateCanvas({
        canvas,
        ctx,
      })
    });
    canvasIndex += 1;
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

      cachedSprites[spriteSrc] = {
        image,
      }

      updateTotalsForImages(Object.keys(cachedSprites));
      image.onload = () => {
        // It's chaotic without it, but users see more CoAs being loaded.
        const isStillFetchingOthers = Object.values(cachedSprites).some(
          ({ image }) => !image.complete
        );

        updateValueForImages(spriteSrc);

        if (!isStillFetchingOthers) {
          setTimeout(() => {
            renderFrame({ shouldSkipChangeCheck: true });
          }, 10);
        }
      }

      image.onerror = () => {
        console.error(`Error while fetching sprite ${spriteSrc}`);
  
        renderFrame();
      }
    }

    return new CoatOfArms({
      canvas,
      ctx,
      lonX,
      latY,
      id: unit.id,
      image: cachedSprites[spriteSrc].image,
      imageSprite,
      coatSize,
      mapOffset,
    });
  }).filter(Boolean);

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
