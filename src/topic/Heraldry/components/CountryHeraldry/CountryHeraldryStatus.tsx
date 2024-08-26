import IconGlobe from '@/components/Icons/IconGlobe';

type Props = {
  text: string,
}

const CountryHeraldryStatus = ({ text }: Props) => {
  return (
    <div id="map-status" className="flex flex-col justify-center items-center h-[100vh] p-4">
        <IconGlobe className="size-[100px]" />
        <p className="mt-5">{text}</p>
    </div>
  );
}

export default CountryHeraldryStatus;
