<?php
session_start();

unset($_SESSION['NAME']);
unset($_SESSION['EMAIL']);
unset($_SESSION['USERNAME']);
unset($_SESSION['ADMINROLE']);



// Finally, destroy the session.
session_destroy();
include "checksession.php";

?>