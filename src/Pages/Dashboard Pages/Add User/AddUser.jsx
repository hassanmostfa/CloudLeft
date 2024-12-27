    import React , { useState } from "react";
    import "./addUser.css";
    import Header from "../../../Components/Admin Components/header/Header";
    import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
    import PageHeader from "../../../Components/Common/page header/PageHeader";
    import { useNavigate } from 'react-router-dom';


    const AddUser = () => {
        
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',email: '',phone: '',password: '', role: '',
    });

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value,});
    };


    


    return (
        <div>
        <Header />
        <div className="page-body-wrapper">
            <SideNav />
            <div className="add_user_container">
            <div style={{ marginTop: "30px" }}>
                <PageHeader name="اضافة مستخدم" icon="fa fa-plus" />
            </div>
            <div className="col-12 grid-margin stretch-card content-wrapper">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                    <i className="mdi mdi-account-plus"></i> نموذج اضافة مستخدم
                    جديد
                    </h4>
                    <p className="card-description">
                    {" "}
                    الرجاء ملء الحقول التالية والتاكد من صحة البيانات قبل التاكيد{" "}
                    </p>
                    <form className="forms-sample">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="exampleInputName1">الاسم</label>
                                <input
                                type="text"
                                className="form-control"
                                id="exampleInputName1"
                                placeholder="ادخل الاسم"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                />
                                {error && <p className="text-danger">{error.name}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="exampleInputName1">الهاتف</label>
                                    <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="ادخل الهاتف"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    />
                                    {error && <p className="text-danger">{error.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="exampleInputEmail3">البريد الالكتروني</label>
                                <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail3"
                                placeholder="ex: tech.minds@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                dir="ltr"
                                />

                                {error && <p className="text-danger">{error.email}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="exampleInputName1"> اختر الدور </label>
                                <select dir="ltr" className="form-control form-select" value={formData.role} onChange={handleChange} name="role">
                                    <option value="" disabled selected>اختر الدور</option>
                                    <option value="admin">ادمن</option>
                                    <option value="teacher">معلم</option>
                                    <option value="student">طالب</option>
                                </select>
                                {error && <p className="text-danger">{error.role}</p>}
                            </div>
                        </div>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword4">كلمة المرور</label>
                        <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword4"
                        placeholder="ادخل كلمة المرور"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        />
                        {error && <p className="text-danger">{error.password}</p>}
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button
                            type="submit"
                            className="btn btn-gradient-primary me-2"
                        >
                            { 'انشاء'}
                        </button>
                        <button className="btn btn-gradient-danger">الغاء</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };
    export default AddUser;
