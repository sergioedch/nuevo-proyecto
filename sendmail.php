<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Aquí cargamos PHPMailer (requiere que hayas corrido el comando de composer)
require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

// 1. Recibir los datos del formulario de tu Congreso
$nombre   = trim($_POST['nombre'] ?? '');
$correo   = trim($_POST['correo'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$terminos = trim($_POST['terminos'] ?? '');

$taller   = trim($_POST['taller_seleccionado'] ?? 'No aplica');
$paquete  = trim($_POST['paquete_seleccionado'] ?? 'No aplica');
$accesos  = isset($_POST['tipo_acceso']) ? implode(', ', $_POST['tipo_acceso']) : 'Ninguno';

if (empty($nombre) || empty($correo) || empty($telefono)) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan campos.']);
    exit;
}

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contacto@qualitechai.com'; 
    $mail->Password   = 'fhZbdGXEmp*j832'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    // 3. Destinatarios
    $mail->setFrom('contacto@qualitechai.com', 'Registro Congreso - Sitio Web');

    // A quién le llega el aviso (puedes ser tú mismo u otro correo de ventas)
    /*   $mail->addAddress('contacto@qualitechai.com'); */
    $mail->addAddress('sergiocasarrubias500@gmail.com');

    // Si le das responder al correo, le escribes directo al cliente
    $mail->addReplyTo($correo, $nombre);

    // 4. Armar el correo con tu diseño HTML
    $mail->isHTML(true);
    $mail->Subject = 'Nuevo registro al Congreso: ' . $nombre;

    $mail->Body = <<<HTML
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nuevo Registro</title>
                <style>
                    body { width: 100%; background-color: #FAFAFA; margin: 0; padding: 0; font-family: 'Arial', sans-serif; }
                    table { border-collapse: collapse; }
                    .es-wrapper { width: 100%; background-color: #FAFAFA; padding: 20px 0; }
                    .es-content { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0px 2px 10px rgba(0,0,0,0.1); }
                    .es-header { background-color: #388697; padding: 20px; text-align: center; }
                    .es-content-body { padding: 40px 30px; color: #333333; }
                    h1 { color: #9253C8; font-size: 24px; margin-bottom: 20px; text-align: center; }
                    .data-row { margin-bottom: 12px; border-bottom: 1px solid #eeeeee; padding-bottom: 8px; }
                    .label { font-weight: bold; color: #388697; display: block; font-size: 12px; text-transform: uppercase; }
                    .value { color: #333333; font-size: 16px; display: block; margin-top: 5px; }
                </style>
            </head>
            <body>
                <div class="es-wrapper">
                    <div class="es-content">
                        <div class="es-header">
                            <h2 style="color: white; margin: 0;">¡Nuevo Registro Recibido!</h2>
                        </div>
                        <div class="es-content-body">
                            <h1>Detalles del Contacto</h1>
                            
                            <div class="data-row">
                                <span class="label">Nombre completo</span>
                                <span class="value">{$nombre}</span>
                            </div>
                            <div class="data-row">
                                <span class="label">Correo Electrónico</span>
                                <span class="value">{$correo}</span>
                            </div>
                            <div class="data-row">
                                <span class="label">Teléfono</span>
                                <span class="value">{$telefono}</span>
                            </div>
                            <div class="data-row">
                                <span class="label">Tipo de Experiencia</span>
                                <span class="value" style="color: #9253C8; font-weight: bold;">{$accesos}</span>
                            </div>
                            <div class="data-row">
                                <span class="label">Taller Seleccionado (Opción 2)</span>
                                <span class="value">{$taller}</span>
                            </div>
                            <div class="data-row">
                                <span class="label">Paquete Seleccionado (Opción 3)</span>
                                <span class="value">{$paquete}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
HTML;

    if ($mail->send()) {
        echo json_encode(['status' => 'success', 'message' => '¡Registro exitoso!']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Error de SMTP: {$mail->ErrorInfo}"]);
}
