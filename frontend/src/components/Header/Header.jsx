import React from 'react'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={"/"}><a className="btn btn-ghost text-xl">LivePoll</a></Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to={"/login"}>Login</Link></li>
      <li><Link to={'/bookmark'}>Bookmarks</Link></li>
    </ul>
  </div>  
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/dashboard'}><a className="justify-between" >
            Profile
            <span className="badge">New</span>
          </a></Link>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Header
