import { useTranslation } from 'react-i18next';

type Props = {
  list: string[],
  listTitle: string,
  listElementPrefix: string,
  icon: (props: { className: string }) => JSX.Element
  shouldShowContentAsTooltip?: boolean,
}

const UnitsPaneUnitMarkersList = ({ list, listTitle, listElementPrefix, icon: Icon, shouldShowContentAsTooltip = false }: Props) => {
  const { t } = useTranslation();

  if (list.length === 0) {
    return null;
  }

  return (<span className="flex items-center gap-1 flex-nowrap">
    <span className="relative flex nowrap gap-1 items-center bored-b ui-tooltip-wrapper ui-tooltip-wrapper--small">
      <Icon className="size-3"/>
      x{list.length}
      <span className="ui-tooltip ui-tooltip--top">
        
        {shouldShowContentAsTooltip ? <>
          <small>{t(listTitle)}:</small>
          {list.map((element) => <span><br /> - {t(`${listElementPrefix}.${element}`)}</span>)}
        </> : t(listTitle)}
      </span>
    </span>
    {!shouldShowContentAsTooltip && <span>
      {list.map((element) => t(`${listElementPrefix}.${element}`)).join(', ')}
    </span>}
  </span>);
};

export default UnitsPaneUnitMarkersList;
