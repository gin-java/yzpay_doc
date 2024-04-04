const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const qs = require('qs');

const botToken = '6552612518:AAFOEO3OPklIganMVTccZuGTBEWZPbDxCuQ';
const cheerio = require('cheerio');
const bot = new TelegramBot(botToken, { polling: true });
const axios = require('axios');
const redis = require("redis");
const rest = require('restler');
const secret = 'SMTDMVS3BCD325KTIP4NZ6LWNL2VTJ6G';
const speakeasy = require('speakeasy');
// 文件路径
const filePath = 'bind.txt';
let client = redis.createClient("6379", "52.193.192.139", { auth_pass: "ZXChjk12345$@%", no_ready_check: true });

let glToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiU01URE1WUzNCQ0QzMjVLVElQNE5aNkxXTkwyVlRKNkciLCJpZCI6MjIsImlzUmVmcmVzaCI6ZmFsc2UsImp3dFZlcnNpb24iOiIxLjAiLCJsaW1pdF9pcCI6IiIsImxvZ2luSXAiOiI1NC4xNzkuMjIwLjk4IiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.B2yCIp_rMHf-CnDRIXRqiwPPNkyK9_rhs6TnjGhEfLA';
// 监听连接错误
client.on("error", function (error) {
    console.error(3333);
    console.error(error);
});
let token = "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IjdYclVocVN3dFN0Y1M4Y3JXNlIxcHc9PSIsInZhbHVlIjoid0dWY3EyRlRPZzM3NzVtNVlFYlJHVDYrb205V1hIcFJFNGh1Rm9Ndi9GbEF2R3c1NmFZZ1l1QVV4M1JzS0RmaUlSRk5TcUpuck9rN0FiaDJ5NEV2cVdQNVNoK1NoeVRnTTY5ZnFhaXB1bVBGaUpRMUtscTN5MldFUHRNYStWT1BQYmJZRnp2YkRjNTJnbzRjNmVzYk92WldmdWxTbVBocmJ5ZWNIL1ZwQnFxSXdyUUVYTElPSHNFNTh1ZEZ2MnVlUzVaOHA3TmtaZDlmTGNaZjg3UEx1ejhEZ3hFNWVsT1phdWZYMjNOQ0JjRT0iLCJtYWMiOiJkY2Y5Nzc4NTVlZDk1MzQ0NDk5MmQ0YjVjOGIzNzEyZDRmODI0YmMyY2JkMWM0ZjBjYmE2ODNhNmI5MzM3OTMyIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6Imk0VC9GdExEYTg3aTZXQ0h1SkQ0RWc9PSIsInZhbHVlIjoielZiMjZENWhWVGRjS1pEUWJ6TXRiR1FmaUNDeEVrQ1hGZjU1TXVHUGRSMGtKbUFaVXpTTG1hbDBwSS9IWmxFaFgwc2JDaWx5U3JOc1V3eGJUZVcrM1ZHMGc5dFdadEVaNi9QS3UzYkxHeXl0VUdadDIzUnArb0JoVDNiclAzQkYiLCJtYWMiOiJjMDc0ZjQ5NjdiZmNlZDBhZmEzYjMxN2FkMTQ2YTUwNzA3ZWIyYzBkYTIxNmVhMjhiZjllMzBjMTVlNTJhNGEyIiwidGFnIjoiIn0%3D; _session=eyJpdiI6Ilo3aU1ZbTdpcHdPd0hoRytwNS8vRFE9PSIsInZhbHVlIjoiVGRsaGFPa2k2ZWdhcXVDRUpFNnVNcjJFWGp6M21JN2RCLzBHTXdURkNuTUo5aFJHaU1FM2EvSENJcGtJK0hFQTlTNEl4TnhScEhzK0hEZ2pwbEZ5TytZREx4M1VRV3VPMkNmVUMxZE9RekduWVhocU05bkREMWVZbUhWc3pRbW8iLCJtYWMiOiJiMzg5MWIyMzgyYTIzZjYwM2FiNDFjNzIwZGNiZGNlMWZlMzY2YmI2NTYyNmUxMGY4OTlmOGVlYzlhM2Y4YmJhIiwidGFnIjoiIn0%3D";
let csrfToken = "Tfm9NvoDHMpGClAl3ZcQqIaTqazTv4FmHM6tV0xr";
let jsession = "";
let realOrder = "";
// bot.onText(/\/test/, function onLoveText(msg) {
//     bot.sendMessage(msg.chat.id, '收到?');
// });
//出现BUG不会强行退出
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

