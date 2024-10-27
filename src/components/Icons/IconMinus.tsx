type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13H6v-2h12v2z"/>
  </svg>
);

export default Icon;

