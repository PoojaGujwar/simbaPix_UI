import axios from "axios"
import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"

export default function ShareAlbum({users}){
    const [albums,setAlbums] = useState([])
    const navigate= useNavigate()
    console.log(users)

    useEffect(()=>{
      function shareData(){
        (async()=>{
          try{
const {data} = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/shareData`,{ withCredentials: true })
setAlbums(data)
console.log(data)
          }catch(error){
            console.log(error)
          }
        })()
      }shareData()
    },[])
    const handleCardClick = (albumId) => {
    navigate(`/images?id=${albumId}`);
  };
  const filteredAlbums = albums.filter(
  (album) => album.receiver === users.email
);

 return (
    <>
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Shared Albums</h1>
      </div>

      <div className="row">
        {filteredAlbums?.length > 0 ? (
          filteredAlbums.map((album) => (
           
<div key={album._id} className="col-md-4">
              <div className="card mb-4 shadow-sm border-0 position-relative h-100" onClick={()=>handleCardClick(album.album._id) }>
                <div
                  className="bg-primary bg-opacity-10 text-primary card-header"
                  style={{
                    height: "",
                    borderRadius: "0.5rem 0.5rem 0 0",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05rem",
                  }}
                >
                  {album.album.name}
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">
                    {album.album.description || "No description available."}
                  </p>

                </div>
              </div>
            </div>
            )
          )
        ) : (
          <div className="col-12">
            <div className="card shadow-sm text-center py-4">
              <div className="card-body">
                <h5 className="card-title text-muted">No albums found</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );

}