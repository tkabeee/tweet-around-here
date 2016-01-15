var keyMirror = require("keymirror");

module.exports = keyMirror({
  // 各設定値を定義

  // 検索クエリ
  INIT_QUERY: '',

  // 緯度
  INIT_LAT: '35.689488',

  // 経度
  INIT_LNG: '139.691706',

  // 距離
  INIT_WITHIN: 20,

  // 検索数
  INIT_RPP: 20,

  // ズーム値
  INIT_ZOOM: 10,

  // 地図サークル距離範囲
  DISTANCE: [2, 5, 10, 20, 30, 40, 50, 100],

  // twitter検索時の距離単位
  UNITS: 'km'

});