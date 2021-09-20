
import { useEffect, useState } from 'react';

import QuestionBoard from '../components/QuestionBoard';
import Keyboard from '../components/Keyboard';
import LeaderBoard from '../components/LeaderBoard';
import Welcome from './Welcome';

function Home() {
    const[typed, setCharacer]= useState('')
    const characters = ["q","w","e","r","t","Y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const strings = characters.toString().toUpperCase().split(',')
    const [words, setWords] = useState([{
        completed:false,
        text:'is',
        level:1
    },
    {
        completed:false,
        text:'more',
        level:2
    },
    {
        completed:false,
        text:'sophisticated',
        level:3
    }
])
    const [results, setResults] = useState({})
    const [typedWord, setTypedWord] = useState('')
    
    const handleType = e => setCharacer(e.key.toUpperCase())
    const handleSubmit =() =>{
      // Save Result in DB
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
            setWords(words.filter(word=> word.text.toUpperCase() !== typedWord.concat(typed)&&
           {...word, completed:false}))
         setTypedWord('')
        } 
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
  );
}

export default Home;
