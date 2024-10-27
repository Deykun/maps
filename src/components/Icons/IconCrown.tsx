type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M3 16 0 6l7.104 4L12 2l4.896 8L24 6l-3 10H3zm0 2v4h18v-4H3z"/>
  </svg>
);

export default Icon;
