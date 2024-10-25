type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 0H5C2.238 0 0 2.239 0 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-8.959 17-4.5-4.319 1.395-1.435 3.08 2.937L17.037 7l1.422 1.409L10.041 17z"/>
  </svg>
);

export default Icon;
