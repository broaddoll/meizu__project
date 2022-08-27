<?php
    include 'public.php';
    $uname=$_POST['uname'];
    $pwd=$_POST['pwd'];
    $sql ="SELECT * FROM `user` WHERE `uname`='$uname'&&`pwd`='$pwd'";
    $set =  mysqli_query($link,$sql); //返回值是的一集合
    while($arr = mysqli_fetch_array($set)){
        $list[] = $arr;
    }
    echo json_encode($list);