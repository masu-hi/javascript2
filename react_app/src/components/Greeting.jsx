// src/components/Greeting.jsx
//exportしている、関数宣言（大文字なのでコンポーネント使う）引数持ち
//コンポーネントの引数propという。{}で囲みます。※ルール
export default function Greeting({ name }) {
    return <p>こんにちは、{name}さん！</p>;
}
