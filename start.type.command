#!/bin/sh

# 実行先のディレクトリへ移動
cd `dirname $0`

tsc public/typescript/*.ts public/typescript/**/*.ts -watch --outDir public/js/ --module amd