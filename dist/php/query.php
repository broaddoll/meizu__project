<?php
    include 'public.php';
    $uname=$_POST['uname'];
    $sql ="SELECT * FROM `user` WHERE `uname`='$uname'";
    $set =  mysqli_query($link,$sql); //返回值是的一集合
    // 将集合转为数组
    // mysqli_fetch_array() :一次只能将一个记录转为数组。
    while($arr = mysqli_fetch_array($set)){
        $list[] = $arr; 
    }
    //后端所有的输出语句都是响应前端的语句
    echo json_encode($list);