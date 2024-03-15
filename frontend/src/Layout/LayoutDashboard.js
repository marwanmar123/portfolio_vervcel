import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";

function LayoutDashboard(props) {
  const { user } = useUser();
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </Link>
            <img
              src={`https://portfolio-murex-tau-95.vercel.app/uploads/${user.image}`}
              width={50}
              alt=""
            />
            {user.username}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
                <ul
                  className="collapse show nav flex-column ms-1"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/profiles" className="nav-link px-0">
                      Profiles{" "}
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/projects" className="nav-link px-0">
                      Projects{" "}
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/projectCategory" className="nav-link px-0">
                      projectCategory{" "}
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/categories" className="nav-link px-0">
                      Categories{" "}
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/skills" className="nav-link px-0">
                      Skills{" "}
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/contacts" className="nav-link px-0">
                      Contacts{" "}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutDashboard;
