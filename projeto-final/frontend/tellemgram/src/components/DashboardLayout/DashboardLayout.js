import React, { useState } from 'react';
import './DashboardLayout.css';
import HomeIcon from '@mui/icons-material/Home';
import DownloadIcon from '@mui/icons-material/Download';//upload
import ImageIcon from '@mui/icons-material/Image'; //image
import PostAddIcon from '@mui/icons-material/PostAdd'; //post
import PersonIcon from '@mui/icons-material/Person'; //profile
import LogoutIcon from '@mui/icons-material/Logout'; //Logout
/*Tela de dashboard na qual o usuario logado tem acesso as funcoes da aplicacao
tal como editar seu perfil*/
const DashboardLayout = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('home');
        
    const openPage = (pageName) => {
        setCurrentPage(pageName);   
    };
    const [userData, setUserData] = useState({
        username: 'UserName', // Nome padrão, pode ser alterado
        userAvatar: 'URL_DA_IMAGEM_PADRAO', // URL padrão da imagem, pode ser alterada
    });

    return (
        <div className="dashboard">
            
        <div className="menu">
            <div>
                <div className="page-icon-container">
                    <div style={{ textAlign: "center" }}>
                    <PersonIcon sx={{ fontSize: 56, color: "white" }} />
                    </div>
                </div>
                <div className="user-info">
                    <h3>UserName</h3>
                </div>
            
            </div>
            <ul>
            <li className={currentPage === 'home' ? 'active' : ''}>
                <a href="http://localhost:3000/recuperar#" onClick={() => openPage('home')}> 
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <HomeIcon sx={{ fontSize: 32}}/></span> Home
                </a>
            </li>
            <li className={currentPage === 'images' ? 'active' : ''}>
                <a href="http://localhost:3000/recuperar#" onClick={() => openPage('images')}>
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <ImageIcon sx={{ fontSize: 32}}/></span> Imagem
                </a>
            </li>
            <li className={currentPage === 'posts' ? 'active' : ''}>
                <a href="http://localhost:3000/recuperar#" onClick={() => openPage('posts')}>
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <PostAddIcon sx={{ fontSize: 32}}/></span> Posts
                </a>
            </li>
            <li className={currentPage === 'upload' ? 'active' : ''}>
                <a href="http://localhost:3000/recuperar#" onClick={() => openPage('upload')}>
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <DownloadIcon sx={{ fontSize: 32}}/></span> Upload
                </a>
            </li>
            <li className={currentPage === 'profile' ? 'active' : ''}>
                <a href="http://localhost:3000/recuperar#" onClick={() => openPage('profile')}>
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <PersonIcon sx={{ fontSize: 32}}/></span> Perfil
                </a>
            </li>
            <li className={currentPage === 'Logout' ? 'active' : ''}>
                <a href="http://localhost:3000/entrar#" onClick={() => openPage('Logout')}>
                <span className="icon" style={{ verticalAlign: 'middle' }}>
                    <LogoutIcon sx={{ fontSize: 32}}/></span> Logout
                </a>
            </li>
            </ul>
        </div>
        <div className="contentDashboard">
            { children }
        </div>
        </div>
    );
}

export default DashboardLayout;
