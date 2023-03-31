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
}`
console.log(str.replace(/(:|;|{|})\s{0,}/g, (...args) => {
  console.log(args);
  return args[0].replace(/\s|\\n/g, '')
}))