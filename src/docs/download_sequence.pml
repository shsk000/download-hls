@startuml
actor User as user
boundary Client as client
participant StreamServer as server

activate user

user -> client++: ダウンロードボタン押下
client -> server++: request playlist（playlist.m3u8）

alt success
    server --> client: normally response
else error
    server --> client--: error response
    destroy server
    client -> user: エラー表示
end

client -> client: playlist情報をtagごとにパースする
note right: [[https://tex2e.github.io/rfc-translater/html/rfc8216.html#4-3--Playlist-Tags]]\n先頭#がPlayListTagでそれ以外はMediaSegment

loop ダウンロードできる形式なのかtagを順にvalidation実行する
    client --> client: validation

    alt EXTM3U success
        client --> client: skip
    else 一行目にEXTM3Uが記述されていない error
        client --> user: エラー表示
    end alt

    alt EXT-X-VERSION success
        client --> client: skip
    else VERSIONが複数存在する error
        client --> user: エラー表示
    else 特定バージョン以外 error
        client --> user: エラー表示
        note right: バージョンは3が最新か確認する
    end alt

    alt EXT-X-KEY success
        client --> client: skip
    else 指定がある error
        client --> user: エラー表示
        note right: 暗号化されている場合はエラーとする
    end alt

    alt EXT-X-PLAYLIST-TYPE success
        client --> client: skip
    else 指定がVOD以外
        client --> user: エラー表示
        note right: EVENTは多分ライブ配信
    end alt

    alt EXT-X-ENDLIST success
        client --> client: skip
    else ENDLISTがない
        client --> user: エラー表示
        note right: 何かが原因でENDLISTがない状況はありえる。再取得が必要だがどういう状況なのかあまり想定できないため一旦エラーとする
    end alt
end

loop MediaSegmentを順にダウンロードする
    alt success
        client -> server++: MediaSegmentのURLを元にリクエストする
        server --> client--: normally response
        client -> client: 配列の形式で格納し保持する
    else statusCode 429 error
        client -> server++: MediaSegmentのURLを元にリクエストする
        server --> client--: 429 error response
        client -> client: error counterをincrement
        alt counterが5件以下
            client -> client: 再取得
        else 5件以上
            client --> user: エラー表示
        end alt
    else それ以外のエラー
        client -> server++: MediaSegmentのURLを元にリクエストする
        server --> client--: error response
        client --> user: エラー表示
    end alt
end

client -> client: 配列形式のバイナリデータを使ってBlobオブジェクトを作成する
client -> client: ダウンロード用URLを作成しダウンロードを実行する
client -> client: Blobオブジェクトを開放する

client --> user: 完了画面を表示する

deactivate

@enduml