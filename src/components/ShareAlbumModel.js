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

  if (!show) return null;

  const handleShare = async () => {
    if (!email) return;

    try {
      setLoading(true);

      let response = await axios.post(
        `https://shimbapix.onrender.com/v1/shareData`,
       {
        albumId:albumId,
        sender:users.email,
        receiver:email
       }
      );
const data = response.data
      onSuccess(data.message);
      setEmail("");
      onClose();
    } catch (error) {
      console.log("Share error", error);
    } finally {
      setLoading(false);
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
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
