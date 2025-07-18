import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import AdminCard from '../AdminComponents/AdminCard';
import { User, Book, Users, FileCheck } from 'lucide-react'


const quickLinks = [
  {
    title: 'Subject Management',
    description: 'Manage subjects, add new ones, and update existing curriculum.',
    icon: Book,
    to: '/admin/manage-courses',
  },
  {
    title: 'User Management',
    description: 'View and manage users including students and teachers.',
    icon: User,
    to: '/admin/manage-users',
  },
  {
    title: 'Class Management',
    description: 'Create and manage classes with student and teacher assignments.',
    icon: Users,
    to: '/admin/manage-classes',
  },
  {
    title: 'Registration Management',
    description: 'Review and approve student registration requests.',
    icon: FileCheck,
    to: '/admin/registrationManagement',
  },
]

const AdminDashboardQuickLinks = () => {
    const navigate = useNavigate();
  const handleNavigation = (path) => {
    // In a real app, you'd use navigate(path) from react-router-dom
    
    navigate(path);
    console.log('Navigating to:', path);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your educational platform efficiently</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <AdminCard
                key={link.title}
                title={link.title}
                onClick={() => handleNavigation(link.to)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </div>
              </AdminCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardQuickLinks;