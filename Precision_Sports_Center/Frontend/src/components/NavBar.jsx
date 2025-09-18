const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">Precision Sports Center</h1>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600">
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button className="text-gray-700 hover:text-blue-600">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;