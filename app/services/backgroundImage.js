const backgroundImage = imgName => {
  return `url(${_config.urls.static}${imgName}) no-repeat ${window._config.data.isRTL ? 'right 1rem center' : 'left 1rem center'}`
}
export default backgroundImage
