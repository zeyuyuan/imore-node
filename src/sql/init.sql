CREATE DATABASE imore;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'imore$Demo666';
GRANT ALL PRIVILEGES ON imore.* TO 'user'@'localhost';

flush privileges;
