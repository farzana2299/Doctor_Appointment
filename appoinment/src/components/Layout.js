import React from 'react'
import '../styles/LayoutStyles.css'
import { UserMenu, adminMenu } from '../Data/Data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'
function Layout({ children }) {
    const location=useLocation()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.user)
    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : UserMenu;
   const handleLogout=()=>{
    localStorage.clear()
    message.success("Logout Successfully")
navigate('/login')
   }
    return (
        <div>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6>DOCTOR APP</h6>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map((menu)=>{
                                const isActive=location.pathname===menu.path;
                                return(
                                    <>
                                    <div className={`menu-item ${isActive &&'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                        </>
                                )
                            })}
                              <>
                                    <div className={`menu-item`} onClick={handleLogout}>
                                        <i className='fa-solid fa-right-from-bracket'></i>
                                        <Link to="/login">Logout</Link>
                                        </div>
                                        </>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className="header-content">
                                <Badge count={user&&user.notification.length}>
                                <i className='fa-solid fa-bell'></i>
                                </Badge>
                                <Link to='/profile'>{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout