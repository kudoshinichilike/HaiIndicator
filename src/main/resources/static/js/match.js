var ACTION = {
    "1": "ERROR",
    "2": "DISCONNECT",
    "3": "RECONNECT",
    //PLAYER ACTION
    "4": "CHOOSE_CARD",
    "5": "ROLL_DICE",
    "6": "ROLL_DICE_WITH_ITEM",
    "7": "QUIT_GAME",
    "8": "BUILD_HOUSE",
    "9": "BUILD_RESORT",
    "10": "SELL_LAND",
    "11": "MINI_GAME_2",
    "12": "MINI_GAME",
    "13": "MINI_GAME_STOP",
    "14": "PRISON_GOLD_ESCAPE",
    "15": "PRISON_CARD_ESCAPE",
    "16": "FAIR_FESTIVAL",
    "17": "MAP_TRAVEL",
    "18": "RESPONSE_FORTURE_CARD",
    "19": "USE_PIN_WHEEL_CARD",
    "20": "KEEPING_CARD",
    "21": "USE_PENDING_CARD",
    "22": "EXCHANGE_LAND",
    "23": "CANCEL_EXCHANGE_LAND",
    "24": "ACQUIRE_LAND",
    "25": "CANCEL_ACQUIRE",
    "26": "LOAN",
    "27": "BANKRUPT",
    "28": "CANCEL_BUILD",
    "29": "USE_AUTO_MODE",
    "30": "LEAVE_AUTO_MODE_1",
    "31": "LEAVE_AUTO_MODE_2",
    "32": "BUY_EVEN_ODD_ITEM",
    "33": "CHOOSE_LAND_TO_SELL",
    "34": "CHOOSE_BLACK_HOLE",
    "35": "FORCED_ENEMY",
    "36": "GOD_HAND_CANCEL",
    "37": "GOD_HAND_LIFT",
    "38": "CHOOSE_MAGICAL_DICE",
    //AI ACTION
    "39": "AI_ROLL_DICE",
    "40": "AI_BUILD_HOUSE",
    "41": "AI_BUILD_RESORT",
    "42": "AI_MINI_GAME",
    "43": "AI_MINI_GAME_2",
    "44": "AI_MAP_TRAVEL",
    "45": "AI_CANCEL_EXCHANGE_LAND",
    "46": "AI_CANCEL_ACQUIRE",
    "47": "AI_DO_ACQUIRE",
    "48": "AI_FAIR_FESTIVAL",
    "49": "AI_RESPONSE_FORTUNE_CARD",
    "50": "AI_USE_PIN_WHELL_CARD",
    "51": "AI_KEEP_CARD",
    "52": "AI_USE_PENDING_CARD",
    "53": "AI_SELL_LAND",
    "54": "AI_BANK_RUPT",
    "55": "AI_FORCED_ENEMY",
    "56": "AI_GOD_HAND_CANCEL",
    "57": "AI_CHOOSE_BLACK_HOLE",
    "58": "AI_CHOOSE_MAGICAL_DICE",
    //NEW
    "59": "ID",
    "60": "CREATE_TIME",
    "61": "SEED",
    "62": "MAP_ID",
    "63": "GOLD",
    "64": "SIZE",
    "65": "CARD",
    "66": "NEXT_TURN",
    "67": "WIN",
    "68": "FIRST_PLAYER",
    "69": "ACTION"
}

var getTime = (arr) => {
    if (conf_match.showTime)
        return ', time=' + timestampToMSM(arr[arr.length - 1])
    return ''
}

var viewMatchLog = new Vue({
    el: '#view-match-log',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        visible: true,
        inputMapId: '',
        inputGold: '',
        inputSize: '',
        inputUserIds: '',
        inputCardIds: '',
        inputSkillIds: '',
        value: [{name: 'Position', code: '0'}],
        options: [
            {name: 'Position', code: '0'},
            {name: 'Gold', code: '1'},
            {name: 'Seed', code: '2'},
            {name: 'All', code: 'all'},
        ],
        inputDateStart: '',
        inputDateEnd: '',
        isSearching: false,
        errored: false,
        items: [],
        fields: ['matchId', 'createTime', 'seed', 'mapId', 'gold', 'size', 'userIds', 'cardIds', 'skillIds', 'show_details'],
        fab: conf_fab
    },
    methods: {
        onSearchClicked() {
            var errorCode = this.value
                .reduce((initArr, currentItem) => {
                    initArr.push(currentItem.code)
                    return initArr
                }, []).join(",")
            console.log('/api/log/getMatchLog?mapId=' + this.inputMapId + '&gold=' + this.inputGold + '&size=' + this.inputSize
                + '&userIds=' + this.inputUserIds + '&cardIds=' + this.inputCardIds + '&skillIds=' + this.inputSkillIds
                + '&dateStart=' + this.inputDateStart + '&dateEnd=' + this.inputDateEnd + '&errorCode=' + errorCode)
            this.isSearching = true
            axios
                .get('/api/log/getMatchLog?mapId=' + this.inputMapId + '&gold=' + this.inputGold + '&size=' + this.inputSize
                    + '&userIds=' + this.inputUserIds + '&cardIds=' + this.inputCardIds + '&skillIds=' + this.inputSkillIds
                    + '&dateStart=' + this.inputDateStart + '&dateEnd=' + this.inputDateEnd + '&errorCode=' + errorCode)
                .then(res => {
                    var data = res.data
                    this.processItems(data)
                })
                .catch(e => {
                    console.log(e)
                    this.errored = true
                })
                .finally(() => this.isSearching = false)
        },

        onExampleClicked() {
            this.inputMapId = 1
            this.inputGold = 1000
            this.inputSize = 2
            this.inputUserIds = ''
            this.inputCardIds = '1,2'
            this.inputSkillIds = '0'
            if (typeof conf_test !== 'undefined')
                this.processItems(conf_test.matchLog)
        },

        processItems(data) {
            var _items = []
            data.forEach(match => {
                var lines = match.split('|')
                var item = {}
                item.matchId = lines[0].split('#')[1]
                item.createTime = new Date(1000 * parseInt(lines[1].split('#')[1])).toLocaleTimeString()
                item.seed = lines[2].split('#')[1]
                item.mapId = lines[3].split('#')[1]
                item.gold = lines[4].split('#')[1]
                item.size = lines[5].split('#')[1]

                var userIds = []
                var cardIds = []
                var skillIds = []
                for (var i = 6; i < 6 + parseInt(item.size); i++) {
                    var line = lines[i]
                    var arr = line.split('#')
                    userIds.push(arr[2])
                    if (!cardIds.includes(arr[3]))
                        cardIds.push(arr[3])
                    if (arr[6].length > 2) {
                        var _skillIds = arr[6].substring(1, arr[6].length - 1).split(',')
                        _skillIds.forEach(skillId => {
                            skillId = skillId.trim()
                            if (!skillIds.includes(skillId))
                                skillIds.push(skillId)
                        })
                    }
                }
                item.userIds = userIds.join()
                item.cardIds = cardIds.join()
                item.skillIds = skillIds.join()
                lines.splice(0, 6)
                item.lines = lines

                _items.push(item)
            })
            this.items = _items
        },

        formatLog(item) {
            var lines = item.lines
            if (item.formated)
                return lines

            if (lines[0].startsWith('64#'))
                return this.newFormatLog(item);

            var mapUIdWithPos = {}
            for (var i = 0; i < lines.length; i++) {
                var arr = lines[i].split('#')
                if (arr[0] === 'player' && arr.length === 7 && arr[6].startsWith('[')) {
                    lines[i] = [
                        'Player ' + arr[1],
                        'uId=' + arr[2],
                        'cardId=' + arr[3],
                        'type=' + arr[4],
                        'level=' + arr[5],
                        'skills=' + arr[6]
                    ].join(', ')
                    mapUIdWithPos[arr[2]] = arr[1]
                    continue
                }

                switch (arr[0]) {
                    case '4':
                        lines[i] = 'Player ' + arr[1] + ' chọn thẻ ' + arr[2]
                        break
                    case 'firstPlayer':
                        lines[i] = 'Player ' + arr[1] + ' được đổ xúc xắc đầu tiên'
                        break
                    case 'nextTurn':
                        lines[i] = 'Next turn từ Player ' + arr[1] + ' sang Player ' + arr[2]
                        break
                    case 'win':
                        lines[i] = 'Player ' + arr[1] + ' thắng kiểu ' + arr[2]
                        break
                    case 'player':
                        lines[i] = [
                            '\tPlayer ' + arr[1],
                            'timer=' + arr[2],
                            'gold=' + arr[3],
                            'action=' + ACTION[arr[4]],
                            'params=' + arr.slice(5, arr.length)
                        ].join(', ')
                        break
                    default:
                        lines[i] = [
                            '\t\tXuất hiện lỗi',
                            'tại Player ' + mapUIdWithPos[arr[1]],
                            'data=' + arr[3],
                        ].join(', ')
                }
            }

            item.formated = true
            item.lines = lines.join('\n')
            return item.lines
        },

        newFormatLog(item) {
            var lines = item.lines

            var mapUIdWithPos = {}
            for (var i = 0; i < lines.length; i++) {
                var arr = lines[i].split('#')

                if (arr[0] === '64') {
                    lines[i] = [
                        'Player ' + arr[1],
                        'userId=' + arr[2],
                        'cardId=' + arr[3],
                        'type=' + arr[4],
                        'level=' + arr[5],
                        'skills=' + arr[6]
                    ].join(', ')
                    mapUIdWithPos[arr[2]] = arr[1]
                    continue
                }

                switch (arr[0]) {
                    case '4':
                        lines[i] = 'Player ' + arr[1] + ' chọn thẻ ' + arr[2]
                        break

                    case '68':
                        lines[i] = 'Player ' + arr[1] + ' đổ xúc xắc đầu'
                        break

                    case '69':
                        lines[i] = [
                            '\tPlayer ' + arr[1],
                            // 'timer=' + arr[2],
                            // 'gold=' + arr[3],
                            // 'pos=' + arr[4],
                            'action=' + ACTION[arr[5]],
                            'params=' + arr.slice(6, arr.length - 1),
                            // 'time=' + timestampToMSM(arr[arr.length - 1])
                        ].join(', ')
                        break

                    case '66':
                        lines[i] = 'Next turn Player ' + arr[1] + ' (gold=' + arr[3] + ', pos=' + arr[4] + ')' + ' -> Player '
                            + arr[2] + ' (gold=' + arr[5] + ', pos=' + arr[6] + ')'
                        break

                    case '67':
                        lines[i] = 'Player ' + arr[1] + ' thắng kiểu ' + arr[2]
                        break

                    case '1':
                        lines[i] = [
                            '\t\tXuất hiện lỗi',
                            'tại Player ' + mapUIdWithPos[arr[4]],
                            'do Player ' + mapUIdWithPos[arr[1]],
                            'data=' + arr[3],
                        ].join(', ')
                        break

                    default:
                        lines[i] = 'Format log bị lệch, liên hệ admin để sửa'
                }
            }

            item.formated = true
            item.lines = lines.join('\n')
            return item.lines
        },

        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },

        getTools() {
            axios
                .get('/api/user/getUser')
                .then(res => {
                    if (res.data.username === 'admin')
                        return
                    this.fab.tools = this.fab.tools.filter(tool => res.data.tools.includes(tool.id))
                    this.fab.isShowMenu = this.fab.tools.length > 1
                })
                .catch(e => {
                    if (typeof conf_test !== 'undefined' && conf_test.enable) {
                        var tools = [2, 3, 4]
                        this.fab.tools = this.fab.tools.filter(tool => tools.includes(tool.id))
                        this.fab.isShowMenu = this.fab.tools.length > 1
                        return
                    }

                    console.log(e)
                    this.errored = true
                    this.fab.isShowMenu = false
                })
                .finally(() => {
                })
        },

        onClickMenu() {
            this.fab.isMenuOpen = !this.fab.isMenuOpen
        }
    },
    created: function () {
        var date = new Date()
        date.setDate(date.getDate() - 1)
        this.inputDateStart = dateToString(date)
        this.inputDateEnd = dateToString(date)
        this.getTools()
    },
})
