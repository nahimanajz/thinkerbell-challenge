
function QuestionBoard({words}) {

    return (
        <div className="word-board">
            {words.map(({text})=> (
                <span className="word" key={text}>{text}</span>
            ))}
            
        </div>
    );
  }
  
  export default QuestionBoard;
  