// 添加请求拦截器
// axios.interceptors.request.use((config) => {
//     // 在发送请求之前输出请求参数
//     console.log('请求参数:', config);
//
//     // 如果需要修改请求参数，可以在这里进行修改
//
//     return config;
// }, (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
async function reLogin(msg, callBack) {
    //global登录
    // console.log("开始全球登录");
    // let data = 'merusername=d207gc&username=jishu&password=123456&captcha=';
    // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    // let config = {
    //     httpsAgent: httpsAgent,
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://merchant.globalpay.top/Service/Login.ashx',
    //     headers: {
    //         'Accept': 'application/json, text/javascript, */*; q=0.01',
    //         'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    //         'Connection': 'keep-alive',
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         'Cookie': 'ASP.NET_SessionId=vmqpg4asrqwcckmqx2qgmu0x',
    //         'Origin': 'https://merchant.globalpay.top',
    //         'Referer': 'https://merchant.globalpay.top/Login.html',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Site': 'same-origin',
    //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    //         'X-Requested-With': 'XMLHttpRquest',
    //         'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"'
    //     },
    //     data : data
    // };
    //
    // axios.request(config)
    //     .then((response) => {
    //         console.log("全球登录成功");
    //     })
    //     .catch((error) => {
    //         console.log("全球登录报错");
    //         console.log(error);
    //     });
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


    //获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 3600 * 1000 * 24);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    //接受所有消息回调函数
    chatId = msg.chat.id
    var arr = msg.text.toString().split(" ");
    if (msg.text.toString().indexOf(" 设置token") !== -1) {
        token = msg.text.toString().split(" 设置token")[0].split("/")[0];
        csrfToken = msg.text.toString().split(" 设置token")[0].split("/")[1];
        bot.sendMessage(msg.chat.id, "设置成功");
    }
    // console.log(arr);
    var isLogin = true;
    var arr1 = arr[0].split("/");
    if (arr1.length === 2) {
        //先判断是否登录
        await axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr1[0], {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
            })
            .catch(err => {
                console.log('Error: ', err.message);
                if (err.response.data.message === "Unauthenticated.") {
                    // bot.sendMessage(msg.chat.id, "需要重新登录");
                    console.log(arr1);
                    isLogin = false;
                }
            });
        if (!isLogin) {
            console.log("开始登陆")


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://yuzhou.pubz.fyi/login',
                headers: {
                    'authority': 'yuzhou.pubz.fyi',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'cache-control': 'max-age=0',
                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            };

            axios.request(config)
                .then((response) => {
                    const html = response.data;
                    // 使用cheerio加载HTML
                    const $ = cheerio.load(html);

                    // 根据name属性查找input元素的值
                    const loginToken = $('[name="_token"]').val();
                    // console.log('Username Value:', loginToken);
                    const headers = response.headers;

                    // 获取特定的响应头信息
                    let cookies = headers['set-cookie'];
                    let cookie = cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                    // const cookie = cookies[0].split(";")[0];
                    // console.log('cookie :', cookie);
                    axios.post('https://yuzhou.pubz.fyi/login', {
                        //参数列表
                        '_token': loginToken,
                        'name': 'jishu',
                        'password': 'aa123456',
                        'remember': 'on'
                    }, {
                        maxRedirects: 0,
                        headers: {
                            'authority': 'yuzhou.pubz.fyi',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'zh-CN,zh;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'cookie': cookie,
                            'origin': 'https://yuzhou.pubz.fyi',
                            'referer': 'https://yuzhou.pubz.fyi/login',
                            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                        }
                    })
                        .then((response) => {

                            // console.log(response);
                            // console.log(response.data.response.headers);
                        })
                        .catch((error) => {
                            // console.log(error.response.headers['set-cookie']);
                            cookies = error.response.headers['set-cookie'];
                            // console.log(cookies);
                            cookie = cookies[2].split(";")[0] + "; " + cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                            token = cookie;
                            console.log("设置token：" + token);
                            let config = {
                                method: 'get',
                                maxBodyLength: Infinity,
                                url: 'https://yuzhou.pubz.fyi/dashBoard',
                                headers: {
                                    'authority': 'yuzhou.pubz.fyi',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                                    'accept-language': 'zh-CN,zh;q=0.9',
                                    'cache-control': 'max-age=0',
                                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'same-origin',
                                    'sec-fetch-user': '?1',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                                    'Cookie': cookie
                                }
                            };
                            axios.request(config)
                                .then((response) => {
                                    const html = response.data;
                                    // console.log(html);
                                    // 使用cheerio加载HTML
                                    const $ = cheerio.load(html);

                                    // 根据name属性查找input元素的值
                                    const tokenValue = $('meta[name="csrf-token"]').attr('content');
                                    csrfToken = tokenValue;
                                    console.log(1);
                                    callBack(msg, doBusiness);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

        } else {
            console.log(2);
            await callBack(msg, doBusiness);
        }

    } else {

        await axios.get('https://yuzhou.pubz.fyi/order/orderDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&form_query[m_id]=' + arr1[0], {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
            })
            .catch(err => {
                console.log('Error: ', err.message);
                if (err.response.data.message === "Unauthenticated.") {
                    // bot.sendMessage(msg.chat.id, "需要重新登录");
                    console.log("arr1:" + arr1);
                    isLogin = false;
                    console.log("1:" + isLogin);
                }
            });
        console.log("2:" + isLogin);
        if (!isLogin) {
            console.log("开始登陆")


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://yuzhou.pubz.fyi/login',
                headers: {
                    'authority': 'yuzhou.pubz.fyi',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'cache-control': 'max-age=0',
                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            };

            axios.request(config)
                .then((response) => {
                    const html = response.data;
                    // 使用cheerio加载HTML
                    const $ = cheerio.load(html);

                    // 根据name属性查找input元素的值
                    const loginToken = $('[name="_token"]').val();
                    // console.log('Username Value:', loginToken);
                    const headers = response.headers;

                    // 获取特定的响应头信息
                    let cookies = headers['set-cookie'];
                    let cookie = cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                    // const cookie = cookies[0].split(";")[0];
                    // console.log('cookie :', cookie);
                    axios.post('https://yuzhou.pubz.fyi/login', {
                        //参数列表
                        '_token': loginToken,
                        'name': 'jishu',
                        'password': 'aa123456',
                        'remember': 'on'
                    }, {
                        maxRedirects: 0,
                        headers: {
                            'authority': 'yuzhou.pubz.fyi',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'zh-CN,zh;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'cookie': cookie,
                            'origin': 'https://yuzhou.pubz.fyi',
                            'referer': 'https://yuzhou.pubz.fyi/login',
                            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                        }
                    })
                        .then((response) => {

                            // console.log(response);
                            // console.log(response.data.response.headers);
                        })
                        .catch((error) => {
                            // console.log(error.response.headers['set-cookie']);
                            cookies = error.response.headers['set-cookie'];
                            // console.log(cookies);
                            cookie = cookies[2].split(";")[0] + "; " + cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                            token = cookie;
                            console.log("设置token：" + token);
                            let config = {
                                method: 'get',
                                maxBodyLength: Infinity,
                                url: 'https://yuzhou.pubz.fyi/dashBoard',
                                headers: {
                                    'authority': 'yuzhou.pubz.fyi',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                                    'accept-language': 'zh-CN,zh;q=0.9',
                                    'cache-control': 'max-age=0',
                                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'same-origin',
                                    'sec-fetch-user': '?1',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                                    'Cookie': cookie
                                }
                            };
                            axios.request(config)
                                .then((response) => {
                                    const html = response.data;
                                    // console.log(html);
                                    // 使用cheerio加载HTML
                                    const $ = cheerio.load(html);

                                    // 根据name属性查找input元素的值
                                    const tokenValue = $('meta[name="csrf-token"]').attr('content');
                                    csrfToken = tokenValue;
                                    console.log(1);
                                    callBack(msg, doBusiness);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

        } else {
            console.log(2);
            await callBack(msg, doBusiness);
        }

    }

}
async function glRelogin(arr, chatId, beginDay, endDay,callBack) {
    console.log("gldl")
    //获取验证码
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://fmy2saap.yz116.com/admin/site/captcha?_=' + new Date().getTime(),
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'referer': 'https://fmy2saap.yz116.com/',
            'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log("11111")
            console.log( JSON.stringify(response.data.data.captcha).split('data:image/png;base64,')[1]);
            rest.post('http://upload.chaojiying.net/Upload/Processing.php', {
                multipart: true,
                data: {
                    'user': 'tea202307',
                    'pass': 'tea202307123',
                    'softid': '955941',  //软件ID 可在用户中心生成
                    'codetype': '6001',  //验证码类型 http://www.chaojiying.com/price.html 选择
                    'file_base64': response.data.data.captcha.split('data:image/png;base64,')[1]
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).on('complete', function (data) {
                console.log("1")
                console.log(data)
                var captcha = data.pic_str;
                console.log('Captcha Encoded.');
                console.log(captcha);
                const googleToken = speakeasy.totp({
                    secret: secret,
                    encoding: 'base32'
                });

                console.log('Token:', googleToken);
                //登录
                let data1 = JSON.stringify({
                    "username": "jishu",
                    "password": "123456",
                    "captcha": captcha,
                    "captcha_id": response.data.data.captcha_id,
                    "google": googleToken
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://fmy2saap.yz116.com/admin/site/login',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        'content-type': 'application/json',
                        'origin': 'https://fmy2saap.yz116.com',
                        'referer': 'https://fmy2saap.yz116.com/',
                        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                    },
                    data: data1
                };

                axios.request(config)
                    .then((response) => {
                        console.log("2========================================")
                        console.log(JSON.stringify(response.data));  
                        console.log(JSON.stringify(response.data.data.token));
                        glToken = 'Bearer ' + response.data.data.token;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        })

}
async function doBusinessWithQuanqiu(arr, chatId, beginDay, endDay) {
    console.log("全球查单");
    arr1 = arr[0].split("/");
    console.log(arr)
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    if (arr1[0] !== "") {
        // console.log("订单token:" + token);
        //查订单
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://fmy2saap.yz116.com/admin/order_system/order?page=1&pageSize=20&created_at=2024-03-28+00:00:00,2024-04-28+23:59:59%7C%3D&status=&price=&comment=&uorderid=' + arr1[0] + '&uporder=&user_account_id=&payment_channel=&member_id=&_=1711628026659',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'authorization': glToken,
                'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiIiwiaWQiOjIyLCJpc1JlZnJlc2giOmZhbHNlLCJqd3RWZXJzaW9uIjoiMS4wIiwibGltaXRfaXAiOiIiLCJsb2dpbklwIjoiIiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.wLya9G_B19IHVWHCIo8xXlGN523jLZPXulvljQPzBuw',
                'referer': 'https://fmy2saap.yz116.com/',
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
            }
        };

        axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(response.data));
                // const {data} = res.data
                // data.forEach(item => {
                //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                // })
                console.log("返回结果=================================");
                console.log(res.data);

                //银河订单没有查询全球
                if (res.data.data.total === 0) {
                    bot.sendMessage(chatId, "查无此单\ncan not find this order ");
                    return;
                }
                var orderData = res.data.data.rows;
                if (orderData[0].status === 2) {
                    bot.sendMessage(chatId, "订单成功\nthis order is success ");
                    return;
                }
                var account = orderData[0].pay_number;//付款
                var userAccount = orderData[0].user_number;//收款
                var payMoney = orderData[0].price;
                var id = orderData[0].id;
                var userAccount = orderData[0].user_account_id;
                var orderNo = orderData[0].OrderSN;
                // payMoney = parseFloat(payMoney);
                // payMoney = payMoney.toFixed(2)
                // var remark = orderData[0].remark;


                originalNumber = orderData[0].customer_bank_card_account;
                originalAmount = orderData[0].total_amount;

                bot.sendMessage(chatId, "订单 \n order no : " + orderData[0].uorderid + " \n建立时间 \ncreate time: " + orderData[0].created_at + " \n金额 \nprice: " + orderData[0].price
                    // + " \n收款账号 : " + orderData[0].merchant_bank_card_account + " \n填入手机号 : " + orderData[0].customer_bank_card_account
                    // + " \n备注 \nremark: " + orderData[0].StatusCN
                    + " \n状态 \nstatus: 未支付");
                //查关联数据
                if (arr1[1] !== "") {
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'https://fmy2saap.yz116.com/admin/order_system/order_unmatched?page=1&pageSize=20&created_at=2024-03-28+00:00:00,2024-04-28+23:59:59%7C%3D&price=&user_account_id=&user_id=&comment=%7Cinclude&uporder=' + arr1[1] + '%7Cinclude&_=1711629332530',
                        headers: {
                            'accept': 'application/json, text/plain, */*',
                            'accept-language': 'zh-CN,zh;q=0.9',
                            'authorization': glToken,
                            'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiIiwiaWQiOjIyLCJpc1JlZnJlc2giOmZhbHNlLCJqd3RWZXJzaW9uIjoiMS4wIiwibGltaXRfaXAiOiIiLCJsb2dpbklwIjoiIiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.wLya9G_B19IHVWHCIo8xXlGN523jLZPXulvljQPzBuw',
                            'referer': 'https://fmy2saap.yz116.com/',
                            'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                        }
                    };

                    axios.request(config)
                        .then((res) => {
                            console.log(JSON.stringify(res.data));
                            console.log(5);

                            console.log("orderData111=======================")

                            if (res.data.data === null) {
                                bot.sendMessage(chatId, "收款号或ref序号 查询无记录 请提供凭证载图以及单号 联系客服核实查询\n" +
                                    "Receipt number or ref serial number. There is no record of the query. \n" +
                                    "Please provide the order receipt and order number. Contact customer service to verify the query. ");
                                return;
                            }
                            orderData = res.data.data.rows;
                            console.log(orderData)
                            var desc = orderData[0].comment.split("转入");//付款/收款
                            // bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount+ "，收款账号：" + res.data.result.data[0].account);
                            // console.log(orderData[0].merchant_bank_card_account  + ":" + res.data.result.data[0].account+ ":" +originalNumber + ":" +res.data.result.data[0].message.split(" ")[2])

                            console.log(orderData[0].remarks);
                            if (orderData[0].remarks !== null && orderData[0].remarks !== "") {
                                bot.sendMessage(chatId, '此ref凭证已经补过');
                                return;
                            }
                            console.log(userAccount + ":" + orderData[0].user_account_id);
                            if (userAccount !== orderData[0].user_account_id) {
                                bot.sendMessage(chatId, '需要重新拉单，可能错误原因: 收款账户不对');
                                return;
                            }
                            if (payMoney !== orderData[0].price) {
                                bot.sendMessage(chatId, '需要重新拉单，可能错误原因: 用户支付金额不对\nThe order needs to be placed again. Possible reasons for the error: The user\'s payment amount is incorrect.');
                                return;
                            }

                            const options = {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: '补单\nReissue order', callback_data: arr1[0] + '/' + arr1[1] + '_' + id }],
                                        // 可以添加更多按钮
                                    ]
                                }
                            };

                            bot.sendMessage(chatId, arr1[0] + '需要补单\nAn order needs to be Reissued.', options);


                            // if (userAccount !== desc[1]) {
                            //     bot.sendMessage(chatId, '可能错误原因: 收款账户不对\nPossible cause of the error: The receiving account is incorrect');
                            // }
                        })
                        .catch(err => {
                            console.log('Error: ', err);
                            if (err.response.data.message === "Unauthenticated.") {
                                bot.sendMessage(chatId, "已重新登录，请重试");
                            }
                        });

                }

            })
            .catch(err => {
                console.log('Error: ', err.message);
                // glRelogin(arr, chatId, beginDay, endDay,doBusinessWithQuanqiu());

            });


    }


}

async function doBusiness(msg) {
 
    // 获取各种类型当前时间
    console.log("dobusiness")
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


    //获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 24 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    //接受所有消息回调函数
    chatId = msg.chat.id
    var arr = msg.text.toString().split(" ");
    if (msg.text.toString().indexOf(" 设置token") !== -1) {
        token = msg.text.toString().split(" 设置token")[0].split("/")[0];
        csrfToken = msg.text.toString().split(" 设置token")[0].split("/")[1];
        bot.sendMessage(msg.chat.id, "设置成功");
    }
    console.log(arr);
    var isLogin = true;
    if (arr.length === 2) {
        var arr1 = arr[0].split("/");
        var chatId = msg.chat.id;
        //绑定群和商户号
        console.log(chatId);
        if (arr[1].indexOf("bind") !== -1) {
            // client.get("tg:" + chatId, function (err, reply) {
            //     if (err) {
            //         console.error(22221);
            //         console.error(err);
            //     } else {
            //         if (reply === null || reply === "") {
            //             client.set("tg:" + chatId, arr[0], function (err, reply) {
            //                 if (err) {
            //                     console.error(22222);
            //                     console.error(err);
            //                 } else {
            //                     console.log(111);
            //                     console.log(reply);
            //                     bot.sendMessage(msg.chat.id, "绑定成功 ");
            //                 }
            //             });
            //         } else {console.log("已绑定" + reply)
            //             bot.sendMessage(msg.chat.id, "此群已经绑定 ");
            //         }
            //     }
            // });
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('读取文件时发生错误:', err);
                    return;
                }
                try {
                    const jsonString = JSON.parse(data);
                    var merchantId = jsonString[chatId];
                    jsonString[chatId] = arr1[0];
                    fs.writeFile(filePath, JSON.stringify(jsonString, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('写入文件时发生错误:', err);
                            return;
                        }
                    });
                    bot.sendMessage(msg.chat.id, "绑定成功 ");
                } catch (error) {
                    console.error('解析JSON时出错:', error);
                }
            });
        } else if (arr[1].indexOf("col") !== -1) {
            // console.log(token);
            arr1 = arr[0].split("/");
            var originalNumber;
            var originalAmount;
            if (arr1[0] !== "") {
                // console.log("订单token:" + token);
                //查订单
                console.log('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder);
                // console.log("订单地址:" + 'https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder)

                await axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder, {
                    //参数列表
                    //请求头配置
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token
                    }
                })
                    .then(res => {
                        // const {data} = res.data
                        // data.forEach(item => {
                        //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                        // })
                        var orderData = res.data.result.data;
                        //银河订单没有查询全球
                        if (orderData.length === 0) {
                            // doBusinessWithQuanqiu(arr,chatId,beginDay);
                            bot.sendMessage(msg.chat.id, "查无此单\ncan not find this order ");
                            return;
                        }
                        var account = orderData[0].merchant_bank_card_account;
                        var remark = orderData[0].remark;
                        var status;
                        if (orderData[0].status === 1) {

                        } else if (orderData[0].status === 1) {
                            status = "";
                        } else if (orderData[0].status === 2) {
                            status = "";
                        } else if (orderData[0].status === 3) {
                            status = "拒绝";
                        } else if (orderData[0].status === 8) {
                            status = "已补单";
                        } else if (orderData[0].status === 5) {
                            status = "确认入款";
                            bot.sendMessage(msg.chat.id, "此订单已成功\nthis order successful");
                            return;
                        } else if (orderData[0].status === 6) {
                            status = "第三方进行中";
                        }

                        originalNumber = orderData[0].customer_bank_card_account;
                        originalAmount = orderData[0].total_amount;
                        originalAmount = parseFloat(originalAmount);
                        originalAmount = originalAmount.toFixed(2)
                        bot.sendMessage(msg.chat.id, "订单 \n order no : " + orderData[0].m_id + " \n建立时间 \ncreate time: " + orderData[0].created_at + " \n完成时间 \nfinish time: " + orderData[0].complete_at + " \n金额 \nprice: " + orderData[0].total_amount
                            // + " \n收款账号 : " + orderData[0].merchant_bank_card_account + " \n填入手机号 : " + orderData[0].customer_bank_card_account
                            + " \n备注 \nremark: " + orderData[0].remark
                            + " \n状态 \nstatus: " + status);
                        //查关联数据
                        if (arr1[1] !== "") {
                            axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr1[1], {
                                //参数列表
                                //请求头配置
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Cookie": token
                                }
                            })
                                .then(res => {
                                    // const {data} = res.data
                                    // data.forEach(item => {
                                    //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                                    // })
                                    // console.log("关联");
                                    // console.log(res.data.result.data);
                                    console.log(5);
                                    orderData = res.data.result.data;
                                    console.log(orderData)
                                    if (orderData.length === 0) {
                                        bot.sendMessage(msg.chat.id, "收款号或ref序号 查询无记录 请提供凭证载图以及单号 联系客服核实查询\n" +
                                            "Receipt number or ref serial number. There is no record of the query. \n" +
                                            "Please provide the order receipt and order number. Contact customer service to verify the query. ");
                                        return;
                                    }
                                    // bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount+ "，收款账号：" + res.data.result.data[0].account);
                                    // console.log(orderData[0].merchant_bank_card_account  + ":" + res.data.result.data[0].account+ ":" +originalNumber + ":" +res.data.result.data[0].message.split(" ")[2])
                                    if (originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account && originalNumber !== res.data.result.data[0].message.split(" ")[2]) {
                                        console.log(originalNumber + ":" + res.data.result.data[0].message.split(" ")[2])
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{
                                                        text: '补单\nReissue order',
                                                        callback_data: realOrder + '/' + arr1[1] + "/4"
                                                    }],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户填入号码不对\nAn order needs to be Reissued. Possible cause of the error: The number entered by the user is incorrect.', options);
                                    }
                                    if (originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account && remark === "訂單超時") {
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{
                                                        text: '补单\nReissue order',
                                                        callback_data: realOrder + '/' + arr1[1] + "/4"
                                                    }],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, arr1[0] + '需要补单，可能错误原因: 用户支付超时\nAn order needs to be Reissued. Possible cause of the error: Payment timeout.', options);
                                    }
                                    if (originalAmount !== res.data.result.data[0].amount) {
                                        console.log(originalAmount + ":" + res.data.result.data[0].amount)
                                        bot.sendMessage(msg.chat.id, '需要重新拉单，可能错误原因: 用户支付金额不对\nThe order needs to be placed again. Possible reasons for the error: The user\'s payment amount is incorrect.');
                                    }
                                    if (account !== res.data.result.data[0].account) {
                                        console.log(account + ":" + res.data.result.data[0].account)
                                        bot.sendMessage(msg.chat.id, '可能错误原因: 收款账户不对\nPossible cause of the error: The receiving account is incorrect');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error: ', err.response.data.message);
                                    if (err.response.data.message === "Unauthenticated.") {
                                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                                    }
                                });

                        }

                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                        if (err.response.data.message === "Unauthenticated.") {
                            bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                        }
                    });


            }


        } else if (arr[1].indexOf("补单") !== -1) {
            //单号/refno
            var arr2 = arr[0].split("/");
            //先查询数据
            axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr2[0], {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var reason;
                    if (arr2[2] === 1) {
                        reason = "修改金额";
                    } else if (arr2[2] === 2) {
                        reason = "跨通道补单";
                    } else if (arr2[2] === 3) {
                        reason = "跨日补单";
                    } else if (arr2[2] === 4) {
                        reason = "逾时入款";
                    } else if (arr2[2] === 5) {
                        reason = "附言不批配";
                    }
                    var orderData = res.data.result.data[0];
                    console.log(csrfToken);
                    //查出来之后补单
                    axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                        //参数列表
                        id: orderData.id,
                        m_id: orderData.m_id,
                        b_id: null,
                        merchant_id: orderData.merchant_id,
                        merchant_bank_id: orderData.merchant_bank_id,
                        merchant_bank_card_id: orderData.merchant_bank_card_id,
                        merchant_bank_card_account: orderData.merchant_bank_card_account,
                        merchant_bank_card_name: orderData.merchant_bank_card_name,
                        merchant_bank_card_branch_code: "",
                        merchant_qrcode: null,
                        customer_bank_id: orderData.customer_bank_id,
                        customer_bank_card_name: "",
                        customer_bank_card_remark: null,
                        total_amount: orderData.total_amount,
                        fee: orderData.fee,
                        agent_fee: orderData.agent_fee,
                        callback_url: orderData.callback_url,
                        callback_count: orderData.callback_count,
                        remark: orderData.remark,
                        type: orderData.type,
                        status: orderData.status,
                        order_remark: orderData.order_remark,
                        pay_bank_card_account: null,
                        pay_bank_card_fee: orderData.pay_bank_card_fee,
                        sort: orderData.sort,
                        action_id: null,
                        complete_at: orderData.complete_at,
                        node_key: null,
                        return_url: orderData.return_url,
                        payment_type: orderData.payment_type,
                        robot: null,
                        live_at: orderData.live_at,
                        merchant_remark: "",
                        float_amount: orderData.float_amount,
                        pay_other: 0,
                        created_at: orderData.created_at,
                        paofen_id: 0,
                        customer_bank_card_account: orderData.customer_bank_card_account,
                        change_currency: null,
                        replenishment_reason: reason,
                        utr: arr2[1],
                        replenishment: true
                    }, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "Cookie": token,
                            'X-Csrf-Token': "Zskk1BmBgdwtk5qY7SdppQfekUT0Cidffcf3NtZE"
                        }
                    }).then(res => {

                    })
                        .catch(err => {
                            // console.log(err.response);
                            console.log('Error: ', err.response.data.message);
                        });
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                    }
                });
        } else if (arr[1].indexOf("代付查单") !== -1 || arr[1].indexOf("pay") !== -1) {
            console.log("代付开始")
            var arr2 = arr[0];
            axios.get('https://yuzhou.pubz.fyi/order/orderDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&form_query[m_id]=' + arr2, {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var orderData = res.data.result.data;
                    var resault = orderData[0].remark;
                    var remark = orderData[0].remark;
                    if (orderData[0].remark === "無法取得出款會員資料") {
                        resault = "member information incomplete";
                    } else if (orderData[0].remark === "會員帳號收款額度已滿") {
                        resault = "Member received payee quota is full";
                    } else if (orderData[0].remark === "官方返回无此收款号") {
                        resault = "Official return does not have this payment account";
                    } else if (orderData[0].remark === "會員帳號可能風控，請檢查有無出款後再操作") {
                        remark = "會員帳號可能風控";
                        resault = "The member account may be subject to risk control reject";
                    } else if (orderData[0].remark === "出款額度已滿，請換號") {
                        remark = "出款額度已滿";
                        resault = "The withdrawal limit is full.";
                    } else if (orderData[0].remark === "官方阻擋交易,該出款號短暫風控，請暫時停止出款") {
                        remark = "官方阻擋交易,該出款號短暫風控";
                        resault = "The official blocked the transaction. The withdrawal number is under temporary risk control.";
                    }
                    bot.sendMessage(msg.chat.id, "订单 : " + orderData[0].m_id + " \n建立时间 : " + orderData[0].created_at + " \n完成时间 : " + orderData[0].complete_at + " \n金额 : " + orderData[0].total_amount
                        // + " \n手机号 : " + orderData[0].pay_bank_card_account
                        + " \n备注 : " + remark);
                    bot.sendMessage(msg.chat.id, "orderId : " + orderData[0].m_id + " \ncreateTime : " + orderData[0].created_at + " \nfinishTime : " + orderData[0].complete_at + " \nprice : " + orderData[0].total_amount
                        // + " \nphone : " + orderData[0].pay_bank_card_account
                        + " \nremark : " + resault);
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                    }
                });
        } else if (arr[1].indexOf("ref查单") !== -1) {
            console.log(arr[0]);
            //查关联数据
            if (arr[0] !== "") {
                axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr[0], {
                    //参数列表
                    //请求头配置
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token
                    }
                })
                    .then(res => {
                        // const {data} = res.data
                        // data.forEach(item => {
                        //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                        // })
                        // console.log("关联");
                        // console.log(res.data.result.data);
                        if (res.data.result.data.length === 0) {
                            bot.sendMessage(msg.chat.id, "查无此单");
                            return;
                        }
                        bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount);
                    })
                    .catch(err => {
                        console.log('Error: ', err.response.data.message);
                        if (err.response.data.message === "Unauthenticated.") {
                            bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                        }
                    });

            }
        } else if (arr[1].indexOf("cd") !== -1) {
            arr[0] = realOrder + "/" + arr[0].split("/")[1];
            doBusinessWithQuanqiu(arr, chatId, beginDay, endDay);
        } 
        else if (arr[1].indexOf("acc") !== -1) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://fmy2saap.yz116.com/admin/user_system/user_account?page=1&pageSize=20&class=&dept_id=&payment_channel_id=&name=%7Cinclude&merchant='+arr[0] +'%7Cinclude&status=&is_payment=&created_at=&_=1711942710702',
                headers: { 
                  'accept': 'application/json, text/plain, */*', 
                  'accept-language': 'zh-CN,zh;q=0.9', 
                  'authorization': glToken, 
                  'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiU01URE1WUzNCQ0QzMjVLVElQNE5aNkxXTkwyVlRKNkciLCJpZCI6MjIsImlzUmVmcmVzaCI6ZmFsc2UsImp3dFZlcnNpb24iOiIxLjAiLCJsaW1pdF9pcCI6IiIsImxvZ2luSXAiOiI1NC4xNzkuMjIwLjk4IiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.B2yCIp_rMHf-CnDRIXRqiwPPNkyK9_rhs6TnjGhEfLA', 
                  'referer': 'https://fmy2saap.yz116.com/', 
                  'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
                  'sec-ch-ua-mobile': '?0', 
                  'sec-ch-ua-platform': '"Windows"', 
                  'sec-fetch-dest': 'empty', 
                  'sec-fetch-mode': 'cors', 
                  'sec-fetch-site': 'same-origin', 
                  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                }
              };
              
              axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data.data));
                if(response.data.data === null) {
                    bot.sendMessage(chatId, arr1[0] + "不是我们的卡\n not ours");
                }else{
                    bot.sendMessage(chatId, arr1[0] + "是我们的卡\n  ours");
                }
              })
        } 
    }
    arr = msg.text.toString().split("\n\n");

    if (arr.length === 5 && arr[0] === "疑似Gcash掉单明細" && arr[1] === "(收款号、会员号、收款金额匹配)") {

        //单号/refno
        var orderNo = arr[2].split(":")[1];
        var refNo = arr[3].split(":")[1];
        //先查询数据
        axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + orderNo, {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
                var reason = "附言不批配";
                var orderData = res.data.result.data[0];
                // console.log(csrfToken);
                //查出来之后补单
                axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                    //参数列表
                    id: orderData.id,
                    m_id: orderData.m_id,
                    b_id: null,
                    merchant_id: orderData.merchant_id,
                    merchant_bank_id: orderData.merchant_bank_id,
                    merchant_bank_card_id: orderData.merchant_bank_card_id,
                    merchant_bank_card_account: orderData.merchant_bank_card_account,
                    merchant_bank_card_name: orderData.merchant_bank_card_name,
                    merchant_bank_card_branch_code: "",
                    merchant_qrcode: null,
                    customer_bank_id: orderData.customer_bank_id,
                    customer_bank_card_name: "",
                    customer_bank_card_remark: null,
                    total_amount: orderData.total_amount,
                    fee: orderData.fee,
                    agent_fee: orderData.agent_fee,
                    callback_url: orderData.callback_url,
                    callback_count: orderData.callback_count,
                    remark: orderData.remark,
                    type: orderData.type,
                    status: orderData.status,
                    order_remark: orderData.order_remark,
                    pay_bank_card_account: null,
                    pay_bank_card_fee: orderData.pay_bank_card_fee,
                    sort: orderData.sort,
                    action_id: null,
                    complete_at: orderData.complete_at,
                    node_key: null,
                    return_url: orderData.return_url,
                    payment_type: orderData.payment_type,
                    robot: null,
                    live_at: orderData.live_at,
                    merchant_remark: "",
                    float_amount: orderData.float_amount,
                    pay_other: 0,
                    created_at: orderData.created_at,
                    paofen_id: 0,
                    customer_bank_card_account: orderData.customer_bank_card_account,
                    change_currency: null,
                    replenishment_reason: reason,
                    utr: refNo,
                    replenishment: true
                }, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token,
                        'X-Csrf-Token': "Tfm9NvoDHMpGClAl3ZcQqIaTqazTv4FmHM6tV0xr"
                    }
                }).then(res => {

                })
                    .catch(err => {
                        console.log('Error: ', err.response.data.message);
                        bot.sendMessage(chatId, err.response.data.message);
                        if (err.response.data.message === "Unauthenticated." || err.response.data.message === "CSRF token mismatch.") {
                            bot.sendMessage(chatId, "已重新登录，请重试");
                        }
                    });
            })
            .catch(err => {
                console.log('Error: ', err.response.data.message);
                if (err.response.data.message === "Unauthenticated.") {
                    bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                }
            });
    }
}

bot.on('message', async (msg) => {
    if (msg.text.toString().split(" ").length === 2) {
        await reLogin(msg, convertTo3rd);
    }
    if (msg.text.toString().indexOf("balance") !== -1) {
        console.log("start check balance")

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('读取文件时发生错误:', err);
                return;
            }
            const jsonString = JSON.parse(data);
            var merchantId = jsonString[msg.chat.id];
            if (merchantId === undefined) {
                bot.sendMessage(msg.chat.id, "请绑定商户号 ");
            } else {
                console.log(merchantId);
                var mchIds = merchantId.split(",");
                for (var i = 0; i < mchIds.length; i++) {
                    let mchId = mchIds[i]
                    let data = qs.stringify({
                        'MCH_ID': mchId
                    });
                    console.log("check balance from other system")
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'http://localhost:8080/lpay_war/pay/getMchBalance',
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'Accept-Language': 'zh-CN,zh;q=0.9',
                            'Cache-Control': 'max-age=0',
                            'Connection': 'keep-alive',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Cookie': 'JSESSIONID=2181D6E2D34C4D3306B16D7D5FE182FF; JSESSIONID=BE9A5498562018E5FDC14BDF80E67081',
                            'Origin': 'http://localhost:8080',
                            'Referer': 'http://localhost:8080/lpay_war/agentpay/getMchBalance.do',
                            'Sec-Fetch-Dest': 'document',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-User': '?1',
                            'Upgrade-Insecure-Requests': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"'
                        },
                        data: data
                    };

                    axios.request(config)
                        .then((response) => {
                            console.error(22224);
                            // console.log(JSON.stringify(response.data));
                            bot.sendMessage(msg.chat.id, mchId + "商户余额为： " + JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        })
    }else 
    if (msg.text.toString().indexOf("gldl") !== -1) {
        console.log("start gldl")
            glRelogin('','','','','');
    }
    
    var arr = msg.text.toString().split(" ");
    if (arr.length === 1) {
        var arr1 = arr[0].split("/");
        if (arr[1].indexOf("查四方单子") !== -1) {
            await convertTo3rd(arr1);
        }
    }

});


