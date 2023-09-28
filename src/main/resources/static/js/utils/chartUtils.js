var chartUtils = chartUtils || {};

chartUtils.getStackAndLineChart = function (title, subtitle, xAxisCategories, yAxis, series){
    let chart = {
        chart: {
            type: 'xy'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: [{
            categories: xAxisCategories,
            crosshair: true
        }],
        yAxis: yAxis,
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: series
    };

    return chart;
};

chartUtils.getColumnAndLineChart = function (title, subtitle, xAxisCategories, yAxis, series){
    let chart = {
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: [{
            categories: xAxisCategories,
            crosshair: true
        }],
        yAxis: yAxis,
        tooltip: {
            shared: true
        },
        series: series
    };

    return chart;
};

chartUtils.getStackPercentage = function (title, subtitle, yAxisTitle, xAxisCategories, dataSeries){
    let chart = {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: xAxisCategories,
        },
        yAxis: {
            min: 0,
            labels: {
                format: '{value}%',
            },
            title: {
                text: yAxisTitle
            },
            crosshair: true
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: []
    };

    for (const cate in dataSeries) {
        let series = {
            name: cate,
            data: dataSeries[cate]
        };
        chart.series.push(series);
    }

    return chart;
};

chartUtils.getBasicColumn = function (title, subtitle, yAxisTitle, xAxisCategories, dataSeries){
    console.log("getBasicColumn", title);
    console.log("yAxisTitle", yAxisTitle);
    console.log("xAxisCategories", xAxisCategories);
    console.log("dataSeries", dataSeries);
    let chart = {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: xAxisCategories,
        },
        yAxis: {
            title: {
                text: yAxisTitle
            },
            crosshair: true
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: []
    };

    for (const cate in dataSeries) {
        let series = {
            name: cate,
            data: dataSeries[cate]
        };
        chart.series.push(series);
    }

    console.log("getBasicColumn", chart);

    return chart;
};

chartUtils.getPieChart = function (title, subtitle, dataSeries){
    let chart = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: []
        }]
    };

    for (let cate in dataSeries){
        chart.series[0].data.push({
            "name": cate,
            "y": dataSeries[cate]
        });
    }

    console.log("getPieChart", chart);

    return chart;
};

chartUtils.getStackedChart = function (title, subtitle, dataSeries, xAxisCategories, yAxisCategories){
    let chart = {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>',
            shared: true
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        xAxis: {
            categories: xAxisCategories
        },
        yAxis: yAxisCategories,
        series: dataSeries
    };

    console.log("getStackedChart", title, chart);

    return chart;
};