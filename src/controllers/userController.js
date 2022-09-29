const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

require('../models/Usuario');
const Usuario = mongoose.model('usuarios');
const logger = require('../config/loggerConfig')

exports.createUser = async (req, res) => {
	logger.info(`Criando novo usuario - ${req.body.username}`);

	//validando campos obrigatórios não enviados
	if (!req.body.username) {
		res.status(400).send('O campo username é obrigatório!');
	} else if (!req.body.email) {
		res.status(400).send('O campo email é obrigatório!');
	} else if (!req.body.senha) {
		res.status(400).send('O campo senha é obrigatório!');
	} 
    else if (!req.body.nome) {
		res.status(400).send('O campo nome é obrigatório!');
	} 
    else if (!req.body.idade) {
		res.status(400).send('O campo idade é obrigatório!');
	} 

	const novoUser = {
		GM: false,
        nome: req.body.nome,
        idade: req.body.idade,
		username: req.body.username,
		email: req.body.email,
		senha: bcrypt.hashSync(req.body.senha, 8),
	};
	//salvando no banco
	new Usuario(novoUser)
		.save()
		.then(() => {
			logger.info(`Novo jogador registrado com sucesso!`);
			res.status(201).send('Novo jogador registrado com sucesso!');
		})
		.catch((erro) => {
			logger.error(`Falha ao registrar novo comprador! :: `.bgRed + erro);
			res.status(500).send('Falha ao criar novo comprador!');
		});
};

/* exports.getUserDetails = async (req, res) => {
	logger.info(` Buscando usuário por id`);
	Usuario.find({ _id: req.params.id })
		.populate({ path: 'perfil', select: 'tipo' })
		.then((lista) => {
			console.log(lista);
			let item = lista[0];
			let newLista = {
				id: item._id,
				nome: item.nome,
				email: item.email,
				perfil: item.perfil.tipo,
				endereco: item.endereco,
				numero: item.numero,
				bairro: item.bairro,
				cep: item.cep,
				telefone: item.telefone,
			};

			res.json(newLista);
		});
};
 */
/* exports.deleteUser = async (req, res) => {
	logger.info(` Excluindo usuários`);
	Usuario.deleteOne({ _id: req.params.id }, function (err) {
		if (err) {
			logger.error(`Admin - Falha ao excluir administrador! :: `.bgRed + err);
			res.status(500).send('Falha ao excluir usuário');
		} else {
			res.status(200).send('Excluído com sucesso');
		}
	});
}; */

/* exports.auth = async (req, res) => {
	logger.info(`Autenticando usuario`);

	Usuario.findOne({
		email: req.body.email,
	})
		.populate({ path: 'perfil', select: 'tipo' })
		.then((usuario) => {
			if (!usuario) {
				return res.status(404).send('Falha de Login, email não encontrado');
			}

			let passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
			if (!passwordIsValid) {
				return res.status(401).send({
					auth: false,
					accessToken: null,
					reason: 'Senha Invalida!',
				});
			}

			let token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'geek', {
				expiresIn: 86400, // expires in 24 hours
			});

			res.status(200).send({
				auth: true,
				accessToken: token,
				payload: {
					id: usuario._id,
					perfil: usuario.perfil.tipo,
					nome: usuario.nome,
					email: usuario.email,
				},
			});
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).send('Internal Server Error ' + err);
		});
}; */