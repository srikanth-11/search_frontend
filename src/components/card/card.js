import React,{useState,useEffect} from 'react'
import { Link,useHistory } from "react-router-dom";
import axios from 'axios'
import Loader from "react-loader-spinner";
import { token, username } from '../../context/usercontext'
import auth from '../../service/auth'
import { useAlert } from "react-alert";


function Card() {
 const [information,setInformation] = useState([])
 const [loader, setloader] = useState("false");
  const history = useHistory()
  const alert = useAlert()
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
 useEffect(() => {
  const fetchData = async () => {
    setloader("true");
    const result = await axios.get(
      "https://sri-search.herokuapp.com/information/getinformations",
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,
        },
      }
    );
    if (result) {
      setloader("false");
      setInformation(result.data.informations);
    } else {
      setloader("false")
      alert.error("something went wrong")
    }
    
   
  };

  fetchData();
}, []);

async function deletedata(myid) {
 const data = {
   infoid: myid,
 };
 const result = await axios.delete(
   "https://sri-search.herokuapp.com/information/deleteInformation",
   {
     data,
     headers: {
       "Content-Type": "application/json",
       'authorization': token,
       
     },
   }
 );
 
 if (result) {
  const del = information.filter(info => myid !== info._id)
 setInformation(del)
 } else {
   
 }
}

 return (
  <div className='containerfluid'>
   <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Simplesearch
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/create">
        <button className="btn btn-primary float-left" >
          create
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
    <div className="row">
      <div style={{ zIndex: -1 }}>
        {" "}
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={160}
          width={160}
          visible={loader}
        />
      </div>
   {information.map((item, index) => (
          <div className="col-xl-4 col-md-6 mb-4 p-1 " key={item._id}>
            <div className="card   shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 p-1 font-weight-bold text-danger">
                     {
                       username===item.username&& <button
                       className="btn btn-danger float-right"
                       onClick={() => deletedata(item._id)}
                     >
                       X
                     </button>
                     }
                    </div>
                   
                    
                    
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      BusinessName-{item.businessName}
                    </div>
                     
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      Address-{item.address}
                    </div>
                     
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      Ownername-{item.ownerName}
                    </div>
                     
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      Employeesize-{item.employeeSize}
                    </div>
                    <div className="h5 mb-0 p-1font-weight-bold text-primary">
                      {
                        username===item.username&&<Link to={`Update/${item._id}`}>
                        <button className="btn btn-primary float-right">
                            Update
                          </button>
                        </Link>
                      }
                       
                      {" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
  </div>
  </div>
 )
}

export default Card
