import Level from './Level'
import Score from './Score'
import Multiplier from './Multiplier'

export default function LeaderBoard({results}){
    const {level, score, multiplier} = results
    return (
        <div className="res-container">
            <Level level={level} />
            <Score score={score} />
            <Multiplier multiplier={multiplier} />
        </div>

    )
} 