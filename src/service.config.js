if (location.host.search('hf.mmarket') > -1) {
    var test = 1;
    var pre_url = 'http://hf.mmarket.com/'
} else if (location.host.search('www.hfshop') > -1) {
    var test = 0;
    var pre_url = 'http://www.hfshop.com/'
} else {
    var test = 0;
    var pre_url = 'http://47.107.125.18/hfshop/'
}
;

const URL = {
    test:test,
    getVerifyCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.getVerifyCode',   //获取图像验证码
    sendCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.sendcode',
    accountVerifyCode:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.VerifyCode_MM',  //短信码校验
    accountLogin:pre_url+'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=account.login'  //登录
};

export default URL;