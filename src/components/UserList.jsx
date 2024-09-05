import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users. Please try again later.');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Error deleting user. Please try again later.');
        console.error('Delete user error:', err);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create User</Link>
      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <Link to={`/user/${user.id}`} className="text-blue-500 hover:underline">
                {user.name}
              </Link>
              <div className="text-gray-500">
                {user.email}
              </div>
              <div className="text-gray-400">
                {user.phone}
              </div>
            </div>
            <div>
              <Link to={`/edit/${user.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
