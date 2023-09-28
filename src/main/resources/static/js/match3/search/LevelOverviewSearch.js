class LevelOverviewSearch {
    constructor(match3Metric) {
        this.match3Metric = match3Metric;
    }

    getLevelListOverview() {
        if(this.match3Metric.levelStart.length == 0 || this.match3Metric.levelEnd.length == 0)
        {
            this.match3Metric.levelList = [];
            this.match3Metric.charts = null;
            this.match3Metric.isSearching = false;
            return;
        }

        console.log("getLevelList levelStart", this.match3Metric.levelStart, "levelEnd", this.match3Metric.levelEnd);

        this.match3Metric.levelList = [];
        for (let i = this.match3Metric.levelStart; i <= this.match3Metric.levelEnd; i++){
            this.match3Metric.levelList.push(i);
        }

        console.log("getLevelList", this.match3Metric.levelList);

        axios
            .get('/api/log/getLastVersionLevel', {
                traditional: true,
                params: {
                    level: this.match3Metric.levelList.toString()
                }
            })
            .then(res => {
                for (let i = 0; i < this.match3Metric.levelList.length; i++)
                    this.match3Metric.levelList[i] += "." + res.data[i];
                this.searchLevelOverview();
            })
            .catch(e => {
                console.error(e);
            })
    }

    searchLevelOverview() {
        console.log("searchLevelOverview", this.match3Metric.levelList);

        if(this.match3Metric.levelList.length === 0)
        {
            this.match3Metric.charts = null;
            this.match3Metric.isSearching = false;
            return;
        }

        axios
            .get('/api/log/getMetricMatch3LevelOverview', {
                traditional: true,
                params: {
                    levelList: this.match3Metric.levelList.toString(),
                    dateStart: this.match3Metric.inputStartDate,
                    dateEnd: this.match3Metric.inputEndDate
                }
            })
            .then(res => {
                let chartCreator = new ChartLevelOverviewCreator(this.match3Metric.levelList);
                this.match3Metric.charts = chartCreator.getChartsLevelOverview(res.data);
            })
            .catch(e => {
                console.error(e);
                this.match3Metric.errored = true;
                viewMetric.loader.hide();
            })
            .finally(() => this.match3Metric.isSearching = false);
    }
}