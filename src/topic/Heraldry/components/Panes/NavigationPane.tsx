import { useState } from 'react';

import IconGlobe from '@/components/Icons/IconGlobe';
import IconTranslation from '@/components/Icons/IconTranslation';
import IconGithub from '@/components/Icons/IconGithub';

import Pane from '@/components/UI/Pane';

import ButtonCircle from '@/components/UI/ButtonCircle';

type Props = {

};

const NavigationPane = ({

}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Pane>
        <ButtonCircle onClick={() => {}}>
          <IconGlobe />
        </ButtonCircle>
        <ButtonCircle onClick={() => {}}>
          <IconTranslation />
        </ButtonCircle>
        <ButtonCircle href="https://github.com/Deykun/maps" title="Page repository" target="_blank">
          <IconGithub />
        </ButtonCircle>
      </Pane>
    </div>
  );
}

export default NavigationPane;
