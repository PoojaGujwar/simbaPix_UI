import { useEffect, useState } from "react";
import axios from "axios";

export default function AddAlbum({ user, updateDataId, onUpdate, onClose }) {
  const [message, setMessage] = useState("");

  const initialData = {
    name: "",
    description: "",
    ownerId: user?.id || "",
  };
  const [formData, setFormdata] = useState(initialData);
  console.log(updateDataId, initialData);

  useEffect(() => {
    if (updateDataId) {
      setFormdata({
        name: updateDataId.name,
        description: updateDataId.description,
        ownerId: updateDataId.ownerId,
      });
    }
  }, [updateDataId]);

  const handleAlbum = async (e) => {
    e.preventDefault();
    try {
      if (updateDataId) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/albums/${updateDataId._id}`,
          formData
        );
        setMessage("Album updated successfully.");

        setTimeout(() => {
          onUpdate(data.albums);
        }, 2000);
      } else {
        const data = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/albums`,
          formData,
          {withCredentials:true}
        );
        setMessage("Album added successfully.");
        console.log(data);
        setTimeout(() => {
          onUpdate(data.data.newAlbum);
        }, 2000);
      }
      setFormdata(initialData);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <h2>{updateDataId ? "Update " : "Create New "}Album: </h2>
      {message && <p className="alert alert-success">{message}</p>}
      <form onSubmit={(e) => handleAlbum(e)}>
        <input
          type="text"
          name="name"
          placeholder="Album name"
          onChange={handleChange}
          value={formData.name}
          className="form-control  mt-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="form-control mt-2"
          required
        />
        <button className="btn btn-primary mt-2">
          {updateDataId ? "Update" : "Add"}
        </button>
        <button
          onClick={() => onClose(false)}
          className="btn btn-whilte border-primary mt-2 mx-2 text-primary shadow"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
