import './style.less'

export default ({ sending }) => {
  return (
    <div className='sending_wrap'>
      <div className='sending_body'>
        {sending
          ? <div className='sending'>
            <img className='plane' src={_config.urls.static + 'paper_plane.svg'} />
            <p>{_config.translations[_config.data.lang].sign_up.send_popup.sending}</p>
          </div>
          : <div className='success'>
            <div className='outer_circle'>
              <img className='mark_modal' src={_config.urls.static + 'send_success.svg'} />
            </div>
            <p>{_config.translations[_config.data.lang].sign_up.send_popup.success}</p>
          </div>}
      </div>
    </div>
  )
}
