#!/bin/bash
cargo watch -s "wasm-pack build --target nodejs --out-dir pkg"

cd ../core&&yarn link
