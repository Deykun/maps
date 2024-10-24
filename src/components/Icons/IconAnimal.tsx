import IconAnt from './IconAnt';
import IconBadger from './IconBadger';
import IconBird from './IconBird';
import IconBison from './IconBison';
import IconCat from './IconCat';
// import IconDragon from './IconDragon';
import IconFish from './IconFish';
import IconHorse from './IconHorse';
// import IconOtter from './IconOtter';
import IconPig from './IconPig';
// import IconRam from './IconRam';
import IconWolf from './IconWolf';

type Props = {
  className?: string,
  animals?: string[],
};

const Icon = ({ className, animals = [] }: Props) => {
  console.log('animals', animals);

  if (animals.length === 0) {
    return <IconBird className={className} />;
  }

  if (['bird', 'griffin'].some((category) => animals.includes(category))) {
    return <IconBird className={className} />;
  }

  if (['cat', 'lion', 'leopard', 'wildcat', 'lynx', 'tiger', 'panther'].some((category) => animals.includes(category))) {
    return <IconCat className={className} />;
  }

  if (['bullBison'].some((category) => animals.includes(category))) {
    return <IconBison className={className} />;
  }

  if (['deer', 'moose', 'horse', 'centaur', 'donkey', 'goat', 'unicorn'].some((category) => animals.includes(category))) {
    return <IconHorse className={className} />;
  }

  if (['boar'].some((category) => animals.includes(category))) {
    return <IconPig className={className} />;
  }

  if (['bear', 'wolf', 'dog', 'fox'].some((category) => animals.includes(category))) {
    return <IconWolf className={className} />;
  }

  if (['beaver', 'otter', 'dog', 'weasel', 'badger', 'rabbit', 'squirrel'].some((category) => animals.includes(category))) {
    return <IconBadger className={className} />;
  }

  if (['fish', 'whale', 'mermaid'].some((category) => animals.includes(category))) {
    return <IconFish className={className} />;
  }

  if (['ram', 'sheep'].some((category) => animals.includes(category))) {
    return <IconBison className={className} />;
  }

  if (['insect'].some((category) => animals.includes(category))) {
    return <IconAnt className={className} />;
  }

  return <IconBird className={className} />;
}

export default Icon;
