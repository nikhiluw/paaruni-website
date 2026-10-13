<?php
$UPSTREAM = 'https://ywwhkpvfcjmambjcjcpt.supabase.co';

$method = $_SERVER['REQUEST_METHOD'];
$path   = preg_replace('#^/supa#', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$query  = $_SERVER['QUERY_STRING'] ?? '';

// Only allow Supabase API paths
if (!preg_match('#^/(rest|auth|storage)/v1/#', $path)) {
    http_response_code(404);
    exit;
}

$url = $UPSTREAM . $path . ($query !== '' ? '?' . $query : '');

// Forward only the headers Supabase needs
$allowed = ['apikey','authorization','content-type','prefer','range','accept',
            'accept-profile','content-profile','x-client-info','x-upsert','if-none-match'];
$headers = [];
foreach (getallheaders() as $k => $v) {
    if (in_array(strtolower($k), $allowed, true)) $headers[] = "$k: $v";
}
if (!preg_grep('/^authorization:/i', $headers) && !empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $headers[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
}

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_HTTPHEADER     => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_TIMEOUT        => 60,
    CURLOPT_FOLLOWLOCATION => false,
]);
if ($method === 'HEAD') curl_setopt($ch, CURLOPT_NOBODY, true);

$body = file_get_contents('php://input');
if ($body !== '' && !in_array($method, ['GET', 'HEAD'], true)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

$resp = [];
curl_setopt($ch, CURLOPT_HEADERFUNCTION, function ($c, $line) use (&$resp) {
    $parts = explode(':', $line, 2);
    if (count($parts) === 2) $resp[strtolower(trim($parts[0]))] = trim($parts[1]);
    return strlen($line);
});

$out = curl_exec($ch);
if ($out === false) {
    http_response_code(502);
    echo 'Upstream error';
    exit;
}
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($status);
foreach (['content-type','etag','content-range','content-location','preference-applied'] as $h) {
    if (isset($resp[$h])) header("$h: {$resp[$h]}");
}
// Let browsers cache public product images for a day
if ($status === 200 && strpos($path, '/storage/v1/object/public/') === 0) {
    header('Cache-Control: public, max-age=86400');
}
echo $out;