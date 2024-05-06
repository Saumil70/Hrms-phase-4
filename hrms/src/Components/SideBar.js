import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const SidebarComponent = () => {

  const userId = localStorage.getItem('UserId');
  console.log(userId);


  // Define redirectUrl based on userRole
  const LeaveManagementUrl = localStorage.getItem("UserRole") == 'admin' ? '/LeaveManagement' : `/UserPage/${userId}`;
  const TimeSheetUrl = localStorage.getItem("UserRole") == 'admin' ? '/AdminTimeSheet' : `/UserTimeSheet/${userId}`;
  return (
    <div className="h-screen flex">
      <Sidebar className="bg-blue-900 text-black flex-shrink-0 h-full">
        <Menu iconShape="circle">
          <MenuItem className="mb-2" icon={<FaCalendarAlt />}>
            <NavLink to={LeaveManagementUrl} className="pl-2">Leave Management</NavLink>
          </MenuItem>
          <MenuItem className="mb-2"  icon={<FaClock />}>
            <NavLink to={TimeSheetUrl} className="pl-2">Time Sheet</NavLink>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );

};

export default SidebarComponent;
