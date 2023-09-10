CREATE TABLE `chats` (
  `id` varchar(255) NOT NULL,
  `chatCreatorId` varchar(255) NOT NULL,
  `recipientId` varchar(255) NOT NULL,
  `messagesAmount` int DEFAULT NULL,
  `lastMessage` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
)
