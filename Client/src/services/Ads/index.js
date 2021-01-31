import http from "../../http-common";
  
  //Get Users Operating system
  const getOs = () => {
      let os = "Unknown OS"
      // Check For Windows
      if (navigator.appVersion.indexOf("Win") !=- 1) os = "Windows";
      // Check for Mac
      if (navigator.appVersion.indexOf("Mac") !=- 1) os = "MacOS";
      // Check for UNIX
      if (navigator.appVersion.indexOf("X11") !=- 1) os = "UNIX";
      // Check for Linux
      if (navigator.appVersion.indexOf("Linux") !=- 1) os = "Linux";

      return os
  }

  const getBrowser = () => {
      let browser = 'Unknown'
      // CHROME
      if (navigator.userAgent.indexOf("Chrome") != -1 ) browser = "Chrome"
      // FIREFOX
      else if (navigator.userAgent.indexOf("Firefox") != -1 ) browser = "Mozilla Firefox"

      // INTERNET EXPLORER
      else if (navigator.userAgent.indexOf("MSIE") != -1 ) browser = "Internet Exploder"
      // EDGE
      else if (navigator.userAgent.indexOf("Edge") != -1 ) browser = "Edge"
      // SAFARI
      else if (navigator.userAgent.indexOf("Safari") != -1 ) browser = "Safari"
      // OPERA
      else if (navigator.userAgent.indexOf("Opera") != -1 ) browser = "Opera"
      // YANDEX BROWSER
      else if (navigator.userAgent.indexOf("YaBrowser") != -1 ) browser = "YaBrowser"

      return browser
  }
const getAll = (coords) => {
  console.log(coords)
  let os = getOs()
  let browser = getBrowser() 
  return http.get(`/all?lat=${coords.lat}&long=${coords.lng}&os=${os}&browser=${browser}&tag=travel&tag=europe&tag=food`);
};

const getBestAd = (coords) => {
  console.log('getting ad')
  let os = getOs()
  let browser = getBrowser() 
  return http.get(`/best?lat=${coords.lat}&long=${coords.lng}&os=${os}&browser=${browser}&tag=travel&tag=europe&tag=food`);
};

const create = data => {
  return http.post("/ads", data);
};

const update = (id, data) => {
  return http.put(`/ads/${id}`, data);
};

const remove = id => {
  return http.delete(`/ads/${id}`);
};

const removeAll = () => {
  return http.delete(`/ads`);
};

const findByTitle = title => {
  return http.get(`/ads?title=${title}`);
};

export default {
  getAll,
  getBestAd,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};