CREATE TABLE IF NOT EXISTS `game` (
  `gameID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `playerHealth` int(11) unsigned NOT NULL,
  `computerHealth` int(11) unsigned NOT NULL,
  `playerMana` int(11) unsigned NOT NULL,
  `computerMana` int(11) unsigned NOT NULL,
  `currentMana` int(11) unsigned NOT NULL,
  `playerHand` varchar(200) NOT NULL,
  `playerDeck` varchar(200) NOT NULL,
  `computerHand` varchar(200) NOT NULL,
  `computerDeck` varchar(200) NOT NULL,
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;