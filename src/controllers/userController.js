const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../models/Usuario');
const Usuario = mongoose.model('usuarios');
const logger = require('../config/loggerConfig')
const {generateToken} = require('../service/authService')

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

exports.getUserDetails = async (req, res) => {
	logger.info(` Buscando usuário por id`);
	Usuario.find({ _id: req.params.id })
		.then((lista) => {
			console.log(lista);
			let item = lista[0];

			res.json(item);
		});
};

exports.login = async (req, res) => {
	logger.info(`Autenticando usuario`);
	let token = null
	Usuario.findOne({
		email: req.body.login,
	})
		.then(async (usuario) => {
			if (!usuario) {
				Usuario.findOne({
					username: req.body.login,
				}).then(async (player) => {
					if (!player) {
						return res.status(404).send('Falha de Login, email ou username não encontrado');
					} else {

						let passwordIsValid = bcrypt.compareSync(req.body.senha, player.senha);
						if (!passwordIsValid) {
							return res.status(401).send({
								auth: false,
								accessToken: null,
								reason: 'Senha Invalida!',
							});
						}


						let token = await generateToken(player)
						res.status(200).send({
							auth: true,
							accessToken: token,
							payload: {
								id: player._id,
								nome: player.nome,
								email: player.email,
							},
						});
					}
				})
			} else {
				let passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
				if (!passwordIsValid) {
					return res.status(401).send({
						auth: false,
						accessToken: null,
						reason: 'Senha Invalida!',
					});
				}


				token = await generateToken(usuario)

				res.status(200).send({
					auth: true,
					accessToken: token,
					payload: {
						id: usuario._id,
						nome: usuario.nome,
						email: usuario.email,
					},
				});
			}

		})
		.catch((err) => {
			logger.error(err);
			res.status(500).send('Internal Server Error ' + err);
		});
};