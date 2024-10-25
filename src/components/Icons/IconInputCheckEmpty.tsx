type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M5 2C3.346 2 2 3.346 2 5v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3H5zm19 3v14c0 2.761-2.238 5-5 5H5c-2.762 0-5-2.239-5-5V5c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/>
  </svg>
);

export default Icon;
