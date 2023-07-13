CREATE TABLE `comment_thread` (
	`parent_id` varchar(256) NOT NULL,
	`child_id` varchar(256) NOT NULL,
	PRIMARY KEY(`child_id`,`parent_id`)
);
--> statement-breakpoint
CREATE TABLE `community` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`creator_id` varchar(256) NOT NULL,
	`avatar_url` varchar(256),
	`name` varchar(256) NOT NULL,
	`normalized_name` varchar(256) NOT NULL,
	`type` enum('public','private','restricted') NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`title` varchar(256) NOT NULL,
	`creator_id` varchar(256) NOT NULL,
	`community_name` varchar(256) NOT NULL,
	`content` json NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `vote` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`creator_id` varchar(256) NOT NULL,
	`value` enum('up','down') NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `subscription` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`userId` varchar(256) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`username` varchar(256) NOT NULL,
	`profile_image_url` varchar(256),
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`is_top_level` boolean DEFAULT true,
	`post_id` varchar(256) NOT NULL,
	`creator_id` varchar(256) NOT NULL,
	`content` json NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL);
--> statement-breakpoint
CREATE TABLE `subscriptions_to_communities` (
	`subscription_id` varchar(256) NOT NULL,
	`community_id` varchar(256) NOT NULL,
	PRIMARY KEY(`community_id`,`subscription_id`)
);
--> statement-breakpoint
CREATE TABLE `votes_to_posts` (
	`vote_id` varchar(256) NOT NULL,
	`post_id` varchar(256) NOT NULL,
	PRIMARY KEY(`post_id`,`vote_id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `community` (`name`);