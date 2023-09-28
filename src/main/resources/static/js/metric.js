Vue.use(HighchartsVue.default);
Vue.use(VueLoading);
//
if (conf_metric.mode1)
    Highcharts.Chart.prototype.viewData = function () {
        if (this.insertedTable) {
            let visibility = tableIds[this.insertedTableID];
            $('#' + this.insertedTableID).toggle();
            tableIds[this.insertedTableID] = !vlogiisibility;
            if (visibility)
                return;
        }
        if ($('#' + this.insertedTableID).length) {
            let _div = document.getElementById(this.insertedTableID);
            _div.innerHTML = this.getTable();
            $('th:contains("Category")').text('Date');
            return;
        }
        let div = document.createElement('div');
        div.className = 'highcharts-data-table';
        this.renderTo.parentNode.insertBefore(div, this.renderTo.nextSibling);
        div.innerHTML = this.getTable();
        this.insertedTable = true;
        this.insertedTableID = 'tableID_' + new Date().getTime().toString() + Math.floor(Math.random() * (1000000)).toString();
        div.id = this.insertedTableID;
        tableIds[this.insertedTableID] = true;
        $('th:contains("Category")').text('Date')
    };
//
Highcharts.getOptions().exporting.buttons.contextButton.menuItems = [
    conf_metric.mode1 ? 'viewData' : '',
    conf_metric.mode2 ?
        {
            text: 'Show Table',
            onclick: function () {
                ShowTable(this.options);
            }
        } : '',
    {
        text: 'Copy Table',
        onclick: function () {
            CopyTable(this.getCSV().replace(/"/g, '').replace('Category', 'Date'));
        }
    },
    {
        text: 'Hide All Charts',
        onclick: function () {
            Highcharts.each(this.series, serie => serie.setVisible(false, false));
        }
    },
    'downloadPNG', 'downloadCSV', 'downloadXLS'
];
Highcharts.getOptions().lang.viewData = 'Toggle Table';
Highcharts.getOptions().lang.downloadPNG = 'Download PNG';
//
ShowTable = function (options) {
    console.log(options.title.text);
    console.log(options.series[0].data);
    // viewMetric.makeModal()
}

CopyTable = function (data) {
    let $tempInput = $("<textarea>");
    $("body").append($tempInput);
    $tempInput.val(data).select();
    document.execCommand("copy");
    $tempInput.remove();
    viewMetric.makeToast('Copy done', 'info');
}

//
var tableIds = {};

var hideAllTable = () => {
    for (tableId in tableIds)
        if (tableIds[tableId]) {
            tableIds[tableId] = false;
            $('#' + tableId).hide();
        }
}

//
var viewMetric = new Vue({
    el: "#view-metric",
    data: {
        metricName: '',
        bDropdownItem: {
            'hitEgg': 'Đập Trứng',
            'treasureHunt': 'Săn Kho Báu',
            'trungThu': 'Trung Thu',
            'sieuSao': 'Siêu Sao',
            'luckyBox': 'Lucky Box',
            'twoVsTwo': '2 Vs 2',
            'stayHome': 'Stay Home',
            'tournament': 'Tournament',
            'guessSkill': 'Dự đoán kỹ năng',
            'world2': 'Du lịch thế giới'
        },
        bNavItem: {
            'gameError': 'Game Error',
//            'localPayment': 'Local Payment',
            'quest': 'Quest',
            'g': 'G',
            'gold': 'Gold',
            'client': 'Client',
            'match': 'Match',
            'openGacha': 'Gacha',
            'heart': 'Heart',
            'character': 'Character',
            'heatMap': 'Heat Map',
            'giftCode': 'Giftcode'
        },
        bDropdownItem1: {
             'userplay': 'User Play',
             'winMatch': 'Win Match',
             'pendantCardSV': 'Pen + Card Server',
             'metricMatchExp': 'Card Play Match',
             "addInboxItem": "Add quà hòm thư",
             "firstpay": "First Pay",
             'newTut': 'New Tutorial',
             "loidai": "Lôi Đài",
             "clientStep": "Client Step",
        },
        bDropdownItem2: {
            'metric_level': 'Metric lượt chơi',
            "soMoveThua": "Số move thừa",
            'loseTarget_1': 'Lose target 1',
            'loseTarget_2': 'Lose target 2',
            'loseTarget_3': 'Lose target 3',
            "loseTarget_4": "Lose target 4",
        },
        gameOptions: [
            {value: 'vi', text: 'Việt'},
            {value: 'sea', text: 'Sea'},
            {value: 'br', text: 'Brazil'},
            {value: 'mx', text: 'Mexico'},
            {value: 'lite', text: 'Lite'},
            {value: 'match3', text: 'Match3'},
        ],
        inputLevel: '',
        gameSelected: '',
        inputStartDate: '',
        inputEndDate: '',
        isSearching: false,
        errored: false,
        charts: [],
        numChart: 0,
        loader: null,
        fab: conf_fab,
        modalShow: false,
        modelTitle: '',
        items: typeof conf_test !== 'undefined' ? conf_test.tableItems : [],
        fields: typeof conf_test !== 'undefined' ? conf_test.tableFields : [],
        //
        heatMap_screenId: '',
        heatMap_screenIds: [],
        heatMap_screenSize: '',
        heatMap_screenSizes: [],
        heatMap_data: {},
        heatMapIds: [],
        enableWatchToRenderHeatMap: false,
    },
    methods: {
        onClickSearch() {
            if (conf_metric.mode1)
                hideAllTable();
            if (typeof conf_test !== 'undefined' && conf_test.enable) {
                let data = this.gameSelected === 'lite' ? conf_test.lite[this.metricName] : conf_test[this.metricName];
                data.length = 14;
                this.getCharts(data);
                return;
            }
            this.isSearching = true;
            axios
                .get('/api/log/getMetricLog', {
                    params: {
                        inputLevel: this.inputLevel,
                        gameId: this.gameSelected,
                        metricName: this.metricName,
                        dateStart: this.inputStartDate,
                        dateEnd: this.inputEndDate
                    }
                })
                .then(res => {
                    if (this.metricName === 'heatMap')
                        this.initDataHeatMap(res.data);
                    else
                        this.getCharts(res.data);
                })
                .catch(e => {
                    console.error(e);
                    this.errored = true;
                    viewMetric.loader.hide();
                })
                .finally(() => this.isSearching = false);
        },

        onClickMetric(metricName) {
            this.metricName = metricName;
            this.onClickSearch();
        },

        onClickMenu() {
            this.fab.isMenuOpen = !this.fab.isMenuOpen;
        },

        makeModal(modelTitle = 'Empty Title') {
            // this.$bvModal.show('idOfModal')
            this.modalShow = true;
            this.modelTitle = modelTitle;
        },

        makeToast(msg = '', variant = 'info') {
            this.$bvToast.toast(msg, {
                title: 'Info',
                variant: variant,
                solid: true,
                autoHideDelay: 2000
            })
        },

        makeLoader() {
            this.loader = Vue.$loading.show({
                color: '#007bff',
                'loader': 'dots',
                width: 128,
                height: 128,
            });
        },

        getCharts(_data) {
            this.makeLoader();
            console.time('This');
            let config = conf_metric[this.gameSelected][this.metricName];
            this.numChart = config.length;
            let key = 1;
            config.forEach(chart => {
                chart.key = key++;
                if (chart.series)
                    chart.series.forEach(serie => serie.data = []);
                else
                    chart.series = [];
            });
            let dates = [];

            //get input level match3
            let listLevel =[];
            if(this.gameSelected == "match3" && this.inputLevel != "") {
                listLevel = (this.inputLevel.replace(/\s/g, '')).split(",");
                listLevel = this.getListOnlyNumer(listLevel);
            }

            if (listLevel.length != 0 && this.gameSelected == "match3") {
                config.forEach(chart => {
                    chart.series = [];
                });
            }

            for (let date in _data) {
                let data = _data[date];
                config.forEach(chart => {
                    if (chart.multipleKey) {
                        if(this.gameSelected != "match3")
                        {
                            //khong phai game match3
                            for (let key in data[chart.multipleKey]) {
                                if (chart.validKey && !chart.validKey.includes(key))
                                    continue;

                                let seri = chart.series.find(seri => seri.key === key);
                                if (seri == null) {
                                    seri = {key: key, name: key, data: []};
                                    chart.series.push(seri);
                                }
                                for (let i = 0, numDayNoData = dates.length - seri.data.length; i++ < numDayNoData; seri.data.push(0)) ;
                                seri.data.push(data[chart.multipleKey][key]);
                            }
                        } else {
                            //match3
                            if (listLevel.length == 0)
                            {
                                for (let key in data[chart.multipleKey]) {
                                    if (chart.validKey && !chart.validKey.includes(key))
                                        continue;

                                    let seri = chart.series.find(seri => seri.key === key);
                                    if (seri == null) {
                                        seri = {key: key, name: key, data: []};
                                        chart.series.push(seri);
                                    }
                                    for (let i = 0, numDayNoData = dates.length - seri.data.length; i++ < numDayNoData; seri.data.push(0)) ;
                                    seri.data.push(data[chart.multipleKey][key]);
                                }
                            } else
                            {
                                for (let i = 0; i < listLevel.length; i++) {
                                    let key = listLevel[i];
                                    if (chart.validKey && !chart.validKey.includes(key))
                                        continue;

                                    let seri = chart.series.find(seri => seri.key === key);
                                    if (seri == null) {
                                        seri = {key: key, name: key, data: []};
                                        chart.series.push(seri);
                                    }
                                    if(data[chart.multipleKey][key]!=null)
                                        seri.data.push(data[chart.multipleKey][key]);
                                    else
                                        seri.data.push(0);
                                }
                            }
                        }
                    }
                    else
                        chart.series.forEach(serie => {
                            try {
                                let arrKey = serie.key.split('.');
                                let value = data[serie.key];
                                if (arrKey.length == 2) //hard (JSON nested depth = 2)
                                    value = data[arrKey[0]][arrKey[1]];
                                if (value === null || value === undefined) {
                                    serie.data.push(null);
                                    return;
                                }
                                serie.data.push(parseFloat(value));
                            } catch (e) {
                                console.error(e);
                                serie.data.push(null);
                            }
                        })
                });
                dates.push(shortDate(date));
            }

            let _charts = [];
            config.forEach(chart => {
                if (chart.ignoreGames && chart.ignoreGames.includes(this.gameSelected))
                    return;
                let _chart = {
                    title: {text: chart.title},
                    subtitle: {text: chart.subtitle},
                    chart: {
                        type: chart.type || 'line',
                        zoomType: 'x',
                        events: {
                            load() {
                                if (chart.key === viewMetric.numChart && viewMetric.loader) {
                                    viewMetric.loader.hide();
                                    viewMetric.loader = null;
                                }
                            },
                            render() {
                            }
                        }
                    },
                    yAxis: chart.yAxis || {title: ''},
                    xAxis: {categories: dates},
                    credits: {enabled: false},
                    tooltip: chart.tooltip || {},
                    plotOptions: chart.plotOptions || {},
                    series: chart.series,
                };
                if (chart.visible) {
                    let sumData = [];
                    chart.series.forEach(serie => sumData.push(serie.data.reduce((a, b) => a + b, 0)));
                    sumData.sort((a, b) => b - a);
                    sumData.length = chart.visible;
                    chart.series.forEach(serie => serie.visible = sumData.includes(serie.data.reduce((a, b) => a + b, 0)));
                }
                _charts.push(_chart);
                if (chart.custom === 'swap') {
                    let xAxis_categories = [];
                    _chart.series.forEach(serie => xAxis_categories.push(serie.name));
                    //
                    let series = [];
                    let index = 0;
                    _chart.xAxis.categories.forEach(date => {
                        let data = [];
                        _chart.series.forEach(serie => data.push(serie.data[index]));
                        series.push({
                            name: date,
                            data: data
                        });
                        index++;
                    });
                    //
                    _chart.xAxis = {categories: xAxis_categories};
                    _chart.series = series;
                }
            });
            this.charts = [];
            this.heatMapIds = [];
            setTimeout(() => this.charts = _charts, 0);
            console.timeEnd('This');
        },

        getListOnlyNumer(listLevel){
            listLevelOnlyNumber = [];
            for(let i = 0; i < listLevel.length; i++)
                if (this.isANumber(listLevel[i]))
                    listLevelOnlyNumber.push(listLevel[i]);

            return listLevelOnlyNumber;
        },

        isANumber(s){
            if(s.length == 0)
                return false;

            digitList = ['0','1','2','3','4','5','6','7','8','9'];
            for(let i = 0; i < s.length; i++)
            {
                if(!digitList.includes(s[i]))
                    return false;
            }
            return true;
        },

        getHeatMapClass(heatMapId) {
            return 'class_' + heatMapId.split('|')[1];
        },

        getHeatMapImage(heatMapId) {
            return heatMapId.split('|')[0] + '/' + heatMapId.split('|')[1] + '.jpg';
        },

        initDataHeatMap(_data) {
            this.charts = [];
            //
            this.heatMap_screenId = '';
            this.heatMap_screenIds = [];
            this.heatMap_screenSize = '';
            this.heatMap_screenSizes = [];
            this.heatMap_data = {};
            this.enableWatchToRenderHeatMap = false;

            let _heatMap_data = {};
            for (let date in _data)
                for (let screenId in _data[date]) {
                    if (!this.heatMap_screenIds.includes(screenId))
                        this.heatMap_screenIds.push(screenId);
                    for (let screenSize in _data[date][screenId]) {
                        if (!this.heatMap_screenSizes.includes(screenSize))
                            this.heatMap_screenSizes.push(screenSize);
                        _heatMap_data[screenId + '|' + screenSize + '|' + date] = _data[date][screenId][screenSize];
                    }
                }
            this.heatMap_data = _heatMap_data;
            this.heatMap_screenId = this.heatMap_screenIds[0];
            this.heatMap_screenSize = this.heatMap_screenSizes[0];
            this.renderHeatMap();
            setTimeout(() => this.enableWatchToRenderHeatMap = true, 500);
        },

        renderHeatMap() {
            this.makeLoader();
            $('canvas').remove();
            let _heatMapIds = [];
            for (let heatMapId in this.heatMap_data)
                if (heatMapId.includes(this.heatMap_screenId + '|' + this.heatMap_screenSize))
                    _heatMapIds.push(heatMapId);
            this.heatMapIds = _heatMapIds;
            setTimeout(() => {
                for (let heatMapId in this.heatMap_data)
                    if (heatMapId.includes(this.heatMap_screenId + '|' + this.heatMap_screenSize))
                {
                    let data = this.heatMap_data[heatMapId];
                    let max = data.reduce((a, b) => a.value > b.value ? a : b).value;
                    let heatMap = hm.create({
                        container: document.getElementById(heatMapId),
                    });
                    heatMap.setData({
                        min: 0,
                        max: max,
                        data: data
                    });
                }
                viewMetric.loader.hide();
            }, 0);
        },

        getTools() {
            axios
                .get('/api/user/getUser')
                .then(res => {
                    if (res.data.username === 'admin')
                        return;
                    this.fab.tools = this.fab.tools.filter(tool => res.data.tools.includes(tool.id));
                    this.fab.isShowMenu = this.fab.tools.length > 1;
                })
                .catch(e => {
                    if (typeof conf_test !== 'undefined' && conf_test.enable) {
                        let tools = [2, 3, 4];
                        this.fab.tools = this.fab.tools.filter(tool => tools.includes(tool.id));
                        this.fab.isShowMenu = this.fab.tools.length > 1;
                        return;
                    }

                    console.error(e);
                    this.errored = true;
                    this.fab.isShowMenu = false;
                })
                .finally(() => {
                });
        },
    },
    created: function () {
        if (isDefined(Storage)) {
            this.inputLevel = localStorage.getItem("inputLevel");
            this.metricName = localStorage.getItem("metricName");
            this.gameSelected = localStorage.getItem("gameSelected");
            this.inputStartDate = localStorage.getItem("inputStartDate");
            this.inputEndDate = localStorage.getItem("inputEndDate");
        }
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 14);
        this.inputLevel = this.inputLevel || '';
        this.gameSelected = this.gameSelected || 'vi';
        this.inputStartDate = this.inputStartDate || dateToString(startDate);
        this.inputEndDate = this.inputEndDate || dateToString(new Date());
        this.onClickMetric(this.metricName || conf_metric.metricDefault);
//        this.getTools();
    },
    computed: {
        metric: function () {
            return conf_metric[this.gameSelected];
        }
    },
    watch: {
        metricName: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("metricName", val);
        },
        inputLevel: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("inputLevel", val);
        },
        gameSelected: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("gameSelected", val);
        },
        inputStartDate: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("inputStartDate", val);
        },
        inputEndDate: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("inputEndDate", val);
        },
        heatMap_screenId: function (val) {
            if (this.enableWatchToRenderHeatMap)
                this.renderHeatMap();
        },
        heatMap_screenSize: function (val) {
            if (this.enableWatchToRenderHeatMap)
                this.renderHeatMap();
        },
    }
});
