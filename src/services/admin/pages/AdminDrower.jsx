import React from 'react'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import MoreIcon from '@mui/icons-material/More';
import { DashbordButtons } from '../components/navcom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminActive } from '../../../redux/slices/AdminActiveSlice'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import FestivalRoundedIcon from '@mui/icons-material/FestivalRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks';


const AdminDrower = ({ children, hideHeader = false }) => {
  const iconsSetter = { "Dashboard": <CollectionsBookmarkIcon />, "Faculties": <PersonRoundedIcon />, "Directors": <LocalLibraryRoundedIcon />, "Report Status": <BarChartRoundedIcon />, "Feedback Status": <ForumRoundedIcon />, "Student Satisfaction Survey": <GroupsRoundedIcon />, "Numerical Dashboard": <DashboardRoundedIcon />, "Alumnis": <BoyRoundedIcon />, "Students": <SchoolRoundedIcon />, "More": <MoreIcon />, }
  // "University Programs": <FestivalRoundedIcon />,
  title('Admin Panel')
  const dispatch = useDispatch();
  const AdminActive = useSelector(state => state.adminActive.adminActive)
  return (

    <>
      <div className='col-12' style={{ height: "auto", display: 'flex', flexDirection: 'column' }}>
        {!hideHeader && <div className='sidebar-admin-drower'>
          {
            DashbordButtons?.map(button => <button onClick={() => { dispatch(setAdminActive(button.name)) }} className={`DashbordButtons ${AdminActive === button.name ? 'active' : null} text-left`}><span style={{ paddingRight: "10px" }}>{iconsSetter[button.name]}</span>{button.title}</button>)
          }
        </div>}

        {
          children
        }

      </div>

    </>



  )
}

export default AdminDrower