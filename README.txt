GUC portal that provides GUC staff members with multiple useful functionalities. Out of the GUC staff members, our portal targets academic members including (teaching assistants, course instructors, course coordinators, head of departments (HOD)) and HR members. The exact functionalities that are needed described in the README.md file on the master branch.


Readme
Run: index.js
Port: 3000
Functionalities

General:

Log in:

Functionality: login to the system
Route: /login
Request type: POST
Request body: { “email” : “mohamed_b”, “password”: “123456” }
Response:“eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTEiLCJyb2xlIjoiaHIiLCJpYXQiOjE2MDg5MDI3MTZ9.pbK4mqWIZO473IXd38EklRu5WC3qNxnrbtP7ZCgLQuU”

Log out :

Functionality: logout from the system
Route: /logout
Request type: get
Response: “logged out”

View profile:

Functionality: view profile
Route: /view
Request type: get
Response: { id : ac-1 , email : mohamed_b , displayName:Mohamed, salary:1000,faculty:Engineering , department:MET, officeLocation:C5:205, }

Update profile:

Functionality: update profile
Route: /view
Request type: put
Request body: { “email” : “mohamed-b”, “displayName”: “Mohamed B” }
Response: “profile updated”

Reset password:

Functionality: change password
Route: /resetPassword
Request type: put
Request body: { “o” : “123456”, “n”: “abcde” }
Response: “Password updated”



Sign in

Functionality: create a record with the date and time of signing  in
Route: /signin
Request type: post
Response: “hr-2 signed in”

Sign out

Functionality: create a record with the date and time of signing  out
Route: /signout
Request type: post
Response: “hr-2 signed out”

View attendance

Functionality: view all attendance
Route: /attendance
Request type: get
Response: list of records in the following format: [
    {
        "type": "sign in",
        "date": "2020-12-25T09:51:33.953Z"
    },
    {
        "type": "sign out",
        "date": "2020-12-25T09:51:42.651Z"
    }
]

View attendance by month

Functionality: view all attendance for a specified month
Route: /attendanceMonth
Request type: post
Request body: { “m” : 1}
Response: list of records in the following format: [
    {
        "type": "sign in",
        "date": "2020-12-25T09:51:33.953Z"
    },
    {
        "type": "sign out",
        "date": "2020-12-25T09:51:42.651Z"
    }
]

View missing days

Functionality: view missing days
Route: /missingDays
Request type: get
Response: 0




View missing hours

Functionality: view missing hours
Route: /missingHours
Request type: get
Response: 0

HR:

Add Location:

Functionality: add a location to the database 
Route: /hr/location
Request type: POST
Request body: { “n” : “C7.209”, “t”: “lab”, “c”:25 }
Response: “Location added”

Update Location:

Functionality: update a location (n) in the database (set type=t and capacity=c)
Route: /hr/location
Request type: PUT
Request body: { “n” : “C7.209”, “t”: “office”, “c”:25 }
Response: “Updated location: C7.209”

Delete Location:

Functionality: delete a location from the database 
Route: /hr/location/:name
Request type: DELETE
Parameter: name is the name of the location to be deleted
Example of how to call the route: /hr/location/C7.209
Response: “Deleted location: C7.209”


Add Faculty:

Functionality: add a faculty to the database 
Route: /hr/faculty
Request type: POST
Request body: { “f” : “Pharmacy” }
Response: “Created Faculty: Pharmacy”

Update Faculty:

Functionality: update a faculty (f) in the database (set name=updatedF)
Route: /hr/location
Request type: PUT
Request body: { “f” : “Pharmacy”, “updatedF”: “Pharma” }
Response: “Faculty name changed from Pharmacy to Pharma”


Delete Faculty:

Functionality: delete a faculty from the database 
Route: /hr/faculty/:name
Request type: DELETE
Parameter: name is the name of the faculty to be deleted
Example of how to call the route: /hr/faculty/Pharmacy
Response: “Deleted Faculty: Pharmacy ”

Add Department:

Functionality: add a location to the database 
Route: /hr/department
Request type: POST
Request body: { “n” : “MET”, “f”: “Engineering”, “h”:”ac-1” }
Response: “Created Department: MET”

Update Department :

Functionality: update a department (n) in the database (set faculty=f and headofDepartment=h)
Route: /hr/department 
Request type: PUT
Request body: { “n” : “MET”, “f”: “Engineering”, “h”:”ac-2” }
Response: “Updated department: MET”

