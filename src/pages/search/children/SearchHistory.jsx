import { useState, useCallback } from "react";
import styled from "styled-components";

import { Dialogs } from "@/common";

function SearchHistory(props) {
  const { records } = props;
  const [deleting, setDeleting] = useState(false);
  const [showDialogs, setShowDialogs] = useState(false);

  const hideDialogs = useCallback(() => setShowDialogs(false), []);
  const handleConfirm = () => {
    //todo 清空历史记录
    hideDialogs();
  };

  const deleteSingleRecord = () => {
    //todo 删除单条记录
  };

  const Icon = (
    <div
      className="icon"
      onClick={() => {
        setDeleting(true);
      }}
    >
      <span className="iconfont">&#xe613;</span>
    </div>
  );
  const Control = (
    <div className="control">
      <span className="clear" onClick={() => setShowDialogs(true)}>
        全部删除
      </span>
      <span className="line">|</span>
      <span className="complete" onClick={() => setDeleting(false)}>
        完成
      </span>
    </div>
  );

  return (
    <Wrap>
      <div className="header">
        <h2 className="title">搜索历史</h2>
        {!deleting ? Icon : Control}
      </div>
      <ul className="records">
        {records?.map(record => (
          <li className="record" key={record}>
            <p className="text text-nowrap">
              <span className="keyword">{record}</span>
              {deleting && (
                <span className="iconfont" onClick={deleteSingleRecord}>
                  &#xe601;
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
      {showDialogs && (
        <Dialogs
          massage="是否清空所有搜索历史"
          onCancel={hideDialogs}
          onConfirm={handleConfirm}
        />
      )}
    </Wrap>
  );
}

export default SearchHistory;

const Wrap = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 16px;
      padding: 6px 0;
    }

    .icon {
      min-width: 40px;
      text-align: right;
      padding: 6px 0;
    }
    .control {
      min-width: 40px;
      font-size: 14px;

      .line {
        padding: 5px 10px;
      }

      .clear,
      .complete {
        padding: 5px 5px;
      }

      .complete {
        color: var(--theme-color);
      }
    }
  }

  .records {
    display: flex;
    flex-wrap: wrap;

    .record {
      border-radius: 15px;
      margin: 5px;
      background: rgba(59, 67, 76, 0.6);

      .text {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .keyword {
        padding: 5px 10px;
      }

      .iconfont {
        position: relative;
        width: 20px;
        font-size: 20px;
        transform: scale(1);
        text-align: center;
        line-height: 100%;
        padding: 3px 12px 3px 5px;

        &:before {
          position: absolute;
          content: "";
          width: 1px;
          height: 8px;
          top: 50%;
          left: 0;
          border-radius: 1px;
          transform: translateY(-50%);
          background-color: #ccc;
        }
      }
    }
  }
`;
