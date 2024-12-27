    import React from "react";
    import "./pageHeader.css";
    const PageHeader = ({name , icon}) => {
    return (
    <div className="page-header col-md-12 shadow">
        <div className="container d-flex align-items-center justify-content-between">
            <div className="title">
                <h3>
                <span className="page-title-icon bg-gradient-primary text-white me-2 mx-2">
                    <i className={icon} />
                </span>{" "}
                {name}
                </h3>
            </div>

            {/* breadcrumb */}
            <div>
                <nav>
                <ul className="m-0">
                    <li aria-current="page">
                    <span />
                    نظرة عامة{" "}
                    <i className="mdi mdi-alert-circle-outline icon-sm align-middle" />
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    </div>
    );
    };

    export default PageHeader;
