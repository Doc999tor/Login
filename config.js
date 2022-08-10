const _config = {}

_config.data = { isRTL: false }

_config.urls = {
  check_login: '/check-login',
  sign_up: '/signup',
  login: '/login',
  static: './media/',
  contact_us: '/contact_us',
  home: '/en/home',
  reset_password: '/reset_password',
  // api
  recaptcha_post: 'http://atzma.im/recaptcha.php?token={token}',
}
_config.keys = {
  recaptcha_v3: '6LcXaJsUAAAAABggIFrA5GbeAX0T7RgnK6tohhqn',
  recaptcha_v2: '6LcA3JwUAAAAAN0i_W6QTvoo9FW-9ectGBzB8zyf'
}

_config.routing = {
  // ?error=incorrect
  url_params: {
    error: 'error',
    values: {
      incorrect: 'incorrect'
    }
  },
  sign_in_path: '/',
  forgot_path: '/reset-password',
}

_config.translations = {
  log_in: {
    log_in: 'Log In',
    main_title: 'Welcome Back!',
    subtitle: 'Don’t have an account?',
    sign_up_link_label: 'Sign Up',
    email_placeholder: 'Email address',
    password_placeholder: 'Password',
    forgot_password_label: 'Forgot your password?',
    log_in_btn_label: 'log in',
    contact_us_link_label: 'Need a help?',
    incorrect_credentials: 'Your email or password is\nincorrect, check it and try again',
    reset_password: 'Reset Password',
    reset_password_subtitle: 'Enter your email address to receive a link to set a new password'

    // login_google: 'Log in with google',
    // login_or: 'or',
    // enter_email: 'enter your email',
    // enter_password: 'enter your password',
    // login: 'Login',
    // dont_have_acc: 'Don’t have an account?',
    // missing_email: 'Missing email',
    // missing_password: 'Missing password',
    // wrong_email: 'Wrong email try again!',
    // enter_email_pass: 'Enter email and password',
    // password_short: 'password is too short',
    // // new
    // error_incorrect: 'Your e-mail or password is incorrect'
  },
  forgot: {
    forgot_pass: 'Forgot your password?',
    no_problem: 'No problem, our support team will call you back as soon as possible.',
    business_name: 'Business name',
    phone_number: 'Phone number',
    send: 'send',
    support: 'support',
    received_request: 'We received your request',
    call_you_back: 'we will call you back as soon as possible',
    got_it: 'got it',
    call_you_back_possible: 'We received your request, we will call you back as soon as possible',
    atzma_im: 'Atzma.im',
    dont_want_reset_pwd: 'Don’t want to reset password?',
    atzma_phone: '+972549793976',
    goto: 'Go to'
  },
  popup: {
    success_title: 'Message has been sent, please check your inbox',
    success_subtitle: 'If you didn\'t get this email, please check for it in spam',
    error_title: 'We didn\'t find this email in our records, please check it and try again',
    pending_title: 'Sending'
  }
}
