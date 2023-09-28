var metric_items = {
    "ThoiGian": "Thời gian",
    "Gia": "Giá",
    "GiaThayDoi": "Giá thay đổi",
    "KLLo": "KL theo lô",
    "KLTichLuy": "KL tích lũy",
    "TiTrong": "Tỷ trọng"
}

var items = []

var fields = []

var viewSearchLog = new Vue({
    el: '#view-search-data',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        visible: true,
        code: '',
        dateSearch: '',
        isSearching: false,
        errored: false,
        fab: conf_fab
    },
    methods: {
        onSearchClicked() {
            var isSearching = true
            this.makeToast('warning')

//                            "code": this.code,
//                            "dateSearch": this.dateSearch

            console.log('onSearchClicked, code = ' + this.code + ', dateSearch=' + this.dateSearch)
            axios
                .post('api/haiIndicator/searchData', {
//                    code: this.code,
//                    dateSearch: this.dateSearch,
                    code: "FPT",
                    dateSearch: "9/22/2023",
                })
                .then(res => {
                    var data = res.data
                    console.log("res data: " + JSON.stringify(data))
//                    var _fields = []
//                    var _items = []
//                    var _maxColumn = 0;
//                    data.forEach((item) => {
//                        var columns = item.split("|")
//                        _maxColumn = Math.max(_maxColumn, columns.length)
//                        var item = {}
//                        item["metric"] = columns[0]
//                        item["time"] = columns[1]
//                        for (var i = 2; i < columns.length; i++)
//                            item['column' + i] = columns[i]
//                        _items.push(item)
//                    })
//                    _fields.push({key: "metric", sortable: true})
//                    _fields.push({key: "time", sortable: true})
//                    for (var i = 2; i < _maxColumn; i++)
//                        _fields.push({key: 'column' + i, sortable: true})
//
//                    this.fields = _fields
//                    this.items = _items
//                    this.totalRows = this.items.length
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => this.isSearching = false)
        },

        makeToast(variant = null) {
            this.$bvToast.toast('Tìm full log của user trong nhiều ngày sẽ chậm, và có thể không cần thiết. Nhập những "tag" thực sự cần tìm để đạt hiệu quả tốt nhất', {
                title: 'Warning',
                variant: variant,
                solid: true,
                autoHideDelay: 8000
                // noAutoHide: true
            })
        },
    },
    created: function () {
        this.dateSearch = dateToString(new Date())
    },
})
