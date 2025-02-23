import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-end space-x-4">
        <Link to="/" className="px-4 py-2 bg-blue-700 rounded-lg">Home</Link>
        <Link to="/game" className="px-4 py-2 bg-blue-700 rounded-lg">Game</Link>
        <Link to="/profile" className="px-4 py-2 bg-blue-700 rounded-lg">Profile</Link>
        <Link to="/contact" className="px-4 py-2 bg-blue-700 rounded-lg">Contact Us</Link>
        <Link to="/signin" className="px-4 py-2 bg-blue-700 rounded-lg">Sign In</Link>
        <Link to="/signup" className="px-4 py-2 bg-blue-700 rounded-lg">Sign Up</Link>
        <Link to="/logout" className="px-4 py-2 bg-red-700 rounded-lg">Logout</Link>
      </nav>
    </header>
  );
}
