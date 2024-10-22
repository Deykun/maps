type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M18.885 3.515C14.268-1.103 6.829-1.161 2.129 3.32L0 1.062V9h7.484L5.418 6.809c2.82-2.706 7.297-2.676 10.073.1C19.832 11.25 17.228 19.2 10 19.2V24c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"/>
  </svg>
);

export default Icon;

