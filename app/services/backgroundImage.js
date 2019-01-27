const backgroundImage = imgName => {
  return `url(${_config.urls.static}${imgName}) no-repeat ${window._config.data.isRTL ? '93% 50%' : '7% 50%'}`
}
export default backgroundImage
