<?php

  include "inc/one.php";

  $pageName = "pages/".$pageName.".php";
  $errorPage = "pages/errorPage.php";

  if(file_exists ($pageName))
    include $pageName;
  else
    include $errorPage;

  include "inc/two.php";


?>
