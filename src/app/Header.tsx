import { Link } from "wouter";

const Header = () => {
  // https://flowbite.com/docs/components/navbar/
  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <div>
          <ul className="font-medium flex flex-wrap gap-5">
            <li>
              <Link to="/maps/" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header
