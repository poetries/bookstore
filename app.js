var koa = require("koa");
var controller = require("koa-route");
var views = require("co-views");
var app = koa();

var render = views('./view',{
   map: {html: 'ejs'}
});
var koa_static = require("koa-static-server");
var service = require('./service/webAppService');

app.use(koa_static({
    rootDir:'./static/',
    rootPath: '/static',
    maxage: 0
}));

// 测试接口代码 页面路由
app.use(controller.get('/router_test',function*() {
    this.set("Cache-Control","no-cache");
    this.body = "hello world";
}));
app.use(controller.get('/ejs_test',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('test',{title:'title_test'});
}));
app.use(controller.get('/api_test',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_test_data();
}));
app.use(controller.get('/',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('index',{title:'书城首页'});
}));
app.use(controller.get('/search',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('search',{title:'搜索'});
}));

app.use(controller.get('/rank',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('rank',{title:'排序'});
}));
app.use(controller.get('/category',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('category',{title:'分类'});
}));
app.use(controller.get('/male',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('male',{nav:'男生频道'});
}));
app.use(controller.get('/female',function*() {
    this.set("Cache-Control","no-cache");
    this.body = yield render('female',{nav:'女生频道'});
}));

app.use(controller.get('/book',function*() {
    this.set("Cache-Control","no-cache");
    var querystring = require("querystring");
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));

// ajax 返回的数据
app.use(controller.get('/ajax/search',function*() {
    this.set("Cache-Control","no-cache");
    var querystring = require("querystring");
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start,end,keyword);// 加yield 因异步返回
}));
app.use(controller.get('/ajax/index',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_index_data();
}));
app.use(controller.get('/ajax/rank',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_rank_data();
}));
app.use(controller.get('/ajax/category',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_category_data();
}));
app.use(controller.get('/ajax/bookbacket',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_bookbacket_data();
}));
app.use(controller.get('/ajax/male',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_male_data();
}));
app.use(controller.get('/ajax/female',function*() {
    this.set("Cache-Control","no-cache");
    this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/book',function*() {
    this.set("Cache-Control","no-cache");
    var querystring = require("querystring");
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id) {
        id = '';
    }
    this.body = service.get_book_data(id);
}));


















app.listen(3001);
console.log('koa start...');