export default function(url, location){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    location.appendChild(scriptTag);
};
