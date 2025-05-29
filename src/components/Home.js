export default function Home(){
     const authenticateViaOAuth = async(method)=>{
    try {
      console.log(method)
      window.location.href= `${process.env.REACT_APP_SERVER_BASE_URL}/auth/${method}`
    } catch (error) {
      console.log(error,"here")
    }
  }
    return (
    <div className="">
      <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-4">Welcome to SimbaPix </h1>
      <div className="d-flex justify-content-center">
      <button onClick={()=>authenticateViaOAuth('google')} className="btn btn-light d-flex align-items-center gap-3">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        Login with Google</button>
      </div>
     </div>
    </div>
  );
}
// .div{
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     margin-top: -50px;
//     margin-left: -50px;
//     width: 100px;
//     height: 100px;
// }