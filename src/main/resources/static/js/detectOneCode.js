var viewSearchLog = new Vue({
    el: '#view-detect-one-code',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        listCodeSearch: [],
        code: 'DIG',

        startDate: '',
        endDate: '',

        listIndicator: [{name: "All"}],
        nameIndicator: [],

        dataTableDetails: [],
        dataTableStatistic: [],

        isSearching: false,
        errored: false,
        fab: conf_fab,
        perPage: 10,
        currentPage: 1,

        selected: null,
        fields: [
//            { key: 'time', label: 'Thời gian', sortable: true },
//            { key: 'price', label: 'Giá', sortable: true },
//            { key: 'matchVolume', label: 'KL theo lô', sortable: true },
//            { key: 'accumulatedVolume', label: 'KL tích lũy', sortable: true },
//            { key: 'proportion', label: 'Tỷ trọng', sortable: true },
//            { key: 'changePrice', label: 'Giá thay đổi', sortable: true },
        ],
        items: [],
    },
    methods: {
        onSearchClicked() {
            var isSearching = true
            if (isEmpty(this.code) || Object.keys(this.nameIndicator).length == 0) {
                this.makeToast('danger', 'Bạn chưa nhập mã chứng khoán')
                return
            }

            if (!isDateDifferenceLessThanDays(this.startDate, this.endDate, 32)) {
                this.makeToast('danger', 'Chỉ tìm kiếm được trong khoảng thời gian tối đa 1 tháng')
                return
            }

            else {
                var listIndicatorSearch = [];
                let canSearch = true
                this.nameIndicator.forEach ( it => {
                    if (!canSearch)
                        return

                    if (!Object.values(this.listIndicator).includes(it)) {
                        this.makeToast('danger', 'Sai tên chỉ báo')
                        canSearch = false
                        return
                    }

                    if (!listIndicatorSearch.includes(it))
                        listIndicatorSearch.push(it.name)
                }
                );

//                console.log("listIndicatorSearch " + JSON.stringify(listIndicatorSearch))
                if (!canSearch)
                    return

                axios
                    .post('api/haiIndicator/detectOneCode', {
                        code: this.code,
                        indicatorName: listIndicatorSearch,
                        dateStart: this.startDate,
                        dateEnd: this.endDate
                    })
                    .then(res => {
                        this.items = []
                        if (res.data.error != 0)
                            this.makeToast('danger', "Lỗi")
                        else {
                            this.makeToast('warning', "Xử lý thành công")
    //                        console.log("res", res.data)
                            var item = {}
                            //TODO: if error != 0 notify
                            for (indicatorName in res.data.result) {
                                const dateValid = res.data.result[indicatorName]
    //                            console.log(indicatorName + ": " + JSON.stringify(dateValid))
                                item[indicatorName] = ""
                            }
                            this.items.push(item)

//                            console.log("fields: ", JSON.stringify(this.fields))

                            const datesInRange = getDates(this.startDate, this.endDate);
                            let maxSizeDatesRes = 0
                            for (indicatorName in res.data.result) {
                                const dateValid = res.data.result[indicatorName]
                                maxSizeDatesRes = Math.max(maxSizeDatesRes, dateValid.length)
                            }

                            for (let i = 0; i < maxSizeDatesRes; i++) {
                                item = {}
                                for (indicatorName in res.data.result) {
                                    if (res.data.result[indicatorName].length > i)
                                        item[indicatorName] = res.data.result[indicatorName][i]
                                }

                                this.items.push(item)
                                console.log("item : " + JSON.stringify(item))
                            }
                        }

//                        console.log("phuong this.items : " + JSON.stringify(this.items))
                    })
                    .catch(e => {
//                        console.log(e)
                        this.makeToast('danger', e)
                    })
                    .finally(() => this.isSearching = false)
            }
        },

        makeToast(variant = null, msg) {
            this.$bvToast.toast(msg, {
                title: 'Thông báo',
                variant: variant,
                solid: true,
                autoHideDelay: 8000
                // noAutoHide: true
            })
        },

        getListCodeSearch() {
            var isSearching = true
            axios.get('api/haiIndicator/getListCode')
            .then(res => {
                this.listCodeSearch = res.data
            })
            .catch(e => {
//                console.log(e)
                this.makeToast('danger', e)
            })
            .finally(() => this.isSearching = false)
        },

        getListIndicator() {
            var isSearching = true
            axios.get('api/haiIndicator/getListIndicator')
            .then(res => {
//                console.log("listIndicator", res.data)
                res.data.forEach( it =>
                    this.listIndicator.push({name: it})
                )
//                console.log("listIndicator", this.listIndicator)
            })
            .catch(e => {
//                console.log(e)
                this.makeToast('danger', e)
            })
            .finally(() => this.isSearching = false)
        },

        addIndicator(newIndicator) {
            const tag = {
                name: newIndicator
            }
            this.nameIndicator.push(tag)
        }
    },

//    watch: {
//        startDate: function (val) {
//            let endDateCalc = new Date(this.startDate);
//            endDateCalc.setDate(endDateCalc.getDate() + 31);
//            if (this.endDate != dateToString(endDateCalc))
//            this.endDate = dateToString(endDateCalc)
//        },
//
//        endDate: function (val) {
//            let startDateCalc = new Date(this.endDate);
//            startDateCalc.setDate(startDateCalc.getDate() - 31);
//            if (this.startDate != dateToString(startDateCalc))
//                this.startDate = dateToString(startDateCalc)
//        },
//    },

    created: function () {
        this.getListCodeSearch()
        this.getListIndicator()

        let startDateInit = new Date();
        startDateInit.setDate(startDateInit.getDate() - 30);
        this.startDate = dateToString(startDateInit);
        this.endDate = dateToString(new Date());
    },
})
