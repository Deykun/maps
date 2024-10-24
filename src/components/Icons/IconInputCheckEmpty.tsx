type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"/>
  </svg>
);

export default Icon;
