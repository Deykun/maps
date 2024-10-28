type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M12 0C5.377 0 0 5.377 0 12s5.377 12 12 12 12-5.377 12-12S18.623 0 12 0zm0 22C6.481 22 2 17.52 2 12 2 6.481 6.481 2 12 2c5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10z"/>
  </svg>
);

export default Icon;
