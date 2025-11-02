import { MapOffset } from '@/topic/Heraldry/types';
import { mapPadding } from '@/topic/Heraldry/constants'

type Coordinates = {
  lonX: number,
  latY: number,
}

export const getXYfromLatLon = ({ 
  coordinates,
  mapOffset,
  pixelRatio = window.devicePixelRatio,
  canvas,
}: {
  coordinates: Coordinates,
  mapOffset: MapOffset,
  pixelRatio: number,
  canvas: HTMLCanvasElement | { width: number, height: number },
}) => {
  const widthLon = Math.abs(mapOffset.minLonLeft - mapOffset.maxLonLeft);
  const heightLat = Math.abs(mapOffset.minLatTop - mapOffset.maxLatTop);

  const percentageXRaw = (coordinates.lonX - mapOffset.minLonLeft) / widthLon;
  const percentageYRaw = (mapOffset.maxLatTop - coordinates.latY) / heightLat;

  let percentageX = percentageXRaw;
  let percentageY = percentageYRaw;

  if (mapOffset.yModifier) {
    percentageY = mapOffset.yModifier(percentageY, { percentageX: percentageXRaw })
  }

  if (mapOffset.xModifier) {
    percentageX = mapOffset.xModifier(percentageX, { percentageY: percentageYRaw })
  }

  const scaledMapPadding = mapPadding * pixelRatio;

  if (canvas instanceof HTMLCanvasElement) {
      const size = canvas.getClientRects()[0];

      if (!size) {
        return { x: 0, y: 0 };
      }

      return {
        x: ((size.width * pixelRatio) - (2 * scaledMapPadding)) * percentageX + scaledMapPadding,
        y: ((size.height * pixelRatio) - (2 * scaledMapPadding)) * percentageY + scaledMapPadding,
      }
  }

  return {
    x: ((canvas.width * pixelRatio) - (2 * scaledMapPadding)) * percentageX + scaledMapPadding,
    y: ((canvas.height * pixelRatio) - (2 * scaledMapPadding)) * percentageY + scaledMapPadding,
  }
};