Delete Department:

Functionality: delete a department from the database 
Route: /hr/department/:name
Request type: DELETE
Parameter: name is the name of the department to be deleted
Example of how to call the route: /hr/department/MET
Response: “Deleted department: MET”

Add Course:

Functionality: add a course to the database 
Route: /hr/course
Request type: POST
Request body: { “c” : “CSEN704”, “d”: “MET” }
Response: “Created Course: CSEN704”

Update Course :

Functionality: update a course (cOld) in the database (set code=cNew and department=d) (you can update one or both of the code and department )
Route: /hr/department 
Request type: PUT
Request body: { “cOld” : “CSEN704”, “cNew”: “CSEN 704”, “d”:”IET” }
Response: “Updated course: CSEN704 (previously) CSEN 704 (now)”

Delete Course:

Functionality: delete a course from the database 
Route: /hr/course/:code
Request type: DELETE
Parameter: code is the code of the course to be deleted
Example of how to call the route: /hr/course/CSEN 704
Response: “Deleted course: CSEN 704”

Add Member:

Functionality: add a member to the database 
Route: /hr/member
Request type: POST
Request body: { “email” : “mohamed_b”, “displayName”: “Mohamed”, “salary”:1000, “faculty”: “Engineering”, “Department”:”MET”,”officeLocation”:”C5.205”,”role”:”teaching assistant” }
Response: “Added Member: “mohamed_b”

Update Member :

Functionality: update a course (cOld) in the database (set code=cNew and department=d) (you can update one or both of the code and department )
Route: /hr/member 
Request type: PUT
Request body: { “cOld” : “CSEN704”, “cNew”: “CSEN 704”, “d”:”IET” }
Response: “Updated Member: hr-2”

Delete Member:

Functionality: delete a member from the database 
Route: /hr/member/:id
Request type: DELETE
Parameter: id is the id of the member to be deleted
Example of how to call the route: /hr/course/ac-2
Response: “Deleted member: ac-2”

Add Sign in/out record:

Functionality: add a sign in/out to the database 
Route: /hr/log
Request type: POST
Request body: { “t” : “sign in”, “d”: “2020-12-25T16:01:30+02:00”, “m”:”hr-2” }
Response: “log added”

View a staff member's attendance record:

Functionality: view attendance record 
Route: /hr/attendance
Request type: POST
Request body: { “i”:”hr-2” }







Response: list of records in the following format: [
    {
        "type": "sign in",
        "date": "2020-12-25T09:51:33.953Z"
    },
    {
        "type": "sign out",
        "date": "2020-12-25T09:51:42.651Z"
    }
]

View staff members with missing hours/days:

Functionality: view all staff members with missing hours/days 
Route: /hr/missing
Request type: GET
Response: list of records in the following format: [“ac-1”,”hr-1”]

Update Salary :

Functionality: update a staff member’s salary
Route: /hr/salary 
Request type: PUT
Request body: { “m” : “hr-2”, “s”: “5000” }
Response: “Salary Updated”

Academic:
HOD:

Functionality: Assign a course instructor for a course in his department
Route: /hod/assignInstructor
Request type: POST
Request body: { "course" : “CSEN704”, “instructor”: “Youssef” }

Functionality: Delete a course instructor for a course in his department
Route: /hod/deleteInstructor
Request type: DELETE
Request body: { "course" : “CSEN704”, “instructor”: “Youssef” }

Functionality: Delete a course instructor for a course in his department
Route: /hod/UpdateInstructor
Request type: POST
Request body: { "course" : “CSEN704”, "Newinstructor": “Youssef” , "Oldinstructor" :"Mohamed" }




Functionality: View all the staff in his/her department
Route: /hod/viewStaff
Request type: GET
Response body: Array of staff members : Example of a single staff member{"_id": "AC1",
"email": "Youssef@gmail.com”","displayName": "Youssef”","role": "HOD"}.

Functionality: View all the staff in his/her department per course
Route: /hod/viewStaffperCourse
Request type: GET
Request body: { "course" : "CSEN704”" }
Response body: Array of staff members : Example of a single staff member{"_id": "AC2",
"email": "Youssefamr@gmail.com","displayName": "Youssef”","role": "instructor"}.

