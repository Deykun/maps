type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M12 0 1 6v12.131L12 24l11-5.869V6.065L12 0zm7.91 6.646-7.905 4.218L4.133 6.57l7.862-4.289 7.915 4.365zM3 8.23l8 4.363V21.2l-8-4.268V8.23zM13 21.2v-8.6l8-4.269v8.6L13 21.2zm6-9.534v4.066l-4 2.134V13.8l4-2.134z"/>
  </svg>
);

export default Icon;
