-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2019 at 10:32 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chocola`
--

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blacklist_tokens`
--

CREATE TABLE `blacklist_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blacklisted_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blacklist_tokens`
--

INSERT INTO `blacklist_tokens` (`id`, `token`, `blacklisted_on`) VALUES
(1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTc4MTc3MDQsImlhdCI6MTU1NzczMTI5OSwic3ViIjo2fQ.JImuzu4TKv5v1plLsgy2_UZkWbjnMnsNe7_kEnxGKTE', '2019-05-13 14:11:25');

-- --------------------------------------------------------

--
-- Table structure for table `data_file`
--

CREATE TABLE `data_file` (
  `id_data` int(11) NOT NULL,
  `data_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selected` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `data_file`
--

INSERT INTO `data_file` (`id_data`, `data_name`, `selected`, `id_user`, `inserted_at`) VALUES
(11, '2019_05_23_11_25_5477.csv', 1, 77, '2019-07-17 01:59:04'),
(12, '2019_05_24_03_30_0877.csv', 0, 77, '2019-07-17 01:59:04'),
(18, '2019_06_19_15_56_3677.csv', 0, 77, '2019-07-17 01:14:31'),
(19, '2019_06_25_06_10_2477.csv', 0, 77, '2019-07-17 01:14:48'),
(20, '2019_06_25_06_38_5477.csv', 0, 77, '2019-07-02 04:48:15'),
(21, '2019_06_30_06_25_4577.csv', 0, 77, '2019-07-02 04:51:49'),
(22, '2019_07_01_09_06_362285.csv', 1, 2285, '2019-07-01 15:15:49'),
(23, '2019_07_01_14_50_072285.csv', 0, 2285, '2019-07-01 15:15:49'),
(24, '2019_07_01_14_51_516.csv', 1, 6, '2019-07-01 14:51:51'),
(25, '2019_07_01_14_52_542286.csv', 1, 2286, '2019-07-01 14:52:54'),
(26, '2019_07_02_04_52_5177.csv', 0, 77, '2019-07-17 01:15:03'),
(27, '2019_07_02_05_24_4377.csv', 0, 77, '2019-07-02 05:28:26'),
(28, '2019_07_02_05_29_1677.csv', 0, 77, '2019-07-02 05:29:46'),
(29, '2019_07_02_05_29_4677.csv', 0, 77, '2019-07-02 05:30:05'),
(30, '2019_07_02_05_30_0577.csv', 0, 77, '2019-07-09 07:29:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_hash` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registered_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `name`, `img_url`, `registered_on`) VALUES
(6, 'nam@nam.com', '$2b$12$aJSUERMvJ.4fxuXq2GsYV.ge1EiurHD2i9jVsqv4HMRzP8tA5aQrO', 'nam', NULL, NULL),
(20, 'try@try.com', 'try', 'try', NULL, NULL),
(77, 'test@test.com', '$2b$12$ogEf00M2fCTtWM1vWHztAeU4tDKV9Ki4WE.5GWcDuSlHmXYBz2RCK', 'test', '2019061911234277.jpg', NULL),
(2277, 'dsk@gmail.com', 'dsk', 'DSK', NULL, NULL),
(2278, 'van@dsk.com', '$2b$12$XuwG3uxCI8Zu9T/ip4S3nessf5gQzFtkQdXRIgsebfAIiqZ/n5fKq', 'Van', NULL, NULL),
(2279, 'TinhYeu@ThuHan.com', '$2b$12$bG0V8XADNOwBUP6BL6UkbeDeh9u31n.81Z58utL6BZp/AfFIHEYza', 'ThuHan', NULL, NULL),
(2280, 'can@dam.com', '$2b$12$gZPElKN3ZqJVCUUU/3dadeI9VukGsKqGpIA3I5aa/GHKfaNB6zgUW', 'CANDAM', NULL, NULL),
(2281, 'Ong@Tay.com', '$2b$12$KBLFh8pb4TWFzjuS6vQ10.nKumYs/KfAJ2iKy10DMk/knrpO8uCVG', 'OngTay', NULL, NULL),
(2282, '', '$2b$12$xEtStO0w2PfEquDp5AFZW./rP68T9jIjr1YDDsESZFMEL8eNCwVfa', 'nam', NULL, NULL),
(2283, 'nam', '$2b$12$8rsllJO5Zyq9tx9L0jJBFeyfripIjp/4UX1yMn3AYPfU21uHfEVD.', 'nam', NULL, NULL),
(2284, 'haizz', '$2b$12$bMnzoTURCIg9XDvzyreyDu4r1Zy8.64rrCw6KCSt5iK62SKo8077S', 'haizz@gmai', NULL, NULL),
(2285, 'gio@gmail.com', '$2b$12$siz/w7h8Zk7XnSq9Tk5oxO5Ae610JyR8SO.OYOSsaeRFEgrtsUmrq', 'gio', NULL, NULL),
(2286, 'demo@gmail.com', '$2b$12$IIYGkha3NC.uxB.ze/gZe.8o9ht8727NxNepisEXtxwfs9rAMepVu', 'DEMO', NULL, NULL),
(2287, 'lyhoanam@gmail.com', '$2b$12$rd6T8anF8gDJ9PKadV92xexjqFGqTI3cHEmRPPRMFsn1zQRgtbpyu', 'LyHoaNam', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `blacklist_tokens`
--
ALTER TABLE `blacklist_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `data_file`
--
ALTER TABLE `data_file`
  ADD PRIMARY KEY (`id_data`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist_tokens`
--
ALTER TABLE `blacklist_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_file`
--
ALTER TABLE `data_file`
  MODIFY `id_data` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2288;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_file`
--
ALTER TABLE `data_file`
  ADD CONSTRAINT `data_file_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
