import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Navbar";

import Navbar from "./components/home-nav.component";
import Login from "./components/login.component";
import LocationsList from "./components/hr/locations-list.component";
import FacultiesList from "./components/hr/faculties-list.component";
import DepartmentsList from "./components/hr/departments-list.component";
import CoursesList from "./components/hr/courses-list.component";
import AddMember from "./components/hr/addMember.component";
import AddRecord from "./components/hr/addRecord.component";
import HomeHR from "./components/hr/home.component";
import AddLocation from "./components/hr/addLocation.component";
import AddFaculty from "./components/hr/addFaculty.component";
import AddDepartment from "./components/hr/addDepartment.component";
import AddCourse from "./components/hr/addCourse.component";
import AttendanceList from "./components/hr/attendance-list.component";
import ViewAttendance from "./components/hr/attendance.component";
import UpdateSalary from "./components/hr/salary.component";
import MissingList from "./components/hr/viewMissing.component";
import EditLocation from "./components/hr/edit-location.component";
import EditFaculty from "./components/hr/edit-faculty.component";
import EditDepartment from "./components/hr/edit-department.component";
import EditCourse from "./components/hr/edit-course.component";
import EditMember from "./components/hr/edit-member.component";

import hod from "./components/hod/Home";
import RequestsHod from "./components/hod/Requests";
import StaffHod from "./components/hod/Staff";
import ProfileHod from "./components/hod/Profile";
import DayOffHod from "./components/hod/DayOff";
import StaffperCourseHod from "./components/hod/StaffPerCourse";
import CoursesCoverage from "./components/hod/CoursesCoverage";
import TeachingAssignments from "./components/hod/TeachingAssignments";
import Instructor from "./components/hod/Instructor";

import academic from "./components/academic/Home";
import RequestsAcademic from "./components/academic/Requests";
import ProfileAcademic from "./components/academic/Profile";
import DayOffAcademic from "./components/academic/DayOff";
import StaffperCourseAcademic from "./components/academic/StaffPerCourse";
import Viewschedule from "./components/academic/Viewschedule";
import Replacementrequest from "./components/academic/Sendreplacement";
import slotlinkingrequest from "./components/academic/Sendslotlinking";
import leaverequest from "./components/academic/Sendleave";
import dayoffrequest from "./components/academic/Senddayoff";
import Notifications from "./components/academic/ViewNotifications";
import Viewallrequests from "./components/academic/Viewallrequests";
import Viewacceptedrequests from "./components/academic/Viewacceptedrequests";
import Viewpendingrequests from "./components/academic/Viewpendingrequests";
import Viewrejectedrequests from "./components/academic/Viewrejectedrequests";

import myprofile from "./components/instructor/myprofile";
import updateprofile from "./components/instructor/updateprofile";
import resetpassword from "./components/instructor/resetpassword";
import aboutcourses from "./components/instructor/aboutcourses";
import Viewmyslots from "./components/instructor/viewmyslots";
import Myslots from "./components/instructor/myslots";
import Assignstafftoslot from "./components/instructor/assignstafftoslot";
import Updatestaffslot from "./components/instructor/updatestaffslot";
import Updatestafffromcourse from "./components/instructor/updateStafffromcourse";
import Deletestafffromslot from "./components/instructor/deletestafffromslot";
import Removestafffromcourse from "./components/instructor/removestafffromcourse";
import Assigncoordinatortocourse from "./components/instructor/assigncoordinatortocourse";
import Viewstaff from "./components/instructor/viewstaff";
import StaffInstructor from "./components/instructor/staff";
import Myslotspercourse from "./components/instructor/myslotspercourse";
import StaffpercourseInstructor from "./components/instructor/staffpercourse";
import StaffAcademic from "./components/instructor/staff";

