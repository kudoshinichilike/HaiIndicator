var TOOL = {}
TOOL.SEARCH = 2;
TOOL.METRIC = 3;
TOOL.MATCH = 4;

var viewUser = new Vue({
    el: '#view-user',
    data: {
        visible: false,
        isSearching: false,
        errored: false,
        itemsOriginal: [],
        items: [],
        fields: ['username', 'searchLog', 'metric', 'match']
    },
    methods: {
        onRefresh() {
            this.isSearching = true
            axios
                .get('/api/user/getListUser')
                .then(res => {
                    console.log(res.data)
                    var users = []
                    res.data.forEach(user => {
                        var _user = {'searchLog': false, 'metric': false}
                        _user.username = user.username
                        if (user.tools !== null) {
                            _user.searchLog = user.tools.includes(TOOL.SEARCH)
                            _user.metric = user.tools.includes(TOOL.METRIC)
                            _user.match = user.tools.includes(TOOL.MATCH)
                        }
                        users.push(_user)
                    })
                    this.items = users;
                    this.itemsOriginal = JSON.parse(JSON.stringify(this.items))
                })
                .catch(e => {
                    console.log(e)
                    this.errored = true
                })
                .finally(() => this.isSearching = false)
        },
        onSave() {
            this.isSearching = true
            var isSendPost = false
            for (var i = 0; i < this.items.length; i++)
                if (JSON.stringify(this.items[i]) !== JSON.stringify(this.itemsOriginal[i])) {
                    isSendPost = true
                    console.log(this.items[i].username)
                    var tools = []
                    if (this.items[i].searchLog)
                        tools.push(TOOL.SEARCH)
                    if (this.items[i].metric)
                        tools.push(TOOL.METRIC)
                    if (this.items[i].match)
                        tools.push(TOOL.MATCH)

                    axios
                        .post('/api/user/updateTools', {
                            'username': this.items[i].username,
                            'tools': tools
                        }, {
                            headers: {
                                "X-XSRF-TOKEN": document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]
                            }
                        })
                        .then(res => {
                            this.itemsOriginal = JSON.parse(JSON.stringify(this.items))
                            console.log(res)
                        })
                        .catch(e => {
                            console.log(e)
                            this.errored = true
                        })
                        .finally(() => this.isSearching = false)
                }
            if (!isSendPost)
                this.isSearching = false
        }
    },
    created: function () {
        this.onRefresh()
    },
    // watch: {
    //     items: {
    //         handler(val) {
    //             console.log(val)
    //         },
    //         deep: true
    //     }
    // }
})
