import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <App className="font-coolvetica" />
    </AuthProvider>
  </Router>
)
