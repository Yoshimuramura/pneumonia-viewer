import "./aiJudge.css";

type postModalPorps = { show: boolean };
type successModalPorps = {
  show: boolean;
  SetSuccessmodalShow: (showjudge: boolean) => void;
};
type errorModalPorps = {
  show: boolean;
  SetErrormodalShow: (showjudge: boolean) => void;
  error: string;
};

export function PostModal(props: postModalPorps) {
  if (props.show) {
    return (
      <div className="overlay">
        <div className="modalContent">
          <h2>AIが読影しています。</h2>
          <p>この作業には数分かかることがあります。</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export function SuccessModal(props: successModalPorps) {
  if (props.show) {
    return (
      <div className="overlay">
        <div className="modalContent">
          <h2>読影作業が終了しました。</h2>
          <p>
            ※結果を表示するには、ビューアーを
            <span style={{ color: "red" }}>クリック</span>
            します。 クリックしてもボックスが表示されない場合は、
            肺炎が検知されていないことを表します。
          </p>
          <button onClick={() => props.SetSuccessmodalShow(false)}>
            Close
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export function ErrorModal(props: errorModalPorps) {
  if (props.show) {
    return (
      <div className="overlay">
        <div className="modalContent">
          <h2>読影作業に失敗しました。</h2>
          <p>エラー:{props.error}</p>
          <button onClick={() => props.SetErrormodalShow(false)}>Close</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
