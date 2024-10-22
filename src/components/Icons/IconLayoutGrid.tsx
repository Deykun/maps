type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 6H0V0h6v6zm9-6H9v6h6V0zm9 0h-6v6h6V0zM6 9H0v6h6V9zm9 0H9v6h6V9zm9 0h-6v6h6V9zM6 18H0v6h6v-6zm9 0H9v6h6v-6zm9 0h-6v6h6v-6z"/>
  </svg>
);

export default Icon;
