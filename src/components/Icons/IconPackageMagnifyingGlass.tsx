type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
    <path d="M19.757 20.171c-.791.524-1.739.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.018-.305 1.966-.829 2.757L24 21.586 22.586 23l-2.829-2.829zM12.103 21H0V1h22v10.103c-.574-.586-1.25-1.072-2-1.428V3h-7v6H9V3H2v16h8.675c.356.75.842 1.426 1.428 2zM17 13c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm-1.258 4h-.5v-2h.5v2zm1 0h-.5v-2h.5v2zm1 0h-.5v-2h.5v2zm.992 0h-.492v-2h.492v2zM9 15v2H4v-2h5z"/>
  </svg>
);

export default Icon;
