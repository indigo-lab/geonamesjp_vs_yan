# geonamesjp_vs_yan
[GeoNames.jp](http://geonames.jp/) と [Yokohama Art LOD](http://yan.yafjp.org/lod) のリンクセットジェネレータ

## What's this?

GeoNames.jp と Yokohama Art LOD の地物の包含関係を <http://schema.org/containsPlace> で結ぶ
リンクセットを作成するためのジェネレータです。

## How to

	npm install
	node main.js > geonamejp_vs_yan.nt.txt

## Note

Travis CI による自動ビルドの結果を gh-pages にホストしています。
ビルドが成功している場合は以下の URL から N-Triples 形式のリンクセットを取得することができます。

* <http://indigo-lab.github.io/geonamesjp_vs_yan/geonamesjp_vs_yan.nt.txt>


[![Build Status](https://travis-ci.org/indigo-lab/geonamesjp_vs_yan.svg?branch=master)](https://travis-ci.org/indigo-lab/geonamesjp_vs_yan)
