type Props = {
  children: React.ReactNode,
  onClick?: () => void,
  isDisabled?: boolean,
}

const UiButton = ({ children, onClick, isDisabled = false }: Props) => {
  return (
    <span className="relative heraldry-ui-button">
      <button onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    </span>
  );
}

export default UiButton;
