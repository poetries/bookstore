$.get('/ajax/index', function (result) {
    new Vue({
        el: "#app",
        data: {
            top: result.items[0].data.data,
            hot: result.items[1].data.data,
            recommend: result.items[2].data.data,
            female: result.items[3].data.data,
            male: result.items[4].data.data,
            free: result.items[5].data.data,
            topic: result.items[6].data.data
        }
    });
},'json');