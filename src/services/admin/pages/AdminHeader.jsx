import React from 'react'
import "../css/admin.css"
import { Input, Space } from 'antd';
import { Avatar } from '@mui/material';
import useAdminAuth from '../../../hooks/useAdminAuth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminUser } from '../../../redux/slices/UserSlice';
import siteLinks from '../../../components/siteLinks';
const { Search } = Input;


const AdminHeader = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
  useAdminAuth()
  return (
    <div className='main-header'>
      <div style={{display: "flex", justifyContent: "flex-start", width: "20%", }}>Admin</div>
      <div style={{display: "flex", justifyContent: "flex-end", width: "80%"}}>
        <div className='col-12' style={{display: "flex", justifyContent: "flex-end", flexDirection: "row", gap: "10px", alignItems: "center"}}>
          {/* <select className="form-select form-select-sm " style={{width: "100px"}}>
                <option selected disabled value="">Choose</option>
                {
                    arr?.map((e) => {
                        return <option value={e}>{e}</option>
                    })
                }
            </select>
          <Search placeholder="search ...." onSearch={onSearch} style={{width:400}} enterButton /> */}


          <div className="btn-group" >
              <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar src={`/public/assets/male.jpg`} className="cursor-pointer" />
              </button>
              <ul className="dropdown-menu">
              {/* <li><button className="dropdown-item" onClick={() => {}}>Profile</button></li> */}
                                        
              {/* <li><hr className="dropdown-divider" /></li> */}
              <li><button className="dropdown-item" style={{color: "red"}} onClick={() => { dispatch(setAdminUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('admin-token'); }} >Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader