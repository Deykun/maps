type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" id="flag-icons-pl" viewBox="0 0 512 512">
    <g fillRule="evenodd">
      <path fill="#fff" d="M512 512H0V0h512z"/>
      <path fill="#dc143c" d="M512 512H0V256h512z"/>
    </g>
  </svg>
);

export default Icon;
