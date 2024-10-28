type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path d="M18.722 17.289C19.563 15.899 20 14.347 20 13v-2h-4V5h6v5.391c0 2.936-1.176 5.333-3.278 6.898zm-13.993-.011C5.565 15.892 6 14.344 6 13v-2H2V5h6v5.391c0 2.93-1.184 5.322-3.271 6.887zM1 21c5.252-1.039 8.983-4.905 8.983-10.609V3H0v10h4c0 2.211-1.562 4.932-3.995 5.849L1 21zm14 0c5.252-1.039 9-4.905 9-10.609V3h-9.983v10H18c0 2.211-1.563 4.932-3.996 5.849L15 21z" />
  </svg>
);

export default Icon;

