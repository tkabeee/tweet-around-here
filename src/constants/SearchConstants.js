export default {
  // 各設定値を定義

  // 検索クエリ
  INIT_QUERY: "",

  // 緯度
  INIT_LAT: 35.689488,

  // 経度
  INIT_LNG: 139.691706,

  // サークル距離
  INIT_WITHIN: 20,

  // 検索数
  // up to a maximum of 100. Defaults to 15.
  INIT_RPP: 30,

  // ズーム値
  INIT_ZOOM: 9,

  // twitter検索時の距離単位
  UNITS: "km",

  // サークルレンジの最小・最大値
  MIN_CIRCLE_RANGE: 2,
  MAX_CIRCLE_RANGE: 300,

  // twitter検索用API
  REQUEST_URL: "https://twttr-rest.herokuapp.com/search.php",

};