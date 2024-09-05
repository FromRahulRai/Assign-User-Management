import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';



function App() {
 

  return (
    <div className='container mx-auto p-4'>
        <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  )
}

export default App
