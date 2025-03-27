const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-16 h-16 rounded-full mb-2" />
      <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
      <p className="text-gray-500">{user.email}</p>
      <div className="mt-4 flex space-x-2">
        <button onClick={onEdit} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
        <button onClick={onDelete} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
