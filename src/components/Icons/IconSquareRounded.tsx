type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 25 25">
    <path d="M12 0C2.568 0 0 2.568 0 12s2.551 12 12 12 12-2.551 12-12S21.432 0 12 0z"/>
  </svg>
);

export default Icon;
