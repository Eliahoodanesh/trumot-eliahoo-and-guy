import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditPage from './EditPage';
import ManageUsers from './ManageUsers';
import HeaderAdmin from '../comp/HeaderAdmin';

function AdminDashboard() {
  return (
    <div>
      <HeaderAdmin />
      <Routes>
        <Route path="edit-about" element={<EditPage page="about" />} /> {/* Pass the 'page' prop here */}
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="edit-contact" element={<EditPage page="contact" />} /> {/* Pass the 'page' prop here */}
        {/* Add other admin routes here */}
      </Routes>
    </div>
  );
}

export default AdminDashboard;
