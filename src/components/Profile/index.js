import React, {useState, useEffect} from 'react';
import {apiUserProfile} from '../../services/profile'
import { connect } from 'react-redux'
import { setUnAuthenticated } from '../../action/authenticated'
import axios from 'axios';
import {apiLogout} from '../../services/auth'

function Profile(props) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profileImage: '',
    lastConnectdAt: ''
  });

  const handleClick = () => {
    apiLogout({
      success: (response) => {
        axios.defaults.headers.common['Authorization'] = '';
        props.setUnAuthenticated();
        localStorage.setItem('token', null);
        props.history.push('/');
      },
  
      error: (error) => {
        if (error.response) {
          alert(error.response.data.error.message);
        }
  
        else if(error.request) {
          console.log(error.request);
        }
  
        else
          console.log('Error', error.message);
      }
    })
  };

  useEffect((props) => {
    apiUserProfile({
      success: (response) => {
        const { name, email, profileImage, lastConnectedAt} = response.data;
        setProfile({
          name: name,
          email: email,
          profileImage: profileImage,
          lastConnectedAt: lastConnectedAt
        })
      },
  
      error: (error) => {
        if (error.response) {
          console.log(error.response.data);
        }
  
        else if(error.request) {
          console.log(error.request);
        }
  
        else
          console.log('Error', error.message);

        props.history.push('/');
      }
    })  
  }, [])

  return (
    <>
    <div style={{paddingBottom: 30}}>
      <h1 style={{margin: 0}}>Profile</h1>
      <button onClick={handleClick}>logout</button>
    </div>
      <div style={cardStyle}>
        <div style={wapper}>
          <div style={image}><img src={profile.profileImage}></img><div style={after}></div></div>
          <div style={content}>
            <div style={name}>이름: {profile.name}</div>
            <div style={email}>email: {profile.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

const email = {
  color: "#fbf992",
  marginBottom: 15,
  display: "block",
  fontWeight: 500
}
const name = {
  fontSize: 24,
  fontWeight: 700,
  //color: "#0d0925",
  color: "#fff",
  marginBottom: 20
}
const content = {
  paddingRight: 25
};

const after = {
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
  borderRadius: 20,
  opacity: 0.3
}

const image = {
    width: 300,
    flexShrink: 0,
    height: 300,
    backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
    boxShadow: "4px 13px 30px 1px rgb(252 56 56 / 20%)",
    borderRadius: 20,
    transform: "translateX(-80px)",
    overflow: "hidden"
}

const wapper = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  height: "100%",
  zIndex: 1
}

const cardStyle = {
  width: "95%",
  position: "relative",
  maxWidth: 800,
  margin: "auto",
  //background: "#fff",
  backgroundImage: "linear-gradient(147deg, #ff1f58 43%, #fd3838 62%)",
  boxShadow: "0 14 80",
  padding: 25,
  borderRadius: 25,
  height: 400,
  transition: "all 0.3s",
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUnAuthenticated: () => dispatch(setUnAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);