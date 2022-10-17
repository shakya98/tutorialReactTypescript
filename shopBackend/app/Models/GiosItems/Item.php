<?php

namespace App\Models\GiosItems;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public function type()
    {
        return $this->belongsTo('App\Models\GiosItems\Type');
    }
}
