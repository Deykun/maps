import IconAnt from './IconAnt';
import IconBadger from './IconBadger';
import IconBird from './IconBird';
import IconBison from './IconBison';
import IconCat from './IconCat';
// import IconDragon from './IconDragon';
import IconFish from './IconFish';
import IconHorse from './IconHorse';
import IconLobster from './IconLobster';
// import IconOtter from './IconOtter';
import IconPig from './IconPig';
import IconRabbit from './IconRabbit';
// import IconRam from './IconRam';
import IconSnake from './IconSnake';
import IconTurtle from './IconTurtle';
import IconWolf from './IconWolf';

type Props = {
  className?: string,
  animals?: string[],
};

const Icon = ({ className, animals = [] }: Props) => {
  if (animals.length === 0) {
    return <IconBird className={className} />;
  }

  if (['bird', 'griffin'].some((category) => animals.includes(category))) {
    return <IconBird className={className} />;
  }

  if (['cat', 'lion', 'leopard', 'wildcat', 'lynx', 'tiger', 'panther'].some((category) => animals.includes(category))) {
    return <IconCat className={className} />;
  }

  if (['bullBison', 'elephant', 'ox'].some((category) => animals.includes(category))) {
    return <IconBison className={className} />;
  }

  if (['deer', 'moose', 'horse', 'centaur', 'donkey', 'goat', 'unicorn', 'reindeer'].some((category) => animals.includes(category))) {
    return <IconHorse className={className} />;
  }

  if (['boar'].some((category) => animals.includes(category))) {
    return <IconPig className={className} />;
  }

  if (['bear', 'wolf', 'dog', 'fox', 'wolverine'].some((category) => animals.includes(category))) {
    return <IconWolf className={className} />;
  }

  if (['beaver', 'otter', 'weasel', 'badger'].some((category) => animals.includes(category))) {
    return <IconBadger className={className} />;
  }

  if (['rabbit', 'squirrel', 'frog'].some((category) => animals.includes(category))) {
    return <IconRabbit className={className} />;
  }

  if (['fish', 'whale', 'dolphin', 'mermaid', 'seal', 'salmon', 'seahorse'].some((category) => animals.includes(category))) {
    return <IconFish className={className} />;
  }

  if (['ram', 'sheep'].some((category) => animals.includes(category))) {
    return <IconBison className={className} />;
  }

  if (['insect', 'bee', 'ant', 'dragonfly', 'butterfly'].some((category) => animals.includes(category))) {
    return <IconAnt className={className} />;
  }

  if (['crayfish'].some((category) => animals.includes(category))) {
    return <IconLobster className={className} />;
  }

  if (['snake', 'dragon'].some((category) => animals.includes(category))) {
    return <IconSnake className={className} />;
  }

  if (['turtle'].some((category) => animals.includes(category))) {
    return <IconTurtle className={className} />
  }

  return <IconBird className={className} />;
}

export default Icon;