async function convertTo3rd(msg, callBack) {
    var arr = msg.text.toString().split(" ");
    var now = new Date();
    if (arr.length === 2) {
        var arr1 = arr[0].split("/");
        var date = new Date(now.getTime() + 3600 * 1000 * 24);  //获取当前时间国标版
        var year = date.getFullYear();    // 获取年
        var month = date.getMonth() + 1;   //获取当前月
        var day = date.getDate();   //日
        var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


        //获取7天前的时间

        var date = new Date(now.getTime() - 15 * 3600 * 1000 * 24);
        // console.log(now.getTime())
        // console.log(now.getTime() - 15 * 3600 * 1000 * 24)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
        // console.log(beginDay + ":" + endDay)
        //查订单
        data = 'aoData=%5B%7B%22name%22%3A%22sEcho%22%2C%22value%22%3A1%7D%2C%7B%22name%22%3A%22iColumns%22%2C%22value%22%3A16%7D%2C%7B%22name%22%3A%22sColumns%22%2C%22value%22%3A%22%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%22%7D%2C%7B%22name%22%3A%22iDisplayStart%22%2C%22value%22%3A0%7D%2C%7B%22name%22%3A%22iDisplayLength%22%2C%22value%22%3A10%7D%2C%7B%22name%22%3A%22mDataProp_0%22%2C%22value%22%3A0%7D%2C%7B%22name%22%3A%22mDataProp_1%22%2C%22value%22%3A1%7D%2C%7B%22name%22%3A%22mDataProp_2%22%2C%22value%22%3A2%7D%2C%7B%22name%22%3A%22mDataProp_3%22%2C%22value%22%3A3%7D%2C%7B%22name%22%3A%22mDataProp_4%22%2C%22value%22%3A4%7D%2C%7B%22name%22%3A%22mDataProp_5%22%2C%22value%22%3A5%7D%2C%7B%22name%22%3A%22mDataProp_6%22%2C%22value%22%3A6%7D%2C%7B%22name%22%3A%22mDataProp_7%22%2C%22value%22%3A7%7D%2C%7B%22name%22%3A%22mDataProp_8%22%2C%22value%22%3A8%7D%2C%7B%22name%22%3A%22mDataProp_9%22%2C%22value%22%3A9%7D%2C%7B%22name%22%3A%22mDataProp_10%22%2C%22value%22%3A10%7D%2C%7B%22name%22%3A%22mDataProp_11%22%2C%22value%22%3A11%7D%2C%7B%22name%22%3A%22mDataProp_12%22%2C%22value%22%3A12%7D%2C%7B%22name%22%3A%22mDataProp_13%22%2C%22value%22%3A13%7D%2C%7B%22name%22%3A%22mDataProp_14%22%2C%22value%22%3A14%7D%2C%7B%22name%22%3A%22mDataProp_15%22%2C%22value%22%3A15%7D%2C%7B%22name%22%3A%22START_TIME%22%2C%22value%22%3A%22' + beginDay + '%22%7D%2C%7B%22name%22%3A%22END_TIME%22%2C%22value%22%3A%22' + endDay + '%22%7D%2C%7B%22name%22%3A%22OUT_TRADE_NO%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22USER_OUT_TRADE_NO%22%2C%22value%22%3A%22' + arr1[0] + '%22%7D%2C%7B%22name%22%3A%22OUT_TRANSACTION_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22MCH_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22TRANSACTION_MCH_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22RESULT_CODE%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22SYNCHRONIZE_STATUS%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22NO_SIGN_FLAG%22%2C%22value%22%3A1%7D%5D';
        config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/lpay_war/pay/getMchOrderData_new',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': jsession,
                'Origin': 'http://localhost:8080',
                'Referer': 'http://localhost:8080/lpay_war/mchorder/listMchOrder_new.do',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.aaData.length !== 0) {
                    console.log(3);
                    // console.log(response.data.aaData[0]);
                    realOrder = JSON.stringify(response.data.aaData[0][2]);
                } else {
                    realOrder = arr1[0];
                }
                realOrder = realOrder.replace(/"/g, '')
                console.log("实际订单号" + realOrder)
                callBack(msg);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

bot.on('callback_query', async (callbackQuery) => {
    console.log("按钮回调")
    const chatId = callbackQuery.message.chat.id;
    console.log(callbackQuery.data);
    const data = callbackQuery.data;
    // console.log(data);
    //
    // if (data === 'query_api') {
    //     try {
    //         // 向API发送查询请求
    //         const apiUrl = 'https://api.example.com'; // 替换成实际的API地址
    //         const response = await axios.get(apiUrl);
    //
    //         // 处理API响应
    //         const result = response.data;
    //
    //         // 发送 API 结果给用户
    //         bot.sendMessage(chatId, `API结果：\n${result}`);
    //     } catch (error) {
    //         console.error('API查询错误:', error.message);
    //         bot.sendMessage(chatId, '查询API时发生错误！');
    //     }
    // }
    var arr2 = data.split("/");
    // 获取各种类型当前时间
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


    //获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 3600 * 1000 * 24);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    if (arr2.length === 3) {
        //先查询数据
        axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr2[0], {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
                var reason;
                if (arr2[2] === 1) {
                    reason = "修改金额";
                } else if (arr2[2] === 2) {
                    reason = "跨通道补单";
                } else if (arr2[2] === 3) {
                    reason = "跨日补单";
                } else if (arr2[2] === 4) {
                    reason = "逾时入款";
                } else if (arr2[2] === 5) {
                    reason = "附言不批配";
                }
                var orderData = res.data.result.data[0];
                // console.log(orderData);00.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                //查出来之后补单
                axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                    //参数列表
                    id: orderData.id,
                    m_id: orderData.m_id,
                    b_id: null,
                    merchant_id: orderData.merchant_id,
                    merchant_bank_id: orderData.merchant_bank_id,
                    merchant_bank_card_id: orderData.merchant_bank_card_id,
                    merchant_bank_card_account: orderData.merchant_bank_card_account,
                    merchant_bank_card_name: orderData.merchant_bank_card_name,
                    merchant_bank_card_branch_code: "",
                    merchant_qrcode: null,
                    customer_bank_id: orderData.customer_bank_id,
                    customer_bank_card_name: "",
                    customer_bank_card_remark: null,
                    total_amount: orderData.total_amount,
                    fee: orderData.fee,
                    agent_fee: orderData.agent_fee,
                    callback_url: orderData.callback_url,
                    callback_count: orderData.callback_count,
                    remark: orderData.remark,
                    type: orderData.type,
                    status: orderData.status,
                    order_remark: orderData.order_remark,
                    pay_bank_card_account: null,
                    pay_bank_card_fee: orderData.pay_bank_card_fee,
                    sort: orderData.sort,
                    action_id: null,
                    complete_at: orderData.complete_at,
                    node_key: null,
                    return_url: orderData.return_url,
                    payment_type: orderData.payment_type,
                    robot: null,
                    live_at: orderData.live_at,
                    merchant_remark: "",
                    float_amount: orderData.float_amount,
                    pay_other: 0,
                    created_at: orderData.created_at,
                    paofen_id: 0,
                    customer_bank_card_account: orderData.customer_bank_card_account,
                    change_currency: null,
                    replenishment_reason: reason,
                    utr: arr2[1],
                    replenishment: true
                }, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token,
                        'X-Csrf-Token': csrfToken
                    }
                }).then(res => {
                    bot.sendMessage(chatId, arr2[0] + "补单成功\nReissue order successful");
                })
                    .catch(err => {
                        console.log(err.response);
                        console.log('Error: ', err.response.data.message);
                        if (err.response.data.message === '此订单不存在')
                            bot.sendMessage(chatId, ' 此订单已完成补单');
                    });
            })
            .catch(err => {
                console.log('Error: ', err.response.data.message);
                bot.sendMessage(chatId, err.response.data.message);
                if (err.response.data.message === "Unauthenticated." || err.response.data.message === "CSRF token mismatch.") {
                    bot.sendMessage(chatId, "已重新登录，请重试");
                    methodA();
                }
            });
    } else {
        console.log(arr2);
        // return
        //补单按钮
        var orderData;
        let data = JSON.stringify({
            "id": arr2[1].split('_')[1]
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://fmy2saap.yz116.com/admin/order_system/order/compulsion',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'authorization': glToken,
                'content-type': 'application/json',
                'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiU01URE1WUzNCQ0QzMjVLVElQNE5aNkxXTkwyVlRKNkciLCJpZCI6MjIsImlzUmVmcmVzaCI6ZmFsc2UsImp3dFZlcnNpb24iOiIxLjAiLCJsaW1pdF9pcCI6IiIsImxvZ2luSXAiOiI1NC4xNzkuMjIwLjk4IiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.B2yCIp_rMHf-CnDRIXRqiwPPNkyK9_rhs6TnjGhEfLA',
                'origin': 'https://fmy2saap.yz116.com',
                'referer': 'https://fmy2saap.yz116.com/',
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                //查ref单信息
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://fmy2saap.yz116.com/admin/order_system/order_unmatched?page=1&pageSize=20&created_at=2024-03-28+00:00:00,2024-04-28+23:59:59%7C%3D&price=&user_account_id=&user_id=&comment=%7Cinclude&uporder=' + arr2[1].split('_')[0] + '%7Cinclude&_=1711629332530',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        'authorization': glToken,
                        'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiIiwiaWQiOjIyLCJpc1JlZnJlc2giOmZhbHNlLCJqd3RWZXJzaW9uIjoiMS4wIiwibGltaXRfaXAiOiIiLCJsb2dpbklwIjoiIiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.wLya9G_B19IHVWHCIo8xXlGN523jLZPXulvljQPzBuw',
                        'referer': 'https://fmy2saap.yz116.com/',
                        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                    }
                };

                axios.request(config)
                    .then((res) => {
                        orderData = res.data.data.rows[0];
                        console.log(orderData)
                        //填入补单号
                        let data = JSON.stringify({
                            "comment": orderData.comment,
                            "created_at": orderData.created_at,
                            "id": orderData.id,
                            "paytime": orderData.paytime,
                            "price": orderData.price,
                            "remarks": arr2[0],
                            "status": 1,
                            "updated_at": orderData.updated_at,
                            "uporder": orderData.uporder,
                            "user_account_id": orderData.user_account_id,
                            "user_id": orderData.user_id
                        });

                        let config = {
                            method: 'put',
                            maxBodyLength: Infinity,
                            url: 'https://fmy2saap.yz116.com/admin/order_system/order_unmatched',
                            headers: {
                                'accept': 'application/json, text/plain, */*',
                                'accept-language': 'zh-CN,zh;q=0.9',
                                'authorization': glToken,
                                'content-type': 'application/json',
                                'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiU01URE1WUzNCQ0QzMjVLVElQNE5aNkxXTkwyVlRKNkciLCJpZCI6MjIsImlzUmVmcmVzaCI6ZmFsc2UsImp3dFZlcnNpb24iOiIxLjAiLCJsaW1pdF9pcCI6IiIsImxvZ2luSXAiOiI1NC4xNzkuMjIwLjk4IiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.B2yCIp_rMHf-CnDRIXRqiwPPNkyK9_rhs6TnjGhEfLA',
                                'origin': 'https://fmy2saap.yz116.com',
                                'referer': 'https://fmy2saap.yz116.com/',
                                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                                'sec-ch-ua-mobile': '?0',
                                'sec-ch-ua-platform': '"Windows"',
                                'sec-fetch-dest': 'empty',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-site': 'same-origin',
                                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                            },
                            data: data
                        };

                        axios.request(config)
                            .then((response) => {
                                console.log(JSON.stringify(response.data));
                                //转状态
                                let data = JSON.stringify({
                                    "status": 2,
                                    "comment": orderData.comment,
                                    "created_at": orderData.created_at,
                                    "id": orderData.id,
                                    "paytime": orderData.paytime,
                                    "price": orderData.price,
                                    "remarks": arr2[0],
                                    "updated_at": orderData.updated_at,
                                    "uporder": orderData.uporder,
                                    "user_account_id": orderData.user_account_id,
                                    "user_id": orderData.user_id,
                                    "$switch_status": true
                                });

                                let config = {
                                    method: 'put',
                                    maxBodyLength: Infinity,
                                    url: 'https://fmy2saap.yz116.com/admin/order_system/order_unmatched',
                                    headers: {
                                        'accept': 'application/json, text/plain, */*',
                                        'accept-language': 'zh-CN,zh;q=0.9',
                                        'authorization': glToken,
                                        'content-type': 'application/json',
                                        'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjaGF0X2lkIjowLCJkYXNoYm9hcmQiOiIiLCJkZXB0X2lkIjo2MiwiZW1haWwiOiIxMzE0MUAxNjMuY29tIiwiZXhwIjowLCJleHBpcmVzIjo4NjQwMCwiZ29vZ2xlIjoiU01URE1WUzNCQ0QzMjVLVElQNE5aNkxXTkwyVlRKNkciLCJpZCI6MjIsImlzUmVmcmVzaCI6ZmFsc2UsImp3dFZlcnNpb24iOiIxLjAiLCJsaW1pdF9pcCI6IiIsImxvZ2luSXAiOiI1NC4xNzkuMjIwLjk4IiwibW9iaWxlIjoiMTMyNTU1Njg0NzciLCJwaWQiOjEsInBvc2l0aW9uIjoic3RhZmYiLCJyb2xlIjp7ImNvZGUiOiLmioDmnK8iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4IDE5OjUxOjA1IiwiZGF0YSI6ImN1cnJlbnQiLCJkZXB0IjoiIiwiaWQiOjYsIm5hbWUiOiLmioDmnK8iLCJwZXJtaXNzaW9ucyI6IjEsMiwzLDE4NCwxODUsMTg4LDE5MiwxODksMjA2LDE5MCwyMDEsMjAyLDIxNSwyMTYsMjA0LDIwNSwyMDcsMjA5LDE3OSwxODAsMTgzLDE4MSwxODIsMTkzLDE5NCwxOTUsMTkxLDIxMCwyMTEsMjEyLDIxMywyMTQsMjE3LDIxOCwyMTksMjIyLDIyMyIsInJlbWFyayI6IuaKgOacryIsInNvcnQiOjAsInN0YXR1cyI6MiwidXBkYXRlZEF0IjoiMjAyNC0wMy0yOCAxOTo1Mjo1MyIsInZpZXciOiJ3b3JrIn0sInJvbGVfaWQiOjYsInNtc190b2tlbiI6IiIsInN0YXR1cyI6MiwidXNlcm5hbWUiOiJqaXNodSJ9.B2yCIp_rMHf-CnDRIXRqiwPPNkyK9_rhs6TnjGhEfLA',
                                        'origin': 'https://fmy2saap.yz116.com',
                                        'referer': 'https://fmy2saap.yz116.com/',
                                        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                                        'sec-ch-ua-mobile': '?0',
                                        'sec-ch-ua-platform': '"Windows"',
                                        'sec-fetch-dest': 'empty',
                                        'sec-fetch-mode': 'cors',
                                        'sec-fetch-site': 'same-origin',
                                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then((response) => {
                                        console.log(JSON.stringify(response.data));
                                        bot.sendMessage(chatId, arr2[0] + "补单完成");
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    });
            })
            .catch((error) => {
                console.log(error);
            });

    }
});
