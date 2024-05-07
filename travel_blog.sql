-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 07, 2024 at 10:57 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `user_name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `user_name`, `password`) VALUES
(1, 'alesya', 'alesya@gmail.com', 'alesya123', 'alesya123'),
(2, 'filsan', 'filsan@gmail.com', 'filsan123', 'filsan123'),
(3, 'raja', 'raja@gmail.com', 'raja123', 'raja123'),
(4, 'samira', 'samira@gmail.com', 'samira123', 'samira123'),
(5, 'naman', 'naman@gmail.com', 'naman123', 'naman123');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `destination_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`post_id`, `title`, `content`, `destination_id`) VALUES
(1, 'Getting Around in London', 'London is separated into many different boroughs and neighborhoods; each offering a unique flavor of the city! The most popular London neighborhoods are:\r\n\r\nCovent Garden: Covent Garden is one of the most popular areas of the city with some of the best theaters. Neal Street is a shoe lover’s paradise with a series of shops catering to every sole.\r\n\r\nSoHo: A vibrant and exciting part of the city that is home to an amazing range of pubs, jazz and blues bars, and the heart of London’s gay scene. This is where many of the fashion-forward residents of the city come to party.\r\n\r\nKensington + Chelsea: This borough is home to some of London’s most posh shops and luxurious residents. It’s also home to Notting Hill which has become an up-and-coming, trendy neighborhood.\r\n\r\nCamden: Famous for being the alternative center of London where hippies and punks tread the streets together. It is home to a lively mix of music venues, markets, eateries, tattoo parlors and boutiques.\r\n\r\nThe City of London: The City is actually only about a square mile in size, and is home to London’s biggest skyscrapers and financial district.\r\n\r\nWestminster: The tourist center of London, sights include the Houses of Parliament, Buckingham Palace and Westminster Abbey. Visitors can see the British Government in action by visiting the Strangers’ Gallery at the House of Commons.\r\n\r\nShoreditch: Known as the creative hub of London’s trendy East End. Come here for great food, nightlife, street art, and vintage shopping.', 1),
(2, 'Dhigurah Island Travel Guide For Maldives', 'Dhigurah island is probably the most beautiful island you’ve never heard of in the Maldives. It’s a local island without the fancy overwater resorts that are famous in Maldives, but instead it has a long and wonderful white sand beach.\r\n\r\nIf you’re wanting to see the Maldives on a budget, this is one of the best places to do it. Dhigurah has all of the amazing tropical scenery you’d expect from the Maldives, plus family-owned hotels that are as low as $70 USD per night!\r\n\r\nWe recently visited two local islands in the Maldives, Dhigurah and Fulidhoo, and couldn’t be happier with our choice.\r\n\r\nThis travel guide will explain how to get to Dhigurah island, what to do there, where to stay, and everything else you need to know before you go!', 2),
(3, 'Tiger’s Nest Monastery Bhutan Hike (Paro Taktsang)', 'The Tiger’s Nest Monastery hike is one of the best things to do in Bhutan, and probably one of the most amazing day hikes anywhere in the world.\r\n\r\nThis photogenic Buddhist monastery, also known as Paro Taktsang, clings to the side of a steep cliff that’s 900 meters tall (3,000 feet)! It hardly looks real.\r\n\r\nThe Tiger’s Nest hike is not too difficult for most people of average fitness, and it’s located fairly close to the main airport in Bhutan. However, because of Bhutan’s unusual tourist tax, this awesome little country is still off the radar for most international tourists.\r\n\r\nThis travel guide will explain how to do the Tiger’s Nest Bhutan hike, how to get there, what to expect in terms of difficulty, and everything else you need to know before you go!', 4),
(4, 'The Pyramids Of Giza In Egypt', 'The Giza pyramids are fairly easy to visit on a day trip from Cairo, the capital of Egypt.\r\n\r\nBuilt in 2560 BC, the Great Pyramid of Giza was the tallest man-made object in the world for 3,800 years. It’s the oldest of the Seven Wonders Of The Ancient World, and the only one still standing today.\r\n\r\nVisiting the Egypt pyramids is a pretty simple experience, and there’s not a whole lot to do there except gaze at the big piles of rock, but it’s still a profound and unique experience that every traveler should check off their list.\r\n\r\nThis travel guide will explain how you can visit the Egyptian pyramids on your own, with or without a tour, and with a very modest budget and minimal planning!', 3),
(5, 'Mason Elephant Sanctuary Bali: Rescue Park & Lodge', 'This is an elephant rescue park opened in 1997, and they do a lot of great conservation work for the Sumatran elephants, which are critically endangered on their home island of Sumatra in Indonesia.\r\n\r\nThe safari park has lots of activities you can do, including elephant rides, elephant feeding and bathing, a museum, and more. It’s easy to visit on a day trip from Ubud and other areas of Bali.\r\n\r\nIf you want to stay longer, there’s even a 5 star hotel called Mason Elephant Lodge, where you can spend the night and enjoy the animals from your hotel balcony.\r\n\r\nThis is not the only elephant sanctuary Bali has to offer, but it’s by far the best experience. The park owners really care about elephants and the animals seem genuinely happy and well cared for. Read on for our full review!', 5),
(6, '23 Best Things To Do In Aruba Island ', 'The little Caribbean island of Aruba is mainly known for its beautiful beaches and tropical weather, but there are also lots of fun things to do in Aruba for couples, families with kids, and other travelers.\r\n\r\nEven though it’s a small island, Aruba is home to the Arikok National Park, where you can enjoy hiking, horseback riding, and ATV off-roading, and the island also has caves, natural rock bridges, a lighthouse, and other scenic photo ops.\r\n\r\nBelieve it or not, there are also some fun wildlife activities in Aruba, like the Butterfly Farm and the famous Flamingo Beach on Renaissance Island, where you can feed and photograph the friendly pink flamingos while they roam around the island.\r\n\r\nWe spent lots of time exploring Aruba island recently, and had a blast. It’s safe, easy to get there from America, and pretty budget friendly. Best of all, there are dozens of immaculate white sand beaches in Aruba with clean blue water. It’s a great place to escape the winter.', 2),
(7, 'Stairway To Heaven Hawaii Hike: Epic Haiku Stairs ', 'The ‘Stairway To Heaven’ Hawaii hike is epic, dangerous, and slightly illegal. Still interested? This trail in Oahu, also known as the Haiku Stairs, takes you to the top of the Ko’olau mountains via 3,922 metal stairs of pure adrenaline and doom.\r\n\r\nAt some points, the stairs of death are almost vertical, clinging to the side of the steep mountain. Still, thousands of people make the climb every year, and for good reason — it’s one of the most spectacular hikes on Earth!\r\n\r\nI first discovered the ‘Stairway To Heaven’ Oahu hike on the internet in 2015 and knew I had to try it. Not only are the views out of this world, but the whole experience is just beyond awesome and unique.\r\n\r\nI’ve done the Hawaii ‘Haiku Stairs’ hike several times now, and even after traveling in many countries, it’s still probably my favorite trek in the world. It may never be surpassed!\r\n\r\nThis blog post will explain some of the details and history of the Hawaii ‘Stairway To Heaven’ hike, and then I’ll discuss some of the politics behind the stairs and plans for their future.', 1),
(8, 'Tasman Glacier Walk & Lake View In New Zealand', 'The Tasman Glacier Walk may be a little less popular than the nearby Hooker Valley Track, but they both have amazing views and they’re super easy to add to a New Zealand itinerary!\r\n\r\nAt the end of the Tasman Glacier view track, you get top notch views of Tasman Lake, formed by New Zealand’s biggest glacier, as well as the Blue Lakes.\r\n\r\nIt’s one of the top treks in Mount Cook National Park. This travel guide will explain how to get there, and everything you need to know before you go!', 3),
(9, 'Mount Bromo Sunrise In Indonesia: The Volcano Crat', 'The Mount Bromo sunrise and volcano tour in Indonesia is easily one of the most amazing travel experiences you can have anywhere in the world.\r\n\r\nClimbing the Mount Bromo crater in Java isn’t very hard and you get to look directly into a smoking volcano, complete with the nasty sulfur smell!\r\n\r\nThe first time we visited Mount Bromo Indonesia, we did an independent road trip through East Java that included Mt Bromo and the Kawah Ijen crater, along with some epic waterfalls, before ending in Bali.\r\n\r\nOur most recent visit was a bit different because we used a Mount Bromo tour package. This time we booked a one day tour from Surabaya to Mount Bromo, complete with a jeep ride around the volcano. We liked this even better.\r\n\r\nWhether you use a tour package or not, the Mount Bromo volcano is a ‘bucket list’ item you shouldn’t miss on your journey through Asia, and you can even travel from Bali to Mount Bromo without much hassle.', 4),
(10, 'Santorini Greece Travel Guide: Things To Do In San', 'The little island of Santorini Greece is famous for its photogenic old white-and-blue buildings, beautiful high end hotels with infinity pools, and sweeping views of the ocean.\r\n\r\nSantorini island is almost synonymous with luxury nowadays, but it’s also possible to travel Santorini on a budget, and many of the best things to do in Santorini are free, such as strolling the historic towns, taking pictures, relaxing on the beach, and seeing the sunset.\r\n\r\nA trip to the Greek islands wouldn’t be complete without seeing Santorini for at least a few days, and it’s easier than ever to get there from Athens and other major cities in Europe.\r\n\r\nThis Santorini travel guide will explain how to get there, where to stay, which transport options and tour packages to use, and some of the best things to do in Santorini Greece. I’ve also included a handy Santorini island map for your trip planning!', 5);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Beaches\n'),
(2, 'Hikes\n'),
(3, 'Volcanos\n'),
(4, 'Waterfalls\n'),
(5, 'Wildlife\n'),
(6, 'Adventure'),
(7, 'Outdoor Activities'),
(8, 'monuments');

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `destination_id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`destination_id`, `name`) VALUES
(1, 'Americas'),
(2, 'Asia'),
(3, 'Caribbean'),
(4, 'Europe'),
(5, 'Middle East'),
(6, 'Oceania');

-- --------------------------------------------------------

--
-- Table structure for table `posts_categories`
--

CREATE TABLE `posts_categories` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_categories`
--

INSERT INTO `posts_categories` (`id`, `post_id`, `category_id`) VALUES
(1, 1, 7),
(2, 2, 1),
(3, 2, 6),
(4, 3, 4),
(5, 4, 8),
(6, 5, 5),
(7, 5, 6),
(8, 6, 1),
(9, 6, 2),
(10, 7, 2),
(11, 8, 1),
(12, 8, 6),
(13, 9, 3),
(14, 10, 7),
(15, 10, 1),
(16, 19, 1),
(17, 19, 2),
(18, 20, 5),
(19, 20, 6),
(20, 21, 3),
(21, 21, 1),
(22, 21, 5),
(23, 21, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`destination_id`);

--
-- Indexes for table `posts_categories`
--
ALTER TABLE `posts_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `destination_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `posts_categories`
--
ALTER TABLE `posts_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
