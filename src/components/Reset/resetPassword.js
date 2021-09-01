import React, { useEffect, useState } from "react";
import {apiResetPassWord} from '../../services/reset'

const ResetPassword = (props) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [disabled, setDisabled] = useState(true);
    
    useEffect(() => {
        if(password === passwordConfirm)
        {
            setDisabled(false);
        }

        else
        {
            setDisabled(true);
        }
    }, [password, passwordConfirm])

    const handleClick = () => {
        apiResetPassWord(
          {
            email: props.location.state.email, //'ably933@dummy.com'
            confirmToken: props.location.state.confirmToken,
            newPassword: password,
            newPasswordConfirm: passwordConfirm
          },
          
          {
            success: (response) => {
                alert("비밀번호 변경에 성공하셨습니다.");
                props.history.push("/");
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
            <h3>Change Password</h3>
            <div>
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            </div>
            <div>
            <input
                value={passwordConfirm}
                onChange={({ target: { value } }) => setPasswordConfirm(value)}
                type="password"
                placeholder="password confirm"
            />
            </div>
            <div>{disabled ? "비밀번호가 일치하지 않습니다" : ((password === "" && passwordConfirm === "") ? "" :  "비밀번호가 일치합니다") }</div>
            <button disabled={disabled ? true : ((password === "" && passwordConfirm === "") ? true : false)} onClick={handleClick}>Change</button>
        </>
    )
}

export default ResetPassword;