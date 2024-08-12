import { Link } from "wouter";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <Link to="/maps/heraldyka" className="text-[30px]">1. {t('heraldry.mapTitle')}</Link>
    </div>
  )
}

export default Home
