import { useState } from "react";
import axios from "axios";

export default function ShareAlbumModal({
  show,
  onClose,
  albumId,
  users,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")
  const [suggestions ,setSuggestions] = useState([])

  if (!show) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value, suggestions)
    setEmail(value)
    setMessage("")
    if (value.length > 0) {
      const filtered = users.filter((u) => u.email.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleShare = async () => {
    if (!email) {
      setMessage("Please enter an email address ")
      return;
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address")
      return
    }
    try {
      setLoading(true);

      let response = await axios.post(
        `https://shimbapix.onrender.com/v1/shareData`,
        {
          albumId: albumId,
          sender: users.email,
          receiver: email
        }
      );
      const data = response.data
      console.log(data)
      if (data) {
        setMessage(data.message)
        onSuccess(data.message);
        setEmail("");
        onClose();
      }
      else {
        alert(data.message);
      }

    } catch (error) {
      console.log("Share error", error);
    } finally {
      setLoading(false);
      setMessage("")
    }
  };

  return (
    <>
      <div className="modal-backdrop show"></div>

      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Share Album</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {message && <p className="alert alert-warning">{message}</p>}
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
              />
              {suggestions.length > 0 && (
                <ul className="list-group mt-2">
                  {suggestions.map((user) => (
                    <li
                      key={user.email}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEmail(user.email);
                        setSuggestions([]);
                      }}
                    >
                      {user.email}
                    </li>
                  ))}
                </ul>
              )}

            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleShare}
                disabled={loading}
              >
                {loading ? "Sharing..." : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
