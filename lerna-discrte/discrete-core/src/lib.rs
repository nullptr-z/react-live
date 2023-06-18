mod mocker;

use mocker::{get_set_a, get_set_b};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_set(name: &str) -> Vec<i32> {
    match name {
        "a" => get_set_a(),
        "b" => get_set_b(),
        _ => vec![],
    }
}
