
import { useEffect, useState } from 'react';
import Level from '../components/Level'
import Score from '../components/Score'
import Multiplier from '../components/Multiplier'
import QuestionBoard from '../components/QuestionBoard';

function Home() {
    const[typed, setCharacer]= useState('')
    const characters = ["q","w","e","r","t","Y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const strings = characters.toString().toUpperCase().split(',')
    const words = ["is","more", "sophisticated"]
    const keypressedColor='#F5D466'
    //Todo: correct input from user and compare it with word which  is written
    const [typedWord, setTypedWord] = useState('')
    
    const handleType = e => setCharacer(e.key.toUpperCase())
    useEffect(()=> setTypedWord(typedWord.concat(typed)), [typed])

    return (
        <>
        <div>typed word is{typedWord}</div>
        <div className="res-container">
            <Level />
            <Score />
            <Multiplier />
        </div>
        <QuestionBoard words={words}/>
    <div className="keyboard">    
    <input  onKeyPress={handleType} autoFocus={true} style={{opacity:0}} />    
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
</>
  );
}

export default Home;
