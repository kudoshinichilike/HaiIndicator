class ChartLevelOverviewCreator {
    constructor(levelList) {
        this.levelList = levelList;
    }

    getChartsLevelOverview(data) {
        console.log("getChartsLevelOverview", data);
        if(data == null)
            return;

        let charts = [];
        let xAxisCategories = this.levelList;

        for (let i = 0; i < conf_metric_match3.levelOverview.length; i++) {
            let metricName = conf_metric_match3.levelOverview[i].metric;
            let chart;
            if(metricName == 'difficulty')
                chart = this.getChartDifficulty(data[metricName]);
            else if(metricName == 'turnUseTool_Booster')
                chart = this.getChartTurnUseTool_Booster(conf_metric_match3.levelOverview[i].title, conf_metric_match3.levelOverview[i].subtitle,
                    data['turnUseTool'], data['turnUseBooster']);
            else if(metricName == 'playerUseTool_Booster')
                chart = this.getChartPlayerUseTool_Booster(conf_metric_match3.levelOverview[i].title, conf_metric_match3.levelOverview[i].subtitle,
                    data['playerUseTool'], data['turnUseTool'], data['playerUseBooster'], data['turnUseBooster']);
            else if(metricName == 'userBuyMove')
                chart = this.getChartUserBuyMove(conf_metric_match3.levelOverview[i].title, conf_metric_match3.levelOverview[i].subtitle,
                    data[metricName], data['cntUserPlayLevel']);
            else if(metricName == 'heartEqual0')
                chart = this.getChartHeartEqual0(conf_metric_match3.levelOverview[i].title, conf_metric_match3.levelOverview[i].subtitle,
                    data[metricName], data['cntUserPlayLevel'], data['firstHeartEqual0']['match3_first_time_heart_0']);
            else if(metricName == 'firstChargeByLevel')
                chart = this.getChartFirstCharge(conf_metric_match3.levelOverview[i].title, conf_metric_match3.levelOverview[i].subtitle,
                    data[metricName]['first_charge'], data['cntUserPlayLevel']);
            else if(conf_metric_match3.levelOverview[i].type == 'stackPercentage')
                chart = chartUtils.getStackPercentage(conf_metric_match3.levelOverview[i].title,
                    conf_metric_match3.levelOverview[i].subtitle, conf_metric_match3.levelOverview[i].yAxisTitle,
                    xAxisCategories, data[metricName]);
            else if(conf_metric_match3.levelOverview[i].type == 'column')
                chart = chartUtils.getBasicColumn(conf_metric_match3.levelOverview[i].title,
                    conf_metric_match3.levelOverview[i].subtitle, conf_metric_match3.levelOverview[i].yAxisTitle,
                    xAxisCategories, data[metricName]);

            console.log("chart", metricName, " = ", JSON.stringify(chart));
            if(chart != null)
                charts.push(chart);
        }

        return charts;
    }

    /***
     * Lấy chart Lượt chơi, thắng, thua, độ khó. Biểu đồ stack + đường
     * @param data
     * @returns {{plotOptions: {column: {stacking: string}}, yAxis: *, xAxis: [{crosshair: boolean, categories: *}], legend: {layout: string, verticalAlign: string, backgroundColor, floating: boolean, x: number, y: number, align: string}, series: *, subtitle: {text: *}, tooltip: {shared: boolean}, title: {text: *}, chart: {type: string}}}
     */
    getChartDifficulty(data) {
        console.log("getChartDifficulty", data);

        if(data == null)
            return;

        let title = conf_metric_match3.levelOverview[0].title;
        let subtitle = "";
        let xAxisCategories = this.levelList;
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
                name: 'Khác',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.others,
            },
            {
                name: 'Out',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.luotThoat,
            },
            {
                name: 'Thua',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.luotThua,
            },
            {
                name: 'Thắng',
                type: 'column',
                stack: 1,
                yAxis: 1,
                data: data.luotThang,
            },
            {
                name: 'Độ khó',
                type: 'spline',
                data: data.diff,
                tooltip: {
                    valueSuffix: '%'
                }
            },
            {
                name: 'Độ khó thắng/thua',
                type: 'spline',
                data: data.diffWinLose,
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ];

        return chartUtils.getStackAndLineChart(title, subtitle, xAxisCategories, yAxis, series);
    }

    getChartTurnUseTool_Booster(tittle, subtitle, dataUseTool, dataUseBooster) {
        console.log("getChartTurnUseTool_Booster", JSON.stringify(dataUseTool));
        console.log("dataUseTool", JSON.stringify(dataUseTool));
        console.log("dataUseBooster", JSON.stringify(dataUseBooster));

        if(dataUseTool == null || dataUseBooster == null)
            return;

        let xAxisCategories = this.levelList;
        let yAxisCategories = {
            min: 0,
            title: {
                text: 'Lượt dùng'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        };

        let dataSeries =  [{
            name: 'Bom Pháo',
            stack: "1",
            data: dataUseBooster[0],
        }, {
            name: 'Hạt đa sắc',
            stack: "1",
            data: dataUseBooster[1]
        }, {
            name: 'Máy bay',
            stack: "1",
            data: dataUseBooster[2]
        }, {
            name: 'Búa',
            stack: "2",
            data: dataUseTool['bua']
        }, {
            name: 'Búa tạ',
            stack: "2",
            data: dataUseTool['buaTa']
        }, {
            name: 'Găng tay',
            stack: "2",
            data: dataUseTool['gangTay']
        }
        ]

        return chartUtils.getStackedChart(tittle, subtitle, dataSeries, xAxisCategories, yAxisCategories);
    }

    getChartFirstCharge(tittle, subtitle, data, dataCntUserPlayLevel) {
        console.log("getChartFirstCharge data", JSON.stringify(data), " dataCntUserPlayLevel ", JSON.stringify(dataCntUserPlayLevel));

        if(data == null)
            return;

        let xAxisCategories = this.levelList;
        let yAxisCategories = [
            { // Secondary yAxis
                min: 0,
                max: 100,
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Tỷ lệ',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số người nạp lần đầu',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
        ];

        let tyLe = [];
        for (let i = 0; i < this.levelList.length; i++) {
            if(dataCntUserPlayLevel[i] == 0)
                tyLe.push(0);
            else
                tyLe.push(data[i] / dataCntUserPlayLevel[i] * 100);
        }

        let dataSeries =  [
            {
                name: 'Số người nạp',
                type: 'column',
                data: data,
            },
            {
                name: 'Tỷ lệ',
                type: 'spline',
                data: tyLe,
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ];

        return chartUtils.getStackAndLineChart(tittle, subtitle, xAxisCategories, yAxisCategories, dataSeries);
    }

    getChartUserBuyMove(tittle, subtitle, data, dataCntUserPlayLevel) {
        console.log("getChartUserBuyMove data", JSON.stringify(data), " dataCntUserPlayLevel ", JSON.stringify(dataCntUserPlayLevel));

        if(data == null)
            return;

        let xAxisCategories = this.levelList;
        let yAxisCategories = [
            { // Secondary yAxis
                min: 0,
                max: 100,
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Tỷ lệ người mua thêm',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số người mua thêm',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
        ];

        let tyLe = [];
        for (let i = 0; i < this.levelList.length; i++) {
            if(dataCntUserPlayLevel[i] == 0)
                tyLe.push(0);
            else
                tyLe.push(data[i] / dataCntUserPlayLevel[i] * 100);
        }

        let dataSeries =  [
            {
                name: 'Người dùng',
                type: 'column',
                data: data,
            },
            {
                name: 'Tỷ lệ dùng',
                type: 'spline',
                data: tyLe,
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ];

        return chartUtils.getStackAndLineChart(tittle, subtitle, xAxisCategories, yAxisCategories, dataSeries);
    }

    getChartPlayerUseTool_Booster(tittle, subtitle, dataPlayerUseTool, dataTurnUseTool, dataPlayerUseBooster, dataTurnUseBooster) {
        console.log("getChartPlayerUseBooster dataPlayerUseTool", JSON.stringify(dataPlayerUseTool));
        console.log("getChartPlayerUseBooster dataTurnUseTool", JSON.stringify(dataTurnUseTool));
        console.log("getChartPlayerUseBooster dataPlayerUseBooster", JSON.stringify(dataPlayerUseBooster));
        console.log("getChartPlayerUseBooster dataTurnUseBooster", JSON.stringify(dataTurnUseBooster));

        if(dataPlayerUseTool == null || dataTurnUseTool == null || dataPlayerUseBooster == null || dataTurnUseBooster == null)
            return;

        let xAxisCategories = this.levelList;
        let yAxisCategories = [
            { // Secondary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số booster / người',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số người dùng',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
        ];

        let trungBinhDungBooster = [], turnUseBooster = [], trungBinhDungTool = [], turnUseTool = [];
        for (let i = 0; i < this.levelList.length; i++) {
            if(dataPlayerUseBooster[i] == 0)
                trungBinhDungBooster.push(0);
            else
            {
                let turnUse = dataTurnUseBooster[0][i] + dataTurnUseBooster[1][i] + dataTurnUseBooster[2][i];
                turnUseBooster.push(turnUse);
                trungBinhDungBooster.push(turnUse / dataPlayerUseBooster[i]);
            }

            if(dataPlayerUseTool[i] == 0)
                trungBinhDungTool.push(0);
            else
            {
                let turnUse = dataTurnUseTool['bua'][i] + dataTurnUseTool['buaTa'][i] + dataTurnUseTool['gangTay'][i];
                turnUseTool.push(turnUse);
                trungBinhDungTool.push(turnUse / dataPlayerUseTool[i]);
            }
        }

        let dataSeries =  [
            {
                name: 'Người dùng tool',
                type: 'column',
                data: dataPlayerUseTool,
                stack: "1"
            },
            {
                name: 'Trung bình dùng tool',
                type: 'spline',
                data: trungBinhDungTool,
            },
            {
                name: 'Người dùng booster',
                type: 'column',
                data: dataPlayerUseBooster,
                stack: "2"
            },
            {
                name: 'Trung bình dùng booster',
                type: 'spline',
                data: trungBinhDungBooster,
            }
        ];

        return chartUtils.getStackAndLineChart(tittle, subtitle, xAxisCategories, yAxisCategories, dataSeries);
    }

    getChartHeartEqual0(title, subtitle, data, dataCntUserPlayLevel, dataFirstHeartEqual0) {
        console.log("getChartHeartEqual0 data", JSON.stringify(data),
            " dataCntUserPlayLevel ", JSON.stringify(dataCntUserPlayLevel),
            "dataFirstHeartEqual0 ", JSON.stringify(dataFirstHeartEqual0));

        if(data == null)
            return;

        let xAxisCategories = this.levelList;
        let yAxisCategories = [
            { // Secondary yAxis
                min: 0,
                max: 100,
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Tỷ lệ',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            },
            { // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Số người',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
        ];

        let tyLeHeart0 = [], tyLeFirstHeart0 = [];
        for (let i = 0; i < this.levelList.length; i++) {
            if(dataCntUserPlayLevel[i] === 0)
            {
                tyLeHeart0.push(0);
                tyLeFirstHeart0.push(0);
            }
            else
            {
                tyLeHeart0.push(data[i] / dataCntUserPlayLevel[i] * 100);
                tyLeFirstHeart0.push(dataFirstHeartEqual0[i] / dataCntUserPlayLevel[i] * 100);
            }
        }

        let dataSeries =  [
            {
                name: 'Số người hết tim',
                type: 'column',
                data: data,
            },
            {
                name: 'Số người lần đầu hết tim',
                type: 'column',
                data: dataFirstHeartEqual0,
            },
            {
                name: 'Tỷ lệ người hết tim',
                type: 'spline',
                data: tyLeHeart0,
                tooltip: {
                    valueSuffix: '%'  
                }
            },
            {
                name: 'Tỷ lệ người lần đầu hết tim',
                type: 'spline',
                data: tyLeHeart0,
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ];

        return chartUtils.getColumnAndLineChart(title, subtitle, xAxisCategories, yAxisCategories, dataSeries);
    }
}
