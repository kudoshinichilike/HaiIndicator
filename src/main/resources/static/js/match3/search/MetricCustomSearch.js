class MetricCustomSearch {
    constructor(match3Metric) {
        this.match3Metric = match3Metric;
    }

    customSearch() {
        axios
            .get('/api/log/getMetricLog', {
                params: {
                    inputLevel: this.match3Metric.inputLevel,
                    gameId: "match3Live",
                    metricName: this.match3Metric.metricName,
                    dateStart: this.match3Metric.inputStartDate,
                    dateEnd: this.match3Metric.inputEndDate
                }
            })
            .then(res => {
                this.getCharts(res.data);
            })
            .catch(e => {
                console.error(e);
                this.match3Metric.errored = true;
                viewMetric.loader.hide();
            })
            .finally(() => this.match3Metric.isSearching = false);
    }

    getCharts(_data) {
        console.log("_data = ", JSON.stringify(_data));
        this.makeLoader();
        console.time('This');
        let config = conf_metric_match3[this.match3Metric.metricName];
        this.match3Metric.numChart = config.length;
        let key = 1;
        config.forEach(chart => {
            chart.key = key++;
            if (chart.series)
                chart.series.forEach(serie => serie.data = []);
            else
                chart.series = [];
        });
        let dates = [];

        for (let date in _data) {
            let data = _data[date];
            config.forEach(chart => {
                if (chart.multipleKey) {
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
            if (chart.ignoreGames && chart.ignoreGames.includes(match3Metric.gameSelected))
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

        console.log("_charts = ", JSON.stringify(_charts));
        this.match3Metric.charts = [];
        this.match3Metric.heatMapIds = [];
        setTimeout(() => this.match3Metric.charts = _charts, 0);
        console.timeEnd('This');
    }

    makeLoader() {
        this.match3Metric.loader = Vue.$loading.show({
            color: '#007bff',
            'loader': 'dots',
            width: 128,
            height: 128,
        });
    }
}