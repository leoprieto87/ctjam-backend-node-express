import livros from "../models/Livro"

class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
        .populate('autor', 'name')
        .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id
        
        livros.findById(id)
        .populate('autor', 'name')
        .exec((err, livros) => {
            if(err) {
                res.status(400).send({message: `${err.message} id do livro não encontrado`})
            } else {
                res.status(200).send(livros)
            }
        })
    }

    static criarLivro = (req, res) => {
        let livro = new livros(req.body)

        livro.save((err) => {
            if(err){
                res.status(500).send({message: `Não conseguiu gravar no servidor: ${err.message}`})
            } else {
                res.status(201).send(livro.toJSON)
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static exluirLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Livro ${id} excluido com sucesso`})
            }else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora
        
        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    }
}

export default LivroController