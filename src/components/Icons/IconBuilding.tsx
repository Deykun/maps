type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
  <path d="M24 24H0v-2h.998l.009-6H23v6h1v2zm-3-6H3v4h2v-2c0-.552.448-1 1-1s1 .448 1 1v2h2v-2c0-.552.448-1 1-1s1 .448 1 1v2h2v-2c0-.552.448-1 1-1s1 .448 1 1v2h2v-2c0-.552.448-1 1-1s1 .448 1 1v2h2v-4zm2-3H1.009l.003-2H5v-3h2v3h2v-3h2v3h2v-3h2v3h2v-3h2v3h4v2zM15 2h-3v1c2.966 0 6.158 1.979 7 6H5c.547-3.78 3.638-5.827 6-6V0h4v2zm.954 5c-.88-1.1-2.229-2-3.954-2-1.96 0-3.264.837-4.086 2h8.04z"/>
  </svg>
);

export default Icon;
