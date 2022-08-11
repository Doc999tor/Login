import React from 'react';
import { modalTypes } from '../../utils/constants';
import './status_block.less';

const StatusBlock = ({
  type,
  isActive,
  label,
  renderOwnLabel,
  className = '',
  style = {},
}) => (
  <div className={`status_block-wrap ${className}`} style={style}>
    <div className={`status_block_body${isActive ? ' hide-body' : ''}`}>
      {type === modalTypes.pending ? (
        <div className='status_block_sending'>
          <img
            className='status_block_plane'
            src={`${_config.urls.static}ic_paper_plane.svg`}
            alt='sending'
          />
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : type !== modalTypes.error ? (
        <div className='status_block_success'>
          <div className='status_block_outer_circle'>
            <img
              className='mark_modal'
              src={`${_config.urls.static}ic_send_success.svg`}
              alt='success'
            />
          </div>
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      ) : (
        <div className='status_block_conflict'>
          <div className='wrap_outer circle'>
            <div className='wrap_inner circle'>
              <div className='wrap_center circle'>
                <img src={`${_config.urls.static}ic_error.svg`} alt='error' />
              </div>
            </div>
          </div>
          {renderOwnLabel ? renderOwnLabel() : <p>{label}</p>}
        </div>
      )}
    </div>
  </div>
);

export default StatusBlock;