Functionality: View the day off of all the staff in his/her department.
Route: /hod/viewStaffDayOff
Request type: GET
Response body: Array of members with their day offs : Example of a single member{"_id": "AC5","email": "amr@gmail.com","displayName": "amr","DayOff": "Sunday"}.


Functionality: View the day off of all the instructors in his/her department.
Route: /hod/instsDayOff
Request type: GET
Response body: Array of instructors with their day offs : Example of a single instructor{"_id": "AC5","email": "amr@gmail.com","displayName": "amr","DayOff": "Sunday"}.

Functionality: View the day off of all the teaching assistants in his/her department.
Route: /hod/tasDayOff
Request type: GET
Response body: Array of teaching assistants with their day offs : Example of a single teaching assistants
{ "_id": "AC7","email": "medhat@gmail.com","displayName": "medhat","DayOff":"Monday"}.


Functionality: View the day off of all the cordinators in his/her department.
Route: /hod/cordinatorsDayOff
Request type: GET
Response body: Array of teaching assistants with their day offs : Example of a single teaching assistants
{ "_id": "AC9","email": "Mohamed@gmail.com","displayName": "mohamed","DayOff":"Thursday"}.


Functionality: View all the change day off requests sent by staff members in his/her department.
Route: /hod/viewDayOffReq
Request type: GET
Response body: Array of Day Off requests : Example of a single request{"status": "pending","sender": ["AC3"],"_id": "5fe4f6e340c27d5dc8adacfb",
        "desiredDay": "Saturday","Reason": "anyReason"}.


Functionality: View all the leave requests sent by staff members in his/her department.
Route: /hod/viewDayOffReq
Request type: GET
Response body: Array of Day Off requests : Example of a single request{"status": "pending","sender": ["5fe0c9337f8b6c28c4a96f7e"],"_id": "5fe4fb9ca0f1d31af4b0ba4f",
    "typeOfReq": "Annual Leave","Reason": "Sick"}.
	

Functionality: Accept a Day Off request
Route: /hod/acceptDayOffreq
Request type: POST
Request body: IDObject of the request{ "id" : "5fe4f6e340c27d5dc8adacfb"}

Functionality: Accept a Leave request
Route: /hod/acceptLeavereq
Request type: POST
Request body: IDObject of the request{ "id" : "5fe4f6e340c27d5dc8adac09"}

Functionality: reject a Day Off request
Route: /hod/rejectDayOffreq
Request type: POST
Request body: IDObject of the request{ "id" : "5fe4f6e340c27d5dc8adacfc"}


Functionality: Accept a Leave request
Route: /hod/rejectLeavereq
Request type: POST
Request body: IDObject of the request{ "id" : "5fe4f6e340c27d5dc8adacfd"}



Functionality: view Coverage of each course in his/her department
Route: /hod/viewCoverage
Request type: GET
Response body: Each course beside it's coverage : ["CSEN301 : 50%","CSEN302 : 33.33333333333333%"]


