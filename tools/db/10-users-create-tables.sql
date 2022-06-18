--
-- Create Table for Backend UserApi
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `blueskyfish_users` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `blueskyfish_users`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(36) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(240) NOT NULL,
  `enabled` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UNI_USER_EMAIL` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='(Blueskyfish) the user table';


DROP TABLE IF EXISTS `user_permissions`;
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `user_id` varchar(36) NOT NULL,
  `permissions` text NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='(Blueskyfish) the user permission table';

DROP TABLE IF EXISTS `user_secrets`;
CREATE TABLE IF NOT EXISTS `user_secrets` (
  `user_id` varchar(36) NOT NULL,
  `password` varchar(240) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='(Blueskyfish) the user secret table';

COMMIT;
