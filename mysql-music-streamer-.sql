DROP DATABASE If EXISTS Music_Streaming;
CREATE DATABASE Music_Streaming;
USE Music_Streaming;
CREATE TABLE `artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cover_img` VARCHAR(255) NULL,
    `upload_at` DATETIME NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE
    `artists` ADD UNIQUE `artists_name_unique`(`name`);
CREATE TABLE `albums`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `artist_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `upload_at` DATETIME NOT NULL,
    `cover_img` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `songs`(
    `id` VARCHAR(255) NOT NULL,
    `artist_id` INT NULL,
    `title` VARCHAR(255) NOT NULL,
    `album_id` INT NOT NULL,
    `length` DOUBLE(8, 2) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `upload_at` DATETIME NOT NULL,
    `youtube_link` VARCHAR(255) NULL,
    `lyrics` TEXT NOT NULL,
    `track_number` INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` TINYINT(1) NOT NULL,
    `preferences` JSON NULL,
    `created_at` DATETIME NOT NULL,
    `remember_token` VARCHAR(255) NULL,
    `upload_at` DATETIME NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `playlist`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `upload_at` DATETIME NOT NULL,
    `rules` TEXT NULL,
    `cover_img` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `playlist_songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `playlist_id` INT NOT NULL,
    `song_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `interactions`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `song_id` VARCHAR(255) NOT NULL,
    `is_liked` TINYINT(1) NOT NULL,
    `play_count` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (id)
);


ALTER TABLE
    `interactions` ADD CONSTRAINT `interactions_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
ALTER TABLE
    `playlist_songs` ADD CONSTRAINT `playlist_songs_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
ALTER TABLE
    `songs` ADD CONSTRAINT `songs_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `artists`(`id`);
ALTER TABLE
    `albums` ADD CONSTRAINT `albums_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `artists`(`id`);
ALTER TABLE
    `songs` ADD CONSTRAINT `songs_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `albums`(`id`);
ALTER TABLE
    `playlist_songs` ADD CONSTRAINT `playlist_songs_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `playlist`(`id`);
ALTER TABLE
    `interactions` ADD CONSTRAINT `interactions_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `playlist` ADD CONSTRAINT `playlist_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `music_streaming`.`albums` 
    CHANGE COLUMN `cover_img` `cover_img` LONGTEXT NOT NULL ;

