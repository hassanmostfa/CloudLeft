import React from "react";
import {useNavigate } from "react-router-dom";
import "./mainView.css";
import StatisticalCards from "../Statistical Cards/StatisticalCards";
import LineChart from "../Charts/Line Chart/LineChart";
import PieChart from "../Charts/Pie Chart/DoughnutChart";
import PageHeader from "../../Common/page header/PageHeader";
const MainView = () => {


  return (
    <div className="w-100"> {/* Ensure full width */}
      <div className="main-panel page-body-wrapper w-100">
        {/* page header here */}
        <PageHeader name="الرئيسية" icon="fa fa-home" />
        {/* page header here */}
        <div className="content-wrapper w-100">
          {/* start content */}
          <StatisticalCards />

          {/* <div className="row my-5">
              <div className="col-md-8"><LineChart /></div>
              <div className="col-md-4"><PieChart /></div>
          </div> */}
          
        {/* <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="p-3">
              <h3 className="latest_users mt-2 mb-3 text-center">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                    احدث المستخدمين
              <i class="fa fa-angle-double-right" aria-hidden="true"></i>
              <hr />
                    </h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> الاسم </th>
                        <th> البريد الالكتروني </th>
                        <th> الدور </th>
                        <th> الهاتف </th>
                        <th> Tracking ID </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src="assets/images/faces/face1.jpg" className="me-2" alt="image" /> David Grey
                        </td>
                        <td> Fund is not recieved </td>
                        <td>
                          <label className="badge badge-gradient-success">DONE</label>
                        </td>
                        <td> Dec 5, 2017 </td>
                        <td> WD-12345 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src="assets/images/faces/face2.jpg" className="me-2" alt="image" /> Stella Johnson
                        </td>
                        <td> High loading time </td>
                        <td>
                          <label className="badge badge-gradient-warning">PROGRESS</label>
                        </td>
                        <td> Dec 12, 2017 </td>
                        <td> WD-12346 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src="assets/images/faces/face3.jpg" className="me-2" alt="image" /> Marina Michel
                        </td>
                        <td> Website down for one week </td>
                        <td>
                          <label className="badge badge-gradient-info">ON HOLD</label>
                        </td>
                        <td> Dec 16, 2017 </td>
                        <td> WD-12347 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src="assets/images/faces/face4.jpg" className="me-2" alt="image" /> John Doe
                        </td>
                        <td> Loosing control on server </td>
                        <td>
                          <label className="badge badge-gradient-danger">REJECTED</label>
                        </td>
                        <td> Dec 3, 2017 </td>
                        <td> WD-12348 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}

          {/* end content */}
        </div>
      </div>
    </div>
  );
};

export default MainView;
