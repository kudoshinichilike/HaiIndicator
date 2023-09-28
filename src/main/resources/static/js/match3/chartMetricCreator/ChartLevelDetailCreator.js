class ChartLevelDetailCreator {
    constructor(levelList) {
        this.levelList = levelList;
    }

    getChartsLevelDetail(data) {
        console.log("getChartsLevelDetail", data);

        if(data == null)
            return;

        let charts = [];
        let xAxisCategories = this.levelList;

        for (let i = 0; i < conf_metric_match3.levelDetail.length; i++) {
            if(conf_metric_match3.levelDetail[i].metric == 'churnRate')
            {
                charts.push(this.getChartLoseUser(data[conf_metric_match3.levelDetail[i].metric]));
                continue;
            }

            if(conf_metric_match3.levelDetail[i].type == 'stackPercentage')
                charts.push(chartUtils.getStackPercentage(conf_metric_match3.levelDetail[i].title,
                    conf_metric_match3.levelDetail[i].subtitle, conf_metric_match3.levelDetail[i].yAxisTitle,
                    xAxisCategories, data[conf_metric_match3.levelDetail[i].metric]));

            else if(conf_metric_match3.levelDetail[i].type == 'column')
                charts.push(chartUtils.getBasicColumn(conf_metric_match3.levelDetail[i].title,
                    conf_metric_match3.levelDetail[i].subtitle, conf_metric_match3.levelDetail[i].yAxisTitle,
                    conf_metric_match3.levelDetail[i].xAxisCategories, data[conf_metric_match3.levelDetail[i].metric]));

            else if(conf_metric_match3.levelDetail[i].type == 'pie')
                charts.push(chartUtils.getPieChart(conf_metric_match3.levelDetail[i].title,
                    conf_metric_match3.levelDetail[i].subtitle, data[conf_metric_match3.levelDetail[i].metric]));
        }
        console.log("charts", charts);

        return charts;
    }

    getChartLoseUser(data) {
        console.log("getChartLoseUser", data);

        if(data == null)
            return;

        let title = conf_metric_match3.levelOverview[0].title;
        let subtitle = "";
        let xAxisCategories = ["0", "1", "2", "3", "4", "5", "6-10", "11-16", "17+"];
        let yAxis = [
            { // Secondary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Độ khó',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            },
            { // Primary yAxis
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số Lượt',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
        ];
        let series = [
            {
                name: 'Số người thua rồi thắng',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.loseThenWin,
            },
            {
                name: 'Số người thua',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.lose,
            },
            {
                name: 'Churn Rate',
                type: 'spline',
                data: data.churnRate,
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ];

        return chartUtils.getStackAndLineChart(title, subtitle, xAxisCategories, yAxis, series);
    }
}