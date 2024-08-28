type Props = {
  className?: string,
  style?: React.CSSProperties,
};

const Icon = ({ className, style }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={style}>
    <path d="M11 24v-2H7v2h4zm8-22h3v3h2V0h-5v2zM0 17h2v-4H0v4zm0-6h2V7H0v4zm2-6V2h3V0H0v5h2zm22 2h-2v4h2V7zm0 6h-2v4h2v-4zm-2 6v3h-3v2h5v-5h-2zM5 22H2v-3H0v5h5v-2zm12 2v-2h-4v2h4zM11 2V0H7v2h4zm6 0V0h-4v2h4zm0 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </svg>
);

export default Icon;
