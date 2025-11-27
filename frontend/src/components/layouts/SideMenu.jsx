import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data'
import { useNavigate } from 'react-router-dom'

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  const [sideMenuData, setSideMenuData] = useState([])

  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout()
      return
    }

    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/login')
  }

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
    }
  }, [user])

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative w-20 h-20 rounded-full overflow-hidden bg-slate-400'>
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-white text-sm'>
              N/A
            </div>
          )}
        </div>

        {user?.role === 'admin' && (
          <div className='text-[10px] font-medium text-white bg-[var(--color-primary)] px-3 py-0.5 rounded mt-1'>
            Admin
          </div>
        )}

        <h5 className='text-gray-950 font-medium leading-6 mt-3'>
          {user?.name || ''}
        </h5>

        <p className='text-[12px] text-gray-500'>{user?.email || ''}</p>
      </div>

      <div className='px-3'>
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-sm font-medium rounded py-3 px-4 mb-2 transition-all
              ${
                activeMenu === item.label
                  ? 'text-primary bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-[3px] border-[var(--color-primary)]'
                  : 'text-gray-700 hover:bg-slate-100'
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className='text-lg' />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
