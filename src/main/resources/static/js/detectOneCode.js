var viewSearchLog = new Vue({
    el: '#view-detect-one-code',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        listCodeSearch: [],
        code: 'NKG',

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
            if (isEmpty(this.code) || Object.keys(this.nameIndicator).length == 0) {
                this.makeToast('danger', 'Bạn chưa nhập mã chứng khoán')
                return
            }

            if (Object.keys(this.nameIndicator).length == 0) {
                this.makeToast('danger', 'Bạn chưa chọn chỉ báo cần tìm kiếm')
                return
            }

            if (!isDateDifferenceLessThanDays(this.startDate, this.endDate, 30)) {
                this.makeToast('danger', 'Chỉ tìm kiếm được trong khoảng thời gian tối đa 30 ngày')
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

                this.isSearching = true
                this.makeToast('warning', "Đợi xíu, đang tìm nhé ạ ^^ ...", 2000)

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
                            console.log("res", res.data)
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

        makeToast(variant = null, msg, time = 8000) {
            this.$bvToast.toast(msg, {
                title: 'Thông báo',
                variant: variant,
                solid: true,
                autoHideDelay: time
                // noAutoHide: true
            })
        },

        getListCodeSearch() {
            this.isSearching = true
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
            this.isSearching = true
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
        },

        onHidden() {
        },
    },

    watch: {
        endDate: function (val) {
            let startDateCalc = new Date(this.endDate);
            startDateCalc.setDate(startDateCalc.getDate() - 29);
            if (this.startDate != dateToString(startDateCalc))
                this.startDate = dateToString(startDateCalc)
        },
    },

    created: function () {
        this.getListCodeSearch()
        this.getListIndicator()

        let startDateInit = new Date();
        startDateInit.setDate(startDateInit.getDate() - 29);
        this.startDate = dateToString(startDateInit);

        let startEndInit = new Date();
        startEndInit.setDate(startEndInit.getDate() - 1);
        this.endDate = dateToString(startEndInit);
    },
})
