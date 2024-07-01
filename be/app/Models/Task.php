<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $with = ['users'];
    protected $appends = ['assigned_users'];

    public function getAssignedUsersAttribute()
    {
        return implode(',', $this->users->pluck('name')->toArray());
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
