//Note:
//Highcharts: xAxis.crosshair = true
var conf_metric_match3 = {
    'levelOverview': [
        {
            metric: 'difficulty',
            type: 'stackAndLine',
            title: 'Lượt chơi, thắng, thua, độ khó',
            subtitle: '',
            yAxisTitle:''
        },
        {
            metric: 'residualMove',
            type: 'stackPercentage',
            title: 'Tỷ lệ số move còn thừa khi thắng',
            subtitle: '',
            yAxisTitle:''
        },
        {
            metric: 'lackObjective',
            type: 'column',
            title: 'Tỷ lệ số objective còn khi thua',
            subtitle: '',
            yAxisTitle:''
        },
        // {
        //     metric: 'vote',
        //     type: 'column',
        //     title: 'Cảm nghĩ của người chơi',
        //     subtitle: '',
        //     yAxisTitle:''
        // },
        {
            metric: 'turnUseBooster',
            title: 'Thống kê lượt dùng booster',
            subtitle: '',
        },
        {
            metric: 'turnUseTool_Booster',
            title: 'Thống kê lượt dùng Tool, Booster',
            subtitle: '',
        },
        {
            metric: 'playerUseTool_Booster',
            title: 'Thống kê người dùng Tool, Booster',
            subtitle: 'Lưu ý: Chỉ thống kê trong 3 tháng gần đây'
                + '<br/>' + 'Trung bình dùng tool: Số tool dùng/số người chơi level đó'
                + '<br/>' + 'Trung bình dùng booster: Số booster dùng/số người chơi level đó',
        },
        {
            metric: 'turnBuyMove',
            type: 'column',
            title: 'Thống kê số lượt mua thêm move',
            subtitle: '',
        },
        {
            metric: 'userBuyMove',
            title: 'Thống kê số người mua thêm move',
            subtitle: '',
            yAxisTitle:''
        },
        {
            metric: 'heartEqual0',
            title: 'Số người chơi hết tim theo level',
            subtitle: 'Lưu ý: Chỉ thống kê trong 3 tháng gần đây'
                + '<br/>' + 'Tỷ lệ x = Số người x / số người chơi level đó',
        },
        {
            metric: 'firstChargeByLevel',
            type: 'column',
            title: 'Thống kê số lượng người chơi có lần đầu nạp tiền theo level',
            subtitle: 'Tỷ lệ = số người nạp / số người chơi level đó',
        },
    ],
    'levelDetail': [
        {
            metric: 'winLoseOut',
            type: 'pie',
            title: 'Tỷ lệ thắng, thua, thoát',
            subtitle: '',
            yAxisTitle:''
        },
        {
            metric: 'churnRate',
            type: 'stackAndLine',
            title: 'Số người chơi thua',
            subtitle: '',
            yAxisTitle:''
        },
        {
            metric: 'residualMove',
            type: 'column',
            title: 'Số move còn thừa khi thắng',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"]
        },
        {
            metric: 'lackObjective1',
            type: 'column',
            title: 'Số objective 1 còn khi thua',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"]
        },
        {
            metric: 'lackObjective2',
            type: 'column',
            title: 'Số objective 2 còn khi thua',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"]
        },
        {
            metric: 'lackObjective3',
            type: 'column',
            title: 'Số objective 3 còn khi thua',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"]
        },
        {
            metric: 'lackObjective4',
            type: 'column',
            title: 'Số objective 4 còn khi thua',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"]
        },
        {
            metric: 'vote',
            type: 'column',
            title: 'Lượng đánh giá',
            subtitle: '',
            yAxisTitle:'',
            xAxisCategories: ["Không vote", "Khó chịu", "Thở phào", "Chán", "Thách thức", "Yêu thích"]
        }
    ],
    'gStatistic': [
        {
            visible: 5,
            title: 'G In / Action',
            multipleKey: 'gIn',
        },
        {
            visible: 5,
            title: 'G Out / Action',
            multipleKey: 'gOut',
        },
        {
            visible: 5,
            title: 'Action G In',
            multipleKey: 'actionGIn',
        },
        {
            visible: 5,
            title: 'Action G Out',
            multipleKey: 'actionGOut',
        },
        {
            visible: 5,
            title: 'User G In',
            multipleKey: 'UserGIn',
        },
        {
            visible: 5,
            title: 'User G Out',
            multipleKey: 'UserGOut',
        },
        {
            visible: 5,
            title: 'Statistic G In Each User',
            multipleKey: 'statisticGIn',
        },
        {
            visible: 5,
            title: 'Statistic G Out Each User',
            multipleKey: 'statisticGOut',
        },
        ],
    'goldStatistic': [
        {
            visible: 5,
            title: 'Gold In / Action',
            multipleKey: 'goldIn',
        },
        {
            visible: 5,
            title: 'Gold Out / Action',
            multipleKey: 'goldOut',
        },
        {
            visible: 5,
            title: 'Action Gold In',
            multipleKey: 'actionGoldIn',
        },
        {
            visible: 5,
            title: 'Action Gold Out',
            multipleKey: 'actionGoldOut',
        },
        {
            visible: 5,
            title: 'User Gold In',
            multipleKey: 'UserGoldIn',
        },
        {
            visible: 5,
            title: 'User Gold Out',
            multipleKey: 'UserGoldOut',
        },
        {
            visible: 5,
            title: 'Statistic Gold In Each User',
            multipleKey: 'statisticGoldIn',
        },
        {
            visible: 5,
            title: 'Statistic Gold Out Each User',
            multipleKey: 'statisticGoldOut',
        },
    ],
    'match3_conflict_progress': [ // thống kê các loại tiến trình khác nhau
        {
            visible: 5,
            title: 'Conflict Progress Statistic',
            multipleKey: 'conflictProgressStatistic',
        },
    ],
    'match3_error': [ // thống kê lỗi khi xử lí client
        {
            visible: 5,
            title: 'Error Statistic',
            multipleKey: 'errorStatistic',
        },
    ],
    'match3_error_sync': [ //số lỗi khi sync (khi valid node cl gửi lên hoặc valid node sv
        {
            visible: 5,
            title: 'Error Statistic',
            multipleKey: 'errorStatistic',
        },
        {
            visible: 5,
            title: 'Invalid State Sv Statistic',
            multipleKey: 'invalidStateSvStatistic',
        },
    ],
    'match3_login_conflict_state': [ //số lần conflict
        {
            visible: 5,
            type: 'column',
            series: [
                {key: 'match3_login_conflict_state', name: 'Login Conflict State'},
            ]
        },
    ],
    'match3_sync_progress': [ //số lần sync
        {
            visible: 5,
            type: 'column',
            series: [
                {key: 'match3_sync_progress', name: 'Sync Progress'},
            ]
        },
    ]
};
//
conf_metric_match3.mode1 = true; //show table below chart
conf_metric_match3.mode2 = false; //show table in modal
conf_metric_match3.metricDefault = 'g';
