import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

let container = null;
function getContainer() {
  if (container !== null) return container;

  container = document.createElement("div");
  container.id = "dialogs";
}

function Dialogs(props) {
  const {
    message,
    cancelText = "取消",
    confirmText = "确认",
    onCancel,
    onConfirm,
  } = props;

  const container = getContainer();
  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  const Element = (
    <Wrap>
      <div className="message">
        <p className="text">{message}</p>
        <div className="control">
          <span className="cancel" onClick={onCancel}>
            {cancelText}
          </span>
          <span className="confirm" onClick={onConfirm}>
            {confirmText}
          </span>
        </div>
      </div>
    </Wrap>
  );

  return createPortal(Element, getContainer());
}

export default Dialogs;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);

  .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 110px;
    border-radius: 8px;
    background: #383f49;

    .text {
      font-size: 14px;
      color: #878d92;
      padding: 20px;
    }

    .control {
      font-size: 14px;
      color: #8793ab;
      text-align: right;
      padding: 10px 10px;

      span {
        padding: 10px 30px;
      }
    }
  }
`;
