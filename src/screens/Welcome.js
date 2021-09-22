import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome(){
    return(
        <div className="welcome">
            <div className="loader">
              <strong>WordRace  </strong>
                <p> <strong>Level1. </strong> Words which has less than three characters</p>
                <p> <strong>Level2. </strong> Words which has less than five characters </p>
                <p><strong> Level3. </strong>  Words which has more than five characters</p>

                <Link to="/home" className="start"> Start</Link>
            </div>
        </div>
    )
}