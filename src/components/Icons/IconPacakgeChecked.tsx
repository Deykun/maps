type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 25 25">
    <path d="M18.5 12c-3.036 0-5.5 2.463-5.5 5.5s2.464 5.5 5.5 5.5c3.035 0 5.5-2.463 5.5-5.5S21.535 12 18.5 12zm-6.634 9H0V1h22v9.866c-.62-.328-1.292-.572-2-.716V3h-7v6H9V3H2v16h9.15c.144.708.388 1.38.716 2zm6.019-2.94-1.259-1.182-.962.989L17.904 20l3.765-3.834-.979-.97-2.805 2.864zM9 17H4v-2h5v2z"/>
  </svg>
);

export default Icon;
