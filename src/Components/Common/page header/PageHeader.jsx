import React, { useState } from "react";
import "./pageHeader.css";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const PageHeader = ({ name, icon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [uploadMessage, setUploadMessage] = useState(""); // Message for success or error

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadMessage(""); // Clear previous messages
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true); // Start loading
      setUploadMessage(""); // Clear previous messages

      const response = await axios.post(
        "https://159.65.120.142/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 524) {
        // disable modal
        setIsModalOpen(false);
        // Add SweetAlert here for success
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "File uploaded successfully!",
        });

      } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred during file upload.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // disable modal
      setIsModalOpen(false);
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during file upload." + error,
      });

    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="page-header col-md-12 shadow">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Title */}
        <div className="title">
          <h3>
            <span className="page-title-icon bg-gradient-primary text-white me-2 mx-2">
              <i className={icon} />
            </span>{" "}
            {name}
          </h3>
        </div>

        {/* Links for Import and Export */}
        <div>
          <button
            className="btn btn-outline-warning mx-2"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa fa-upload mx-2" aria-hidden="true"></i>
            Import
          </button>
          <Link
            className="btn btn-outline-light mx-2"
            to="https://159.65.120.142/api/export"
          >
            <i className="fa fa-download mx-2" aria-hidden="true"></i>
            Export
          </Link>
        </div>
      </div>

      {/* Modal for Import */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h5>Import Data</h5>
          <button
            className="close-btn"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="file-upload" className="form-label">
                Upload Excel File
              </label>
              <input
                type="file"
                className="form-control"
                id="file-upload"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                disabled={isLoading} // Disable input during upload
              />
            </div>
            { (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleFileUpload}
                disabled={isLoading} // Disable button during upload
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            )}
            <p>{uploadMessage}</p>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PageHeader;
