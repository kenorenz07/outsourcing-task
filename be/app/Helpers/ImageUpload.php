

<?php


function string_between_two_string($str, $starting_word, $ending_word)
{
    $arr = explode($starting_word, $str);
    if (isset($arr[1])) {
        $arr = explode($ending_word, $arr[1]);
        return $arr[0];
    }
    return '';
}

function uploadImage($folder, $prefix, $image)
{
    if (!is_dir(storage_path("app/public/$folder"))) {

        mkdir(storage_path("app/public/$folder"), 0755, true);
    }

    $exploded_base64 = explode(',', $image);
    $decoded_base64  = base64_decode($exploded_base64[1]);
    $extention = string_between_two_string($exploded_base64[0], '/', ';');

    $fileName = $prefix . time() . '.' . $extention;
    $path = storage_path("app/public/$folder/") . $fileName;

    file_put_contents($path, $decoded_base64);

    return $fileName;
}
