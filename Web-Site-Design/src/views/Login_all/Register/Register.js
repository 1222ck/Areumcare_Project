import React, { useState } from "react"
import "./Register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ hospital, setHospital] = useState({
      Hname: "",
      ID: "",
      password: "",
      reEnterPassword: "",
      BLN: "",
      Tel: "",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setHospital({...hospital, [name]: value})
    }
    

    const register = () => {
        const { Hname, ID, password, reEnterPassword, BLN, Tel } = hospital;
        if(Hname && ID && password &&(password === reEnterPassword) && BLN && Tel){
            axios.post("http://localhost:5000/hospital/register", hospital)
            .then( res => {
                alert(res.data.message)
                // history.push("/login")

                // index.js에서 조건문써서 입력이 다 되면 경로 이동 되도록 함
                window.location.replace(res.data.location)
            })
        } else {
            alert("빈칸을 확인해주세요")
        }

    }

    return (
        <div className="register">
            {/* {console.log("hospital", hospital)}  */}
            <h1>Register</h1>
            <input type="text" name="Hname" value={hospital.Hname} placeholder="Hospital Name" onChange={ handleChange }></input>
            <input type="text" name="ID" value={hospital.ID} placeholder="Your ID" onChange={ handleChange }></input>
            <input type="password" name="password" value={hospital.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={hospital.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <input type="text" name="BLN" value={hospital.BLN} placeholder="사업자 등록번호" onChange={ handleChange }></input>
            <input type="text" name="Tel" value={hospital.Tel} placeholder="전화번호" onChange={ handleChange }></input>
            
            
            
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/admin/areum/login")}>Login</div>
        </div>
    )
}

export default Register