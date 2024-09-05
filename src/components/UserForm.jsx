import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function UserForm() {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Error fetching user details. Please try again later.');
          console.error('Fetch user error:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const request = id 
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      : axios.post('https://jsonplaceholder.typicode.com/users', user);

    request
      .then(response => {
        setSuccess(`User ${id ? 'updated' : 'created'} successfully.`);
        setLoading(false);
        setTimeout(() => navigate('/'), 1500); // Redirect after a short delay
      })
      .catch(err => {
        setError('Error submitting form. Please try again later.');
        console.error('Submit form error:', err);
        setLoading(false);
      });
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (success) return <div className="text-green-500">{success}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">{id ? 'Edit User' : 'Create User'}</h1>
      <label className="block">
        <span className="text-gray-700">Name</span>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Phone</span>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default UserForm;
