Vue.use(HighchartsVue.default);
Vue.use(VueLoading);
//
if (conf_metric_match3.mode1)
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
    conf_metric_match3.mode1 ? 'viewData' : '',
    conf_metric_match3.mode2 ?
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
        gameSelected: 'match3',
        metricName: '',
        bDropdownMetricLevel: {
            'levelOverview': 'Level Overview',
            'levelDetail': 'Level Detail',
        },
        bDropdownMetricShop: {
            'goldStatistic': 'Gold Statistic',
            'gStatistic': 'G Statistic',
        },
        bDropdownMetricError: {
            'match3_conflict_progress': 'Conflict Progress Statistic',
            'match3_error': "Error Statistic",
            'match3_error_sync': "Error Sync Statistic",
            'match3_login_conflict_state': "Login Conflict State Statistic",
            'match3_sync_progress': "Sync Progress Statistic",
        },

        levelStart: '',
        levelEnd: '',
        levelAdd: '',
        levelDelete: '',
        levelDetail: '',

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

        //
        table: {soLuotChoi: 0},
    },
    methods: {
        onClickSearch() {
            if (conf_metric_match3.mode1)
                hideAllTable();

            this.charts = null;

            this.isSearching = true;
            if (this.metricName == "levelOverview")
                (new LevelOverviewSearch(this)).getLevelListOverview();
            else if (this.metricName == "levelDetail")
                (new LevelDetailSearch(this)).searchLevelDetail();
            else
                (new MetricCustomSearch(this)).customSearch();
        },

        onClickAddLevel() {
            console.log("onClickAddLevel", this.levelAdd);
            if(this.levelAdd.length == 0)
                return;

            if(!this.levelAdd.includes("."))
            {
                axios
                    .get('/api/log/getLastVersionLevel', {
                        traditional: true,
                        params: {
                            level: this.levelAdd
                        }
                    })
                    .then(res => {
                        this.levelAdd += "." + res.data;
                        console.log("onClickAddLevel", this.levelAdd);

                        if(this.levelList.includes(this.levelAdd))
                            return;

                        this.levelList.push(this.levelAdd);
                        this.searchLevelOverview();
                    })
                    .catch(e => {
                        console.error(e);
                    })
            } else
            {
                if(this.levelList.includes(this.levelAdd))
                    return;

                this.levelList.push(this.levelAdd);
                this.searchLevelOverview();
            }
        },

        onClickDeleteLevel() {
            console.log("onClickDeleteLevel", this.levelDelete);
            if(this.levelDelete.length == 0)
                return;

            if(!this.levelDelete.includes("."))
            {
                axios
                    .get('/api/log/getLastVersionLevel', {
                        traditional: true,
                        params: {
                            level: this.levelDelete
                        }
                    })
                    .then(res => {
                        this.levelDelete += "." + res.data;
                        console.log("onClickDeleteLevel", this.levelDelete);
                        console.log("levelList", this.levelList);
                        if(!this.levelList.includes(this.levelDelete))
                            return;

                        for (let i = 0; i < this.levelList.length; i++) {
                            if(this.levelList[i] == this.levelDelete) {
                                idx = i;
                                break;
                            }
                        }
                        console.log("idx", idx);
                        this.levelList.splice(idx, 1);
                        this.searchLevelOverview();
                    })
                    .catch(e => {
                        console.error(e);
                    })
            } else
            {
                console.log("levelList", this.levelList);
                console.log("levelDelete", this.levelDelete);
                if(!this.levelList.includes(this.levelDelete))
                    return;

                for (let i = 0; i < this.levelList.length; i++) {
                    if(this.levelList[i] == this.levelDelete) {
                        idx = i;
                        break;
                    }
                }
                console.log("idx", idx);
                this.levelList.splice(idx, 1);
                this.searchLevelOverview();
            }
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
            this.levelStart = localStorage.getItem("levelStart");
            this.levelEnd = localStorage.getItem("levelEnd");
            this.metricName = localStorage.getItem("metricName");
            this.gameSelected = 'match3';
        }
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);
        this.levelStart = this.levelStart || '';
        this.levelEnd = this.levelEnd || '';
        this.gameSelected = this.gameSelected || 'match3';
        this.inputStartDate = dateToString(startDate);
        this.inputEndDate = dateToString(new Date());
        this.onClickMetric(this.metricName || conf_metric_match3.metricDefault);
//        this.getTools();
    },
    computed: {
        metric: function () {
            return conf_metric_match3[this.gameSelected];
        }
    },
    watch: {
        metricName: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("metricName", val);
        },
        levelStart: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("levelStart", val);
        },
        levelEnd: function (val) {
            if (isDefined(Storage))
                localStorage.setItem("levelEnd", val);
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
