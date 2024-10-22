type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M22 2v20H2V2h20zm2-2H0v24h24V0zm-5.541 8.409L17.037 7l-7.021 7.183-3.08-2.937-1.395 1.435 4.5 4.319 8.418-8.591z"/>
  </svg>
);

export default Icon;
