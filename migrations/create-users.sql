CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nickName` (`nickName`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
)
