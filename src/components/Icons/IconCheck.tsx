type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="m9 20.42-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83z"/>
  </svg>
);

export default Icon;
