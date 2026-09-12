<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

// 1. Recibir y limpiar datos
$nombre   = trim($_POST['nombre'] ?? '');
$correo   = trim($_POST['correo'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$taller   = trim($_POST['taller_seleccionado'] ?? 'Ninguno');
$accesos  = isset($_POST['tipo_acceso']) ? implode(', ', $_POST['tipo_acceso']) : 'No especificado';

// 2. Validaciones básicas
if (empty($nombre) || empty($correo) || empty($telefono)) {
    echo json_encode(['status' => 'error', 'message' => 'Por favor llena todos los campos obligatorios.']);
    exit;
}

// 3. Estructurar el mensaje
$destinatario = "contacto@tudominio.com";
$asunto       = "Nuevo registro al Congreso: " . $nombre;
$cuerpo       = "Nombre: $nombre\n"
              . "Correo: $correo\n"
              . "Teléfono: $telefono\n"
              . "Tipo de acceso: $accesos\n"
              . "Taller seleccionado: $taller\n";

$headers = "From: registro@tudominio.com\r\n"
         . "Reply-To: $correo\r\n"
         . "X-Mailer: PHP/" . phpversion();

// 4. Envío mediante sendmail/mail nativo
if (mail($destinatario, $asunto, $cuerpo, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al disparar el servicio de correo.']);
}