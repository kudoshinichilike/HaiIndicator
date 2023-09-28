class LevelDetailSearch {
    constructor(match3Metric) {
        this.match3Metric = match3Metric;
    }

    searchLevelDetail() {
        if(this.match3Metric.levelDetail.length == 0)
        {
            this.match3Metric.charts = null;
            this.match3Metric.isSearching = false;
            return;
        }

        if(!this.match3Metric.levelDetail.includes("."))
            this.getLevelVersionDetail();
        else
            this.getLevelDetail();
    }

    getLevelVersionDetail(){
        console.log("getLevelVersionDetail", this.match3Metric.levelDetail);
        axios
            .get('/api/log/getLastVersionLevel', {
                traditional: true,
                params: {
                    level: this.match3Metric.levelDetail
                }
            })
            .then(res => {
                this.match3Metric.levelDetail += "." + res.data;
                console.log("getLevelVersionDetail", this.match3Metric.levelDetail);
                this.getLevelDetail();
            })
            .catch(e => {
                console.error(e);
            })
    }

    getLevelDetail() {
        axios
            .get('/api/log/getMetricMatch3LevelDetail', {
                traditional: true,
                params: {
                    levelDetail: this.match3Metric.levelDetail,
                    dateStart: this.match3Metric.inputStartDate,
                    dateEnd: this.match3Metric.inputEndDate
                }
            })
            .then(res => {
                let chartCreator = new ChartLevelDetailCreator(this.match3Metric.levelList);
                this.match3Metric.charts = chartCreator.getChartsLevelDetail(res.data);
            })
            .catch(e => {
                console.error(e);
                this.match3Metric.errored = true;
                viewMetric.loader.hide();
            })
            .finally(() => this.match3Metric.isSearching = false);
    }
}