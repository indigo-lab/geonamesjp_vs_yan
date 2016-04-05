#!/bin/bash
set -e

rm -rf out || exit 0;
mkdir out;

npm install

cat << EOS > out/geonamesjp_vs_yan.nt.txt
# Copyright (c) 2016 Indigo Corp. Research and Development Center
#
# このデータはクリエイティブ・コモンズ 表示 - 継承 4.0 国際 ライセンスの下に提供されています。
# <https://creativecommons.org/licenses/by-sa/4.0/deed.ja>
#
# このデータは Yokohama Art LOD SPARQLエンドポイント の出力を加工して作成されました。
# <http://data.yafjp.org/SPARQL.html>
#

EOS

node main.js >> out/geonamesjp_vs_yan.nt.txt

# go to the out directory and create a *new* Git repo
cd out
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "indigo-lab@users.noreply.github.com"

git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

# git push "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
