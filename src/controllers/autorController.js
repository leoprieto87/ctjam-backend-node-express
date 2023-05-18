import autores from "../models/Autor"

class AutorController {
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores)
            console.log(err)
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id
        autores.findById(id, (err, autores) => {
            if(err) {
                res.status(400).send({message: `${err.message} id do Autor não encontrado`})
            } else {
                res.status(200).send(autores)
            }
        })
    }

    static criarAutor = (req, res) => {
        let autor = new autores(req.body)

        autor.save((err) => {
            if(err){
                res.status(500).send({message: `Não conseguiu gravar no servidor: ${err.message}`})
            } else {
                res.status(201).send(autores.toJSON)
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;
    
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Autor atualizado com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static exluirAutor = (req, res) => {
        const id = req.params.id
        autores.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Autor ${id} excluido com sucesso`})
            }else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default AutorController