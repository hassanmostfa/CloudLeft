import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate } from "react-router-dom";
import { useCreateServiceMutation } from "../../../api/servicesSlice";
import Swal from "sweetalert2";

const AddService = () => {
  const [itemType, setItemType] = useState("Food");  // Set initial value to "Food"

  // Handle change in selection
  const handleTypeChange = (e) => {
    setItemType(e.target.value);
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: {
      item_type: itemType,
      sku_ERP: "",
      barcode: "",
      en_categorie1: "",
      en_categorie2: "",
      en_categorie3: "",
      ar_categorie1: "",
      ar_categorie2: "",
      ar_categorie3: "",
      name_en: "",
      name_ar: "",
      pc_price: null,
      Pack_Price: null,
      brand: null,
      en_keywords: null,
      ar_keywords: null,
      country_of_manufacture: null,
      product_type: null,
      pcs: null,
      pack_size: null,
      flavours_en: null,
      flavours_ar: null,
      color_en: null,
      color_ar: null,
      umf_degree: null,
      weight: null,
      vendor: null,
      type: null,
      scent_ar: null,
      scent_en: null,
      size: null,
      capacity: null,
    },
  });

  const [categories, setCategories] = useState({
    level1: [],
    level2: [],
    level3: [],
  });

  const [createService, { isSuccess, error: createError }] =
    useCreateServiceMutation();
  const [error, setError] = useState({});

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
    fetchCategories("level1"); // Fetch initial categories for level 1
  }, []);

  const fetchCategories = async (level, parentId = null) => {
    try {
      let apiUrl;
      switch (level) {
        case "level1":
          apiUrl = "http://159.65.120.142:3000/api/categories/maincategories/Non Food"; // API for level 1 categories
          break;
        case "level2":
          apiUrl = `http://159.65.120.142:3000/api/categories/subcategories/${parentId}`; // API for level 2 categories
          break;
        case "level3":
          apiUrl = `http://159.65.120.142:3000/api/categories/subsubcategories/${parentId}`; // API for level 3 categories
          break;
        default:
          return;
      }
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.data);
      setCategories((prev) => ({ ...prev, [level]: data.data }));
    } catch (err) {
      console.error(`Error fetching ${level} categories`, err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("en_categorie")) {
      
      const level = name.split("_")[1];
      console.log(level)
      setFormData((prev) => ({
        ...prev,
        item: { ...prev.item, [name]: value },
      }));
      console.log(level);
      if (level === "categorie1") fetchCategories("level2", value);
      if (level === "categorie2") fetchCategories("level3", value);
    } else {
      setFormData((prev) => ({
        ...prev,
        item: { ...prev.item, [name]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await createService({ "item": {
        "item_type": "Non Food",
        "sku_ERP": null,
        "barcode": null,
        "sku_WEB": null,
        "en_categorie1": formData.item.en_categorie1,
        "en_categorie2": formData.item.en_categorie2,
        "en_categorie3": formData.item.en_categorie3,
        "ar_categorie1": "",
        "ar_categorie2": "",
        "ar_categorie3": "",
        "name_en": formData.item.name_en,
        "name_ar": formData.item.name_ar,
        "pc_price": formData.item.pc_price,
        "Pack_Price": formData.item.Pack_Price,
        "brand": formData.item.brand,
        "en_keywords": formData.item.en_keywords,
        "ar_keywords": formData.item.ar_keywords,
        "country_of_manufacture": formData.item.country_of_manufacture,
        "product_type": formData.item.product_type,
        "pcs": formData.item.pcs,
        "pack_size": formData.item.pack_size,
        "flavours_en": formData.item.flavours_en,
        "flavours_ar": formData.item.flavours_ar,
        "color_en": formData.item.color_en,
        "color_ar": formData.item.color_ar,
        "umf_degree": formData.item.umf_degree,
        "weight": formData.item.weight,
        "vendor": formData.item.vendor,
        "type": formData.item.type,
        "scent_ar": formData.item.scent_ar,
        "scent_en": formData.item.scent_en,
        "size": formData.item.size,
        "capacity": formData.item.capacity
    } }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item has been added successfully.",
      }).then(() => {
          navigate("/");
      })
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="Add Item" icon="fa fa-plus" />
          </div>
          <div className="col-12 grid-margin stretch-card content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-account-plus"></i> Add Item
                </h4>
                <p className="card-description">
                  Please fill in the fields below and make sure the data is correct before submitting
                </p>
                {error?.data?.errors?.length > 0 &&
                  error.data.errors.map((error, index) => (
                    <div className="alert alert-danger" key={index}>
                      <p>{error}</p>
                    </div>
                  ))}
                <form className="forms-sample row" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="item_type" className="col-form-label">
                      Item Type
                    </label>
                    <select
                      id="item_type"
                      className="form-control"
                      value={itemType}  // Bind state to the value
                      onChange={handleTypeChange}  // Update state when selection changes
                    >
                      <option value="Food">Food</option>
                      <option value="Non-Food">Non-Food</option>
                    </select>
                    </div>
                  
                  
                    <div className="col-md-6">
                      <label htmlFor="sku_ERP" className="col-form-label">
                        SKU ERP
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sku_ERP"
                        name="sku_ERP"
                        value={formData.item.sku_ERP}
                        onChange={handleChange}
                      />
                    </div>
                  
                  
                    <div className="col-md-6">
                      <label htmlFor="barcode" className="col-form-label">
                        Barcode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="barcode"
                        name="barcode"
                        value={formData.item.barcode}
                        onChange={handleChange}
                      />
                    </div>
                  
                  
                    <div className="col-md-6">
                      <label htmlFor="en_categorie1" className="col-form-label">
                        First Category
                      </label>
                      <select
                        className="form-control"
                        id="en_categorie1"
                        name="en_categorie1"
                        value={formData.item.en_categorie1}
                        onChange={handleChange}
                      >
                        <option value="">Select First Category</option>
                        {categories.level1.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                 
                    <div className="col-md-6">
                      <label htmlFor="en_categorie2" className="col-form-label">
                        Second Category
                      </label>
                      <select
                        className="form-control"
                        id="en_categorie2"
                        name="en_categorie2"
                        value={formData.item.en_categorie2}
                        onChange={handleChange}
                      >
                        <option value="">Select Second Category</option>
                        {categories.level2.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                  
                    <div className="col-md-6">
                      <label htmlFor="en_categorie3" className="col-form-label">
                        Third Category
                      </label>
                      <select
                        className="form-control"
                        id="en_categorie3"
                        name="en_categorie3"
                        value={formData.item.en_categorie3}
                        onChange={handleChange}
                      >
                        <option value="">Select Third Category</option>
                        {categories.level3.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                    <div className="col-md-6">
                      <label htmlFor="name_en" className="col-form-label">
                        English Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_en"
                        name="name_en"
                        value={formData.item.name_en}
                        onChange={handleChange}
                      />
                    </div>
                  
                 
                    <div className="col-md-6">
                      <label htmlFor="name_ar" className="col-form-label">
                        Arabic Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_ar"
                        name="name_ar"
                        value={formData.item.name_ar}
                        onChange={handleChange}
                      />
                    </div>
                  
                
                    <div className="col-md-6">
                      <label htmlFor="pc_price" className="col-form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="pc_price"
                        name="pc_price"
                        value={formData.item.pc_price}
                        onChange={handleChange}
                      />
                    </div>
                 
                  
                    <div className="col-md-6">
                      <label htmlFor="Pack_Price" className="col-form-label">
                        Pack Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Pack_Price"
                        name="Pack_Price"
                        value={formData.item.Pack_Price}
                        onChange={handleChange}
                      />
                    </div>
                  
                 
                    <div className="col-md-6">
                      <label htmlFor="brand" className="col-form-label">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={formData.item.brand}
                        onChange={handleChange}
                      />
                    </div>
                  
                 
                    <div className="col-md-6">
                      <label htmlFor="en_keywords" className="col-form-label">
                        En Keywords
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="en_keywords"
                        name="en_keywords"
                        value={formData.item.en_keywords || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="ar_keywords" className="col-form-label">
                        Ar Keywords
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ar_keywords"
                        name="ar_keywords"
                        value={formData.item.ar_keywords || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="country_of_manufacture" className="col-form-label">
                        Country Of Manufacture
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country_of_manufacture"
                        name="country_of_manufacture"
                        value={formData.item.country_of_manufacture || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="product_type" className="col-form-label">
                        Product Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product_type"
                        name="product_type"
                        value={formData.item.product_type || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pcs" className="col-form-label">
                        PCS
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="pcs"
                        name="pcs"
                        value={formData.item.pcs || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pack_size" className="col-form-label">
                        Pack Size
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pack_size"
                        name="pack_size"
                        value={formData.item.pack_size || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="flavours_en" className="col-form-label">
                        Flavours En
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="flavours_en"
                        name="flavours_en"
                        value={formData.item.flavours_en || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="flavours_ar" className="col-form-label">
                        Flavours Ar
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="flavours_ar"
                        name="flavours_ar"
                        value={formData.item.flavours_ar || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="color_en" className="col-form-label">
                        Color En
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="color_en"
                        name="color_en"
                        value={formData.item.color_en || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="color_ar" className="col-form-label">
                        Color Ar
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="color_ar"
                        name="color_ar"
                        value={formData.item.color_ar || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="umf_degree" className="col-form-label">
                        UMF Degree
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="umf_degree"
                        name="umf_degree"
                        value={formData.item.umf_degree || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="weight" className="col-form-label">
                        Weight
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={formData.item.weight || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="vendor" className="col-form-label">
                        Vendor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vendor"
                        name="vendor"
                        value={formData.item.vendor || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="type" className="col-form-label">
                        Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={formData.item.type || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="scent_ar" className="col-form-label">
                        Scent Ar
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="scent_ar"
                        name="scent_ar"
                        value={formData.item.scent_ar || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="scent_en" className="col-form-label">
                        Scent En
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="scent_en"
                        name="scent_en"
                        value={formData.item.scent_en || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="size" className="col-form-label">
                        Size
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="size"
                        name="size"
                        value={formData.item.size || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="capacity" className="col-form-label">
                        Capacity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        name="capacity"
                        value={formData.item.capacity || ""}
                        onChange={handleChange}
                      />
                    </div>
                  <div className="col-md-12 mt-4">
                    <button type="submit" className="btn  btn-primary mr-2 w-100">
                      Submit
                    </button>
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

export default AddService;
