import React, {Component} from 'react'
import './got-it.less'

class GotIt extends Component {
  render () {
    return (
      <div className='got-it'>
        <div className='got-it-wrap'>
          <img className='got-it-htm__logo' src={_config.urls.static + 'got-it-backround.svg'} />
          <form action={_config.translations.check_login} method='POST'>
            <div className='got-it-form__text'>{_config.translations.forgot.call_you_back_possible}</div>
            <div className='got-it-form-wrap'>
              <span className='got-it-form-wrap__text'>{_config.translations.forgot.atzma_im}</span>
              <span className='got-it-form-wrap__text'>{_config.translations.forgot.atzma_phone}</span>
            </div>
            <button type='button' className='got-it-form__button got-it-button'>
              {_config.translations.forgot.got_it}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default GotIt
