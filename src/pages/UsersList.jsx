import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }

      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
        // console.log(data.data);
        
        setFilteredUsers(data.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, [page, navigate]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6 mt-2">Users List</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by name or email in this page..."
            className="w-1/2 p-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => navigate(`/edit/${user.id}`)}
                onDelete={() => handleDelete(user.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No users found.</p>
          )}
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default UsersList;
