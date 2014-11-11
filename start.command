#!/bin/sh

# 実行先のディレクトリへ移動
cd `dirname $0`

#sassの場合
#【--style】CSSのフォーマット compressed, compact, expanded
#【--watch】scssファイルを監視 cssファイルの書き出し先
# 【--cache-location】キャッシュファイルの保存先
# sass --style expanded --watch sass:html/css/ --cache-location /Users/shake/.sass-cache/

# compassの場合
compass watch --no-line-comments --poll