let pre_url = "http://h5.mmarket.com/mssp_ppsh5/";
let pre_url2 = "http://h5.mmarket.com/pps_webh5/";
let dev = 0;
let activity_id = '191224004';//生产环境活动id
if (
    window.location.host.search("120.197") > -1 ||
    window.location.host.search("yxb.com") > -1 ||
    window.location.host.search("8080") > -1 ||
    window.location.host.search("47.107") > -1
) {
    pre_url = "http://47.107.125.18/mssp_pps/";
    // pre_url2 = "http://47.107.125.18/pps_web/";
    pre_url2 = "http://47.107.125.18/pps_web/";
    dev = 1;
    activity_id:'191224004'
} else {
    pre_url = "http://h5.mmarket.com/mssp_ppsh5/";
    pre_url2 = "http://h5.mmarket.com/pps_webh5/";
    dev = 0;
    activity_id:'191224004'
}
;

const URL = {
    dev: dev,
    activity_id:activity_id,
    // getVerifyCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.getVerifyCode',   //获取图像验证码
    // sendCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.sendcode',
    // accountVerifyCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.VerifyCode_MM',  //短信码校验
    // accountLogin:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.login'  //登录


    mm_key:'8055467adaf5482a864a834df35dce32',
    bibei_key:'891d903c561842069c9cae73f0312f97',
    baipai_key:'8d36753db555446ab11836de09bc04a2',
    other_key:'0800ada2b3e445c58447347aadff4c0b',
    backup_key:'c24176d98169465ab35d8c1a946b0aca',
    get_bill: pre_url + "activityCommon/yearBill.do",
    getphone1_src: pre_url2 + "getphone1/dist/index.html?pid=2001&type=3"
};

export default URL;
