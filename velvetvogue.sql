-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2026 at 02:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `velvetvogue`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'test 1', 'test@gmail.com', 'test test', '2025-05-29 11:56:59'),
(2, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 11:58:56'),
(3, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:03:56'),
(4, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:19:08'),
(5, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:26:51'),
(6, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:31:12'),
(7, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:32:36'),
(8, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:41:24'),
(9, 'test 1', 'test1@gmail.com', 'test', '2025-05-29 12:49:19');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `testimonial` text NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `testimonial`, `rating`, `created_at`) VALUES
(1, 'Test User', 'This is a test testimonial.', 5, '2025-05-28 11:54:45'),
(2, 'test', 'tes test', 5, '2025-05-29 09:31:37'),
(3, 'test', 'tes test', 5, '2025-05-29 09:31:37'),
(4, 'anderson', 'all under the same roof', 4, '2025-05-29 09:33:09'),
(5, 'anderson', 'all under the same roof', 4, '2025-05-29 09:33:09'),
(6, 'ali', 'awsome collections', 5, '2025-05-29 09:36:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
