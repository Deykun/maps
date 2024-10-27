type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M10 8H8v2H6V6h4v2zm8 16v-2h-6v2h6zm2-16h2v2h2V6h-4v2zm2 12v2h-2v2h4v-4h-2zm-12 2H8v-2H6v4h4v-2zm14-10h-2v6h2v-6zM8 18v-6H6v4H2V2h14v4h-4v2h6V0H0v18h8z"/>
  </svg>
);

export default Icon;
