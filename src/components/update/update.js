import React, {useState,useEffect}from 'react'
import axios from 'axios'
import { username, token } from '../../context/usercontext'
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import auth from '../../service/auth'

function Update(props) {
  const history = useHistory()
  const alert = useAlert()
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
 const informationId = props.match.params.informationId;
 const [information, setInformation] = useState([]);
 const onSubmitHandler = async (e) => {
  e.preventDefault()
  const data={
   businessName:createinformation.businessName,
   address:createinformation.address,
   ownerName:createinformation.ownerName,
   employeeSize:createinformation.employeeSize,
   infoid:informationId
  }

  const result = await axios.put("http://localhost:5000/information/updateinformation", data, {
   headers: {
     'Content-Type': 'application/json',
     'authorization': token,
   },
 })
 if (result) {
  alert.success(result.data.message)
  history.push("/app")
  
 } else {
  alert.error("question not created")
 }
}

useEffect(() => {
 const fetchData = async () => {
  
  
   const result = await axios.get(
     `https://sri-search.herokuapp.com/information/getinformation/${informationId}`,
     {
       headers: {
         "Content-Type": "application/json",
         'authorization': token,
       },
     }
   );
   if (result) {
     
     setInformation(result.data.information);


   }
 };

 fetchData();
}, [informationId]);

const [createinformation,setCreateinformation] = useState({businessName:'',address:'',ownerName:'',employeeSize:''})
 return (
  <div className='container-fluid'>
    <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Simplesearch
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/app">
        <button className="btn btn-primary float-left" >
          Allinformation
   </button>
      </Link>
    </div>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <button className="btn btn-dark float-right" onClick={Logout}>
        logout
   </button>
    </div>
    <div style={{ justifyContent: "center", textAlign: "center" }} >
    <Link to="/search">
        <button className="btn btn-primary " >
          search
   </button>
      </Link>
    </div>
    <div>
      <h1
        style={{ justifyContent: "center", textAlign: "center" }}
        id="fix"
        className="text-primary center"
      >
        {username}
      </h1>
    </div>
   <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Name of business</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={information.businessName}
          value={createinformation.businessName}
          onChange={(e) => setCreateinformation({ ...createinformation, businessName: e.target.value })} 
        />
      </div>


      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Address</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder={information.address}
          value={createinformation.address}
          onChange={(e) => setCreateinformation({ ...createinformation, address: e.target.value })}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="col">
          <label htmlFor="exampleFormControlInput2">Ownername</label>
          <input type="text" className="form-control" id="exampleFormControlInput2" placeholder={information.ownerName}
            value={createinformation.ownerName}
            onChange={(e) => setCreateinformation({ ...createinformation, ownerName: e.target.value })}
          />
        </div>
        <div className="col">
          <label htmlFor="exampleFormControlInput3">Employeesize</label>
          <input type="text" className="form-control" id="exampleFormControlInput3" placeholder={information.employeeSize}
            value={createinformation.employeeSize}
            onChange={(e) => setCreateinformation({ ...createinformation, employeeSize: e.target.value })}
          />
        </div>
      </div>
      <br />
      <button
        type="submit"
        className=" btn btn-outline-primary py-2 float-right"
        onClick={onSubmitHandler}
      >
       Update
                </button>

    </form>
  </div>

 )
}

export default Update
