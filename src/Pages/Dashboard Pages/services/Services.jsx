import React, { useEffect, useState } from'react';
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import PageHeader from '../../../Components/Common/page header/PageHeader';
import { useNavigate } from'react-router-dom';
import axios from 'axios';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchServices();
    fetchCategories();
    document.body.classList.remove('sidebar-icon-only'); // Close sidebar on page change
  }, []);

  const fetchServices = async (query = '', category = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://back.testcls.pro/api/data/food?name=${query}&category=${category}`
      );
      setServices(response.data.data); // Assuming the data is in `data.data`
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://back.testcls.pro/api/categories/maincategories/Food`);
      setCategories(response.data.data); // Assuming the categories come as an array
    } catch (err) {
      setCategories([]); // If the fetch fails, keep an empty list
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, selectedCategory); // Apply filters with search and selected category
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    applyFilters(searchQuery, category); // Apply filters with search and selected category
  };

  const applyFilters = (query, category) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = services.filter((service) => {
      const name = service["Name-En"] || "";
      const brand = service.Brand || "";
      const barcode = service.Barcode || "";
      // Assuming the category property in the services data is "En Categorie 1"
      const categoryMatch = category? service["En Categorie 1"] === category : true;

      return (
        categoryMatch &&
        (name.toLowerCase().includes(lowerCaseQuery) ||
          brand.toLowerCase().includes(lowerCaseQuery) ||
          barcode.includes(lowerCaseQuery))
      );
    });
    setServices(filtered);
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
          <div style={{ marginTop: '30px' }}>
            <PageHeader name="Food Products" icon="fa fa-cogs" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    All Food Products
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
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <i style={{ left: '440px', color: '#384a47' }} className="fa fa-search position-absolute" aria-hidden="true"></i>
                    </div>
                    {/* Category Select */}
                    <div className="col-md-6">
                      <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
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
                            <tr style={{ fontWeight: 'bold' }}>
                              <th>#</th>
                              <th> Code </th>
                              <th> Brand </th>
                              <th>En Category 1</th>
                              <th> Name </th>
                              <th> Price </th>
                              <th> Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {services
                             .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                             .map((service, index) => (
                                <tr key={service.id}>
                                  <td>{currentPage * itemsPerPage + index + 1} </td>
                                  <td>{service.Barcode}</td>
                                  <td>{service.Brand}</td>
                                  <td>{service['En Categorie 1']}</td>
                                  <td>{service['Name-En']}</td>
                                  <td>{service['Pc Price']}</td>
                                  <td>
                                    <button
                                      className="btn"
                                      title="show"
                                      style={{ color: '#384a47' }}
                                      onClick={() =>
                                        navigate(`/admin/product/show/${service['Barcode']}`, { state: { service } })
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
                          {Array.from(
                            Array(Math.ceil(services.length / itemsPerPage)).keys()
                          ).map((page) => (
                            <button
                              className={`btn mx-1 btn-outline-dark ${
                                page === currentPage? 'active' : ''
                              }`}
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

export default Services;