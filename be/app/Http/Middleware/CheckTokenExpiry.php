<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Passport\TokenRepository;
use Carbon\Carbon;

class CheckTokenExpiry
{
    protected $tokens;

    public function __construct(TokenRepository $tokens)
    {
        $this->tokens = $tokens;
    }

    public function handle($request, Closure $next)
    {
        $user = $request->user();

        if ($user) {
            $token = $this->tokens->find($user->token()->id);

            if (Carbon::parse($token->expires_at)->isPast()) {
                return response()->json([
                    'error' => 'Token has expired.'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        return $next($request);
    }
}
