import React, { useEffect, useState } from "react";
import {apiResetCodeVerify, apiGetResetCode} from '../../services/reset'

const ResetCodeVerify = (props) => {
    
    const [remaind, setRemaind] = useState(new Date().getTime() + props.location.state.remainMillisecond);
    const now = new Date();
    const milisec = remaind - now;
    const _sec = milisec / 1000;
    const min = parseInt(_sec / 60);
    const sec = parseInt(_sec - (min * 60));

    const [authCode, setAuthCode] = useState("");
    const [minutes, setMinutes] = useState(min);
    const [seconds, setSeconds] = useState(sec);
    
    useEffect(() => {
        const interval = setInterval(() => {
            let now = new Date();
            
            if(now < remaind) {
                let milisec = remaind - now;
                let sec = milisec / 1000;
                let min = parseInt(sec / 60);
                sec = parseInt(sec - (min * 60));
    
                setMinutes(min);
                setSeconds(sec);
            }
        }, 1000);

        return () => clearInterval(interval)
    }, [minutes, seconds])

    const refreshCode = () => {
      apiGetResetCode(
        {
          email: props.location.state.email,
        },
        
        {
          success: (response) => {
            props.location.state.issueToken = response.data.issueToken;
            setRemaind(new Date().getTime() + response.data.remainMillisecond);
            let now = new Date();
            let milisec = remaind - now;
            let _sec = milisec / 1000;
            let min = parseInt(_sec / 60);
            let sec = parseInt(_sec - (min * 60));

            setMinutes(min);
            setSeconds(sec);
          },
  
          error: (error) => {
            if (error.response) {
              console.log(error.response.data);
              alert(error.response.data.error.message);
            }
  
            else if(error.request) {
              console.log(error.request);
            }
  
            else
              console.log('Error', error.message);
          }
        }
      );
    };

    const handleClick = () => {
      apiResetCodeVerify(
          {
            email: props.location.state.email,
            authCode: authCode,
            issueToken: props.location.state.issueToken
          },
          
          {
            success: (response) => {
              response.data.email = props.location.state.email;
              props.history.push({
                  pathname: '/reset_password',
                  state: response.data
              });
            },
    
            error: (error) => {
              if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.error.message);
              }
    
              else if(error.request) {
                console.log(error.request);
              }
    
              else
                console.log('Error', error.message);
            }
          }
        );
      };

    return (
        <>
            <h3>Verify Code</h3>
            <input
                value={authCode}
                onChange={({ target: { value } }) => setAuthCode(value)}
                type="text"
                placeholder="Code"
            />
            <div>
                만료까지 남은시간 {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds }
            </div>
            
            <button onClick={handleClick}>다음</button>
            <button onClick={refreshCode}>인증재요청</button>
        </>
    )
}

export default ResetCodeVerify;