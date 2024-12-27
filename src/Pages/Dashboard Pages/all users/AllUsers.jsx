    import React from "react";
    import "./allUsers.css";
    import Header from "../../../Components/Admin Components/header/Header";
    import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
    import PageHeader from "../../../Components/Common/page header/PageHeader";

    const AllUsers = () => {

        let users = [
            { name: "محمد محمد", email: "m@m.com", phone: "01000000000", role: "admin", id: 1 },
        ];

    return (
        <div>
        <Header />
        <div className="page-body-wrapper">
            <SideNav />
            <div className="add_user_container">
                <div style={{ marginTop: "30px" }}>
                <PageHeader name="كل المستخدمين" icon="fa fa-users"/>
                </div>
            <div className="row content-wrapper">
                <div className="col-12 grid-margin">
                <div className="card">
                    <div className="p-3">
                    <h3 className="latest_users mt-2 mb-3 text-center">
                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                        كل المستخدمين
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                        <hr />
                    </h3>
                    <div className="table-responsive">
                        {/* {isLoading ? (
                            <div className="center-loader">
                                <div class="loader"></div>
                            </div>
                        ) : error ? (
                        <div>Error loading users</div> // Display error message if there is an error
                        ) : ( */}
                        <table className="table text-center table-hover" >
                            <thead className="table-dark">
                            <tr style={{ fontWeight: "bold" }}>
                                <th># </th>
                                <th> الاسم </th>
                                <th> البريد الالكتروني </th>
                                <th> الدور </th>
                                <th> الهاتف </th>
                                <th> الحالة </th>
                                <th> اجراء </th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user,index) => (
                                <tr key={user.id}>
                                    <td>{index + 1} </td> {/* Tracking ID as the user ID */}
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === "admin" && (
                                            <label className="badge badge-gradient-success">ادمن</label>
                                        )}
                                            {user.role === "student" && (
                                                <label className="badge badge-gradient-danger">طالب</label>
                                            )}
                                            {user.role === "teacher" && (
                                                <label className="badge badge-gradient-warning">معلم</label>
                                            )}
                                    </td>
                                    <td>{user.phone || "N/A"}</td> {/* Add phone field if available */}

                                    <td>
                                        {user.status === "active" && (
                                            <label className="badge badge-gradient-success">نشط</label>
                                        )}
                                        {user.status !== "active" && (
                                            <label className="badge badge-gradient-danger">غير نشط</label>
                                        )}
                                        </td>

                                    <td>
                                        
                                        <button className="btn" style={{ color:"var(--main-color)" }} title="عرض">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </button>

                                        <button className="btn text-success" title="تعديل">
                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                        </button>

                                        <button className="btn text-danger" title="حذف">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>

                                        
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* )} */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default AllUsers;
