import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, fetchUsers } from "../api/users";
import Navbar from "../components/Navbar";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
      let page=parseInt(id)%6==0?parseInt(id)/6:(parseInt(id)/6) +1;
      const data = await fetchUsers(page);
      const foundUser = data.data.find((u) => u.id === parseInt(id));
      // console.log(id);
      
      // console.log(foundUser);
      
      if (foundUser) setUser(foundUser);
    };
    loadUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let data=await updateUser(id, user);
    console.log(data);
    
    navigate("/");
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Edit User</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              required
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              required
            />
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
