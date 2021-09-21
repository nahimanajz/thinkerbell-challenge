import Result from "../models/Results";

class Score {
    async save(req, res){
        
        const {score, multiplier, level} = req.body;
        const scores =  new Result({score, multiplier, level});
        const savedRes = await scores.save().then(resp=>{
            return res
                .send({
                message:'new response is saved',
                data: resp
            })
        }).catch(error=>res.send(error))
    }
    async all(req, res){
        return res.send({data: await Result.find()})
    }
}
export default new Score();