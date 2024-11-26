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

        listDataSource: ['CAFE_F', 'RONG_VIET', 'GDNN'],
        dataSource: 'CAFE_F',

        dataTableDetails: [],
        dataTableStatistic: [],

        isSearching: false,
        errored: false,
        fab: conf_fab,
    },
    methods: {
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

        onDownloadStatistic() {
            console.log("onDownloadTableAsExcelStatistic")
            this.downloadTableAsExcel(this.dataTableStatistic, fieldsTableStatistic)
        },

        onDownloadDetails() {
            console.log("onDownloadTableAsExcelDetails")
            this.downloadTableAsExcel(this.dataTableDetails, fieldsTableDetails)
        },

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

        downloadTableAsExcel(data, fields) {
            // Convert data to Excel format
            const excelData = this.convertToExcel(data, fields);

            // Create a new Excel workbook
            const workbook = XLSX.utils.book_new();

            // Add the worksheet with the Excel data
            XLSX.utils.book_append_sheet(workbook, excelData, 'Sheet1');

            // Generate a binary string from the workbook
            const excelBinaryString = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

            // Convert the binary string to a Blob
            const blob = new Blob([this.s2ab(excelBinaryString)], { type: 'application/octet-stream' });

            // Create a temporary anchor element
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            // Set the anchor element's attributes
            link.setAttribute('href', url);
            link.setAttribute('download', 'table_data.xlsx');

            // Simulate a click on the anchor element to trigger the download
            link.click();
        },

        convertToExcel(data, fields) {
            var excelRows = [];

            // Add headers row
            var headerRow = [];

            fields.forEach(field => {
                headerRow.push(field.label)
            });
            excelRows.push(headerRow);

            // Add data rows
            data.forEach(item => {
              var rowData = [];
              fields.forEach(field => {
                    rowData.push(item[field.key])
                }
              );
              excelRows.push(rowData);
            });

            // Convert rows to worksheet format
            return XLSX.utils.aoa_to_sheet(excelRows);
        },

        s2ab(s) {
            // Convert a string to an ArrayBuffer
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
              view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        },
    },
    created: function () {
        this.dateSearch = dateToString(new Date())
        this.getListCodeSearch()
    },
})
