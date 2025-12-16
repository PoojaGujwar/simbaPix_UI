import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAlbum from "../feactures/AddAlbum";
import Header from "./Header";
import { io } from "socket.io-client";


const socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`);

export default function Albums({ users }) {
  const navigate = useNavigate();
  const [showValue, setShowValue] = useState(false);
  const [albums, setAlbums] = useState(null);
  const [updateDataId, setUpdateData] = useState(null);
  const [sharedUser, setSharedUser] = useState([]);
  const [activeSharedAlbumId, setActiveSharedAlbumId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [message, setMessage] = useState("");
  console.log(users);

  useEffect(() => {
    function fetchAlbum() {
      (async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/albums`, {
            withCredentials: true,
          });
          setAlbums(response.data);
        } catch (error) {
          console.error("Fetching Album error", error);
        }
      })();
    }
    fetchAlbum();
  }, []);

  useEffect(() => {
    if (selectedEmail && activeSharedAlbumId) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_BASE_URL}/albums/${activeSharedAlbumId}/share`,
            { sharedUser: selectedEmail },
            { withCredentials: true }
          );
          console.log(data);
          setMessage(`Album shared with ${selectedEmail}`);
          socket.emit("send_album", {
            sender: users.email,
            receiver: selectedEmail,
            album: activeSharedAlbumId,
          });
        } catch (error) {
          console.log("Error sharing album:", error);
        } finally {
          setSelectedEmail("");
          setActiveSharedAlbumId(null);
          setTimeout(() => {
            setMessage("");
          }, 2000);
        }
      })();
    }
  }, [selectedEmail, activeSharedAlbumId]);

  useEffect(() => {
    function handleReceiveAlbum(data) {
      if (data.sender === users.email || data.receiver === users.email) {
        console.log("Album received via socket:", data);
      }

      if (data.success) {
        console.log("Album shared:", data.data);
        setMessage(data.message);
      } else {
        console.warn("Share failed:", data.message);
        setMessage(data.message);
      }

      setTimeout(() => setMessage(""), 2000);
    }

    socket.on("receive_album", handleReceiveAlbum);

    return () => {
      socket.off("receive_album", handleReceiveAlbum);
    };
  }, [users.email]);

  const handleCardClick = (albumId) => {
    navigate(`/images?id=${albumId}`);
  };
  const handleDeleteBtn = async (albumId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/albums/${albumId}`,
        { withCredentials: true }
      );
      if (data) {
        const shareData = await axios.delete(
          `${process.env.REACT_APP_SERVER_BASE_URL}/v1/shareData/${albumId}`,
          { withCredentials: true }
        );
        console.log(shareData);
      }

      setAlbums((prev) => prev.filter((val) => val._id !== data.album._id));
      setMessage("Album delete successfully");
    } catch (error) {
      console.log("Error delete album");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  const hanldeUpdateBtn = (album) => {
    setUpdateData(album);
    setShowValue(true);
  };
  const handleAlbumUpdate = (album) => {
    setAlbums((prevAlbums) => {
      const exists = prevAlbums.find((a) => a._id === album._id);
      if (exists) {
        return prevAlbums.map((a) => (a._id === album._id ? album : a));
      } else {
        return [...prevAlbums, album];
      }
    });
    setShowValue(false);
    setUpdateData(null);
  };
  const handleShare = async (albumId) => {
    try {
      const user = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/users`, {
        params: { currentEmail: users.email },
      });
      setSharedUser(user.data);
      console.log(user);
      setActiveSharedAlbumId(albumId);
    } catch (error) {
      console.log(error, "User fetch error");
    }
  };
  const filterAlbums = albums?.filter((val) => val.ownerId === users.id);
  return (
    <>
      {/* <div
        className="container-fluid px-0"
        style={{ width: "100%", margin: 0, padding: 0 }}
      >
        <img
          src="https://images.ctfassets.net/h6goo9gw1hh6/4wpjrIGPCWYlFju7r2ccag/6cc5e92db40c17b96187ad8bf16905cf/Facebook-Cover-collage-aesthetic.jpg"
          alt="Logo"
          className="img-fluid"
          style={{
            height: "500px",
            width: "100%",
            objectFit: "cover",
            backgroundColor: "#f0f0f0",
          }}
        />
      </div> */}
      <div className="bg-light">
        <div className="container-fluid py-3 px-3">
          <h2 className="text-center">Albums</h2>
          {showValue === false && (
            <button
              onClick={() => setShowValue(true)}
              className="btn btn-success text-center"
            >
              + Create New Album
            </button>
          )}
          <div className="mt-2">
            {message && <p className="alert alert-success">{message}</p>}

            {showValue && (
              <AddAlbum
                user={users}
                updateDataId={updateDataId}
                onUpdate={handleAlbumUpdate}
                onClose={setShowValue}
              />
            )}
          </div>
          <div className="row mt-5">
            {filterAlbums?.map((album, index) => (
              <div className="col-md-4" style={{ margin: "0" }}  key={index}>
                <div
                 
                  className="card shadow-sm bg-warning bg-opacity-25 border text-center mb-3 h-100"
                  onDoubleClick={(e) => handleCardClick(album._id)}
                >
                  <div className="d-flex justify-content-end p-2">
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${album._id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${album._id}`}
                      >
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDeleteBtn(album._id)}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-primary"
                            onClick={() => hanldeUpdateBtn(album)}
                          >
                            Update
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-secondary"
                            onClick={() => handleShare(album._id)}
                          >
                            Share
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {activeSharedAlbumId === album._id &&
                    sharedUser?.length > 0 && (
                      <ul>
                        {sharedUser.map((user, i) => (
                          <li
                            key={i}
                            onClick={() => setSelectedEmail(user.email)}
                          >
                            {user.email}
                          </li>
                        ))}
                      </ul>
                    )}

                  <div className="card-body">
                    <h5>{album.name}</h5>
                    <p className="card-text text-muted">{album.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
