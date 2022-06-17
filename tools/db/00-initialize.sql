--
-- Initialize sql script
--
-- TODO Adjust the user and the password
--

CREATE USER 'blueskyfish'@'%' IDENTIFIED BY 'password1';
GRANT USAGE ON *.* TO 'blueskyfish'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `blueskyfish\_%`.* TO 'blueskyfish'@'%';
