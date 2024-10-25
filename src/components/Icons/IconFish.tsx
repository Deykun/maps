

type Props = {
  className?: string,
};

const Icon = ({ className }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" transform="matrix(-1,0,0,1,0,0)">
    <defs>
      <mask id="ipSFishOne0">
        <g fill="none">
          <path fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.55" d="M44 24c-1.215 4.69-7.962 8.467-11 9-2.43 5.97-8.962 6.533-12 6l4-6c-4.456-.427-9.975-5.046-12-7-2.614 2.85-6.806 5.08-9 5.969C7.646 24.294 5.519 17.309 4 15c2.835 0 7.143 3.224 9 5 2.025-2.132 8.962-5.112 12-6l-4-5c7.696-.853 11.156 2.868 12 5 7.696 1.706 10.662 7.69 11 10"/>
          <circle cx="36" cy="24" r="2" fill="#000"/>
        </g>
      </mask>
    </defs>
    <path d="M0 0h48v48H0z" mask="url(#ipSFishOne0)"/>
  </svg>
);

export default Icon;
