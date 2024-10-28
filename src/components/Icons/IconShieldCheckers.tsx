type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M12 0C8.336 0 4.945 1.334 3 3v11.536c0 4.602 3.204 5.803 9 9.464 5.796-3.661 9-4.863 9-9.464V3c-1.945-1.666-5.336-3-9-3zM5 14.536V12h7V2h.007c2.632 0 5.264.832 6.993 1.991V12h-7v9.643c-5.342-3.297-7-4.078-7-7.107z"/>
  </svg>
);

export default Icon;
