
function QuestionBoard({words}) {
    return (
        <div className="word-board">
            {words.map(word=>(
                <span className="word" key={word}>{word}</span>
            ))}
        </div>
    );
  }
  
  export default QuestionBoard;
  