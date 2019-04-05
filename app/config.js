var _config = {}

_config.data = {isRTL: false}

_config.urls = {
  check_login: '/check-login',
  static: './media/',

  // api
  recaptcha_post: 'http://atzma.im/recaptcha.php?token={token}'
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
  forgot_path: '/forgot'
}

_config.translations = {
  sign_in: {
    title: 'Atzmaim',
    login_google: 'Log in with google',
    login_or: 'or',
    enter_email: 'enter your email',
    enter_password: 'enter your password',
    login: 'Login',
    forgot_password: 'Forgot your password?',
    dont_have_acc: 'Don’t have an account?',
    sign_up: 'Sign Up',
    missing_email: 'Missing email',
    missing_password: 'Missing password',
    wrong_email: 'Wrong email try again!',
    enter_email_pass: 'Enter email and password',
    password_short: 'password is too short',
    // new
    error_incorrect: 'Your e-mail or password is incorrect'
  },
  forgot: {
    forgot_pass: 'Forgot your password?',
    no_problem: 'No problem, our support team will call you back as soon as possible.',
    business_name: 'Business name',
    phone_number: 'Phone number',
    send: 'send',
    received_request: 'We received your request',
    call_you_back: 'we will call you back as soon as possible',
    got_it: 'got it',
    call_you_back_possible: 'We received your request, we will call you back as soon as possible',
    atzma_im: 'Atzma.im',
    atzma_phone: '+972549793976'
  }
}
