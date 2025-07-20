import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/authContext.jsx'
import NotificationProvider from './contexts/NotificationContext.jsx'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationProvider>
          
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
