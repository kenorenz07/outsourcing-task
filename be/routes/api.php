<?php



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\API\AuthenticationController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticationController::class, 'login'])->name('adminLogin');
Route::post('register', [AuthenticationController::class, 'registration']);
Route::group(['middleware' => ['auth:admin-api', 'scopes:admin', 'check.token.expiry']], function () {
    // authenticated staff routes here 
    Route::get('me', [AuthenticationController::class, 'me']);
    Route::get('employees', [UserController::class, 'getEmployees']);
    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::resource('tasks', TaskController::class);
});
