import jams from "../models/Jams.js"

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

    static addSongToJamPlayList = (req, res) => {
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

    static updateSongById = (req, res) => {
        const jamId = req.params.jamId;
        const playlistItemId = req.params.playlistItemId;
      
        jams.findById(jamId, (err, jam) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          if (!jam) {
            return res.status(404).send({ message: "Jam não encontrada" });
          }
      
          const playlistItem = jam.playList.id(playlistItemId);
          if (!playlistItem) {
            return res.status(404).send({ message: "Item da playlist não encontrado" });
          }
      
          playlistItem.artistName = req.body.artistName;
          playlistItem.songName = req.body.songName;
          playlistItem.usersBand = req.body.usersBand;
      
          jam.save((err, updatedJam) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.status(200).send({ message: "Música atualizada com sucesso", jam: updatedJam });
          });
        });
      };
    
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

}

export default JamController