type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="m15.762 8.047-4.381 4.475-2.215-2.123-1.236 1.239L11.381 15 17 9.285l-1.238-1.238zM12 2.544c2.5 1.805 4.555 2.292 7 2.416v9.575c0 3.042-1.686 3.827-7 7.107-5.309-3.278-7-4.065-7-7.107V4.96c2.447-.124 4.5-.611 7-2.416zM12 0C8.629 2.866 6.516 3 3 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465V3c-3.516 0-5.629-.134-9-3z"/>
  </svg>
);

export default Icon;
