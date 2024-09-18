import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

type Props = {
  units: AdministrativeUnit[],
}

const IconCoatOfArms = ({ units }: Props) => {
  if (units.length !== 1) {
    return <IconShieldCheckers />
  }

  return (
    <img
      src={units[0]?.imagesList?.[0].path}
      srcSet={units[0]?.imageSrcSet}
      alt=""
      loading="lazy"
    />
  );
};

export default IconCoatOfArms;
