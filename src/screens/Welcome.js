import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome(){
    return(
        <div className="welcome">
            <div className="loader">
            <Link to="/home"> Start</Link>
              <strong>Typing Instructions </strong>
                <p> <strong>Level1. </strong> Words which has less than three characters</p>
                <p> <strong>Level2. </strong> Words which has less than five characters </p>
                <p><strong> Level3. </strong>  Words which has more than five characters</p>
                

            </div>
        </div>
    )
}