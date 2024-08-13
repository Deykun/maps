import { memo } from 'react';
import { AdministrativeUnit } from '../types';

type Props = AdministrativeUnit & {
  style: {
    top: string,
    left: string,
  },
  setListPhrase: (title: string) => void,
}

const HeraldryMapItem = ({ title, shortTitle, imageUrl, imageSrcSet, setListPhrase, style }: Props) => {
    return (
      <button
        className="coat absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group"
        style={style}
        onClick={() => setListPhrase(title)}
        role="button"
        data-title={shortTitle || title}
      >
        <img
          src={imageUrl}
          srcSet={imageSrcSet}
          className="object-contain"
          alt="⛊"
        />
    </button>
    );
};

export default memo(HeraldryMapItem);
