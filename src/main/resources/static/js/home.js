var home = new Vue({
    el: "#home",
    data: {
        code: "",
        indexType: "",
    },
    methods: {
        onClickTabMetric(metric) {
            viewMetric.visible = true
            viewSearchLog.visible = false
            viewMetric.onViewMetric(metric)
        },
        onClickTabSearchLog() {
            viewSearchLog.visible = true
            viewMetric.visible = false
        },
        click_submit (gameId) {
            console.log("phuong");
        },
    },
    watch: {

    },
});