//import config from './components/login.component'
function App() {
  const path = window.location;
  const [state, setstate] = useState(true);
  const [hr, sethr] = useState(false);
  useEffect(() => {
    if (path === "/" || path === "/Login") setstate(false);
  });
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Login} />
        <Route path="/hr*" exact component={Navbar} />
        <Route path="/hr" exact component={HomeHR} />
        <Route path="/hr/locations" exact component={AddLocation} />
        <Route path="/hr/locations" exact component={LocationsList} />
        <Route path="/hr/locations/:room" component={EditLocation} />
        <Route path="/hr/fd" component={AddFaculty} />
        <Route path="/hr/fd" component={FacultiesList} />
        <Route path="/hr/faculties/:name" component={EditFaculty} />
        <Route path="/hr/fd" component={AddDepartment} />
        <Route path="/hr/fd" component={DepartmentsList} />
        <Route path="/hr/departments/:name" component={EditDepartment} />
        <Route path="/hr/courses" exact component={AddCourse} />
        <Route path="/hr/courses" exact component={CoursesList} />
        <Route path="/hr/courses/:name" exact component={EditCourse} />
        <Route path="/hr/members" component={AddMember} />
        <Route path="/hr/members" component={UpdateSalary} />
        <Route path="/hr/members" component={EditMember} />
        <Route path="/hr/log" component={AttendanceList} />
        <Route path="/hr/log" component={AddRecord} />
        <Route path="/hr/attendance/:id" component={ViewAttendance} />
        <Route path="/hr/missing" component={MissingList} />
      </div>
      <Route path="/hod*" exact component={Nav} />
      <Route path="/hod/" exact component={hod} />
      <Route path="/hod/viewRequests" exact component={RequestsHod} />
      <Route path="/hod/viewStaff" exact component={StaffHod} />;
      <Route path="/hod/viewProfile" exact component={ProfileHod} />;
      <Route path="/hod/viewStaffDayOff" exact component={DayOffHod} />;
      <Route
        path="/hod/viewStaffperCourse"
        exact
        component={StaffperCourseHod}
      />
      ;
      <Route path="/hod/viewCoverage" exact component={CoursesCoverage} />;
      <Route
        path="/hod/TeachingAssignments"
        exact
        component={TeachingAssignments}
      />
      ;
      <Route path="/hod/UpdateInstructor" exact component={Instructor} />;
      <Route path="/instructor*" exact component={Nav} />
      <Route path="/instructor" exact component={myprofile} />
      <Route path="/instructor/myprofile" exact component={myprofile} />
      <Route path="/instructor/resetpassword" exact component={resetpassword} />
      <Route path="/instructor/updateprofile" exact component={updateprofile} />
      <Route path="/instructor/aboutcourses" exact component={aboutcourses} />
      <Route path="/instructor/viewmyslots" exact component={Viewmyslots} />
      <Route path="/instructor/myslots" exact component={Myslots} />
      <Route
        path="/instructor/myslotspercourse"
        exact
        component={Myslotspercourse}
      />
      <Route
        path="/instructor/assignstafftoslot"
        exact
        component={Assignstafftoslot}
      />
      <Route
        path="/instructor/updatestaffslot"
        exact
        component={Updatestaffslot}
      />
      <Route
        path="/instructor/updatestafffromcourse"
        exact
        component={Updatestafffromcourse}
      />
      <Route
        path="/instructor/deletestafffromslot"
        exact
        component={Deletestafffromslot}
      />
      <Route
        path="/instructor/removestafffromcourse"
        exact
        component={Removestafffromcourse}
      />
      <Route
        path="/instructor/assigncoordinatortocourse"
        exact
        component={Assigncoordinatortocourse}
      />
      <Route path="/instructor/viewStaff" exact component={Viewstaff} />
      <Route
        path="/instructor/staffpercourse"
        exact
        component={StaffpercourseInstructor}
      />
      <Route path="/instructor/staff" exact component={StaffInstructor} />
      <Route path="/instructor/viewStaff" exact component={StaffAcademic} />
      <Route path="/academic*" exact component={Nav} />
      <Route path="/academic" exact component={academic} />
      <Route path="/academic/viewRequests" exact component={RequestsAcademic} />
      <Route path="/academic/viewProfile" exact component={ProfileAcademic} />
      <Route
        path="/academic/viewStaffDayOff"
        exact
        component={DayOffAcademic}
      />
      <Route
        path="/academic/viewStaffperCourse/:name"
        exact
        component={StaffperCourseAcademic}
      />
      <Route path="/academic/viewshedule" exact component={Viewschedule} />
      <Route
        path="/academic/replacementrequests"
        exact
        component={Replacementrequest}
      />
      <Route
        path="/academic/slotlinkingrequests"
        exact
        component={slotlinkingrequest}
      />
      <Route path="/academic/leaverequest" exact component={leaverequest} />
      <Route path="/academic/dayoffrequests" exact component={dayoffrequest} />
      <Route path="/academic/notifications" exact component={Notifications} />
      <Route
        path="/academic/Viewallrequests"
        exact
        component={Viewallrequests}
      />
      <Route
        path="/academic/Viewacceptedrequests"
        exact
        component={Viewacceptedrequests}
      />
      <Route
        path="/academic/Viewrejectedrequests"
        exact
        component={Viewrejectedrequests}
      />
      <Route
        path="/academic/Viewpendingrequests"
        exact
        component={Viewpendingrequests}
      />
    </Router>
  );
}

export default App;
