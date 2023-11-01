var viewSearchLog = new Vue({
    el: '#view-detect-one-indicator',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
//        listCodeSearch: [],
        listCodeSearch: [{name: "ALL_CODE"}],
        code: [],

        startDate: '',
        endDate: '',

        listIndicator: [],
        nameIndicator: '',

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
        ],
        items: [],
    },
    methods: {
        onSearchClicked() {
            var isSearching = true
            if (isEmpty(this.code)) this.makeToast('danger', 'Bạn chưa nhập đủ thông tin')
            else {
                var listCodeReq = [];
                this.code.forEach ( it => {
                    listCodeReq.push(it.name)
                }
                );

                axios
                    .post('api/haiIndicator/detectOneIndicator', {
                        code: listCodeReq,
                        indicatorName: this.nameIndicator,
                        dateStart: this.startDate,
                        dateEnd: this.endDate
                    })
                    .then(res => {
                        if (res.data.error != 0)
                            this.makeToast('danger', "Lỗi")
                        else {
                            this.makeToast('warning', "Xử lý thành công")
    //                        console.log("res", res.data)
                            this.items = []
                            //TODO: if error != 0 notify
                            const dataItem = res.data.result
                            const datesInRange = getDates(this.startDate, this.endDate);
                            var maxLenValidCode = 0
                            datesInRange.forEach(date => {
                                const dateStr = dateToString(date)
                                this.fields.push({ key: dateStr, label: dateStr, sortable: false })
                                if (!isUndefined(dataItem[dateStr]) && !isEmpty(dataItem[dateStr]))
                                    maxLenValidCode = Math.max(maxLenValidCode, dataItem[dateStr].length)
                            });

                            for (let i = 0; i < maxLenValidCode; i++) {
                                var item = {}
                                datesInRange.forEach(date => {
                                    const dateStr = dateToString(date)
                                    if (!isUndefined(dataItem[dateStr]) && !isEmpty(dataItem[dateStr])) {
                                        if (i < dataItem[dateStr].length) {
                                            const curCode = dataItem[dateStr][i]
                                            item[dateStr] = curCode
                                        }
                                    }
                                });

                                this.items.push(item)
    //                            console.log("item : " + JSON.stringify(item))
                            }
                        }
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
                res.data.forEach( it =>
                    this.listCodeSearch.push({name: it})
                )
//                console.log("listCodeSearch", this.listIndicator)
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
                this.listIndicator = res.data
            })
            .catch(e => {
//                console.log(e)
                this.makeToast('danger', e)
            })
            .finally(() => this.isSearching = false)
        },

        addCode(newCode) {
            const tag = {
                name: newCode
            }
            this.code.push(tag)
        },
    },

    watch: {
        startDate: function (val) {
            let endDateCalc = new Date(this.startDate);
            endDateCalc.setDate(endDateCalc.getDate() + 31);
            if (this.endDate != dateToString(endDateCalc))
            this.endDate = dateToString(endDateCalc)
        },

        endDate: function (val) {
            let startDateCalc = new Date(this.endDate);
            startDateCalc.setDate(startDateCalc.getDate() - 31);
            if (this.startDate != dateToString(startDateCalc))
                this.startDate = dateToString(startDateCalc)
        },
    },

    created: function () {
        this.getListCodeSearch()
        this.getListIndicator()

        let startDateInit = new Date();
        startDateInit.setDate(startDateInit.getDate() - 31);
        this.startDate = dateToString(startDateInit);
        this.endDate = dateToString(new Date());
    },
})
