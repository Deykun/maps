type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 22H0v-4h4v4zm0-12H0v4h4v-4zm0-8H0v4h4V2zm3 0v4h17V2H7zm0 12h17v-4H7v4zm0 8h17v-4H7v4z"/>
  </svg>
);

export default Icon;
