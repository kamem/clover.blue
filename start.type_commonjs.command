#!/bin/sh

# 実行先のディレクトリへ移動
cd `dirname $0`

tsc typescript/*.ts typescript/**/*.ts -watch --outDir ./ --module commonjs