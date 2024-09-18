import clsx from 'clsx';

import './IconLoader.scss';

type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={clsx(className, 'icon-loader')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM9.473 7.708C10.214 7.264 11.073 7 12 7c2.757 0 5 2.243 5 5h2c0-3.86-3.141-7-7-7-1.336 0-2.58.385-3.641 1.038L7 4l-1.719 6H11L9.473 7.708zm5.054 8.584c-.741.444-1.6.708-2.527.708-2.757 0-5-2.243-5-5H5c0 3.86 3.141 7 7 7 1.336 0 2.58-.385 3.641-1.038L17 20l1.719-6H13l1.527 2.292z"/>
  </svg>
);

export default Icon;
