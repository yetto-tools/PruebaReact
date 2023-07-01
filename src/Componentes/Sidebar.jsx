import { Link } from 'wouter';
import './styleSideBar.css'



import { useState } from 'react';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = () => {


    const sidebar = document.getElementById('sidebar');
    sidebar.setAttribute('hidden', true);
    sidebar.classList.toggle('hidden');

    const body = document.querySelector('body');
    body.classList.remove('bg-blur');

    const contenido = document.getElementById('dynamicContent');
    while (contenido.firstChild) {
      contenido.removeChild(contenido.firstChild);
    }

    const login = document.getElementById('login');
    login.classList.toggle('hidden');

    localStorage.removeItem('UseLogin');
    
    console.log('exit');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchClick = () => {
    setIsSidebarOpen(false);
  };



  
  return (
    <nav className={isSidebarOpen ? 'sidebar' : 'sidebar close'}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="react.svg" alt="logo fenixapp" width={72} />
          </span>
          <div className="text logo-text">
            <span className="name"></span>
            <span className="profession">Erick Rashon</span>
          </div>
        </div>
        <i className="bx bx-chevron-right toggle" onClick={handleSidebarToggle}></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link" name="icon-home">
              <Link to="/">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Inicio</span>
              </Link>
            </li>
            <li className="nav-link" id="sidebar-story-shopping" name="icon-story-shopping">
            <Link to="/factura">
              <i className='bx bx-history icon'></i>
                <span className="text nav-text">Historial</span>
            </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="" name="icon-version">
              <i className="bx bx-cog icon"></i>
              <span className="text nav-text">preuba tecnica</span>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;