import jams from "../models/Jams"

const populateOptions = [
    { path: 'playList.usersBand.vocal', select: 'name' },
    { path: 'playList.usersBand.guitar', select: 'name' },
    { path: 'playList.usersBand.guitar2', select: 'name' },
    { path: 'playList.usersBand.bass', select: 'name' },
    { path: 'playList.usersBand.drums', select: 'name' },
    { path: 'playList.usersBand.keys', select: 'name' }
  ];

class JamController {
    
    static listJams = (req, res) => {
        jams.find()
        .populate(populateOptions)
        .exec((err, jams) => {
            res.status(200).json(jams)
        })
    }

    static listJamById = (req, res) => {
        const id = req.params.id
        
        jams.findById(id)
        .populate(populateOptions)
        .exec((err, jams) => {
            if(err) {
                res.status(400).send({message: `${err.message} id da jam não encontrado`})
            } else {
                res.status(200).send(jams)
            }
        })
    }

    static createJam = (req, res) => {
        let jam = new jams(req.body)

        jam.save((err) => {
            if(err){
                res.status(500).send({message: `Não conseguiu gravar no servidor: ${err.message}`})
            } else {
                res.status(201).send(jam.toJSON())
            }
        })
    }

    static updateJam = (req, res) => {
        const id = req.params.id;

        jams.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Jam atualizado com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static updateJamPlayList = (req, res) => {
        const id = req.params.id;

        jams.findByIdAndUpdate(id, {$push: { playList: req.body }},
            { new: true }, (err) => {
            if(!err) {
                res.status(200).send({message: 'Jam atualizado com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deleteJam = (req, res) => {
        const id = req.params.id

        jams.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Jam ${id} excluida com sucesso`})
            }else {
                res.status(500).send({message: err.message})
            }
        })
    }

    // static listarJamPorEditora = (req, res) => {
    //     const editora = req.query.editora
        
    //     jams.find({'editora': editora}, {}, (err, jams) => {
    //         res.status(200).send(jams)
    //     })
    // }
}

export default JamController