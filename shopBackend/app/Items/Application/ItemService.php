<?php

namespace App\Items\Application;
use Illuminate\Http\Request;
use App\Models\GiosItems\Item;


class ItemService{

    public static function getItemData(){

        $item = Item:: with(['type'])->get();

        return($item);
    }

}