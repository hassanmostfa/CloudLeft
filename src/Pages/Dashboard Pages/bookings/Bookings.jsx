import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 40;

  useEffect(() => {
    fetchBookings();
    fetchCategories();
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://back.testcls.pro/api/data/non-food");
      const bookingsData = response.data.data || [];
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://back.testcls.pro/api/categories/maincategories/Non Food");
      setCategories(response.data.data || []);
    } catch (err) {
      setCategories([]);
    }
  };

  // Function to filter bookings by search term
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    applyFilters(query, selectedCategory);
  };

  // Function to filter bookings by category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    applyFilters(searchTerm, category);
  };

  // Function to apply filters
  const applyFilters = (query, category) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = bookings.filter((booking) => {
      const name = booking["Name-En"] || "";
      const brand = booking.Brand || "";
      const barcode = booking.Barcode || "";
      console.log("Name:", name, "Brand:", brand, "Barcode:", barcode);
  
      // Assuming the category property in the bookings data is "En Categorie 1"
      const categoryMatch = category? booking["En Categorie 1"] === category : true;

      return (
        categoryMatch &&
        (name.toLowerCase().includes(lowerCaseQuery) ||
          brand.toLowerCase().includes(lowerCaseQuery) ||
          barcode.includes(lowerCaseQuery))
      );
    });
    setFilteredBookings(filtered);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="Non Food Products" icon="fa fa-cogs" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    All Non Food Products
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                  </h3>
                  <hr />
                  {/* Filters */}
                  <div className="row mb-3">
                    {/* Search Input */}
                    <div className="col-md-6 d-flex align-items-center position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, brand, or barcode"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <i
                        style={{ left: "440px", color: "#384a47" }}
                        className="fa fa-search position-absolute"
                        aria-hidden="true"
                      ></i>
                    </div>
                    {/* Category Select */}
                    <div className="col-md-6">
                      <select className="form-control" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name_en}>
                            {category.name_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> 

                  <div className="table-responsive">
                    {isLoading? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error? (
                      <div>{error}</div>
                    ) : (
                      <div>
                        <table className="table text-center table-hover">
                          <thead className="table-dark">
                            <tr style={{ fontWeight: "bold" }}>
                              <th>#</th>
                              <th>Code</th>
                              <th>Brand</th>
                              <th>En Category 1</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredBookings
                            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                            .map((product, index) => (
                                <tr key={product.id}>
                                  <td>{currentPage * itemsPerPage + index + 1}</td>
                                  <td>{product.Barcode}</td>
                                  <td>{product.Brand}</td>
                                  <td>{product["En Categorie 1"]}</td>
                                  <td>{product["Name-En"]}</td>
                                  <td>{product["Pc Price"]}</td>
                                  <td>
                                    <button
                                      className="btn"
                                      title="show"
                                      style={{ color: "#384a47" }}
                                      onClick={() =>
                                        navigate(`/admin/product/show/${product["Barcode"]}`, {
                                          state: { service: product || null },
                                        })
                                      }
                                    >
                                      <i className="fa fa-eye" aria-hidden="true"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination d-flex justify-content-center">
                          {Array.from(Array(Math.ceil(filteredBookings.length / itemsPerPage)).keys()).map((page) => (
                            <button
                              className={`btn mx-1 btn-outline-dark ${page === currentPage? "active" : ""}`}
                              key={page + 1}
                              onClick={() => changePage(page)}
                            >
                              {page + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Bookings;