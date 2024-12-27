import React from "react";
import "./StatisticalCards.css";
const StatisticalCards = () => {
    return (
    <div className="StatisticalCards">
        <div className="row d-flex justify-content-center">

            {/* Box 1 */}
        <div className="col-md-4 box d-flex justify-content-center gap-3 align-items-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="text-muted fs-6 mb-2 text-center">الارباح</span>
                <p> <span>10000</span> $</p>
            </div>
            <i class="fa fa-usd" aria-hidden="true"></i>
        </div>

            {/* Box 2 */}
        <div className="box col-md-4 d-flex justify-content-center gap-3 align-items-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="text-muted fs-6 mb-2 text-center">عدد الطلبات</span>
                <p> <span>500</span> </p>
            </div>
            <i class="fa fa-user" aria-hidden="true"></i>
        </div>


            {/* Box 3 */}
        <div className="box col-md-4 d-flex justify-content-center gap-3 align-items-center">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="text-muted fs-6 mb-2 text-center">عدد العملاء</span>
                <p> <span>200</span> </p>
            </div>
            <i class="fa fa-clipboard" aria-hidden="true"></i>
        </div>
        


        </div>
    </div>
    );
};

export default StatisticalCards;
