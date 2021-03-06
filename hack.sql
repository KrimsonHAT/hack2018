CREATE DATABASE codevs;

GRANT ALL ON codevs.* TO 'maestro'@'%' IDENTIFIED BY 'themaster';

USE codevs;

CREATE TABLE user(
    username VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    password VARCHAR(60) NOT NULL,
    profile_pic VARCHAR(128),
    bio TEXT,
    areas TEXT,
    mail varchar(128),
    PRIMARY KEY(username)
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE client(
	client_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	password VARCHAR(60) NOT NULL,
	priority TINYINT(1) UNSIGNED,
	PRIMARY KEY(client_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE request (
    request_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    description TEXT NOT NULL,
    revision TEXT,
    client INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (request_id),
    CONSTRAINT req_client_fk FOREIGN KEY (client) REFERENCES client(client_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE project(
	project_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	start_date DATE NOT NULL,
	client_id INTEGER UNSIGNED,
	leader VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    name VARCHAR(32) NOT NULL,
	PRIMARY KEY(project_id),
    CONSTRAINT client_fk FOREIGN KEY (client_id) REFERENCES client(client_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT leader_fk FOREIGN KEY (leader) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE works_on(
    user VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    project_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (user, project_id),
    CONSTRAINT worker_fk FOREIGN KEY (user) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT project_fk FOREIGN KEY (project_id) REFERENCES project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE feature(
	feature_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	deadline DATETIME NOT NULL,
	project_id INTEGER UNSIGNED NOT NULL,
	leader VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    name VARCHAR(32) NOT NULL,
	PRIMARY KEY(feature_id),
    CONSTRAINT leader_feature_fk FOREIGN KEY (leader) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT project_feature_fk FOREIGN KEY (project_id) REFERENCES project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE task (
    task_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    feature INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (task_id),
    CONSTRAINT feature_task_fk FOREIGN KEY (feature) REFERENCES feature(feature_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE pool(
	propose_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	idea TEXT NOT NULL,
	project INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(propose_id),
    CONSTRAINT bel_project_fk FOREIGN KEY (project) REFERENCES project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE vote(
	user VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
	propose INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(user, propose),
    CONSTRAINT vote_user FOREIGN KEY (user) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT vote_propose FOREIGN KEY (propose) REFERENCES pool(propose_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE participates(
    user VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
	task INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(user, task),
    CONSTRAINT participant_fk FOREIGN KEY (user) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT task_fk FOREIGN KEY (task) REFERENCES task(task_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE error(
    user VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
	task INTEGER UNSIGNED NOT NULL,
    project INTEGER UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (user, project),
    CONSTRAINT error_user_fk FOREIGN KEY (user) REFERENCES user(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT error_project_fk FOREIGN KEY (project) REFERENCES project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT error_task_fk FOREIGN KEY (task) REFERENCES task(task_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;