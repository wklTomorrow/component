import '../css/index.css'
// 将css一并打包至js中
const a = "ssssa111";

console.log(a.replace(/\d/g, ""));

const b =
  "Mozilla/5.0 (Linux; Android 12; IV2201 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/109.0.5414.117 Mobile Safari/537.36 Zebra/1.27.1 Android Zebra YuanTiKu ZBSupplier/OnePlus ZBModel/IV2201 /1.27.1 Webapp_1 productId/2412 isYFDPad/false language/en defaultLanguage/en courseLanguage/en country/IN timezone/GMT+05:30";
const test = b.match(/biz_region\/([a-zA-Z]+)/);
console.log(test);


function init() {
  const dom = document.getElementById('main')
  console.log(dom)
  dom.innerText = 'hello world'
  dom.className = 'title'
}

init()
