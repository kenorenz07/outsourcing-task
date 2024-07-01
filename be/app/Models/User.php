<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'password',
        'role_id'
    ];

    protected $appends = ['permission_slugs'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getPermissionSlugsAttribute()
    {
        return $this->role->permissions->pluck('slug');
    }

    public function hasPermissions($permissionSlugs): bool
    {
        $roleId = $this->role_id;

        return Permission::whereHas('roles', function ($query) use ($roleId) {
            $query->where('roles.id', $roleId);
        })->whereIn('slug', $permissionSlugs)->exists();
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }
}
