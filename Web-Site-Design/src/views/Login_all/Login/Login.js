import React, {useState} from "react"
import "./Login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ updateHospital}) => {

    const history = useHistory()

    const [ hospital, setHospital] = useState({
        ID:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setHospital({
            ...hospital,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:5000/hospital/login", hospital)
        .then(res => {
            alert(res.data.message)
            updateHospital(res.data.hospital)
            // history.push("/")
            
            // index.js에서 조건문써서 비밀번호 맞으면 경로 이동 되도록 함
            window.location.replace(res.data.location)
            // window.location = '/admin/dashboard'
        })
        // axios.post("http://localhost:5000/hospital/login")
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="ID" value={hospital.ID} onChange={handleChange} placeholder="Enter your ID"></input>
            <input type="password" name="password" value={hospital.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/admin/areum/register")}>Register</div>
        </div>
    )
}

export default Login 