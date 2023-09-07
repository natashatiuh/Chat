CREATE TABLE `messages` (
  `id` varchar(255) NOT NULL,
  `chatId` varchar(255) NOT NULL,
  `senderId` varchar(255) NOT NULL,
  `recipientId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `dateAndTime` datetime NOT NULL,
  `edited` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
)
