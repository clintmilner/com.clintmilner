<?php
/**
 * Created by IntelliJ IDEA.
 * User: clint.milner
 * Date: 10/6/14
 * Time: 11:07 AM
 */

// Configure your Subject Prefix and Recipient here
$subjectPrefix = '*INQUIRY*';
$emailTo       = 'me@clintmilner.com';

$errors = array(); // array to hold validation errors
$data   = array(); // array to pass back data

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = stripslashes(trim($_POST['name']));
    $email   = stripslashes(trim($_POST['email']));
    $subject = stripslashes(trim($_POST['subject']));
    $message = stripslashes(trim($_POST['message']));
    $spam = $_POST['botTrap'];


    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }

    if (!preg_match('/^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/', $email)) {
        $errors['email'] = 'Please double-check you have entered a valid email address.';
    }

    if (empty($message)) {
        $errors['message'] = 'Please provide some information about your inquiry today. Thanks!';
    }

    if($spam)
    {
        die( "BotTrap has caught a bot" );
    }
    else
    {
        // if there are any errors in our errors array, return a success boolean or false
        if (!empty($errors))
        {
            $data['success'] = false;
            $data['errors']  = $errors;
        }
        else
        {
            $subject = "$subjectPrefix $subject";
            $body    = '
                <strong>Name: </strong>'.$name.'<br />
                <strong>Email: </strong>'.$email.'<br />
                <strong>Message: </strong>'.nl2br($message).'<br />
                --------------------------------------------------- <br />'.
                '<strong>IP: </strong>'.$_SERVER['REMOTE_ADDR'].'<br />
                <strong>Browser: </strong>'.$_SERVER['HTTP_USER_AGENT'].'<br />
            ';

            $headers  = 'MIME-Version: 1.1' . PHP_EOL;
            $headers .= 'Content-type: text/html; charset=UTF-8' . PHP_EOL;
            $headers .= "From: $name <$email>" . PHP_EOL;
            $headers .= "Return-Path: $emailTo" . PHP_EOL;
            $headers .= "Reply-To: $email" . PHP_EOL;
            $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;

            mail( $emailTo, $subject, $body, $headers );

            $data['success'] = true;
            $data['message'] = 'Congratulations. Your message has been sent successfully';
        }

        // return all our data to an AJAX call
        echo json_encode( $data );
    }
}