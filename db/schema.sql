USE `main`;

CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(200) NOT NULL
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    post_text VARCHAR(200),
    CONSTRAINT `FK_PostsUsers` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;