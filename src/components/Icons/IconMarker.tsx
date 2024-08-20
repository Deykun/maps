
type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661C6 4.618 8.804 2 12 2m0-2C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
  </svg>
);

export default Icon;
