<?php

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

//check if the file is receiving place
if (!isset($_GET["place"])){
    echo json_encode(["error"=>"no place provided"]);
    exit;
}

$place = $_GET["place"];

//making connection to the database
$connection = new mysqli("localhost","root","","weather");

//select all the data in table with the place name
$queryString = 'SELECT * FROM weather_data WHERE Name = "'.$place.'";';
$res = $connection->query($queryString);

//check if the query is returning 
if($res && $res->num_rows>0){

    //receive all rows of query result as associative array
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $send = array();

    //loop through each element in the array
    foreach($data as $row){
        $condi = $row['Description'];
        $temp = $row['Temperature'];
        $country = $row['Name'];
        $wind = $row['Wind'];
        $humi = $row['Humidity'];
        $Date = $row['Moment'];
        $icon = $row['icon'];
        $Dt = $row['dt'];

        $s = array(
            'condi' => $condi,
            'temp' => $temp,
            'country' => $country,
            'wind' => $wind,
            'humi' => $humi,
            'Date' => $Date,
            'icon' => $icon,
            'dt' => $Dt
        );

        //push the value of $s in $send variable
        array_push($send,$s);

    }

    //send the value in send variable in json form
    echo json_encode($send);
}else{
    echo json_encode(array());
}

?>