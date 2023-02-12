CREATE TABLE `Pedidos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`data_inicio` DATE NOT NULL,
	`data_fim` DATE,
	`status` varchar(20) NOT NULL,
	`contato_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Contatos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(11) NOT NULL,
	`endereco` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`cpf` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Produtos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`img_url` varchar(255) NOT NULL,
	`preco` DECIMAL(255) NOT NULL,
	`preco_old` DECIMAL(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Pedidos_Contato` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`quantidade` INT NOT NULL,
	`tamanho` varchar(3) NOT NULL,
	`pedido_id` INT NOT NULL,
	`produto_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_fk0` FOREIGN KEY (`contato_id`) REFERENCES `Contatos`(`id`);

ALTER TABLE `Pedidos_Contato` ADD CONSTRAINT `Pedidos_Contato_fk0` FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`id`);

ALTER TABLE `Pedidos_Contato` ADD CONSTRAINT `Pedidos_Contato_fk1` FOREIGN KEY (`produto_id`) REFERENCES `Produtos`(`id`);





