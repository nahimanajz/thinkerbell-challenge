
import { useEffect, useState } from 'react'

import QuestionBoard from '../components/QuestionBoard'
import Keyboard from '../components/Keyboard'
import LeaderBoard from '../components/LeaderBoard'
import Welcome from './Welcome';
import axios from 'axios';
import TenPlayedGames from './TenPlayedGames'
import { initData } from '../util/initData'

// Todo: add sound 
// Add trending characters  to add bonus
// host it and submit 
//add instruction on game begin
function Home() {
    const[typed, setCharacer]= useState('')
    const characters = ["q","w","e","r","t","Y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const strings = characters.toString().toUpperCase().split(',')
    const [words, setWords] = useState(initData)
    const [results, setResults] = useState({})
    const [typedWord, setTypedWord] = useState('')
    const[games, setGames] = useState(null)
    
    const handleType = e => setCharacer(e.key.toUpperCase())
    
    const handleSubmit = async () =>{
     const { data } = await axios.post(`http://127.0.0.1:5000/api/results`, results)
     if(data){
         const {data:tenGames} =  await axios.get(`http://127.0.0.1:5000/api/results`) 
         setGames(tenGames)
     }
    }
    const matchWords=()=> {
        if(typedWord.concat(typed) === words[0].text.toUpperCase() ){            
           setWords(words.filter(word=> word.text.toUpperCase() !== typedWord.concat(typed)&&
           {...word, completed:true}))
         setTypedWord('')
           
        }
    }
    const resetUnmatchingWords = () =>{   
        if(typedWord.concat(typed) !== words[0].text.toUpperCase()
          && typedWord.concat(typed).length >= words[0].text.toUpperCase().length
        ){
         setTypedWord('')
         if (results && words.length){
            setWords(words)   
         }
            setGames(null)
            setWords('')
        } 
    }

    const resetGame = () =>{ 
        setWords(initData)
        setGames(null)
    }
 
    
    useEffect(()=> {
        setTypedWord(typedWord.concat(typed))
        matchWords()
        resetUnmatchingWords()
        console.log(words)
        let score = typedWord.concat(typed) === words[0].text.toUpperCase()?(results.level*results.multiplier)+results.score :results.score
        setResults({
            level:words[0].level,
            multiplier:words[0].level,
            score: score||0,
        })
    }, [typed])

    return (
        <> {
            !games ?(
                <>
                    <div>typed word is{typedWord}</div>             
                    <input onKeyPress={handleType} autoFocus={true} style={{opacity:0}} />    
                    <LeaderBoard results={results}/>
                    {!words.length ?<button onClick={handleSubmit}>Submit</button>:(
                        <>
                            <QuestionBoard words={words && words.filter(({text, completed})=> !completed)}/>
                            <Keyboard strings={strings} typed={typed} />
                        </> 
                    )}
                    {/* <Welcome /> */}
                </>
            ):(
               <TenPlayedGames results={games} resetGame={resetGame}/>
            )
        }
        </>
  );
}

export default Home;
