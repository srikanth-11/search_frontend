import React, { useState } from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import { token, username } from '../../context/usercontext'
import auth from '../../service/auth'
import { useAlert } from "react-alert";
import { useHistory, Link } from "react-router-dom";

function Search() {
  const [show, setShow] = useState(false)
  const [information, setInformation] = useState([])
  const [query, setQuery] = useState({ myQuery: '' })
  const [loader, setloader] = useState("false");
  const history = useHistory()
  const alert = useAlert()
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  const fetchData = async () => {
    setloader("true");
    setShow(true)
    if (!query.myQuery) {
      setloader("false")
      alert.error("please enter the search word")
    }
    const result = await axios.get(
      `https://sri-search.herokuapp.com/information/getinformationname/${query.myQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,
        },
      }
    );
    if (result) {
      setloader("false");
      setInformation(result.data.information);
    } else {
      setloader("false")
      alert.error("something went wrong")
    }

  };
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


      <div class="input-group">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon"
          value={query.myQuery}
          onChange={(e) => setQuery({ ...query, myQuery: e.target.value })}
        />
        <button type="button" class="btn btn-outline-primary" onClick={fetchData}>search</button>
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

        {
          show && information.map((item, index) => (
            <div className="col-xl-4 col-md-6 mb-4 p-1 " key={item._id}>
              <div className="card   shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">



                      <div className="h5 mb-0 font-weight-bold text-primary">
                        Businessname-{item.businessName}
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

export default Search
