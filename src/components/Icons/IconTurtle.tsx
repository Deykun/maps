type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" transform="matrix(-1,0,0,1,0,0)">
    <path fill="currentColor" d="M19.31 5.6c-1.22-.04-2.43.9-2.81 2.4-.5 2-.5 2-1.5 3-2 2-5 3-11 4-1 .16-1.5.5-2 1 2 0 4 0 2.5 1.5L3 19h3l2-2c2 1 3.33 1 5.33 0l.67 2h3l-1-3s1-4 2-5 1 0 2 0 2-1 2-2.5C22 8 22 7 20.5 6c-.35-.24-.76-.38-1.19-.4M9 6a6 6 0 0 0-6 6c0 .6.13 1.08.23 1.6 5.92-.98 9.06-2.01 10.7-3.66l.5-.5A6.01 6.01 0 0 0 9 6"/>
  </svg>
);

export default Icon;