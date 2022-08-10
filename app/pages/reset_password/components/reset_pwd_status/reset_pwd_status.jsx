import React from "react";
import { modalTypes } from "../../../../utils/constants";
import "./reset_pwd_status.less";

const ResetPasswordStatus = ({
  type,
  isActive,
  label,
  renderOwnLabel,
  className = "",
  style = {},
}) => (
  <div className={`reset-password-wrap ${className}`} style={style}>
    <div className={`rst_pwd_status_body${isActive ? " hide-body" : ""}`}>
      {type === modalTypes.pending ? (
        <div className="rs_pwd_sending">
          <img
            className="rs_pwd_plane"
            src={`${_config.urls.static}ic_paper_plane.svg`}
            alt="sending"
          />
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : type !== modalTypes.error ? (
        <div className="rs_pwd_success">
          <div className="rs_pwd_outer_circle">
            <img
              className="mark_modal"
              src={`${_config.urls.static}ic_send_success.svg`}
              alt="success"
            />
          </div>
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : (
        <div className="rs_pwd_conflict">
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

export default ResetPasswordStatus;
