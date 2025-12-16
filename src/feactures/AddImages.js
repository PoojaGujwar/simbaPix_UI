import {useState} from "react"
import axios from "axios"

export default function AddImages({albumId,onClose,onUpdate}){
      //const [images, setImages] = useState([]);
      const [image, setImage] = useState(null);
      const [message, setMessage] = useState("");
    console.log(albumId)
      const initialData = {
        imageId: "",
        albumId: albumId,
        imageUrl: "",
        name: "",
        tags: [],
        person: "",
        isFavorite: false,
        comments: "",
        size: 0,
      };
      const [formdata, setFormdata] = useState(initialData);
    
      const handleChange = (e) => {
        const { name, value ,type,checked} = e.target;

        if (name === "tags" || name === "comments") {
          setFormdata((prevValue) => ({ ...prevValue, [name]: value.split(",") }));
        } else if(type==="checkbox"){
          setFormdata((prev) => ({ ...prev, [name]: checked }));
        }else{
          setFormdata((prevValue) => ({ ...prevValue, [name]: value }));
        }
      };
    const handleUpload = async (e) => {
      e.preventDefault()
        if (!image) {
          setMessage("Please select an image to upload/");
          return;
        }
         setMessage("Image uploading...")
        const formData = new FormData();
        formData.append("image", image);
        formData.append("albumId", formdata.albumId);
       formData.append("name", image.name);
        formData.append("tags", JSON.stringify(formdata.tags));
        formData.append("person", formdata.person);
        formData.append("isFavorite",formData.isFavorite ? "true" : "false")
       formData.append("comments", JSON.stringify(formdata.comments));
        try {
          console.log(image);
          const {data} = await axios.post(
            `${process.env.REACT_APP_SERVER_BASE_URL}/images`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        
          onUpdate(data.newImage)
          console.log(data.newImage)
          onClose(false)
        } catch (error) {
          console.log(error);
        }finally{
          setTimeout(()=>{setMessage("")},3000)
        }
      };

      const handleFileImage =(e)=>{
        const file = e.target.files[0]
        console.log(file)
        if(file){
 const fileTypes =["image/png","image/jpg","image/gif","image/jpeg"]
        const maxSize = 5*1024*1024
console.log(maxSize)
        if(!fileTypes.includes(file.type)){
          setMessage("Please select jpg, png, gif file")
          setImage(null)
          return
        }
        if(file.size>maxSize){
          setMessage("File size must be less than or equal to 5MB.")
          setImage(null)
          return
        }
        setImage(file)
        setMessage("")
        }
       
      }
    return(
        <div className="mt-3">
        <form onSubmit={handleUpload} className="bg-white shadow border-0 container py-3 px-5 rounded">
       <h2>Images <i className="bi bi-x float-end" onClick={()=>onClose(false)}></i></h2>
        {message && <p className="alert alert-success py-3">{message}</p>}
        <input type="file" onChange={handleFileImage}  accept=".jpg,.png,.gif" className="py-3"/>
        <br />
        
        <input
          type="text"
          onChange={handleChange}
          name="tags"
          value={formdata.tags}
          placeholder="Tags"
          className=" form-control py-2 px-2"
          required
        />
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="person"
          value={formdata.person}
          placeholder="Person name"
          className=" form-control"
          required
        />
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="comments"
          value={formdata.comments}
          placeholder="Comments "
          class="form-control"
          required
        /><br/>
        <label className="">
        <input
          type="checkbox"
          onChange={handleChange}
          name="isFavorite"
          value={formdata.isFavorite}
          checked={formdata.isFavorite}
          className="form-check-input me-2 border-dark"
        /> Favorite
        </label>
        <br />
        <button  className="btn btn-success my-3">
          Upload Image
        </button>
        
     </form> </div>
    )
}