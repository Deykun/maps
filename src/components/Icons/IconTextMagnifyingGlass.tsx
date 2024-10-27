type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M13 8H5V6h8v2zm0 4H5v-2h8v2zm8.172 12-7.387-7.387C12.397 17.487 10.761 18 9 18c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785L24 21.172 21.172 24zM9 16c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/>
  </svg>
);

export default Icon;


