
import { useEffect, useState } from 'react'

import QuestionBoard from '../components/QuestionBoard'
import Keyboard from '../components/Keyboard'
import LeaderBoard from '../components/LeaderBoard'
import axios from 'axios';
import TenPlayedGames from './TenPlayedGames'
import { bonus, initData, trendingChar } from '../util/initData'
import useSound from 'use-sound';

function Home() {
    const[typed, setCharacer]= useState('')
    const characters = ["q","w","e","r","t","Y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const strings = characters.toString().toUpperCase().split(',')
    const [words, setWords] = useState(initData)
    const [results, setResults] = useState({})
    const [typedWord, setTypedWord] = useState('')
    const[games, setGames] = useState(null)
    const[playCorrect]= useSound('/sounds/correct.mp3')
    const [playFail] = useSound('/sounds/fail.mp3')
    const [playGameOver] = useSound('/sounds/GameOver.mp3')
    const [submit,setSubmit]= useState(false)
    
    const handleType = e => setCharacer(e.key.toUpperCase())
    
    const handleSubmit = async () =>{
     const { data } = await axios.post(`http://127.0.0.1:5000/api/results`, results)
     if(data){
         const {data:tenGames} =  await axios.get(`http://127.0.0.1:5000/api/results`) 
         setGames(tenGames)
     }
     playGameOver()
    }
    const matchWords=()=> {
        if(typedWord.concat(typed) === words[0].text.toUpperCase() ){ 
        // play correct sound  
        playCorrect()
        setWords(words.filter(word=> word.text.toUpperCase() !== typedWord.concat(typed)&&
        {...word, completed:true}))
        setTypedWord('')
        
        }

    }
    const resetUnmatchingWords = () =>{  
     
        if(typedWord.concat(typed) !== words[0].text.toUpperCase()
            && typedWord.concat(typed).length >= words[0].text.toUpperCase().length
          ){  
           playFail()
           setTypedWord('')
           if (results && words.length){
              setWords(words)   
           }
              setGames(null)
              setSubmit(true)
              
        } 
          
    }

    const resetGame = () =>{ 
        setWords(initData)
        setGames(null)
        setSubmit(false)
    }
 
    useEffect(()=> {
       setTypedWord(typedWord.concat(typed))
       matchWords()
       resetUnmatchingWords()
        const {level, multiplier, score} = results
        let calcScore = typedWord.concat(typed) === words[0].text.toUpperCase()?(level*multiplier)+score :score
        let mul = words[0].level
        //alert(bonus)
        setResults({
            level:words[0].level,
            multiplier: words[0].text.includes(trendingChar)? mul * bonus : words[0].level,
            score: calcScore || 0,
        })
    }, [typed])

    return (
        <> {
            !games ?(
                <>          
                    <input onKeyPress={handleType} autoFocus={true} style={{opacity:0}} />    
                    <LeaderBoard results={results}/>
                    {submit || !words.length? <button onClick={handleSubmit}>Submit</button>:(
                        <>
                            <div className="trending-char">{trendingChar}</div>
                            <QuestionBoard words={words && words.filter(({text, completed})=> !completed)}/>
                            <Keyboard strings={strings} typed={typed} />
                        </> 
                    )}
                </>
            ):(
               <TenPlayedGames results={games} resetGame={resetGame}/>
            )
        }
        </>
  );
}

export default Home;
