import Link from 'next/link';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center bg-cyan-900 bg-opacity-25">
        <h1 className="text-white text-4xl font-bold tracking-tight">
            <Link href="/">P<span className="text-blue-500">2</span>P</Link>
        </h1>
      <nav>
        <ul className="flex space-x-8 pr-12">
          <li>
            <Link className="text-white" href="/upload">
              Upload
            </Link>
          </li>
          <li>
            <Link className="text-white" href="/download">
              Download
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
