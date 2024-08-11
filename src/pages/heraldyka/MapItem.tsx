import { memo } from 'react';
import './Heraldyka.scss';
import { AdministrativeUnit } from './constants';

type Props = AdministrativeUnit & {
  style: {
    top: string,
    left: string,
  },
  setListPhrase: (title: string) => void,
}

const MapItem = ({ title, shortTitle, imageUrl, imageSrcSet, setListPhrase, style }: Props) => {
    return (
      <button
        className="coat absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group"
        style={style}
        onClick={() => setListPhrase(title)}
        role="button"
      >
        <h3 className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-3 bg-white p-2 rounded-[4px] whitespace-nowrap truncate max-w-[250px] text-[12px] tracking-wider shadow-lg pointer-events-none duration-100 origin-bottom scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100">        
          {shortTitle || title}
        </h3>
        <img
          src={imageUrl}
          srcSet={imageSrcSet}
          className="object-contain"
          title={title}
        />
    </button>
    );
};

export default memo(MapItem);
