import { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import API from '../api/API.js';
import './Pages.scss';
import './FauxLogin.scss';

export default function Login() {
  // Initialisation ------------------------------
  const staffEndpoint = `/users/staff`;
  const studentEndpoint = `/users/student`;
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  // State ---------------------------------------
  const [students, setStudents] = useState(null);
  const [staff, setStaff] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const apiCall = async (endpoint,setState) => {
    const response = await API.get(endpoint);
    response.isSuccess && setState(response.result);
  };
  
  useEffect(() => { apiCall(studentEndpoint,setStudents) }, [studentEndpoint]);
  useEffect(() => { apiCall(staffEndpoint,setStaff) }, [staffEndpoint]);
  
  // Context -------------------------------------
  // Methods -------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    login(selectedUser);
    navigate(state?.path || '/');
  }

  const handleStudentChange = (event) => setSelectedUser(students[parseInt(event.target.value)]);
  const handleStaffChange = (event) => setSelectedUser(staff[parseInt(event.target.value)]);

  const left = (str, num) => str.slice(0, num - str.length);

  // View ----------------------------------------
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h2>... as a student</h2>
        <label>Use this dropdown to select a student</label>
        {
          !students 
            ? <p className="formError">No student records have been recovered</p>
            : <>
                <select onChange={handleStudentChange}>
                  <option value={null}>Select student ...</option>
                  {
                    students.map((user,index) =>
                      <option key={user.UserID} value={index}>
                        {`${user.UserLastname}, ${user.UserFirstname} (${left(user.UserEmail,8)})`}
                      </option>
                    )
                  }
                </select>
              </>
        }
        <h2>... as a member of staff</h2>
        <label>Use this dropdown to select a staff member</label>
        {
          !staff 
            ? <p className="formError">No staff records have been recovered</p>
            : <>
                <select onChange={handleStaffChange}>
                  <option value={null}>Select staff member ...</option>
                  {
                    staff.map((user,index) =>
                      <option key={user.UserID} value={index}>
                        {`${user.UserLastname}, ${user.UserFirstname} (${left(user.UserEmail,8)})`}
                      </option>
                    )
                  }
                </select>
              </>
        }
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
