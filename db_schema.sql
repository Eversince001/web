CREATE TABLE IF NOT EXISTS `users`
.`user` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `firs_name` VARCHAR(45) NOT NULL , 
    `last_name` VARCHAR(45) NOT NULL , 
    `email` VARCHAR(45) NOT NULL , 
    `phone` VARCHAR(45) NOT NULL , 
    `comments` TEXT NOT NULL , 
    `status` VARCHAR(10) NOT NULL DEFAULT 'active' , 
    PRIMARY KEY (`id`)
    ) 


CREATE TABLE IF NOT EXISTS `bots`
.`bot` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `ind` INT NOT NULL , 
    `Name` VARCHAR(45) NOT NULL , 
    `comments` TEXT NOT NULL , 
    `status` VARCHAR(10) NOT NULL DEFAULT 'active' , 
    PRIMARY KEY (`id`)
    ) 
    
ENGINE = InnoDB; 