import { CoatOfArms } from './layers/CoatOfArms';

import { roundWithPrecision } from './utils/math';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let coatOfArmsList: CoatOfArms[] = [];

const aspectRation = {
  x: 1,
  y: 1,
}

const fps = 40;
const renderFrame = () => {
  setTimeout(() => {

    window.requestAnimationFrame(renderFrame);
  }, 1000 / fps);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coatOfArmsList.forEach((item) => {
    item.draw();
  });
}

const initEventListeners = () => {
  canvas.addEventListener('click', () => {
    // 
  });
};

let wasInited = false;

export const onResize = (settings) => {
  canvas.width = canvas.width;
  // canvas.height = canvas.width / (680 / 520);
  canvas.height = canvas.width / (aspectRation.x / aspectRation.y );

  coatOfArmsList.forEach((item) => {
    item.onResize(settings);
  });
}

export const setRates = (rates) => {
  coatOfArmsList.forEach((item) => {
    item.setRates(rates);
  });
}

export const render = ({ canvas: gameCanvas, ctx: gameCtx, aspectX = 1, aspectY = 1 }: {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  aspectX?: number,
  aspectY?: number,
}) => {
  if (wasInited) {
    return;
  }

  wasInited = true;
  console.log('ININIT');
  canvas = gameCanvas;
  // onResize();
  ctx = gameCtx;
  aspectRation.x = aspectX;
  aspectRation.y = aspectY;

  // map = new Map({ canvas, ctx });
  // const coatOfArms = new CoatOfArms({ canvas, ctx, lonX: 18.808056, latY: 54.611667 });
  // coatOfArmsList.push(coatOfArms);
  // setMap(defaultMap);

  // drawMap();
  renderFrame();
  initEventListeners();
};

// [30, 40, 50, 60, 70, 180]

const line = [...new Array(90)].map((_, index) => index);

export const setCoatOfArms = (units: object[]) => {
  coatOfArmsList = [];

  // coatOfArmsList = [-20].flatMap((lonX) => {
  //   return line.map((latY) => {
  //     const coatOfArms = new CoatOfArms({ canvas, ctx, lonX, latY, title: `${latY}` });
  //     // console.log({ lonX, latY  })

  //     return coatOfArms;
  //   });
  // })
  
  coatOfArmsList = units.map((unit) => {
    // console.log(unit);
    const lonX = unit?.place?.coordinates?.lon ?? 0;
    const latY = unit?.place?.coordinates?.lat ?? 0;

    const coatOfArms = new CoatOfArms({ canvas, ctx, lonX, latY });

    return coatOfArms;
  })

  const coordinates = [
    { city: "Venice", country: "Italy", lat: 45.4408, lon: 12.3155 },
    { city: "Hel", country: "Poland", lat: 54.362930, lon: 18.48468 },
    { city: "Helsinki", country: "Finland", lat: 60.1692, lon: 24.9402 },
    { city: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122 }, // Assumed "Poland" refers to Warsaw
    { city: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
    { city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
    { city: "Barcelona", country: "Spain", lat: 41.7365, lon: 2.1699 },
    { city: "Cyprus", country: "Cyprus", lat: 35.0748, lon: 33.273600 },
    { city: "Tenerife", country: "Spain", lat: 28.291565, lon: -16.629129 },
  ];

  coordinates.forEach(({ lat, lon, city: title }) => {
    coatOfArmsList.push(new CoatOfArms({ canvas, ctx, lonX: lon, latY: lat, title: `${title} ${roundWithPrecision(lon, 1)}x${roundWithPrecision(lat, 1)}` }));
  })

  // const lines = [
  //   { city: "62", lat: 62, lon: 5 },
  //   { city: "52", lat: 52, lon: 5 },
  //   { city: "42", lat: 42, lon: 5 },
  // ];

    // lines.forEach(({ lat, lon, city: title }) => {
    // coatOfArmsList.push(new CoatOfArms({ canvas, ctx, lonX: lon, latY: lat, title: `${title} ${roundWithPrecision(lon, 1)}x${roundWithPrecision(lat, 1)}` }));
  // })


}