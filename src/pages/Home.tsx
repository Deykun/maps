import { Link } from "wouter";
import { PATHS_DATA } from "../constants";

const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <ul>
        {PATHS_DATA.map(({ path, pathNameLink }) => (<li key={path}>
          <Link to={`/maps/${path}`} className="text-[30px]">{pathNameLink}</Link>
        </li>))}
      </ul>
    </div>
  )
}

export default Home
