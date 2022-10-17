<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Items\Application\ItemService;

class GiosItemController extends Controller
{
    public function getItems(Request $request){
        $data = ItemService:: getItemData($request);
        return $data;
    }
}
