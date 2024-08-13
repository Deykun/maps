import { Link } from "wouter";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <ul>
        <li>
          <Link to="/maps/heraldyka" className="text-[30px]">1. {t('heraldry.mapTitle')}</Link></li>
        <li>    
          <Link to="/maps/eesti-heraldika" className="text-[30px]">2. Estonian map</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
