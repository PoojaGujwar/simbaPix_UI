import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { authServerAxios, googleApiAxios } from "../lib/axios.lib";

export default function GoogleProfile({userData}) {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation()
  console.log(location ,"LOCATION")
  const navigate = useNavigate()
  const googleAccessToken = Cookies.get("access_token")||""
  console.log(googleAccessToken)

  
  useEffect(() => {
    (async () => {
      if (googleAccessToken) {
        try {
          const {data} = await googleApiAxios.get('/userinfo', {
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
            },
          });
          userData(data);
          //navigate("/albums")
        } catch (error) {
          navigate("/")
          console.error(error);
      
        }
      } else if (location.pathname.includes('v2')) {
        try {
          const response = await authServerAxios.get('/user/profile/google',{withCredentials:true});

          userData(response.data);
          console.log(response.data)
          //navigate("/albums")
        } catch (error) {
          if (error.status === 403 || error.status === 500) {
           // navigate("/")
          }
        }
      } else {
       // navigate("/")
      }
    })();
  }, []);

  return (
    <header className="">
      {userInfo && (
        <div className="bg-light py-3 px-3 d-flex align-items-center ">
          <h3 className="mb-0">SimbaPix</h3>
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.given_name[0]}+${userInfo.family_name[0]}`}
            alt={userInfo.given_name}
            className="rounded-circle ms-auto"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      )}
    </header>
  );
}
