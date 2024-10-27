
type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M7 16h13v1H7v-1zm13-3H7v1h13v-1zm0-6h-5v1h5V7zm0 3h-5v1h5v-1zM3 2v17.199c0 .771-1 .771-1 0V4H0v15.98C0 21.095.905 22 2.02 22h19.958C23.095 22 24 21.096 24 19.98V2H3zm19 17H5V4h17v15zM13 7H7v4h6V7z"/>
  </svg>
);

export default Icon;
