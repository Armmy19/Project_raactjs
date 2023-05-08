import Axios from "axios";
import { useState } from "react";

function App() {

  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [newpassword, setNewPassword] = useState(0);


  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      email: email,
      password: password,
      status: status,

    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          status: status,
          email: email,
          password: password,

        },
      ]);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { password: newpassword, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id = id
              ? {
                id: val.id,
                email: val.email,
                password: newpassword,
              }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };



  return (
    <div className="App container mt-5">
      <div className="App container">
        <h1> กำหนดสิทธิ์ ทหารกองประจำการ</h1>
        <div className="information">
          <form action="">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                ชื่อ-สกุล:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="age">สิทธิ์/รุ่นปี:</label>
              <select class="form-select" aria-label="Default select example" onChange={(event) => {
                setStatus(event.target.value)
              }}
              >
                <option selected>กำหนดสิทธิ์</option>
                <option value="65/2">รุ่น 65/2</option>
                <option value="64/2">รุ่น 64/2</option>
                <option value="64/1">รุ่น 64/1</option>
              </select>

            </div>
            <div className="mb-3">
              <label htmlFor="age">กำนหดรหัสผ่าน:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}

              />
            </div>


            <button class="btn btn-success" onClick={addEmployee}>
              Add user
            </button>
          </form>
        </div>
        <hr />
        <div className="employees">
          <button class="btn btn-primary" onClick={getEmployees}>
            Show user
          </button>
          <br />
          <br />
          {employeeList.map((val, key) => {
            return (
              <div className="employee card">
                <div className="card-body text-left">
                  <p className="card-text">ชื่อ-สกุล: {val.email}</p>
                  <p className="card-text">รุ่นทหาร/ปี: {val.status}</p>
                  <p className="card-text">รหัสผ่าน: {val.password}</p>
                  <div className="d-flex">
                    <input
                      className="form-control"
                      style={{ width: "300px" }}
                      type="number"
                      placeholder={val.password}
                      onChange={(event) => {
                        setNewPassword(event.target.value)
                      }}
                    />
                    <button className="btn btn-warning" onClick={() => { updateEmployeeWage(val.id) }}>Update</button>

                    <button className="btn btn-danger" onClick={() => { deleteEmployee(val.id) }}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default App;




