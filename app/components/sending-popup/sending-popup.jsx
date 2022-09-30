import React from "react";
import { modalTypes } from "../../utils/constants";
import "./sending-popup.less";

const SendingPopup = ({
  type,
  isActivePopup,
  label,
  renderOwnLabel,
  className = "",
  style = {},
}) => (
  <div
    className={`sending_popup${
      isActivePopup ? " hide-background" : ""
    } ${className}`}
    style={style}
  >
    <div className={`sending_body${isActivePopup ? " hide-body" : ""}`}>
      {type === modalTypes.pending ? (
        <div className="sending">
          <img
            className="plane"
            src={`${_config.urls.static}ic_paper_plane.svg`}
            alt="sending"
          />
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : type !== modalTypes.error ? (
        <div className="success">
          <div className="outer_circle">
            <img
              className="mark_modal"
              src={`${_config.urls.static}ic_send_success.svg`}
              alt="success"
            />
          </div>
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : (
        <div className="conflict">
          <div className="wrap_outer circle">
            <div className="wrap_inner circle">
              <div className="wrap_center circle">
                <img src={`${_config.urls.static}ic_error.svg`} alt="error" />
              </div>
            </div>
          </div>
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      )}
    </div>
  </div>
);

export default SendingPopup;
