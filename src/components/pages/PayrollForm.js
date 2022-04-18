import React, { useState , useEffect, useCallback} from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import deleteIcon from "../../Assets/icons/delete-black-18dp.svg";
import editIcon from "../../Assets/icons/create-black-18dp.svg";
import viewIcon from "../../Assets/icons/illuminate.png";
import logo from "../../Assets/images/logo.png"

const PayrollForm = () => {

  //let employeeList = JSON.parse(localStorage.getItem('EmployeeList'));
   // console.log(employeeList);

    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3001/users");
        setUser(result.data);
    }
    const viewUserData= async (id) => {
      await axios.viewUser(`http://localhost:3001/users/${id}`);
      loadUsers();
  }
    const deleteUserData= async (id) => {
      await axios.delete(`http://localhost:3001/users/${id}`);
      loadUsers();
  }

    return (
        <div className="container" >
            <div className="py-4">
              <div className="header-content header">
              <img src={logo} alt="" />
              <h3>Address Book</h3>
              
              </div><br /><br />
              <div><Link className="btn" to="/users/add">Add Contact</Link>
              </div>
              <div className="length">
                ADDRESS BOOK<br/><div class="bbb">{users.length}</div>
              </div>
             <table class="table border shadow">
          <thead class="thead-dark">
    <tr>
      
      <th scope="col">FULLNAME</th>
      <th scope="col">ADDRESS</th>
      <th scope="col">CITY</th>
      <th scope="col">STATE</th>
      <th scope="col">ZIP CODE</th>
      <th scope="col">PHONE NUMBER</th>
      <th scope="col">ACTIONS</th>
        
      
    </tr>
  </thead>
  <tbody>
            {users.map((user, index) => (
              <tr>
               
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zipcode}</td>
                <td>{user.phonenumber}</td>
                <td>
                  <Link to={`/users/${user.id}`}>
                  <img  src={viewIcon}  alt="eye" class="imageeye" />
                  </Link>
                 <img src={deleteIcon} alt="delete" onClick={() => deleteUserData(user.id)}/>
                  <Link to={`/users/edit/${user.id}`}>
                  <img  src={editIcon} alt="edit"  />
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PayrollForm;