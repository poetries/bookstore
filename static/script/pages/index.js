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
            topic: result.items[6].data.data,
            duration: 0,
            position: 0,
            header_position: 0,
            header_duration: 0,
            tab_1_class: 'Switch-tab__on',
            tab_2_class: ''
        },
        methods: {
            tabSwitch: function (pos) {
                this.duration = 0.5;
                this.header_duration = 0.5;
                if(pos == 0) {
                    this.position = 0;
                    this.header_position = 0;
                    this.tab_1_class = 'Switch-tab__on';
                    this.tab_2_class = '';
                } else {
                    this.position = (-734);
                    this.header_position = 277;
                    this.tab_2_class = 'Switch-tab__on';
                    this.tab_1_class = '';
                }
            }
        }
    });
},'json');