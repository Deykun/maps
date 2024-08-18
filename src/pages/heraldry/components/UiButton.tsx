type Props = {
  children: React.ReactNode,
  onClick?: () => void,
}

const UiButton = ({ onClick, children }: Props) => {
  return (
    <span className="relative heraldry-ui-button">
      <button onClick={onClick}>
        {children}
      </button>
    </span>
  );
}

export default UiButton;
