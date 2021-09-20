
export default function Keyboard({typed, strings}){
    const keypressedColor='#F5D466'

    return (
        <div className="keyboard">    
        <div className="row">
           {strings.map((char, index)=> index<10 && (
              <span style={{background:`${typed === char?keypressedColor:''}`}} key={char}>{char}</span> 
           ))}
        </div>
        <div className="row">
         {strings.map((char, index)=> index>9 && index<19 && (
              <span style={{background:`${typed === char?keypressedColor:''}`}} key={char}>
                  {index ===16|| index===13 ?<u> {`${char}`}</u>:char}
                </span> 
           ))}
        </div>
        <div className="row">
            {strings.map((char, index)=> index>18&& (
              <span style={{background:`${typed === char?keypressedColor:''}`}} key={char}>
                  {char}
              </span> 
            ))}
        </div>
    </div>
    )
}