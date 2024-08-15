import { Link } from "wouter";
import { useTranslation } from 'react-i18next';
import { PATHS_DATA } from "../constants";

const Home = () => {  
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-[40px] mb-4">Heraldic maps of selected countries 🛡️</h1>
      <ul className="flex flex-col gap-3">
        {PATHS_DATA.map(({ path, pathNameLink }) => (<li key={path}>
          <Link to={`/maps/${path}`} className="text-[20px]">{t(pathNameLink)}</Link>
        </li>))}
        <li>
          <a href="https://github.com/Deykun/maps" className="text-[20px]">github.com/Deykun/maps</a>
        </li>
      </ul>
    </div>
  )
}

export default Home
