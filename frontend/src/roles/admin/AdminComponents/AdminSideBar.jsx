import React, { useState } from 'react';
import { getUserNameFromToken, logout } from '../../../utils/authService';
import { getUserRole } from '../../../utils/authService';
import { Layout, Menu, Typography, Avatar, Button, Tooltip } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  MessageOutlined,
  DashboardOutlined,
  TeamOutlined,
  ScheduleOutlined,
  BookOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

// userName = getUserNameFromToken(localStorage.getItem("accessToken"))
const AdminSideBar = ({ userName = "chanuka", userRole = getUserRole(localStorage.getItem("accessToken"))
 
 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Define menu items
  const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,  // This one is already appropriate
    label: 'Dashboard',
    path: '/admin/dashboard'
  },
  {
    key: 'manage users',
    icon: <TeamOutlined />,  // Better for user management than Calendar
    label: 'manage users',
    path: '/admin/manage-users'
  },
  {
    key: 'Manage Assignments',
    icon: <ScheduleOutlined />,  // Better for assignments/tasks
    label: 'Manage Assignments',
    path: '/admin/manage-assignments'
  },
  {
    key: 'Manage-Courses',
    icon: <BookOutlined />,  // Better for courses/educational content
    label: 'Manage Courses',
    path: '/admin/manage-courses'
  },
  {
    key: 'Analytics ',
    icon: <BarChartOutlined />,  // Better for analytics/data
    label: 'Analytics',
    path: '/admin/analytics'
  },
  {
    key: 'Settings',
    icon: <SettingOutlined />,  // This one is already appropriate
    label: 'Settings',
    path: '/admin/settings'
  },
  {
    key: 'Logout',
    icon: <LogoutOutlined />,  // This one is already appropriate
    label: 'Logout',
    path: '/admin/settings'
  }
];
  const handleMenuClick = ({ key }) => {
    if (key === 'Logout') {
      logout(); // Call the logout function
      
    } else {
      const selectedItem = menuItems.find(item => item.key === key);
      if (selectedItem) {
        navigate(selectedItem.path);
      }
    }
  };
  return (
    <Sider
      width={250}
      collapsed={collapsed}
      collapsible
      trigger={null}
      style={{
        background: '#5038ED',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000
      }}
    >
      {/* Logo and Header Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '20px 0' : '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {collapsed ? (
          <Avatar 
            size={40} 
            style={{ backgroundColor: '#fff', color: '#5038ED' }}
          >
            {userName.charAt(0)}
          </Avatar>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <Avatar 
                size={40} 
                style={{ backgroundColor: '#fff', color: '#5038ED' }}
              >
                {userName.charAt(0)}
              </Avatar>
              <div style={{ marginLeft: 12 }}>
                <Title level={5} style={{ margin: 0, color: '#fff' }}>{userName}</Title>
                <Text style={{ color: 'rgba(255,255,255,0.65)' }}>{userRole}</Text>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: '100%',
          height: 48,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'left',
          paddingLeft: collapsed ? '24px' : '30px',
          borderRadius: 0,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      />

      {/* Menu Items */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
        style={{ 
          background: 'transparent', 
          borderRight: 'none',
          marginTop: '20px'
        }}
        onSelect={({ key }) => {
          const item = menuItems.find(item => item.key === key);
          if (item) handleMenuClick(item);
        }}
        items={menuItems.map(item => ({
          key: item.key,
          icon: (
            <span style={{ color: '#fff' }}>
              {item.icon}
            </span>
          ),
          label: (
            <span style={{ color: '#fff' }}>
              {item.label}
            </span>
          )
        }))}
        theme="dark"
      />

      {/* Bottom Icons */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: collapsed ? '16px 0' : '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'space-between',
        alignItems: 'center'
      }}>
        {collapsed ? (
          <Tooltip title="Logout" placement="right">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              style={{ color: '#fff' }}
              size="large"
            />
          </Tooltip>
        ) : (
          <>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ color: '#fff' }}
            />
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{ color: '#fff' }}
            />
            <Button
              type="text"
              icon={<LogoutOutlined />}
              style={{ color: '#fff' }}
              danger
            />
          </>
        )}
      </div>
    </Sider>
  );
};

export default AdminSideBar;