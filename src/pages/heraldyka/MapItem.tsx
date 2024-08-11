import './Heraldyka.scss';
import { AdministrativeUnit } from './constants';

const getCompressedImageSrc = (imageUrl: string) => {
  const [imageSrcWithoutFormat] = imageUrl.split('.');

  const compressedImageSrcWithoutFormat = imageSrcWithoutFormat
    .replace('/miasta/', '/web-miasta/')
    .replace('/gminy/', '/web-gminy/');

  const srcset = [
    { name: 'x1', width: '100w' },
    { name: 'x2', width: '200w' },
    { name: 'x3', width: '300w' },
    { name: 'x4', width: '400w' },
  ].map(({ name, width }) => `${compressedImageSrcWithoutFormat}-${name}.webp ${width}`).join(',')

  return {
    srcset,
    src: imageUrl
  }
}

type Props = AdministrativeUnit & {
  style: {
    top: string,
    left: string,
  },
  setListPhrase: (title: string) => void,
}

const MapItem = ({ title, imageUrl, setListPhrase, style }: Props) => {
    const imageClassName = `object-contain`;

    if (!imageUrl) {
      return null;
    }

    return (
      <button
        className="coat absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 group"
        style={style}
        onClick={() => setListPhrase(title)}
      >
        <h3 className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-3 bg-white p-2 rounded-[4px] whitespace-nowrap truncate max-w-[250px] text-[12px] tracking-wider shadow-lg pointer-events-none duration-100 origin-bottom scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100">        
          {title.replace('Herb gminy', 'Herb').replace('Herb miasta', 'Herb').replace(/\((.*)\)/g, '')}
        </h3>
        <img
          {...getCompressedImageSrc(imageUrl)}
          className={imageClassName}
          title={title}
        />
    </button>
    );
};

export default MapItem;
