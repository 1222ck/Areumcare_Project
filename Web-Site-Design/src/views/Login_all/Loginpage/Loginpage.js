import React from "react"
import "./Loginpage.css"

const Loginpage = ({updateHospital}) => {
    return (
        <div className="Loginpage">
            <h1>Hello AreumCare</h1>
            <div className="button" onClick={() => updateHospital({})}>Logout</div>
        </div>
    )
}

export default Loginpage