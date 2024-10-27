type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 25 25">
  <path d="M22 24H5c-1.657 0-3-1.343-3-3V3c0-1.657 1.343-3 3-3h17v24zm-2-4H5.495c-1.375 0-1.375 2 0 2H20v-2zm0-18h-3v9l-2-1.547L13 11V2H5v16h15V2z"/>
  </svg>
);

export default Icon;
