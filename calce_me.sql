CREATE DATABASE calce_me;

CREATE TABLE calcados(
	idCalcado INT(11) NOT NULL AUTO_INCREMENT,
    modelo VARCHAR(45) DEFAULT NULL,
    cor VARCHAR(45) DEFAULT NULL,
    descricao TEXT DEFAULT NULL,
    material VARCHAR(45)  DEFAULT NULL,
    valor FLOAT  DEFAULT NULL,
    PRIMARY KEY(idCalcado)
);


CREATE TABLE parceiros(
	idParceiro INT(11) NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) DEFAULT NULL,
    tempoParceria INT(11) DEFAULT NULL,
    linkContato TEXT DEFAULT NULL,
    PRIMARY KEY(idParceiro)
);











