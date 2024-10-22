type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9 12c0 1.94-.624 3.735-1.672 5.207L6.793 4.672C8.265 3.624 10.06 3 12 3c4.962 0 9 4.038 9 9zM3 12c0-1.94.624-3.735 1.672-5.207l12.534 12.534C15.735 20.376 13.94 21 12 21c-4.962 0-9-4.038-9-9z"/>
  </svg>
);

export default Icon;
