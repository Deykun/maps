import { Link } from "wouter";

const Header = () => {
  return (
    <header className="text-right p-5">
      <Link to="/maps/">Home</Link>
      <a className="ml-5" href="https://github.com/Deykun/maps" target="_blank">GitHub</a>
    </header>
  );
}

export default Header
