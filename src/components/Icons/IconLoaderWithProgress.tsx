import clsx from 'clsx';

// import './IconLoader.scss';

type Props = {
  className?: string,
  lineClassName?: string,
  progress: number,
};

const radius = 11;
const fullDashArray = 69.115038378975;

const Icon = ({ className, lineClassName, progress }: Props) => {

  // const progressAsPercentage = fullDashArray * progress;
  const progressDashOffset = progress * fullDashArray;
  // const progressDashOffset = (progressAsPercentage / 100) * (Math.PI * (2 * radius));
  // const progressDashOffset = ((100 - progressAsPercentage) / 100) * (Math.PI * (2 * radius));
  
  return (
    <svg className={clsx(className, 'icon-loader-with-progress')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" version="1.1">
    <circle
      r={radius}
      cx="15"
      cy="15"
      fill="transparent"
      strokeDasharray={fullDashArray}
      strokeDashoffset="0"
    ></circle>
    <circle
      className={lineClassName}
      r={radius}
      cx="15"
      cy="15"
      fill="transparent"
      strokeDasharray={fullDashArray}
      strokeDashoffset={fullDashArray - progressDashOffset}
      style={{
        strokeWidth: '3px',
      }}
    />
  </svg>
  )

};

export default Icon;
