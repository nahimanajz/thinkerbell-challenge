import { useState } from "react";

export default function Welcome(){
    const [show, setShow]= useState(true)
    return(
    <>
        { show &&(
        <div className="welcome">
            <div className="loader">
              <strong>Typing Instructions </strong>
                <p> <strong>Level1. </strong> Words which has less than three characters</p>
                <p> <strong>Level2. </strong> Words which has less than five characters </p>
                <p><strong> Level3. </strong>  Words which has more than five characters</p>
                <button> Start Game</button>

            </div>
        </div>
        )}
    </>
    )
}