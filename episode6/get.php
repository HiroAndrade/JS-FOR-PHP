<?php

session_start();

header('Content-Type: application/json');

if (!isset($_GET['minRange'])) {
    echo json_encode(null);
} else {
    echo json_encode([
        'minRange' => (int)$_GET['minRange'],
        'maxRange' => (int)$_GET['maxRange'],
        'maxAttempts' => (int)$_GET['maxAttempts'],
        'allowDuplicateGuesses' => (bool)$_GET['allowDuplicateGuesses'],
        'secretNumber' => (int)$_GET['secretNumber'],
        'history' => []
    ]);
}