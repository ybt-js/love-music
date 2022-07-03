import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteSearchRecords, clearSearchRecords } from "@/redux/slice";
import { Dialogs } from "@/components";

function SearchHistory(props) {
  const { records, triggerSearch } = props;
  const [deleting, setDeleting] = useState(false);
  const [showDialogs, setShowDialogs] = useState(false);

  const hideDialogs = useCallback(() => setShowDialogs(false), []);
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(clearSearchRecords());
    hideDialogs();
  };

  const handleRecordClick = record => {
    if (deleting) {
      dispatch(deleteSearchRecords(record));
    } else {
      triggerSearch(record);
    }
  };

  return (
    <StyleWrap>
      <div className="header">
        <h2 className="title">搜索历史</h2>
        {!deleting ? (
          <div className="icon" onClick={() => setDeleting(true)}>
            <span className="iconfont">&#xe613;</span>
          </div>
        ) : (
          <div className="control">
            <span className="clear" onClick={() => setShowDialogs(true)}>
              全部删除
            </span>
            <span className="line">|</span>
            <span className="complete" onClick={() => setDeleting(false)}>
              完成
            </span>
          </div>
        )}
      </div>
      <ul className="records">
        {records?.map(record => (
          <li className="record" key={record}>
            <p
              className="text text-nowrap"
              onClick={() => handleRecordClick(record)}
            >
              <span className="keyword">{record}</span>
              {deleting && <span className="iconfont">&#xe601;</span>}
            </p>
          </li>
        ))}
      </ul>
      {showDialogs && (
        <Dialogs
          message="是否清空所有搜索历史？"
          onCancel={hideDialogs}
          onConfirm={handleConfirm}
        />
      )}
    </StyleWrap>
  );
}

export default SearchHistory;

const StyleWrap = styled.div`
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
