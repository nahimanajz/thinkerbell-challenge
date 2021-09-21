import LeaderBoard from '../components/LeaderBoard'

function TenPlayedGames({results:games, resetGame}){
  const {data}= games
  const average = data.reduce((sum, game)=> game.score + sum,0) / data.length
  const maxLevel = data.reduce((max, {level})=> max > level ? max: level)
 
    return (
        <div className="ten-games"> <span onClick={resetGame}>X</span>
            <div className="statitstics">
                <div>Played games<h1>{data.length}</h1></div>
                <div>Average Score<h1>{parseFloat(average).toFixed(2)}</h1></div>
                <div>Maximum Level Reached <h1>{maxLevel}</h1></div>
            </div>
            {games && data.map((game, index) => index <11 &&(
                <div key={game.result}>
                    <LeaderBoard results={game}/>
                </div>
            )).sort((a, b) => b-a)}
        </div>
    )
}
export default TenPlayedGames