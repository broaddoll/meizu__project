<?php
    include 'public.php';
    $uname=$_POST['uname'];
    $pwd=$_POST['pwd'];
    $sql = "INSERT INTO `user`(`uname`, `pwd`) VALUES ('$uname','$pwd')";
    mysqli_query($link,$sql);