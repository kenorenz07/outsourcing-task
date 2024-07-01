<?php

use App\Http\Controllers\API\AuthenticationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::post('login', [AuthenticationController::class, 'login'])->name('adminLogin');
// Route::post('register', [AuthenticationController::class, 'register']);
// Route::group(['middleware' => ['auth:admin-api', 'scopes:admin']], function () {
//     // authenticated staff routes here 
//     Route::get('me', [AuthenticationController::class, 'me']);
//     Route::post('logout', [AuthenticationController::class, 'logout']);
//     Route::post('register', [AuthenticationController::class, 'logout']);
// });
