import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddImages from "../feactures/AddImages";

export default function Images() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const albumId = searchParams.get("id");
  const [images, setImages] = useState([]);
  const [showValue, setShowValue] = useState(false);
  const [message, setMessage] = useState("");

  console.log(searchParams);
  useEffect(() => {
    function fetchData() {
      (async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_BASE_URL}/images`,
            {
              withCredentials: true,
            }
          );
          console.log(data);
          setImages(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    fetchData();
  }, []);

  const filterdImage = images?.filter((imag) => imag.albumId === albumId);
  const handlDeleteImage = async (imageId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/images/${imageId}`
      );

      setMessage("Image deleted successfully.");
      setImages((prevValue) =>
        prevValue.filter((val) => val._id !== data.images._id)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleImageUpdate = (img) => {
    setMessage("Image Uploaded successfully..");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    setImages((prevValue) => [...prevValue, img]);
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container mt-5">
        {!showValue && (
          <button
            onClick={(e) => setShowValue(true)}
            onDoubleClick={(e) => setShowValue(false)}
            className="btn btn-info "
          >
            Upload Image
          </button>
        )}
        {showValue && (
          <AddImages
            albumId={albumId}
            onClose={setShowValue}
            onUpdate={handleImageUpdate}
          />
        )}
        {message && (
          <p
            className={`alert mt-3 ${
              message.includes("deleted") ? "alert-danger" : "alert-success"
            }`}
          >
            {message}
          </p>
        )}
        <div className="row mt-5">
          {filterdImage?.length>0?(
            filterdImage?.map((imag, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div
                className="card mb-3 border-0 shadow"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={imag.imageUrl}
                  alt={imag.name}
                  className="card-img-top img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handlDeleteImage(imag._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))):(
            !showValue && (
            <div className="col-12">
            <div className="card shadow-sm text-center py-4">
              <div className="card-body">
                <h5 className="card-title text-muted">No Images found</h5>
              </div>
            </div>
          </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