Functionality: View teaching assignments of course offered by his department
Route: /hod/viewTeachingAssignments
Request type: GET
Request body: name of the course : "CSEN301"
Response body: teaching assignments for the staff for this course : Example of one teaching assignment 
{"staffMember": ["AC4"],"course": ["CSEN301"],"location": ["c3.201],"timing": "2021-08-05 10:00:00" ]}

Instructor:
viewMySlots:
Functionality: view the assigned slot to the user
Route: /instructor/viewMySlots
Request Type: get
Request body: take course name,or nothing
Response: 
[
    {
        "staffMember": [
            "5fe6362eab9c021ef0013b82"
        ],
        "course": [
            "5fdc973f6f90bc1748984ca5"
        ],
        "_id": "5fdcb63fcea0e816108ac1d7",
        "location": "5fe645551a0b4625fc1ce70d",
        "__v": 0
    }
]

assignStaffToSlot:
Functionality: assign a current teaching assistants in a course to a specific slot
Route: /instructor/assignStaffToSlot
Request Type: post
Request body: {"member":"ahmed","course":"math","date":"2020-01-02T04:30:00.000+00:00","room":"c2.202"}
Response: member assigned successfully

Functionality: view Coverage of each course in his/her department
Route: /instructor/viewCoverage
Request type: GET
Response body: Each course beside it's coverage : ["CSEN301 : 50%","CSEN302 : 33.33333333333333%"]

updateStaffOfSlot:
Functionality: update a current teaching assistants by a new one in a course to a specific slot
Route: /instructor/updateStaffOfSlot
Request Type: put
Request body: {"newMember":"ahmed","currentMember":"youssef","course":"math","date":"2020-01-02T04:30:00.000+00:00","room":"c2.202"}
Response: The new member updated successfully in this time and location




updateStaffFromCourse:
Functionality: update a current teaching assistants by a new one who does not exist in the course
Route: /instructor/updateStaffFromCourse
Request Type: put
Request body: {"newMember":"ahmed","currentMember":"youssef","course":"math"}
Response: The new member updated successfully in the course and slots




deleteStaffFromSlot:
Functionality: delete a current teaching assistants in the course from a specific slot
Route: /instructor/deleteStaffFromSlot
Request Type: delete
Request body: {"member":"ahmed","course":"math","date":"2020-01-02T04:30:00.000+00:00","room":"c2.202"}
Response: member deleted successfully from this time and location


RemoveStaffFromCourse:
Functionality: delete a current teaching assistants from the course and teaching slots
Route: /instructor/RemoveStaffFromCourse
Request Type: delete
Request body: {"member":"ahmed","course":"math"}
Response: Member removed successfully from this course and his assigned slots



assignCoordinatorToCourse
Functionality: asign a coordinator to a course
Route: /instructor/assignCoordinatorToCourse
Request Type: put
Request body: {"member":"ahmed","course":"math"}
Response: This member assigned successfully to be the coordinator

Academic Member:
Academic member Functionalities:
Any academic member can do the following:
//////////
Functionality: View their schedule
Route: /viewschedule
Request type: GET
Response body: schedule of the member :
Example{
course:Math
location:C2.202
timing:2015-03-25T10:00:00.000+00:00
}
/////////////

Functionality: send a replacement request  
Route: /sendreplacmentrequest
Request type: POST
Request body: idreceiver:,course,location,date
/////////////

Functionality: view replacement request
Route: /viewreplacementrequest
Request type: GET
Response body: view all replacement requests that had been sent
Example{
status:"pending"
dateofreq:2020-12-25T17:39:36.045+00:00
sender:5fe0403bff522030a04d8591
receiver:5fdf5c405438702b424d681c
}
//////////////

Functionality: send a slotlinking request to course coordinator  
Route: /sendslotlinkingrequest
Request type: POST
Request body: course,location,timing.
////////////////

Functionality: send a DayOff Request to HOD
Route: /sendDayOffRequest
Request type: POST
Request body: desiredDay,Reason.
//////////////

Functionality: send a Leave request to HOD
Route: /sendLeaverequest
Request type: POST
Request body: typeOfleaveReq,Reasonforleave.
/////////////
Functionality: View all the requests of member
Route: /viewAllstatusRequests
Request type: GET
Response body: view all requests that had been sent
Example{ 
leaverequests:
"status": "pending",
"sender": 5fdf5adacda6542b320cafc2
"dateofreq": [],
 "_id": "5fe636324242c25d944c62f3",
 "typeOfReq": "Maternity Leave",
  "Reason": "",
 "receiver": "5fdf67603e152f2bec1576e4",
      
"dayOFFRequests":
 "status": "pending",
  "sender": "5fdf5adacda6542b320cafc2"
 "dateofreq": [],
 "_id": "5fe6354c4242c25d944c62f2",
"desiredDay": "Sunday",
 "Reason": "saym",
 "receiver": "5fdf67603e152f2bec1576e4",  
  ///////////////////
Functionality: view All status Accepted Requests
Route: /viewAllstatusAcceptedRequests
Request type: GET
Response body: view all accepted requests that had been sent
Example{ 
leaverequests:
"status": "accepted"
"sender": 5fdf5adacda6542b320cafc2
"dateofreq": [],
 "_id": "5fe636324242c25d944c62f3",
 "typeOfReq": "Maternity Leave",
  "Reason": "",
 "receiver": "5fdf67603e152f2bec1576e4",
      
"dayOFFRequests":
 "status": "accepted"
  "sender": "5fdf5adacda6542b320cafc2"
 "dateofreq": [],
 "_id": "5fe6354c4242c25d944c62f2",
"desiredDay": "Sunday",
 "Reason": "saym",
 "receiver": "5fdf67603e152f2bec1576e4",  
  ///////////////////
Functionality: view All status rejected Requests
Route: /viewAllstatusRejectedLeaveReq
Request type: GET
Response body: view all rejected requests that had been sent
Example{ 
leaverequests:
"status": "rejected"
"sender": 5fdf5adacda6542b320cafc2
"dateofreq": [],
 "_id": "5fe636324242c25d944c62f3",
 "typeOfReq": "Maternity Leave",
  "Reason": "",
 "receiver": "5fdf67603e152f2bec1576e4",
      
"dayOFFRequests":
 "status": "rejected"
  "sender": "5fdf5adacda6542b320cafc2"
 "dateofreq": [],
 "_id": "5fe6354c4242c25d944c62f2",
"desiredDay": "Sunday",
 "Reason": "saym",
 "receiver": "5fdf67603e152f2bec1576e4",  
  ///////////////////
Functionality: view All status pending Requests
Route: /viewAllstatusPendingRequests
Request type: GET
Response body: view all pending requests that had been sent
Example{ 
leaverequests:
"status": "pending" 
"sender": 5fdf5adacda6542b320cafc2
"dateofreq": [],
 "_id": "5fe636324242c25d944c62f3",
 "typeOfReq": "Maternity Leave",
  "Reason": "",
 "receiver": "5fdf67603e152f2bec1576e4",
      
"dayOFFRequests":
 "status": "pending" 
  "sender": "5fdf5adacda6542b320cafc2"
 "dateofreq": [],
 "_id": "5fe6354c4242c25d944c62f2",
"desiredDay": "Sunday",
 "Reason": "saym",
 "receiver": "5fdf67603e152f2bec1576e4", 
/////////////// 

Functionality: cancel a leave Request
Route: /cancelleaveRequest
Request type: POST
Request body: IDforrequest
///////////////

Functionality: cancel a dayOff Request
Route: /canceldayOffRequest
Request type: POST
Request body:IDforrequest
///////////////////

Functionality: cancel a Slot linking Request
Route: /cancelSlotlinkingRequest
Request type: POST
Request body: IDforrequest
/////////////////////////

Functionality: cancel a replacment Request
Route: /cancelreplacmentRequest
Request type: POST
Request body: IDforrequest
///////////////////

Functionality: Notify the member whenever the  day off request is accepted  
Route: /hod/acceptDayOffreq
Request type: POST
Request body: id:ID for request.
///////////////////////

Functionality: Notify the member whenever the  day off request is rejected 
Route: /hod/rejectDayOffreq
Request type: POST
Request body: id:ID for request.
///////////////////

Functionality: Notify the member whenever the  leave request is accepted 
Route: /acceptLeavereq
Request type: POST
Request body: id:ID for request.
///////////////////

Functionality: Notify the member whenever the  leave request is rejected 
Route: /rejectLeavereq
Request type: POST
Request body: id:ID for request.
////////////////////

Functionality: Notify the member whenever the  leave request is rejected or accepted
Route: /changeslotlinkingRequestStatus
Request type: POST
Request body: id:ID for request.

	Course Coordinator:
-Add Course_Slot:

Functionality: add a course slot in the academic member course 
Route: /addCourseSlot
Request type: POST
Request body: { ““req.body.slot”” : “2nd” }
Response: “Course slot added”

-Update Course_Slot:

Functionality: update a course slot in his/her course 
Route: /updateCourseSlot
Request type: PUT
Request body: { “req.body.slot” : “2nd”, }
Response: “Updated Slot: no.”

-Delete Course_Slot:

Functionality: delete a course slot from the database 
Route: /deleteCourseSlot/no.
Request type: DELETE
Parameter: number is the number of the Course_Slot to be deleted
Example of how to call the route: /deleteCourseSlot/2
Response: “Deleted Slot: no.”



Accept/Reject “Slot-Linking”

Functionality: Accept/reject “slot-Linking” requests from academic members linked to his/her course
Route: /ChangeRequestStatus/:id;
Request type: Patch
Request body: { “Monday” : “2nd” }
Response: “Slot-Linking Accepted/rejected”


View “Slot-Linking”

Functionality: View “slot-Linking” requests from academic members linked to his/her course
Route: /readAll
Request type: Get
Request body: { “request.find” }
Response: “slot-Linking: requests”











