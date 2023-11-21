var fieldsTableDetails = [
    { key: 'time', label: 'Thời gian', sortable: true },
    { key: 'price', label: 'Giá', sortable: true },
    { key: 'matchVolume', label: 'KL theo lô', sortable: true },
    { key: 'accumulatedVolume', label: 'KL tích lũy', sortable: true },
    { key: 'proportion', label: 'Tỷ trọng', sortable: true },
    { key: 'changePrice', label: 'Giá thay đổi', sortable: true },
]

var fieldsTableStatistic = [
    { key: 'price', label: 'Giá', sortable: true },
    { key: 'volume', label: 'Khối lượng', sortable: true },
    { key: 'proportion', label: 'Tỷ trọng', sortable: true },
]

var viewSearchLog = new Vue({
    el: '#view-search-data',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        listCodeSearch: [],
        code: 'CTG',

        dateSearch: '',

        listDataSource: ["CAFE_F", "RONG_VIET", "FIREANT"],
        dataSource: 'CAFE_F',

        dataTableDetails: [],
        dataTableStatistic: [],

        isSearching: false,
        errored: false,
        fab: conf_fab,
        perPage: 10,
        currentPage: 1,

        selected: null,
        options: [
            { value: null, text: 'Please select an option' },
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
            { value: { C: '3PO' }, text: 'This is an option with object value' },
            { value: 'd', text: 'This one is disabled', disabled: true }
        ]
    },
    methods: {
        onSearchClicked() {
            var isSearching = true
            if (isEmpty(this.code)) this.makeToast('danger', 'Bạn chưa nhập mã chứng khoán')
            else {
                axios
                    .post('api/haiIndicator/searchData', {
                        code: this.code,
                        dateSearch: this.dateSearch,
                        dataSource: this.dataSource
                    })
                    .then(res => {
                        var data = res.data.matchData
                        this.dataTableDetails = res.data.matchData
                        this.dataTableStatistic = res.data.statisticData
                        console.log(res.data.matchData)
                    })
                    .catch(e => {
                        console.log(e)
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
                console.log(e)
            })
            .finally(() => this.isSearching = false)
        },
    },
    created: function () {
        this.dateSearch = dateToString(new Date())
        this.getListCodeSearch()
    },
})
