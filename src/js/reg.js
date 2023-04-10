/**
 * 一些正则使用
 */

/**
 * 解析url的query
 * https://conan-india.cretaclass.com/webapp/conan-webapp-lesson-purchase-in/latest/index.html?hideNavigation=true&isFullScreen=true&isWebApp=true#/universal-lesson/340?web_keyfrom=app-notice-w2d2
 */
const parseUrl = (
  url = `https://conan-india.cretaclass.com/webapp/conan-webapp-lesson-purchase-in/latest/index.html?hideNavigation=true&isFullScreen=true&isWebApp=true#/universal-lesson/340?web_keyfrom=app-notice-w2d2`
) => {
  const query = {};
  const match = url.match(/\?[^#.]+/g);
  if (match && match.length) {
    const withdrawQuery = (str = "") => {
      const q = {};
      str.replace(/([^?=&]+)=([^?=&]+)/g, (_, key, value) => {
        q[key] = value;
        return _;
      });
      return q;
    };
    match.forEach((str) => {
      Object.assign(query, {
        ...withdrawQuery(str),
      });
    });
  }
  console.log(query);
  return query;
};
parseUrl();
/**
 * css 压缩
 */
let str = `.share-name {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #000000;
  text-align: center;
}
.share-img-area {
  box-sizing:    border-box;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  transition: opacity linear 0.2s;
}`;
console.log(
  str.replace(/(:|;|{|})\s{0,}/g, (...args) => {
    return args[0].replace(/\s|\\n/g, "");
  })
);
