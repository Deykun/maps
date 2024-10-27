type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M8 9V5l8 7-8 7v-4H0V9h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221C11.716 4.26 12.827 4 14 4c4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2C10.54 21.526 12.213 22 14 22c5.522 0 10-4.477 10-10S19.522 2 14 2z"/>
  </svg>
);

export default Icon;
