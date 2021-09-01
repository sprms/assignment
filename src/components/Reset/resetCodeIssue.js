import React, { useState } from "react";
import {apiGetResetCode} from '../../services/reset'

const ResetCodeIssue = (props) => {
    const [email, setEmail] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);

    const mailCheck = (value) => {
      setEmail(value);

      let regexp_emaail=/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if(!regexp_emaail.test(value))
      {
        setEmailCheck(false);
      }

      else
      {
        setEmailCheck(true);
      }
    }

    const handleClick = () => {
        apiGetResetCode(
          {
            email: email, //'ably933@dummy.com'
          },
          
          {
            success: (response) => {
              response.data.email = email;
              props.history.push({
                  pathname: '/reset_verify',
                  state: response.data
              })
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
            <h3>Email</h3>
            <input
                value={email}
                onChange={({ target: { value } }) => mailCheck(value)}
                type="text"
                placeholder="email"
            />
            <div>{emailCheck ? '' : (email === ''  ? '' : '이메일 형식이 맞지 않습니다.')}</div>
            <button disabled={!emailCheck} onClick={handleClick}>next</button>
        </>
    )
}

export default ResetCodeIssue;