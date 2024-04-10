<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'productId', 'id');
    }
}
