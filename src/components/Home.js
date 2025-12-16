import bgImage from "../assests/simbapix-bg.png"
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
    <div className="home-bg" style={{backgroundImage:`url(${bgImage})`}}>
      <div className="overlay">
      <h1 className="title">Welcome to SimbaPix </h1>
      <button onClick={()=>authenticateViaOAuth('google')} className="google-btn">
         <svg width="22" height="22" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.3 33.9-25 62.7-53.2 82v68h86.1c50.4-46.5 81.7-115 81.7-194.9z" />
            <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24.1 178.1-65.5l-86.1-68c-24 16.1-54.7 25.7-92 25.7-70.7 0-130.7-47.7-152.1-111.6h-89v70.2c44.3 88.1 135.6 149.2 241.1 149.2z" />
            <path fill="#FBBC05" d="M119.9 324.9c-10.4-30.9-10.4-64.2 0-95.1v-70.2h-89c-39.4 78.6-39.4 171.9 0 250.5l89-70.2z" />
            <path fill="#EA4335" d="M272 107.7c39.5-.6 77.3 14.4 106.2 41.8l79.2-79.2C405.6 24.3 345.3 0 272 0 166.5 0 75.2 61.1 30.9 149.2l89 70.2C141.3 155.4 201.3 107.7 272 107.7z" />
          </svg>
        {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg> */}
        Login with Google</button>
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