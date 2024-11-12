import IconDe from './Flags/De';
import IconDk from './Flags/Dk';
import IconEn from './Flags/En';
import IconEt from './Flags/Et';
import IconFi from './Flags/Fi';
import IconNo from './Flags/No';
import IconPl from './Flags/Pl';

const iconByCode = {
  de: IconDe,
  da: IconDk,
  dk: IconDk,
  en: IconEn,
  et: IconEt,
  fi: IconFi,
  no: IconNo,
  pl: IconPl,
};

const supportedCodes = Object.keys(iconByCode);

type Props = {
  className?: string,
  code: string,
};

const Icon = ({ className, code }: Props) => {
  const IconForCode = supportedCodes.includes(code) ? iconByCode[code as keyof typeof iconByCode] : null;

  if (!IconForCode) {
    return null;
  }

  return <IconForCode className={className} />
}

export default Icon;
