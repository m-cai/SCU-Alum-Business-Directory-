<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = $_POST;

    $firstname = $data["first-name"];
    $lastname = $data["last-name"];
    $gradyear = $data["grad_year-select"];
    $businessname = $data["business-name"];
    $address = $data["business-address"];
    $city = $data["business-city"];
    $state = $data["state-select"];
    $zipcode = $data["business-zip"];
    $email = $data["business-email"];
    $phone = $data["business-phone"];
    $tag = $data["select-tag"];
    $descrip = $data["business-descrip"];

    $img = $_FILES;
    $img = file_get_contents($_FILES["business-img"]["tmp_name"]);

    if (!empty($firstname)){
        $firstname = prepareInput($firstname);
    }
    if (!empty($lastname)){
        $lastname = prepareInput($lastname);
    }
    if (!empty($gradyear)){
        $gradyear = prepareInput($gradyear);
    }
    if (!empty($businessname)){
        $businesname = prepareInput($businessname);
    }
    if (!empty($address)){
        $address = prepareInput($address);
    }
    if (!empty($city)){
        $city = prepareInput($city);
    }
    if (!empty($state)){
        $state = prepareInput($state);
    }
    if (!empty($zipcode)){
        $zipcode = prepareInput($zipcode);
    }
    if (!empty($email)){
        $email = prepareInput($email);
    }
    if (!empty($phone)){
        $phone = prepareInput($phone);
    }
    if (!empty($descrip)) {
        $descrip = prepareInput($descrip);
    }

      // Call the functions to insert the data
    insertListers($firstname, $lastname, $gradyear, $businessname);
    insertBusiness_Number_Email($businessname, $phone, $email);
    insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode);
    insertBusiness_Descriptions($businessname, $tag, $descrip, $img);
}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function insertListers($firstname, $lastname, $gradyear, $businessname){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }
    $query = oci_parse($conn, "Insert Into Listers values(:firstname, :lastname, :grad_year, :businessname, 0)");

    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':grad_year', $gradyear);
    oci_bind_by_name($query, ':businessname', $businessname);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    $queryString = "begin insertSCUAlum(:firstname, :lastname, :grad_year); end;";
    $query = oci_parse($conn, $queryString);

    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':grad_year', $gradyear);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    oci_free_statement($query);
    OCILogoff($conn);
}

function insertBusiness_Number_Email($businessname, $phone, $email){
        //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai','coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }
    $query = oci_parse($conn, "Insert Into Business_Number_Email values(:businessname, :phonenumber, :email)");

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':phonenumber', $phone);
    oci_bind_by_name($query, ':email', $email);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    oci_free_statement($query);
    OCILogoff($conn);
}

function insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai','coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "Insert Into Business_Addresses values(:businessname, :address, :city, :state, :zipcode)");

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':address', $address);
    oci_bind_by_name($query, ':city', $city);
    oci_bind_by_name($query, ':state', $state);
    oci_bind_by_name($query, ':zipcode', $zipcode);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    oci_free_statement($query);
    OCILogoff($conn);
}

function insertBusiness_Descriptions($businessname, $tag, $descrip, $img) {

    $conn = oci_connect('mcai','coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "INSERT Into Business_Descriptions (businessname, tag, comments, image) values(:businessname, :tag, :descrip, empty_blob()) RETURNING image INTO :img");

    $blob = oci_new_descriptor($conn, OCI_D_LOB);

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':tag', $tag);
    oci_bind_by_name($query, ':descrip', $descrip);
    oci_bind_by_name($query, ':img', $blob, -1, OCI_B_BLOB);

    // Execute the query
    $res = oci_execute($query, OCI_DEFAULT);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    if($blob->save($img)) {
        oci_commit($conn);
        echo "Upload successful";
    } else {
        echo "Couldn't upload image";
    }

    $blob->free();
    oci_free_statement($query);
    OCILogoff($conn);

}

?>
