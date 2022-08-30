export const getParam = (parameterName) => {
  let tmp = [];
  let result = null;
  window.location.search
    .substring(1)
    .split('&')
    .forEach((item) => {
      tmp = item.split('=');
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });

  return result;
};

export const getPathname = (page, id = null) => {
  let pathname = '/';
  if (page === 'change-password' && id) {
    pathname = `${_config.routing.change_password_path}?rid=${id}`;
  }
  if (page === 'reset-password') {
    pathname = _config.routing.forgot_path;
  }
  if (page === 'change-password-expired') {
    pathname = _config.routing.expired_path;
  }

  return pathname;
};
