type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16 9V5l8 7-8 7v-4H8V9h8zm-2 10v-.083C12.822 19.602 11.458 20 10 20c-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083V2.838C12.774 2.302 11.423 2 10 2 4.478 2 0 6.477 0 12s4.478 10 10 10c1.423 0 2.774-.302 4-.838V19z"/>
  </svg>
);

export default Icon;
