import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import { getImageSrcSet } from '@/utils/image';
import { CoatOfArmsMapData } from '@/topic/Heraldry/types';

type Props = {
  units: CoatOfArmsMapData[],
}

const IconCoatOfArms = ({ units }: Props) => {
  if (units.length !== 1) {
    return <IconShieldCheckers />
  }

  return (
    <img
      src={units[0]?.imagesList?.[0].path}
      srcSet={getImageSrcSet(units[0]?.imagesList)}
      alt=""
      loading="lazy"
    />
  );
};

export default IconCoatOfArms;
