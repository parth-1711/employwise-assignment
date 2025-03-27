import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav className="p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"><Link to='/'>User List</Link></h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
