# course_web_test

Hugo で構築された静的サイトです。

## ローカルで確認する

Hugo がインストールされていることを確認します。

```sh
hugo version
```

未インストールの場合は、macOS では Homebrew でインストールできます。

```sh
brew install hugo
```

ローカル確認用サーバを起動します。

```sh
hugo server
```

起動後、ブラウザで以下を開きます。

```text
http://localhost:1313/
```

下書きページも含めて確認する場合は、次のように起動します。

```sh
hugo server -D
```

## 静的ファイルを生成する

公開用の静的ファイルを生成します。

```sh
hugo
```

生成物は `public/` に出力されます。`public/` は生成物のため Git 管理対象外です。

## 生成物を削除して作り直す

出力を一度消してから生成し直す場合は、次の手順で実行します。

```sh
rm -rf public resources/_gen
hugo
```
