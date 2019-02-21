import React, {Component} from 'react'
import {backgroundImage} from 'services'
import GotIt from './components/got-it/got-it.jsx'

import './forgot.less'

class Forgot extends Component {
  state = {
    isGotIt: false
  }
  render () {
    return (
      <div className='forgot'>
        {!this.state.isGotIt && <div className='forgot-wrap'>
          <div className='forgot-close'>
            <div className='forgot-close-wrap' onClick={() => this.props.history.push(_config.routing.sing_in_path)}>
              <span className='forgot-close__x rounded thick' />
            </div>
          </div>
          <div className='forgot-wrap'>
            <img className='forgot-htm__logo' src={_config.urls.static + 'forgot.svg'} />
            <form action={_config.translations.check_login} method='POST'>
              <div className='forgot-wrap-wrap'>
                <div className='forgot-form__text'>{_config.translations.forgot.forgot_pass}</div>
                <span className='forgot-form__forgot'>{_config.translations.forgot.no_problem}</span>
              </div>
              <div>
                <div className='group business-name'>
                  <input type='text'
                    style={{background: backgroundImage('bussines-name.svg')}}
                    name='businessname'
                    className='group__input email'
                    placeholder={_config.translations.forgot.business_name}
                    autoComplete='businessname' />
                </div>
                <div className='group phone'>
                  <input type='text'
                    style={{background: backgroundImage('phone-call.svg')}}
                    name='phone'
                    className='group__input phone'
                    placeholder={_config.translations.forgot.phone_number}
                    pattern='^[^a-zA-Z]+$'
                    autoComplete='phone' />
                </div>
                <button type='button' className='forgot-form__button forgot-button' onClick={() => this.setState({isGotIt: true})}>
                  {_config.translations.forgot.send}
                  <img className='forgot-form__button--img' src={_config.urls.static + 'paper-plane.svg'} />
                </button>
              </div>
            </form>
          </div>
        </div>}
        <div className={`got-it-wrap ${this.state.isGotIt ? 'show' : 'hide'}`}>
          <GotIt />
        </div>
      </div>
    )
  }
}

export default Forgot
