export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">HackGround</span>
        </div>
        <ul className="hidden md:flex space-x-8 text-gray-600">
          <li><a href="#home" className="hover:text-accent">Home</a></li>
          <li><a href="#features" className="hover:text-accent">Features</a></li>
          <li><a href="#pricing" className="hover:text-accent">Pricing</a></li>
        </ul>
        <ul>
            <li><a href="#register" className="hover:text-accent">Register</a></li>
        </ul>
        <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500">
          Get Started
        </button>
      </div>
    </nav>
  );
}
