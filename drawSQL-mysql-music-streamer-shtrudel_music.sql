DROP DATABASE If EXISTS Strudel_Music;
CREATE DATABASE Strudel_Music;
USE Strudel_Music;
CREATE TABLE `artists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cover_img` LONGTEXT NULL,
    `uploaded_at` DATETIME NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE
    `artists` ADD UNIQUE `artists_name_unique`(`name`);
CREATE TABLE `albums`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `artist_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `uploaded_at` DATETIME NOT NULL,
    `cover_img` LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `artist_id` INT NULL,
    `title` VARCHAR(255) NOT NULL,
    `album_id` INT NOT NULL,
    `length` VARCHAR(5) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `uploaded_at` DATETIME NOT NULL,
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
    `cover_img`LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `playlist_songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `playlist_id` INT NOT NULL,
    `song_id` INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `user_playlists`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `playlist_id` INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `interactions`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `song_id` INT NOT NULL,
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
    `user_playlists` ADD CONSTRAINT `user_playlists_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `user_playlists` ADD CONSTRAINT `user_playlists_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `playlist`(`id`);
    
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Foo Fighters', '1994-08-17', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Red Hot Chili Peppers', '1983-08-17', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Bare Dreams', '2020-08-17', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Paramore', '2015-04-12', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Billie Eilish', '2015-08-15', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Nirvana', '2001-02-18', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Tenacious D', '2013-04-16', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Avenged Sevenfold', '2010-08-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Eminem', '2011-06-14', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Breaking Benjamin', '2014-07-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('LP', '2008-04-12', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Akon', '2004-08-15', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Rise Against', '2001-02-18', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Papa Roach', '1998-04-16', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Radio Head', '1994-08-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Panic! At The Disco', '2000-06-14', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Hozier', '2014-07-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Fleetwood Mac', '1998-04-16', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Jack Johnson', '1994-08-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('David Bowie', '2011-06-14', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('I Prevail', '2014-07-05', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Eagles', '2004-08-15', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('The Pretty Reckless', '2001-02-18', 'imgdotcom');
INSERT INTO `artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('OneRepublic', '1998-04-16', 'imgdotcom');

-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (1, 'ut', 'http://lorempixel.com/640/480/', '1982-08-05 02:41:25');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (2, 'cumque', 'http://lorempixel.com/640/480/', '2003-07-20 05:06:52');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (3, 'iusto', 'http://lorempixel.com/640/480/', '1991-02-14 04:33:35');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (4, 'perspiciatis', 'http://lorempixel.com/640/480/', '1999-09-21 20:05:56');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (5, 'est', 'http://lorempixel.com/640/480/', '1976-04-12 15:37:49');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (6, 'voluptas', 'http://lorempixel.com/640/480/', '1989-11-13 10:09:55');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (7, 'aut', 'http://lorempixel.com/640/480/', '1997-08-10 23:49:22');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (8, 'id', 'http://lorempixel.com/640/480/', '1997-03-11 19:29:11');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (9, 'ex', 'http://lorempixel.com/640/480/', '2011-08-20 02:25:32');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (10, 'quas', 'http://lorempixel.com/640/480/', '1995-12-03 14:54:01');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (11, 'dolorum', 'http://lorempixel.com/640/480/', '2005-11-09 10:55:34');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (12, 'eos', 'http://lorempixel.com/640/480/', '1988-03-26 03:52:15');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (13, 'sed', 'http://lorempixel.com/640/480/', '1972-01-27 12:18:28');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (14, 'voluptatem', 'http://lorempixel.com/640/480/', '1994-10-12 06:31:52');
-- INSERT INTO `artists` (`id`, `name`, `cover_img`, `upload_at`) VALUES (15, 'error', 'http://lorempixel.com/640/480/', '2010-04-19 02:52:04');

INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('By the way', '2009-01-01', '2009-01-01', 'imgdotcom', '2');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Lost With All Hands', '2019-02-01', '2020-01-01', 'imgdotcom', '3');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Brand New Eyes', '2015-01-01', '2015-01-01', 'imgdotcom', '4');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('dont smile at me', '2017-01-01', '2017-01-01', 'imgdotcom', '5');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Nevermind', '1991-01-01', '1991-01-01', 'imgdotcom', '6');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Tenacious D', '2001-01-01', '2001-01-01', 'imgdotcom', '7');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Avenged Sevenfold', '2007-01-01', '2007-01-01', 'imgdotcom', '8');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Recovery', '2010-01-01', '2010-01-01', 'imgdotcom', '9');
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Phobia', '2006-01-01', '2006-01-01', 'imgdotcom', '10');
-- need to add songs to these 
INSERT INTO `albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Nightmare', '2010-02-02', '2010-01-02', 'imgdotcom', '8');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Lost on You', '2016-01-02', '2016-02-02', 'imgdotcom', '11');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Konvicted', '2006-01-02', '2016-02-02', 'imgdotcom', '12');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Endgame', '2011-01-02', '2011-02-02', 'imgdotcom', '13');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Appeal To Reason', '2008-01-02', '2008-02-02', 'imgdotcom', '13');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'F.E.A.R', '2015-01-02', '2015-02-02', 'imgdotcom', '14');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Pablo Honey', '1993-01-02', '1993-02-02', 'imgdotcom', '15');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Pretty. Odd.', '2008-01-02', '2008-02-02', 'imgdotcom', '16');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Too Weird to Live, Too Rare to Die!', '2013-01-02', '2013-02-02', 'imgdotcom', '16');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Death of a Bachelor', '2016-01-02', '2016-02-02', 'imgdotcom', '16');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Hozier', '2014-01-02', '2014-02-02', 'imgdotcom', '17');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Rumours', '1977-01-02', '1999-02-02', 'imgdotcom', '18');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('In Between Dreams', '2005-01-02', '2005-02-02', 'imgdotcom', '19');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'ChangesOneBowie', '1976-01-02', '2016-02-02', 'imgdotcom', '20');
INSERT INTO `albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('TRAUMA', '2019-01-02', '2019-02-02', 'imgdotcom', '21');


-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (1, 1, 'aut', '2013-01-12 07:34:03', '1982-01-30 16:31:14', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (2, 2, 'quis', '1970-10-27 05:17:41', '1970-05-19 12:43:35', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (3, 3, 'voluptas', '2011-04-05 13:40:35', '1997-06-06 06:34:55', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (4, 4, 'sequi', '2006-07-21 17:44:37', '1970-01-27 04:15:24', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (5, 5, 'delectus', '2010-01-08 07:57:30', '1973-09-07 01:21:37', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (6, 6, 'rem', '1979-11-07 08:10:26', '2004-10-25 18:28:07', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (7, 7, 'dolor', '1974-09-09 11:37:43', '2000-02-09 15:35:34', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (8, 8, 'enim', '2019-04-29 06:39:06', '1991-02-12 11:22:20', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (9, 9, 'qui', '2020-03-27 11:28:57', '2004-01-03 04:20:59', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (10, 10, 'porro', '1993-10-14 03:27:56', '1972-05-22 13:27:19', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (11, 11, 'beatae', '2009-07-19 22:06:50', '2011-08-15 11:20:47', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (12, 12, 'repudiandae', '2009-03-26 08:13:17', '1973-11-15 20:53:52', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (13, 13, 'repudiandae', '1997-10-16 10:09:56', '2001-07-02 03:03:07', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (14, 14, 'accusamus', '1972-06-26 19:31:34', '1997-05-29 15:14:30', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (15, 15, 'sit', '1996-07-28 08:12:18', '2009-06-20 06:47:55', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (16, 1, 'illum', '1976-07-08 02:00:06', '1996-04-27 23:22:48', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (17, 2, 'autem', '1993-08-11 22:07:55', '2002-10-18 09:34:10', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (18, 3, 'at', '2013-04-15 10:49:29', '2019-04-16 05:36:25', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (19, 4, 'modi', '1977-09-15 05:26:48', '2012-11-24 18:59:29', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (20, 5, 'consequatur', '2001-03-14 19:29:02', '2015-04-27 19:44:23', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (21, 6, 'natus', '2000-07-13 20:26:25', '1997-06-27 12:58:48', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (22, 7, 'asperiores', '2002-05-07 12:06:10', '1997-02-11 06:44:20', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (23, 8, 'non', '1997-12-01 04:10:53', '2005-01-13 08:08:55', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (24, 9, 'ut', '1984-10-25 11:46:27', '1990-05-16 02:15:46', 'http://lorempixel.com/640/480/');
-- INSERT INTO `albums` (`id`, `artist_id`, `name`, `created_at`, `upload_at`, `cover_img`) VALUES (25, 10, 'sint', '2001-06-22 19:12:34', '1991-04-26 06:47:06', 'http://lorempixel.com/640/480/');

-- Foo Fighters
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('The Pretender', 'https://youtu.be/SBjQ9tuuTJQ', '04:30', '2009-01-01', 'to be added', '2009-01-01', '1', '1');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('All My Life', 'https://youtu.be/xQ04WbgI9rg', '04:44', '2009-01-01', 'to be added', '2009-01-01', '1', '1');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Everlong', 'https://youtu.be/eBG7P-K-r1Y', '04:49', '2009-01-01', 'to be added', '2009-01-01', '1', '1');

-- RHCP
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Cant Stop', 'https://youtu.be/8DyziWtkfBw', '04:37', '2002-01-01', 'to be added', '2009-01-01', '2', '2');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('By The Way', 'https://youtu.be/JnfyjwChuNU', '03:37', '2002-01-01', 'to be added', '2009-01-01', '2', '2');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('This Is The Place', 'https://youtu.be/gqgm7ViA2Ag', '04:30', '2002-01-01', 'to be added', '2009-01-01', '2', '2');

-- Bare Dreams
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Never Mine', 'https://youtu.be/zk3bQ3CJNg4', '03:45', '2020-01-01', 'to be added', '2009-01-01', '3', '3');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Coffee Stains', 'https://youtu.be/5kDr5863BoI', '03:14', '2020-01-01', 'to be added', '2009-01-01', '3', '3');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Oh Sister', 'https://youtu.be/YSg9qE-oDGU', '03:30', '2020-01-01', 'to be added', '2009-01-01', '3', '3');

-- Paramore
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Misguided Ghosts', 'https://youtu.be/oGWeHPK3NC4', '02:58', '2009-01-01', 'to be added', '2009-01-01', '4', '4');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('All I Wanted', 'https://youtu.be/W7nmB20qJv4', '03:45', '2009-01-01', 'to be added', '2009-01-01', '4', '4');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Where The Lines Overlap', 'https://youtu.be/blDjUkMA9oU', '03:16', '2009-01-01', 'to be added', '2009-01-01', '4', '4');

-- Billie Ellish
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('myboy', 'https://youtu.be/dVUmSgzgOqs', '02:50', '2017-01-01', 'to be added', '2009-01-01', '5', '5');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('party favor', 'https://youtu.be/tGHTOVw6F4Q', '03:23', '2017-01-01', 'to be added', '2009-01-01', '5', '5');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('idontwannabeyouanymore', 'https://youtu.be/-tn2S3kJlyU', '03:24', '2017-01-01', 'to be added', '2009-01-01', '5', '5');

-- Nirvana
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Come As You Are', 'https://youtu.be/vabnZ9-ex7o', '03:45', '1991-02-03', 'to be added', '1990-02-01', '6', '6');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Smells Like Teen Spirit', 'https://youtu.be/hTWKbfoikeg', '04:38', '1991-02-03', 'to be added', '1990-02-01', '6', '6');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Lithium', 'https://youtu.be/LYfnBsaTVEo', '04:17', '1991-02-03', 'to be added', '1990-02-01', '6', '6');

-- Tenacious D
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Tribute', 'https://youtu.be/_lK4cX5xGiQ', '04:52', '2001-02-02', 'to be added', '2001-01-02', '7', '7');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Wonderboy', 'https://youtu.be/FL4HSiGvk68', '04:31', '2001-02-02', 'to be added', '2001-01-02', '7', '7');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Kielbasa', 'https://youtu.be/7LBxr5ZScqE', '03:00', '2001-02-02', 'to be added', '2001-01-02', '7', '7');

-- Avenged Sevenfold
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Dear God', 'https://youtu.be/mzX0rhF8buo', '04:42', '2007-02-02', 'to be added', '2007-01-02', '8', '8');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('So Far Away', 'https://youtu.be/A7ry4cx6HfY', '05:28', '2010-02-02', 'to be added', '2010-01-02', '11', '8');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Buried Alive', 'https://youtu.be/imwmmv9r1oE', '06:47', '2010-02-02', 'to be added', '2010-01-02', '11', '8');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Gunslinger', 'https://youtu.be/3vDetD8cW_o', '04:11', '2007-02-02', 'to be added', '2007-01-02', '8', '8');

-- Eminem
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Space Bound', 'https://youtu.be/JByDbPn6A1o', '04:24', '2010-02-02', 'to be added', '2010-01-02', '9', '9');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Love The Way You Lie', 'https://youtu.be/uelHwf8o7_U', '04:26', '2010-02-02', 'to be added', '2010-01-02', '9', '9');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Not Afraid', 'https://youtu.be/j5-yKhDd64s', '04:18', '2010-02-02', 'to be added', '2010-01-02', '9', '9');

-- Breaking Benjamin
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Evil Angel', 'https://youtu.be/Wjrh8vid0IE', '03:40', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Unknown Soldier', 'https://youtu.be/SQl3waLGR4s', '03:42', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('The Diary Of Jane', 'https://youtu.be/DWaB4PXCwFU', '03:27', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Breath', 'https://youtu.be/Ib9swdvt3mA', '03:38', '2009-02-02', 'to be added', '2009-01-02', '10', '10');


-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (1, 1, 'Nihil debitis illum in animi.', 1, '999999.99', '1987-01-28 08:43:47', '1975-10-27 21:05:00', 'http://frami.info/', 'Rem voluptatem et possimus ducimus accusamus. At aut dolore dolores minus minus est quis velit. Vel veniam aut impedit et non asperiores.', 2);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (2, 2, 'Rerum molestiae velit minima repellat blanditiis laborum voluptate.', 2, '999999.99', '1972-09-03 19:24:40', '1992-03-16 19:05:01', 'http://www.prosacco.com/', 'Cum qui facere totam ipsa. Inventore veritatis magnam nulla voluptates necessitatibus rerum. Minima cumque pariatur unde et earum corporis deleniti. Animi quia aut consequatur dicta est in animi rem.', 19);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (3, 3, 'Voluptatem dicta accusamus ducimus.', 3, '999999.99', '1997-10-21 14:47:55', '2000-06-29 09:44:21', 'http://mueller.com/', 'Vel aperiam aliquid voluptatem et minus quia consequuntur maiores. Earum sunt et veniam et est. Earum quis pariatur ipsum quidem. Quas maxime numquam voluptas aliquam.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (4, 4, 'Unde rerum qui incidunt.', 4, '355399.54', '1991-03-30 06:50:49', '1990-12-16 02:02:58', 'http://www.greenholt.biz/', 'Suscipit quisquam asperiores officiis exercitationem veniam ut error. Est quidem excepturi molestiae vel sit velit. Iure ex velit qui ut aliquam.', 3198902);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (5, 5, 'Soluta quis et omnis voluptatum minus quasi.', 5, '7713.85', '2005-12-06 05:11:55', '1990-04-24 10:31:16', 'http://www.collins.net/', 'Est impedit non quasi doloribus. Aliquid nihil doloribus nihil. Et et suscipit saepe voluptas.', 4);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (6, 6, 'Recusandae adipisci velit voluptas veniam et non.', 6, '279.17', '1994-03-29 09:28:41', '1983-10-08 02:33:05', 'http://www.stoltenbergstroman.biz/', 'Enim quis optio explicabo sint suscipit laborum. Est illum ipsum cumque eos quis. Vitae ipsum accusantium id et. Et aut in non consectetur distinctio in labore.', 190969399);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (7, 7, 'Odio autem rerum aliquid qui voluptas eius.', 7, '12078.61', '1988-01-11 02:25:24', '2012-04-18 16:06:01', 'http://glover.com/', 'Suscipit nihil eum ab consequatur. Soluta sint ad ut velit aperiam ut. Voluptatem reprehenderit repellat reiciendis animi tempore.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (8, 8, 'Saepe ut dolorem id animi repellendus aspernatur.', 8, '30.53', '2009-09-22 15:41:51', '2016-05-19 23:15:05', 'http://harber.com/', 'Ullam repellendus adipisci eum minima. Iure saepe consectetur nihil consectetur quisquam error fugiat. Quis perspiciatis et quia.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (9, 9, 'Ipsam ut labore labore voluptatem excepturi pariatur repellat et.', 9, '999999.99', '2003-07-03 09:41:17', '1997-07-09 01:06:34', 'http://dooley.info/', 'Porro eum molestiae repudiandae nemo et est aut. Dolore temporibus est laboriosam. Ea doloremque beatae repudiandae aliquid et.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (10, 10, 'Aliquid ipsam ipsam consequatur cumque praesentium ducimus.', 10, '47686.97', '1982-06-21 09:04:01', '1975-06-10 20:52:28', 'http://adams.net/', 'Praesentium dolorum fugit id commodi dolores provident fugit. Quaerat repellendus nihil facilis. Nesciunt ipsum est voluptate similique. Nihil dolorum eaque iusto eaque.', 7494);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (11, 11, 'Eos expedita doloremque nam voluptatem optio odit animi.', 11, '999999.99', '1982-05-07 19:46:11', '2011-10-16 22:56:34', 'http://www.abshire.biz/', 'Ut labore natus itaque commodi maiores dolore. Reprehenderit itaque repellat perferendis magnam. Ut totam nemo enim et in odio corporis. Eum dolorum facilis a consequatur.', 98947);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (12, 12, 'Occaecati similique quasi rerum aut.', 12, '22040.00', '1973-06-16 02:27:28', '1999-10-10 21:35:59', 'http://bernier.com/', 'Facere quae sint mollitia id est at ipsam. Numquam dolorum quo natus qui similique. Non et culpa eum id tenetur.', 11);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (13, 13, 'Iusto ut ex harum nam quia amet vitae.', 13, '0.50', '1989-08-10 22:33:10', '2019-09-08 02:31:56', 'http://wuckert.com/', 'Dolorem eius aspernatur facilis cum quam. Dolores ullam iure quia ratione quidem facere facilis. Quibusdam corporis sequi at eveniet deserunt. Quos tempora laborum eos ex non ut veritatis.', 4845059);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (14, 14, 'Veritatis neque odit sit ea quos consequatur.', 14, '999999.99', '1996-10-27 12:58:52', '2004-04-13 00:30:51', 'http://stromanveum.com/', 'Eaque quam eligendi numquam in. Et praesentium quis id voluptatem suscipit. Quos non corrupti quisquam.', 7347911);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (15, 15, 'Nihil sapiente dolor debitis vero quibusdam aut ea sint.', 15, '10943.69', '2008-07-08 01:05:56', '1999-02-12 19:13:00', 'http://beer.net/', 'Consequatur deleniti hic explicabo nulla molestiae deserunt. Iure minima unde in molestiae. Omnis blanditiis accusantium doloribus ut. Et hic itaque dolorem praesentium quidem est sit.', 94470);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (16, 1, 'Sequi vel ex in id modi officia et.', 16, '1696.01', '2004-07-09 22:41:26', '1980-03-05 07:43:38', 'http://ankunding.org/', 'Aliquam culpa quis voluptas vel libero omnis. Velit et aut sapiente voluptates est. Temporibus corrupti et perspiciatis. Rem molestiae modi ducimus aut consequuntur laboriosam et.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (17, 2, 'Et eligendi velit dolor.', 17, '174.92', '1970-08-03 13:07:50', '1976-12-13 17:25:32', 'http://www.jerde.biz/', 'Facere est recusandae repellendus eius. Qui porro et esse quae illum vero. Nihil alias et animi odit.', 654069079);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (18, 3, 'Sunt et velit vel nam nihil fuga fugit.', 18, '999999.99', '2003-01-09 17:32:12', '1970-08-28 03:55:56', 'http://www.olsonfadel.info/', 'Et iure ab beatae consequatur nihil dignissimos eos. Ipsam temporibus ea nisi vel. Deleniti iste qui aut sed.', 6);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (19, 4, 'Aut consequatur recusandae dolore adipisci reprehenderit dolor.', 19, '49162.85', '1971-09-15 13:13:13', '1995-09-24 06:13:59', 'http://www.kshlerin.com/', 'Ut sit vel necessitatibus voluptatum fuga rerum perferendis. Expedita esse numquam cumque quae. Eius odio quae quae tenetur.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (20, 5, 'Dolorem fuga dolorem doloribus minima fugit fuga a.', 20, '5473.39', '2014-10-18 06:19:30', '1974-10-04 05:48:53', 'http://www.turcotte.com/', 'Itaque nihil praesentium nihil. Quis quod id libero possimus. Exercitationem molestiae et earum dolores itaque.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (21, 6, 'Minima ut quibusdam dolor numquam eveniet.', 21, '82.00', '1974-05-06 03:42:27', '1977-02-15 11:20:51', 'http://www.fadelkuvalis.biz/', 'Tempora ex voluptas ipsum a. Quia quia ea qui. Molestiae iste qui consequatur quia natus voluptate. Ut provident illo autem saepe. Magni ut aut cupiditate quas.', 3064966);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (22, 7, 'Qui voluptates dignissimos itaque perferendis ratione unde tempore.', 22, '5.00', '1972-08-25 02:39:27', '2017-06-22 16:25:11', 'http://www.windler.org/', 'Voluptate voluptas eveniet laborum consectetur rerum maxime. Dolorum illum corporis hic doloribus.', 9);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (23, 8, 'Nihil est doloremque maiores odit accusantium veniam.', 23, '0.00', '2018-04-28 18:50:00', '1976-02-20 13:45:05', 'http://bailey.com/', 'Sit asperiores voluptas iste ex aut. Similique vero earum et quas culpa quia qui consequatur. Maiores earum deserunt laudantium rerum. Dolorum aut soluta omnis aut soluta corporis dolor.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (24, 9, 'Voluptates veritatis dolorem architecto debitis dignissimos.', 24, '0.00', '2016-05-29 18:22:56', '2007-10-29 07:57:45', 'http://www.lockmanmarquardt.com/', 'Et vel facere quaerat explicabo natus quae. Debitis sed laboriosam ut. Vel at quidem natus perspiciatis vel illo.', 57594);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (25, 10, 'Error magni consequatur autem et.', 25, '999999.99', '1978-04-02 10:11:25', '1998-01-16 01:15:21', 'http://www.zboncak.com/', 'Et commodi eius enim necessitatibus. Dolor alias enim quia. Dolorum aut consectetur deserunt dolor. Veniam perspiciatis aliquam excepturi non maxime fugiat illo.', 57271);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (26, 11, 'Totam et aut voluptatem.', 1, '3.22', '2012-02-15 20:00:31', '2009-07-26 05:58:09', 'http://mitchellrussel.com/', 'Sit vitae alias quos perferendis non ut. Ipsum explicabo vero laudantium ut ducimus. Quae iusto ut ea est. Quidem aperiam eligendi accusamus.', 572);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (27, 12, 'Quasi cum sequi ducimus delectus.', 2, '999999.99', '1979-09-17 14:28:48', '1991-07-04 20:49:00', 'http://www.pagac.net/', 'Reprehenderit occaecati ut aut aut maiores voluptatibus harum. Neque esse nisi aut. Harum eos enim ex delectus.', 704);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (28, 13, 'Laboriosam nobis dignissimos magnam consequuntur sequi expedita.', 3, '355.00', '2015-11-23 00:45:20', '2015-09-06 13:31:37', 'http://carrollschimmel.biz/', 'Porro non ut et voluptatibus doloribus voluptatibus et. Aut incidunt aliquam nulla adipisci eligendi non et.', 4);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (29, 14, 'Eveniet quia error voluptas omnis.', 4, '4708.01', '2012-02-25 07:27:29', '1983-12-30 23:56:58', 'http://www.bergnaum.com/', 'Nesciunt illo sint cupiditate fugit perspiciatis. Voluptatibus sint eligendi accusantium neque. Iusto doloribus quas sed non aut veritatis culpa.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (30, 15, 'Expedita quaerat incidunt et harum aspernatur omnis est.', 5, '265261.56', '1984-04-17 05:47:50', '1984-06-23 05:13:50', 'http://marquardt.biz/', 'Quasi totam et esse id. Ad commodi asperiores veritatis quibusdam dolor. Numquam numquam occaecati repellat enim sed.', 57249716);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (31, 1, 'Accusamus tempora doloremque distinctio.', 6, '999999.99', '1993-10-19 08:01:44', '2018-11-27 20:08:36', 'http://www.schmidt.com/', 'Libero aliquid et dicta maiores. Illo repellat ut rerum rerum rerum commodi. Eum cum id totam libero qui minus atque voluptas.', 215);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (32, 2, 'Quia rerum optio qui adipisci eos.', 7, '1.09', '1976-12-26 11:20:45', '1987-11-29 13:21:20', 'http://www.zemlakondricka.com/', 'Et pariatur et ratione quia repudiandae maiores. Temporibus dolorem et et fugiat. Maiores aperiam aut quam.', 85);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (33, 3, 'Maiores debitis expedita sit omnis minus repellendus.', 8, '999999.99', '1975-04-12 20:42:29', '1985-12-09 14:41:39', 'http://www.mcglynngleason.com/', 'Adipisci est deleniti in dolor. Excepturi cumque ratione qui dolores qui sunt suscipit ea. Nesciunt nihil qui velit officiis id dolorem ut. Nihil distinctio sint nulla facilis consectetur ut.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (34, 4, 'Nostrum perspiciatis amet delectus placeat veritatis adipisci ea.', 9, '74919.00', '1974-02-05 08:05:09', '2003-11-23 05:17:09', 'http://kuhic.com/', 'Aspernatur animi voluptatibus sed qui voluptatum voluptatem. Qui rerum illo ea sint qui. Officia harum sint est facilis minima id sint. Id autem fugiat neque.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (35, 5, 'Ut ut at aut.', 10, '0.00', '1990-11-25 03:38:39', '1981-02-16 20:50:30', 'http://www.stamm.com/', 'Assumenda qui ut quia et qui libero reprehenderit. Aperiam deserunt vel quis amet laboriosam perferendis voluptate. Accusamus soluta blanditiis nam nostrum aliquam expedita.', 5713);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (36, 6, 'Totam enim voluptatem incidunt suscipit voluptatem provident.', 11, '5012.50', '2005-06-27 13:41:53', '1987-04-07 03:10:09', 'http://www.rathreynolds.net/', 'Est vero id doloremque non atque excepturi et. Totam dolores provident possimus cupiditate. Aperiam inventore et dolores voluptas quis. Dolor ducimus consequatur ratione.', 62);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (37, 7, 'Expedita omnis eum molestiae excepturi consequatur.', 12, '999999.99', '1985-05-02 17:09:06', '1980-10-03 21:15:23', 'http://gutkowski.net/', 'Blanditiis et dolores sed quod nihil sed nesciunt. Ad error aut odit cumque. Praesentium in necessitatibus est.', 22951);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (38, 8, 'Tenetur recusandae temporibus temporibus.', 13, '999999.99', '1992-08-14 22:49:24', '2007-08-30 06:28:43', 'http://huels.com/', 'Et pariatur aut debitis a. Laudantium eum quae id vel nihil. Quae dolorem corrupti consequatur et asperiores.', 835693);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (39, 9, 'Minima autem nobis facilis molestiae numquam qui.', 14, '677.88', '2008-05-15 10:19:46', '1995-08-13 11:23:58', 'http://prosacco.info/', 'Repellat quibusdam est et ea error iure. Iure dolorum dolorem laboriosam nisi quia. Voluptatem tempore dolores repellendus rem aliquam. Quia est magnam pariatur qui eum voluptatibus.', 921124);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (40, 10, 'Et eos minus voluptatem quam cupiditate quidem.', 15, '999999.99', '1974-04-10 02:50:55', '2006-09-14 01:02:03', 'http://www.gutmann.com/', 'Ut repellat voluptas repudiandae saepe minima. Qui repudiandae et reiciendis adipisci. Deserunt molestias consequatur autem.', 7);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (41, 11, 'Ab eum nulla et.', 16, '9.40', '1970-09-13 05:57:55', '1993-04-02 12:58:15', 'http://www.batz.net/', 'Est saepe id voluptatem molestiae. Eaque vero non vero at in. Veniam inventore ipsum et sit beatae dolorum rerum. Debitis consectetur vel aut officia quo debitis.', 9);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (42, 12, 'Itaque sunt molestiae aliquid neque accusamus quasi numquam.', 17, '1.73', '1979-03-25 21:09:44', '2003-06-21 03:09:17', 'http://bergstrom.com/', 'Minima nihil similique nihil quo dolore labore. Ea libero dolores dolorem. Praesentium ad aut culpa maxime sint laudantium. Quidem eos et quis blanditiis qui veritatis.', 22);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (43, 13, 'Sed omnis sunt est voluptatem.', 18, '26597.70', '2014-05-22 18:16:31', '2013-02-22 23:06:04', 'http://dickinson.net/', 'Distinctio quae id ut pariatur harum fugit. Quidem fuga id dolore dolorem. Qui dolorum deserunt nostrum sint culpa doloribus. Dolores et sed corporis sit nulla.', 522186446);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (44, 14, 'Fugiat officiis nihil exercitationem tenetur molestiae est.', 19, '0.00', '1972-05-21 19:03:39', '2020-08-02 05:27:22', 'http://friesen.info/', 'Culpa et fugiat dolorum. In porro nisi et ut consequatur suscipit reprehenderit. Minus corrupti fuga commodi ut aperiam voluptatum amet. Quo autem temporibus vel temporibus.', 5);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (45, 15, 'Molestias et neque est a reiciendis.', 20, '997.99', '1979-05-23 03:34:58', '1997-04-22 07:20:47', 'http://www.macejkovicwehner.biz/', 'Quia enim repellat vel commodi et. Officiis a laudantium facere amet quo reiciendis. Enim voluptates blanditiis fuga consequatur quae.', 84);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (46, 1, 'Quis est minima magnam eius assumenda officia.', 21, '1.00', '1994-09-03 17:57:53', '1986-05-27 11:41:34', 'http://www.schuppe.com/', 'Laboriosam esse id praesentium et voluptatem minima. Qui dolores sit optio. Sint adipisci accusantium sunt consectetur eligendi atque.', 99);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (47, 2, 'Sint soluta sit vitae et nulla ea voluptas.', 22, '41.83', '1981-05-25 00:39:46', '1975-02-19 09:09:49', 'http://www.okeefe.com/', 'Est consequatur quis necessitatibus ullam. Dolores fuga et rerum. Sit dignissimos quia quo a delectus amet est.', 306324);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (48, 3, 'Omnis reprehenderit aut qui voluptas quo quidem in.', 23, '999999.99', '1993-05-20 22:51:19', '1971-12-23 16:06:54', 'http://bergstrom.com/', 'Nam id alias doloremque. Laudantium ratione cumque voluptatem. Illum rerum nisi ut modi voluptates eos est qui.', 7);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (49, 4, 'Provident dolores fugit facilis voluptatem enim omnis.', 24, '81450.45', '1978-05-09 12:46:49', '1992-03-29 16:21:15', 'http://www.green.net/', 'Ducimus et voluptates vel et quo. Ut sunt mollitia exercitationem odit alias modi. Sed voluptas qui ut est vero dolore.', 8784);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (50, 5, 'Autem ut et eligendi autem nihil consequatur sunt.', 25, '0.20', '2003-08-06 03:14:30', '1986-01-28 17:47:30', 'http://www.leffler.com/', 'Sint tempora ut inventore nulla et. Excepturi doloremque cumque recusandae aut autem exercitationem ad. Aut est omnis enim inventore maiores eos. Nemo sed maxime nihil quia voluptatibus esse qui.', 504205);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (51, 6, 'Deleniti impedit voluptas blanditiis repellat et perspiciatis.', 1, '1.64', '1977-06-03 06:18:59', '1993-12-07 23:07:35', 'http://smitham.info/', 'Sit libero tempora saepe nisi hic eaque. Corrupti temporibus ut quia officiis fuga et. Tempora corrupti minus odio.', 7521040);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (52, 7, 'Sunt esse et cupiditate a.', 2, '999999.99', '2004-03-13 23:37:55', '1976-05-13 15:55:14', 'http://www.beahan.com/', 'Facere illum reiciendis ipsam ut quas quidem debitis. Ullam corporis id sit atque atque eum provident. Libero et et ea quam. Fugiat consequatur velit dignissimos alias.', 41857);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (53, 8, 'In cumque earum possimus doloribus totam cupiditate itaque dignissimos.', 3, '1.88', '1996-11-25 10:44:19', '1997-06-12 21:37:38', 'http://www.dubuqueauer.biz/', 'Et autem earum in beatae rem. Est quidem velit accusamus. Ducimus ipsa corrupti earum commodi et voluptatibus eos. Minima amet ut neque eos.', 66);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (54, 9, 'Nulla sunt aliquid aperiam consequatur aut corrupti.', 4, '9206.40', '2016-09-17 04:30:33', '2012-03-27 08:46:54', 'http://will.com/', 'Ut eum est quia corrupti quae quaerat. Aliquam quam voluptatibus unde sunt repudiandae.\nQuidem magnam dicta est eum aspernatur et numquam quo. Ipsam velit rerum laudantium sit voluptas.', 73679);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (55, 10, 'Laudantium id enim distinctio reprehenderit voluptas quisquam quam.', 5, '3068.64', '1997-03-09 01:34:27', '1981-04-21 20:41:46', 'http://moore.biz/', 'Voluptas in iusto quia praesentium. Consectetur libero eius est molestiae eius.', 0);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (56, 11, 'Libero tempora soluta maiores ullam suscipit quae.', 6, '120.08', '2010-10-11 16:27:06', '1996-10-23 23:05:49', 'http://lindgrengleason.com/', 'Pariatur tempora veniam aut blanditiis omnis eum. Veritatis sit et laudantium quod quasi. Omnis molestiae deserunt aut veniam incidunt cum.', 468);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (57, 12, 'Commodi fuga consequatur harum dolorum.', 7, '47.89', '1990-10-04 15:28:55', '2006-07-23 05:48:56', 'http://aufderharbrekke.com/', 'Et et eos quo repudiandae suscipit. Sint quia occaecati nam laboriosam. Culpa aliquam deserunt suscipit voluptatem non recusandae.', 6260);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (58, 13, 'Vero neque ut veniam dolor aut blanditiis.', 8, '999999.99', '2006-02-08 04:35:14', '2004-06-10 20:49:28', 'http://www.macejkovic.com/', 'Soluta vel dolorem quod aut non quia. Aut et quo repellat. Eos consequatur quia saepe quos et labore qui.', 489955);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (59, 14, 'Ipsum deleniti quae sequi voluptatem consequuntur.', 9, '660.68', '1982-05-07 11:53:36', '1978-11-14 01:59:24', 'http://www.bernhard.info/', 'Est sed sit rem ut delectus placeat aliquam. Molestias quas nulla earum qui rerum mollitia exercitationem.', 11646);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (60, 15, 'Doloribus facilis odio et a.', 10, '999999.99', '1983-06-23 02:44:48', '1987-07-18 13:24:04', 'http://tromp.org/', 'Facere sit ea eum molestias quod. Nesciunt facilis asperiores architecto provident. Animi fuga et non doloremque qui labore voluptas.', 8159680);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (61, 1, 'Exercitationem incidunt aut repudiandae iste sed et.', 11, '0.00', '1999-10-08 06:47:08', '2008-06-27 18:04:02', 'http://lehner.biz/', 'Est hic voluptatem officia pariatur alias sed. Ipsum ipsum dicta atque et sint. Nemo molestias et error aliquid atque impedit deserunt.', 91533529);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (62, 2, 'Qui quis libero doloremque quidem voluptatum unde.', 12, '0.00', '1979-05-08 17:25:44', '2013-02-13 13:33:24', 'http://www.satterfield.com/', 'Pariatur excepturi vero est non. Aperiam pariatur qui commodi molestiae voluptas. Ut et omnis et dolorem rerum.', 691169);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (63, 3, 'Rem occaecati aut delectus et libero.', 13, '11080.00', '1988-09-16 13:57:00', '1981-10-10 07:26:46', 'http://pacochahirthe.com/', 'Cumque porro corrupti quo aut tempore est tenetur. Maiores necessitatibus vel sed et et veniam quisquam. Velit consectetur aliquam quam quae itaque. At eveniet rerum ipsam unde.', 914124);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (64, 4, 'Fugiat laborum qui voluptate non natus aut saepe voluptates.', 14, '0.00', '2017-06-18 00:22:17', '1992-01-01 23:37:44', 'http://www.considine.info/', 'Ut dicta rem excepturi nam doloremque saepe est molestiae. Quo repellat et qui ut voluptatibus. Officia recusandae qui natus natus autem.', 87417);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (65, 5, 'Quod corrupti dolore ipsa consequuntur tenetur excepturi non autem.', 15, '2.40', '1998-03-11 17:55:16', '2016-06-04 06:35:34', 'http://kris.com/', 'Omnis dolore labore et a. A eius et quisquam aut temporibus. Aspernatur nisi qui ab quae voluptas necessitatibus beatae non. Voluptate et officiis similique.', 37);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (66, 6, 'Ducimus saepe quos et ea qui consequatur sit.', 16, '7854.58', '2014-06-11 16:19:56', '2004-05-28 14:36:39', 'http://cartwright.net/', 'Placeat enim officiis dicta et. Dolor iste inventore impedit excepturi dignissimos omnis aliquid. Maiores mollitia dolores vel molestiae enim ipsam voluptates voluptatum.', 9632);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (67, 7, 'Omnis quo et quo numquam beatae.', 17, '4647.11', '1997-02-05 03:35:13', '2011-05-11 00:20:50', 'http://www.langworth.com/', 'Nostrum cumque dolor non iusto. Dolor ut quae perspiciatis in placeat praesentium. Debitis id praesentium et repudiandae culpa unde harum alias.', 21202614);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (68, 8, 'Enim rerum vitae vero esse vel quam.', 18, '999999.99', '1988-04-08 01:45:11', '1995-08-13 22:59:30', 'http://www.hilll.com/', 'Quis qui placeat omnis deleniti error in. Omnis magni rerum tempore consectetur. Est facere dolorem illum excepturi sit modi. Eligendi porro maiores aspernatur eum accusantium ipsa.', 24);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (69, 9, 'Quibusdam sit labore esse laborum quia fuga.', 19, '999999.99', '1973-06-18 17:59:30', '2015-07-31 13:00:45', 'http://thompsonrice.com/', 'Facilis reprehenderit itaque exercitationem omnis vero. Aut error enim placeat. Voluptatem alias mollitia commodi ullam quas et. Quae autem delectus dolorem cum est consequuntur.', 29);
-- INSERT INTO `songs` (`id`, `artist_id`, `title`, `album_id`, `length`, `created_at`, `upload_at`, `youtube_link`, `lyrics`, `track_number`) VALUES (70, 10, 'Eligendi et ea qui sequi non voluptates.', 20, '999999.99', '2004-08-10 21:46:22', '1980-12-27 06:25:44', 'http://luettgenweissnat.com/', 'Assumenda magnam voluptate eum voluptatem odio est ab excepturi. Molestias iusto quis neque. Numquam ea dignissimos aut aliquid odit.', 92);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (1, 'vel', 'predovic.gerald@example.com', '13c21d414dd0dc7b1c2ebb3a9b75ee1b981859d2', 0, NULL, '1988-10-24 13:16:41', NULL, '1984-07-30 05:34:44');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (2, 'quis', 'renner.eddie@example.net', '10b0287114bff06fc41df349f487c4a4035e3708', 0, NULL, '2006-08-19 23:59:18', NULL, '1999-03-05 18:13:54');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (3, 'vel', 'buster40@example.com', '89e778a87f20e628103b4fb4434def80c79ffa36', 1, NULL, '2002-01-20 21:03:44', NULL, '1976-09-12 23:57:53');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (4, 'dolorem', 'jconnelly@example.org', '0f5ae53ed2b89efb592a72649afe9d85b719cb6c', 1, NULL, '1990-05-04 20:27:08', NULL, '1976-03-22 08:05:46');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (5, 'quo', 'jacey57@example.org', 'b6a7ac880c317c249d33a49e0ef85b4974e32961', 0, NULL, '2000-07-28 22:54:19', NULL, '1991-03-16 20:23:56');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (6, 'tenetur', 'swift.marianna@example.net', '60b843dd95cc03a5a87e9953baa6aa32934324d5', 1, NULL, '1976-08-12 14:34:14', NULL, '1990-06-29 04:13:08');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (7, 'debitis', 'rodolfo77@example.com', '7e56b5b64e5e5f1f01d7e7f7ef858eb492937e3c', 0, NULL, '1990-06-05 05:04:37', NULL, '2009-01-26 13:07:56');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (8, 'eligendi', 'yschneider@example.net', '65b1a8a9c90ea83baafe2ee43774be8ad91aaae5', 0, NULL, '2015-09-06 17:21:05', NULL, '1975-01-24 17:56:07');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (9, 'aut', 'rhahn@example.org', '8f6e5966b7c75b0aafa2293bf750d5feaa3987ae', 0, NULL, '2008-03-04 13:39:33', NULL, '2002-02-05 03:12:53');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (10, 'libero', 'rowena01@example.net', 'db39245c8ff92f5f3a442ca989af18083bce58c1', 1, NULL, '2016-11-24 07:43:54', NULL, '2000-10-30 15:43:19');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (11, 'error', 'mac07@example.org', 'b8410f801757ed74f5d13bbe48a8dbb4e2cde4d9', 1, NULL, '1985-11-30 06:16:41', NULL, '2011-04-01 05:20:08');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (12, 'ut', 'tfahey@example.net', 'b394b140884c83f73c1d47fcadc7d57d9b5ebb4d', 0, NULL, '2007-08-15 20:46:08', NULL, '1992-05-17 00:33:11');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (13, 'architecto', 'trever51@example.com', 'e34d00217382dc6c96f3684c42be01f39c8f2182', 1, NULL, '2011-09-18 05:52:40', NULL, '1972-12-17 06:10:01');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (14, 'ad', 'lora.veum@example.com', '867be0bec161a0e91d4c0606597c1a9687c34e04', 0, NULL, '1986-10-13 12:42:03', NULL, '2006-08-09 01:05:03');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (15, 'sit', 'jkonopelski@example.com', '932c9650955b7a9c3bbd3a17824c2be2980debfa', 1, NULL, '1971-03-16 00:35:27', NULL, '1978-01-30 18:06:19');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (16, 'impedit', 'gmohr@example.org', '39741001bc7dfa34d859ded9ab582ab77031bc69', 0, NULL, '2016-12-23 18:42:32', NULL, '1985-11-13 06:54:13');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (17, 'maiores', 'wuckert.annamarie@example.com', '5ef2f467672a459f7268d9f3b27933524a80f85b', 1, NULL, '1986-01-15 04:33:30', NULL, '1976-06-06 09:28:31');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (18, 'quo', 'noble.fay@example.net', 'b6d61175376cca8178c2a43e94ffefb070780a0b', 1, NULL, '1980-11-30 17:21:06', NULL, '2005-04-21 14:12:03');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (19, 'quaerat', 'irunolfsson@example.com', 'cdd877fb67cd08721ee6e2e6467d553c32726fc3', 1, NULL, '1989-09-15 17:09:08', NULL, '1991-08-05 17:59:01');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (20, 'porro', 'michelle.leffler@example.com', 'd9c7679d8d975a6cc3e9ff297e118a4cc6cd43ca', 0, NULL, '1991-03-22 13:55:51', NULL, '1991-11-28 19:17:44');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (21, 'eligendi', 'weissnat.devante@example.com', '0c63b47cb71007786589b53a38858d247bc2a869', 0, NULL, '1988-10-22 22:19:53', NULL, '1992-01-29 03:09:06');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (22, 'officiis', 'smith.laverna@example.org', '76cdfb88d618ffe68e6bd19ab4d5f45d5689977a', 0, NULL, '1997-01-08 22:10:29', NULL, '2010-10-26 15:34:40');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (23, 'non', 'skiles.jaquelin@example.org', '8a8c07bacad577409154d048177e22ebf448089b', 1, NULL, '2009-12-27 03:58:56', NULL, '1988-11-21 04:59:00');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (24, 'laudantium', 'fritz.rosenbaum@example.com', '253de625318f2b06ce48b652a5f369b11bd433ad', 1, NULL, '1996-10-11 11:33:02', NULL, '2003-10-18 20:30:27');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (25, 'voluptate', 'xsatterfield@example.org', '8fc6e9ba489f343de5de16e7902a8eda2968f779', 1, NULL, '2019-02-03 04:58:59', NULL, '1993-10-27 20:34:45');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (26, 'voluptatum', 'deshaun34@example.com', 'fc773d0dcca04c8985e840f6643d624784b0840c', 1, NULL, '1998-09-18 16:15:47', NULL, '1981-12-12 15:40:07');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (27, 'et', 'hassan21@example.net', '606e7f65a9467394f1e4e564ee035a9d0b62b4f4', 1, NULL, '1978-03-14 00:30:32', NULL, '1997-04-10 23:50:01');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (28, 'dolor', 'jschaden@example.net', '3fb3bd0802c47b14cd8ca29e6187012b43ad8880', 1, NULL, '2012-05-26 16:46:56', NULL, '1971-12-24 02:12:39');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (29, 'in', 'lambert31@example.net', '0c47dd2a12032c2c8b0827a3422e0fa38ec9a27b', 0, NULL, '1988-11-16 08:13:37', NULL, '2009-09-09 22:39:20');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (30, 'aspernatur', 'ismael.heaney@example.org', '73ba3a95cc4f65ef663341f710659642069b6737', 1, NULL, '1990-07-10 09:29:57', NULL, '1980-07-04 16:38:21');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (31, 'odit', 'zaltenwerth@example.com', '4a187a1bdb7a324fbdd5a7eb806a77012d57a3ea', 1, NULL, '1997-04-12 23:22:54', NULL, '2019-07-08 01:40:13');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (32, 'eos', 'sid56@example.com', '3f039a68a50dcc90f86492039fb7e7286715f869', 0, NULL, '1993-08-17 08:02:32', NULL, '1987-10-06 15:46:22');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (33, 'eos', 'juanita.dare@example.org', 'd24c4a0605e449eff8c0461bad4f7effa0ea78ae', 1, NULL, '2007-10-16 12:09:10', NULL, '1983-04-03 13:44:04');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (34, 'est', 'welch.daisha@example.net', '15718c2d8393fedc2670fb3eff356388291eeac8', 0, NULL, '1987-05-04 07:47:17', NULL, '2017-12-16 21:39:49');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (35, 'asperiores', 'heathcote.dawson@example.org', 'd754a64566ccf2d243de15002e8257551ddd8f8c', 0, NULL, '1972-10-09 00:24:49', NULL, '2018-09-22 18:52:11');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (36, 'quia', 'london01@example.net', 'b6be3eb52ab0e0bb2841bd4cafd278f6ac5d8a4a', 0, NULL, '2019-06-05 19:57:57', NULL, '1973-12-17 00:17:33');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (37, 'ut', 'champlin.camren@example.com', 'ff6197e0a9c3a39b79414e49ee8cbaad0e9eb4cb', 1, NULL, '1997-12-01 23:59:10', NULL, '1999-01-10 05:24:10');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (38, 'nemo', 'imelda.stark@example.com', 'b27f98b6a7a82ab734ccc8d002b7b47b21f72b18', 0, NULL, '1981-10-25 23:50:16', NULL, '1983-07-17 04:57:38');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (39, 'rem', 'eddie.ledner@example.net', 'a63a6420e9bf5d487629826c2d5c49786004523e', 1, NULL, '1985-10-20 22:18:44', NULL, '2006-03-19 05:20:11');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `preferences`, `created_at`, `remember_token`, `upload_at`) VALUES (40, 'at', 'stoltenberg.jasmin@example.net', 'fa926424fb1eb513aa6d301aebaa602733274e4b', 1, NULL, '1989-09-05 20:19:08', NULL, '1978-06-09 19:31:52');


INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (1, 1, 'in', '1999-08-08 18:20:32', '1991-02-17 16:25:54', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (2, 2, 'accusamus', '1978-12-09 17:19:53', '1986-01-27 00:44:48', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (3, 3, 'ab', '1988-09-04 12:41:56', '1976-02-25 18:28:40', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (4, 4, 'sint', '2008-08-09 03:47:44', '1991-06-06 10:39:56', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (5, 5, 'enim', '2008-03-12 05:48:20', '2004-04-02 01:11:46', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (6, 6, 'et', '2016-01-18 12:43:54', '1976-01-29 07:30:07', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (7, 7, 'eius', '2003-07-23 18:32:38', '2018-07-16 23:50:16', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (8, 8, 'doloribus', '2013-11-15 19:03:19', '1998-12-06 00:27:35', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (9, 9, 'nihil', '1983-11-01 10:37:38', '2011-04-28 18:44:53', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (10, 10, 'dicta', '1978-04-11 12:36:04', '2000-06-13 09:44:02', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (11, 11, 'ut', '1977-01-26 04:41:23', '1985-12-16 15:24:36', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (12, 12, 'vero', '1992-06-07 03:59:11', '1999-08-26 06:52:38', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (13, 13, 'ducimus', '2004-09-13 18:00:41', '1984-05-04 18:43:57', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (14, 14, 'aspernatur', '1992-06-29 16:18:27', '2016-05-07 03:01:57', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (15, 15, 'sunt', '1999-09-22 19:48:08', '1991-05-02 05:13:01', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (16, 16, 'autem', '1976-05-01 23:05:09', '2014-04-12 19:06:50', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (17, 17, 'enim', '1970-02-23 15:12:44', '2009-04-13 04:29:56', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (18, 18, 'voluptatem', '1973-01-07 08:59:29', '2014-04-11 19:54:57', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (19, 19, 'nam', '1974-06-24 02:50:20', '1979-02-26 23:03:27', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (20, 20, 'iure', '1989-06-29 15:22:51', '2006-11-12 07:02:00', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (21, 21, 'atque', '2003-03-26 08:22:59', '2018-07-28 10:42:31', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (22, 22, 'eos', '2002-11-03 20:51:50', '1996-12-19 01:27:58', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (23, 23, 'eos', '2001-01-08 07:45:30', '2012-02-06 06:00:51', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (24, 24, 'soluta', '1993-12-02 00:48:36', '2010-06-01 22:55:40', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (25, 25, 'culpa', '1985-09-07 08:47:46', '1977-10-17 09:49:45', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (26, 26, 'qui', '1980-11-13 08:02:05', '1998-03-15 17:17:57', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (27, 27, 'numquam', '2020-02-29 19:48:18', '1996-04-04 19:07:21', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (28, 28, 'explicabo', '1988-12-30 18:47:13', '2010-12-29 08:45:55', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (29, 29, 'similique', '2018-09-03 03:34:34', '1974-10-21 15:25:12', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (30, 30, 'soluta', '1991-03-04 20:17:07', '2020-06-07 12:31:17', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (31, 31, 'dolores', '2016-03-21 18:03:37', '1985-01-04 21:51:37', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (32, 32, 'et', '2020-02-29 01:36:46', '2016-09-26 14:07:07', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (33, 33, 'nemo', '2004-04-20 02:50:52', '1995-09-28 08:52:59', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (34, 34, 'minima', '1977-11-05 00:31:53', '1996-01-25 19:59:53', NULL, 'http://lorempixel.com/640/480/');
INSERT INTO `playlist` (`id`, `user_id`, `name`, `created_at`, `upload_at`, `rules`, `cover_img`) VALUES (35, 35, 'sit', '1983-05-09 07:17:32', '2015-03-10 07:49:08', NULL, 'http://lorempixel.com/640/480/');


INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (1, 1, 1);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (2, 2, 2);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (3, 3, 3);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (4, 4, 4);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (5, 5, 5);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (6, 6, 6);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (7, 7, 7);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (8, 8, 8);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (9, 9, 9);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (10, 10, 10);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (11, 11, 11);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (12, 12, 12);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (13, 13, 13);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (14, 14, 14);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (15, 15, 15);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (16, 16, 16);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (17, 17, 17);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (18, 18, 18);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (19, 19, 19);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (20, 20, 20);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (21, 21, 21);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (22, 22, 22);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (23, 23, 23);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (24, 24, 24);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (25, 25, 25);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (26, 26, 26);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (27, 27, 27);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (28, 28, 28);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (29, 29, 29);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (30, 30, 30);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (31, 31, 31);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (32, 32, 32);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (33, 33, 33);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (34, 34, 34);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (35, 35, 35);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (36, 1, 36);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (37, 2, 37);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (38, 3, 38);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (39, 4, 39);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (40, 5, 40);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (41, 6, 41);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (42, 7, 42);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (43, 8, 43);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (44, 9, 44);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (45, 10, 45);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (46, 11, 46);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (47, 12, 47);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (48, 13, 48);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (49, 14, 49);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (50, 15, 50);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (51, 16, 51);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (52, 17, 52);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (53, 18, 53);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (54, 19, 54);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (55, 20, 55);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (56, 21, 56);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (57, 22, 57);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (58, 23, 58);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (59, 24, 59);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (60, 25, 60);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (61, 26, 61);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (62, 27, 62);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (63, 28, 63);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (64, 29, 64);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (65, 30, 65);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (66, 31, 66);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (67, 32, 67);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (68, 33, 68);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (69, 34, 69);
-- INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (70, 35, 70);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (71, 1, 1);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (72, 2, 2);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (73, 3, 3);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (74, 4, 4);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (75, 5, 5);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (76, 6, 6);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (77, 7, 7);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (78, 8, 8);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (79, 9, 9);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (80, 10, 10);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (81, 11, 11);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (82, 12, 12);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (83, 13, 13);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (84, 14, 14);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (85, 15, 15);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (86, 16, 16);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (87, 17, 17);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (88, 18, 18);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (89, 19, 19);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (90, 20, 20);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (91, 21, 21);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (92, 22, 22);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (93, 23, 23);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (94, 24, 24);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (95, 25, 25);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (96, 26, 26);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (97, 27, 27);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (98, 28, 28);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (99, 29, 29);
INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`) VALUES (100, 30, 30);


INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('1', 1, 1, 1, 0, '2012-08-27 22:23:04');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('2', 2, 2, 0, 35, '1998-04-04 04:11:15');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('3', 3, 3, 1, 703, '1991-01-20 18:58:08');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('4', 4, 4, 1, 275724372, '1980-03-21 12:23:43');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('5', 5, 5, 1, 43, '1971-03-22 01:27:06');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('6', 6, 6, 1, 889, '1991-08-25 14:54:27');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('7', 7, 7, 0, 0, '2019-02-25 12:16:34');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('8', 8, 8, 1, 9, '1996-01-28 02:42:19');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('9', 9, 9, 1, 739689, '1978-07-09 18:29:56');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('10', 10, 10, 0, 7710450, '1973-11-30 08:35:35');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('11', 11, 11, 1, 5599, '1989-05-07 10:08:49');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('12', 12, 12, 0, 0, '1999-10-24 18:20:09');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('13', 13, 13, 1, 48539255, '2019-07-02 14:05:56');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('14', 14, 14, 0, 51838, '2011-07-17 08:37:08');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('15', 15, 15, 1, 9606, '1999-01-17 11:01:35');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('16', 16, 16, 0, 0, '2002-09-25 04:38:43');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('17', 17, 17, 0, 90330, '1980-10-10 12:21:58');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('18', 18, 18, 0, 865384, '2012-10-18 12:18:46');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('19', 19, 19, 1, 28, '1989-09-08 19:52:52');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('20', 20, 20, 0, 5152337, '1973-11-22 23:26:25');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('21', 21, 21, 1, 92321160, '1983-11-26 06:16:09');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('22', 22, 22, 1, 7726, '1985-08-28 03:15:07');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('23', 23, 23, 0, 73, '2012-08-08 20:56:29');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('24', 24, 24, 0, 83051, '1976-09-01 12:37:49');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('25', 25, 25, 0, 71215, '2010-04-27 14:45:35');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('26', 26, 26, 0, 1, '2006-06-24 15:25:21');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('27', 27, 27, 1, 926580, '2002-06-01 01:40:34');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('28', 28, 28, 1, 84737, '1992-03-11 01:06:37');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('29', 29, 29, 0, 7, '1970-08-02 22:26:49');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('30', 30, 30, 1, 0, '1983-08-15 19:50:57');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('31', 31, 31, 0, 223, '1992-08-10 18:09:11');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('32', 32, 32, 0, 0, '2002-08-18 08:38:04');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('33', 33, 33, 0, 4, '2017-10-04 19:32:28');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('34', 34, 34, 1, 283754089, '2008-10-26 06:24:01');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('35', 35, 35, 0, 11985, '1970-07-12 18:43:41');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('36', 36, 36, 0, 2726, '1972-01-16 19:05:01');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('37', 37, 37, 1, 79152, '1991-08-07 13:05:04');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('38', 38, 38, 1, 199, '1987-08-12 06:31:43');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('39', 39, 39, 0, 41, '1982-11-17 17:44:01');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('40', 40, 40, 0, 918990594, '1988-09-25 22:45:53');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('41', 1, 41, 1, 9, '2010-09-14 15:32:02');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('42', 2, 42, 1, 243024098, '2000-08-25 05:56:12');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('43', 3, 43, 1, 127002, '1996-03-10 00:26:05');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('44', 4, 44, 0, 56065457, '1970-05-30 09:06:50');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('45', 5, 45, 0, 953, '2001-02-07 03:21:23');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('46', 6, 46, 0, 1208, '2016-08-27 13:59:06');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('47', 7, 47, 0, 0, '2001-03-08 01:47:29');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('48', 8, 48, 0, 449, '1976-03-25 20:36:03');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('49', 9, 49, 1, 437381, '1977-04-21 16:51:25');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('50', 10, 50, 1, 716, '1999-12-17 02:27:13');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('51', 11, 51, 1, 0, '2003-04-14 06:27:42');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('52', 12, 52, 1, 421383, '1986-07-02 08:47:08');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('53', 13, 53, 1, 2956, '2011-04-11 18:13:56');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('54', 14, 54, 0, 8368104, '1999-03-18 23:20:47');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('55', 15, 55, 1, 6667032, '2002-05-16 17:02:19');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('56', 16, 56, 1, 7, '1998-08-10 14:57:58');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('57', 17, 57, 1, 219, '1985-01-28 06:20:08');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('58', 18, 58, 1, 19464, '1990-04-26 06:43:45');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('59', 19, 59, 1, 150855856, '1999-02-28 02:43:43');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('60', 20, 60, 1, 738931, '1997-09-11 12:06:55');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('61', 21, 61, 0, 414611083, '2003-10-24 19:32:06');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('62', 22, 62, 0, 566184, '1991-10-27 12:05:06');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('63', 23, 63, 1, 7, '1990-01-21 15:23:39');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('64', 24, 64, 0, 76078, '2003-04-28 19:10:05');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('65', 25, 65, 0, 8622, '1992-03-30 14:41:42');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('66', 26, 66, 1, 6052898, '1987-08-17 14:08:13');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('67', 27, 67, 0, 13, '2005-10-01 09:11:18');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('68', 28, 68, 1, 760344, '1994-01-25 05:13:24');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('69', 29, 69, 0, 711517, '2017-12-15 09:24:24');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('70', 30, 70, 0, 13989649, '1995-11-15 16:19:22');
-- INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('71', 31, 1, 0, 77682, '1991-11-16 07:11:22');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('72', 32, 2, 1, 53683834, '1980-06-16 18:22:50');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('73', 33, 3, 0, 7, '1978-04-15 02:41:35');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('74', 34, 4, 1, 363657570, '2009-10-07 00:00:53');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('75', 35, 5, 1, 6461938, '1974-02-01 09:03:14');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('76', 36, 6, 0, 821105, '2003-09-17 13:12:05');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('77', 37, 7, 0, 8727, '2009-08-05 11:28:03');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('78', 38, 8, 1, 73078369, '1976-09-11 15:17:31');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('79', 39, 9, 1, 183935, '2010-06-05 14:14:26');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('80', 40, 10, 1, 0, '1992-12-16 00:42:50');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('81', 1, 11, 1, 456054209, '1985-07-21 07:24:28');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('82', 2, 12, 0, 58, '1996-12-17 08:32:02');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('83', 3, 13, 0, 82524608, '1989-10-20 12:39:41');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('84', 4, 14, 0, 75321788, '1971-01-08 15:01:11');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('85', 5, 15, 0, 83200984, '2001-11-23 12:51:29');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('86', 6, 16, 0, 6342948, '2000-08-10 03:38:13');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('87', 7, 17, 1, 1275, '1972-07-28 12:54:52');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('88', 8, 18, 1, 91454259, '1980-10-09 23:35:11');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('89', 9, 19, 0, 3098, '2006-05-30 19:55:40');
INSERT INTO `interactions` (`id`, `user_id`, `song_id`, `is_liked`, `play_count`, `created_at`) VALUES ('90', 10, 20, 0, 2868081, '2013-04-15 05:39:25');
INSERT INTO `user_playlists` VALUES ('1','1','1'),
('2','2','2'),
('3','3','3'),
('4','4','4'),
('5','5','5'),
('6','6','6'),
('7','7','7'),
('8','8','8'),
('9','9','9'),
('10','10','10'),
('11','11','11'),
('12','12','12'),
('13','13','13'),
('14','14','14'),
('15','15','15'),
('16','16','16'),
('17','17','17'),
('18','18','18'),
('19','19','19'),
('20','20','20'),
('21','21','21'),
('22','22','22'),
('23','23','23'),
('24','24','24'),
('25','25','25'),
('26','26','26'),
('27','27','27'),
('28','28','28'),
('29','29','29'),
('30','30','30'),
('31','31','31'),
('32','32','32'),
('33','33','33'),
('34','34','34'),
('35','35','35'),
('36','36','1'),
('37','37','2'),
('38','38','3'),
('39','39','4'),
('40','40','5'),
('41','1','6'),
('42','2','7'),
('43','3','8'),
('44','4','9'),
('45','5','10'),
('46','6','11'),
('47','7','12'),
('48','8','13'),
('49','9','14'),
('50','10','15');