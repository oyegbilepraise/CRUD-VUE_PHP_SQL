<?php
class Controller
{
    protected $dbName = 'crud_vue';
    protected $password = '';
    protected $username = 'root';
    protected $server = 'localhost';

    public $con;

    public function __construct()
    {
        $this->con = new mysqli($this->server, $this->username, $this->password, $this->dbName);
        if ($this->con->connect_error) {
            die('Failed Connection' . $this->con->connect_error);
        }
        echo "Conneted Lowokan";
    }
}

$var = new Controller;
$conn = $var->con;
$result = array('error' => false);
$action = '';

if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

if ($action == 'read') {
    $sql = $conn->query('SELECT * FROM users');
    $users = array();
    while ($row = $sql->fetch_assoc()) {
        array_push($users, $row);
    }
    $result['user'] = $users;

    echo json_encode($result);
}

if ($action == "create") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $sql = $conn->query("INSERT INTO users (name, email, phone) VALUES('$name', '$email', '$phone')");

    if ($sql) {
        $result['message'] = "User Added succesfully!";
    } else {
        $result['error'] = true;
        $result['message'] = "Failed to Add User";
    }
    echo json_encode($result);
}

if ($action == "update") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $sql = $conn->query("UPDATE users SET name='$name', email='$email', phone='$phone' WHERE id='$id'");

    if ($sql) {
        $result['message'] = "User Updated succesfully!";
    } else {
        $result['error'] = true;
        $result['message'] = "Failed to Update User";
    }
    echo json_encode($result);
}

if ($action == "delete") {
    $id = $_POST['id'];

    $sql = $conn->query("DELETE FROM users WHERE id='$id'");

    if ($sql) {
        $result['message'] = "User Deleted succesfully!";
    } else {
        $result['error'] = true;
        $result['message'] = "Failed to Delete User";
    }
    $conn->close();
    echo json_encode($result);
}
