import IconShieldCheckers from '@/components/Icons/IconShieldCheckers';

import { AdministrativeUnit } from '@/topic/Heraldry/types';

type Props = {
  units: AdministrativeUnit[],
}

const IconCoatOfArms = ({ units }: Props) => {

  if (units.length === 2) {
    return (
      <span className="relative size-5">
        {units.map((unit) => (
          <img
            src={unit.imagesList?.[0].path}
            srcSet={unit.imageSrcSet}
            alt=""
            loading="lazy"
          />
        ))}
      </span>
    );
  }

  return (
    <>
      {units.length === 1 ? 
        <img
          src={units[0]?.imagesList?.[0].path}
          srcSet={units[0]?.imageSrcSet}
          alt=""
          loading="lazy"
        />
      : 
        <IconShieldCheckers />
      }
    </>
  );
};

export default IconCoatOfArms;
