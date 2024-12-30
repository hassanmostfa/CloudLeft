import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Admin Components/header/Header";
import SideNav from "../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../Components/Common/page header/PageHeader";

const ShowProduct = () => {
  const location = useLocation();
  const { service } = location.state || {};  // Retrieve the product data

  if (!service) {
    return (
      <div>
        <Header />
        <div className="page-body-wrapper">
          <SideNav />
          <div className="add_user_container">
            <PageHeader name="Product Details" icon="fa fa-info-circle" />
            <div className="alert alert-danger mt-4">
              No product details available.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <PageHeader name="Product Details" icon="fa fa-info-circle" />
          <div className="card m-4 p-4">
            <h3>Product Details</h3>
            <hr />
            <table className="table table-responsive table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Attribute</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>SKU (ERP):</strong></td>
                  <td>{service["sku-ERP"]}</td>
                </tr>
                <tr>
                  <td><strong>Barcode:</strong></td>
                  <td>{service.Barcode}</td>
                </tr>
                <tr>
                  <td><strong>SKU (WEB):</strong></td>
                  <td>{service["sku-WEB"] || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Category 1 (English):</strong></td>
                  <td>{service["En Categorie 1"]}</td>
                </tr>
                <tr>
                  <td><strong>Category 1 (Arabic):</strong></td>
                  <td>{service["Ar Categorie 1"]}</td>
                </tr>
                <tr>
                  <td><strong>Name (English):</strong></td>
                  <td>{service["Name-En"]}</td>
                </tr>
                <tr>
                  <td><strong>Name (Arabic):</strong></td>
                  <td>{service["Name-Ar"]}</td>
                </tr>
                <tr>
                  <td><strong>Price (Pc):</strong></td>
                  <td>${service["Pc Price"]}</td>
                </tr>
                <tr>
                  <td><strong>Pack Price:</strong></td>
                  <td>${service["Pack Price"]}</td>
                </tr>
                <tr>
                  <td><strong>Brand:</strong></td>
                  <td>{service.Brand}</td>
                </tr>
                <tr>
                  <td><strong>Flavour (English):</strong></td>
                  <td>{service["Flavours-En"]}</td>
                </tr>
                <tr>
                  <td><strong>Flavour (Arabic):</strong></td>
                  <td>{service["Flavours-Ar"]}</td>
                </tr>
                <tr>
                  <td><strong>Country of Manufacture:</strong></td>
                  <td>{service.country_of_manufacture}</td>
                </tr>
                <tr>
                  <td><strong>Product Type:</strong></td>
                  <td>{service.product_type}</td>
                </tr>
                <tr>
                  <td><strong>Units per Pack:</strong></td>
                  <td>{service.Pcs}</td>
                </tr>
                <tr>
                  <td><strong>Pack Size:</strong></td>
                  <td>{service["Pack size"]}</td>
                </tr>
                <tr>
                  <td><strong>Color (English):</strong></td>
                  <td>{service["Color-En"] || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Color (Arabic):</strong></td>
                  <td>{service["Color-Ar"] || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>UMF Degree:</strong></td>
                  <td>{service["UMF Degree"] || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Weight:</strong></td>
                  <td>{service.Weight || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
