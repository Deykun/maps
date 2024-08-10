import './Heraldyka.scss';
import { AdministrativeUnit } from './constants';

type Props = AdministrativeUnit & {
  style: {
    top: string,
    left: string,
  },
  setListPhrase: (title: string) => void,
  total: number,
}

const MapItem = ({ title, imageUrl, markers, setListPhrase, total, style }: Props) => {
    const imageClassName = `${total < 25 ? 'size-4 md:size-6 lg:size-8' : (total < 60 ? 'size-3 md:size-5 lg:size-7' : 'size-2 sm:size-3 md:size-4 lg:size-5')} scale-100 group-hover:scale-[800%] ease-in transition delay-0 group-hover:delay-800 duration-100 object-contain`;

    return (
      <button
        className="absolute hover:z-10 group"
        style={style}
        onClick={() => setListPhrase(title)}
      >
        <img src={imageUrl}
          loading="lazy"
          className={imageClassName}
          title={title}
        />
        <div className="fixed bottom-3 right-3 max-w-2/3 text-right bg-white p-3 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100">        
          {(markers?.animals?.length || 0) > 0 && <p className="text-[10px]">Zwierzęta: {markers?.animals?.join(', ')}</p>}
          {(markers?.items?.length || 0) > 0 && <p className="text-[10px]">Cechy: {markers?.items?.join(', ')}</p>}
          <h3>
            {title}
          </h3>
        </div>
    </button>
    );
};

export default MapItem;
