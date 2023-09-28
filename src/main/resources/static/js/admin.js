var games = [
    {value: 'vi', text: 'CTP Việt'},
    {value: 'sea', text: 'CTP Sea'},
    {value: 'br', text: 'CTP Brazil&Mexico'},
    {value: 'vi-dev', text: 'CTP Viet dev'},
//    {value: 'mini', text: 'CTP Mini'},
//    {value: 'monstone', text: 'Chiến Tướng'},
//    {value: 'cuajo', text: 'Cuajo'},
//    {value: 'show', text: 'Show'},
//    {value: 'match3', text: 'Mach3'}
];

var userDataGameToClassNames = {
    'vi': ['model.AccountInfo', 'model.ExtraInfo', 'model.InboxModel', 'modules.event.luckybox.LuckyBoxModel'],
    'sea': ['model.AccountInfo', 'model.ExtraInfo', 'model.InboxModel'],
    'br': ['model.AccountInfo', 'model.ExtraInfo', 'model.InboxModel'],
    'mini': ['model.AccountInfo'],
    'monstone': ['model.AccountInfo', 'model.StorageModel'],
    'cuajo': ['model.AccountInfo', 'model.ExtraInfo', 'model.Storage']
}

var giftCodeGameToItemNames = {
    'vi': ['GOLD', 'MIRACLE_CARD_A', 'HIT_EGG_HAMMER', 'PURPLE_GACHA', '_PENDANT_8', '_PENDANT_9'],
    'sea': [],
    'br': ['GOLD'],
    'mini': ['GOLD', 'G'],
    'monstone': ['GOLD', 'GACHA_NORMAL', 'GACHA_RARE', 'GACHA_EPIC'],
    'cuajo': ['GOLD', 'GSTAR']
}

var viewAdmin = new Vue({
    el: "#view-admin",
    data: {
        isProcessing: false,
        noCommand: false,
        commands: [],
        options: {},
        //
        maintain_selected: 'vi',
        maintain_start: '',
        maintain_end: '',
        //
        userData_selected: 'vi',
        userData_userId: '531964023',
        userData_className: 'model.AccountInfo',
        userData_classNames: userDataGameToClassNames.vi,
        userData_json: null,
        valueDataMatch3: null,

        //
        giftCode_selected: 'vi',
        giftCode_itemList: '',
        giftCode_itemAmount: '1,000',
        giftCode_itemName: 'GOLD',
        giftCode_itemNames: giftCodeGameToItemNames.vi,
        giftCode_limit: -1,
        giftCode_number: 1,
        giftCode_length: 10,
        giftCode_dateExpired: '',
        giftCode_codes: '',
        giftCode_userCanReceiveMul: 0,
        giftCode_type: 1,
        giftCode_inputCode: '',
        giftCode_limitPerDevice: 0,
        giftCode_limitUserAge: 0,
        giftCode_limitMatchPlayed: 0,
        giftCode_keepIfOutOfCode: 0,
        //
        inbox_selected: 'vi',
        inbox_itemList: '',
        inbox_itemAmount: '1,000',
        inbox_itemName: 'GOLD',
        inbox_itemNames: giftCodeGameToItemNames.vi,
        inbox_userId: '531964023',
        inbox_title: '',
        inbox_des: '',
        //
        invokeStaticMethod_selected: 'vi',
        invokeStaticMethod_className: '',
        invokeStaticMethod_methodName: '',
        //
        serverInfo_selected: '',
        serverInfo_match: '?',
        serverInfo_room: '?',
        serverInfo_ccu: '?',
        //
        user_username: '',
        user_tool: '',
        user_command: '',
        user_game: '',
        //
        sendCmd_selected: 'vi',
        sendCmd_cmdId: '',
        sendCmd_data: '',

        //set Data
        checkedSetData: false,

        evtType: '',
        evtTimeStart: '',
        evtTimeEnd: '',
        evtCount: '',
        evtTypeList : EventDefine.vi,
    },
    methods: {
        isPermit(command) {
            if (this.commands.includes(0))
                return true;
            return this.commands.includes(command.toString());
        },
        getOptions(command) {
            let IDX_MATCH3 = "6";
            if (command == IDX_MATCH3)
                return [{value: 'match3', text: 'Mach3'}];

            if (this.commands.includes(0))
                return games;

            return this.options[command.toString()];
        },
        clearTimeout() {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null;
            }
        },
        setTimeout(callback) {
            this.clearTimeout();
            this.timeout = setTimeout(() => {
                this.clearTimeout();
                callback();
            }, 5000)
        },
        onHidden() {
        },
        makeToast(title, content, variant) {
            this.$bvToast.toast(content, {
                title: title,
                autoHideDelay: 8888,
                variant: variant || 'info'
            })
        },
        makeToastResult(data) {
            let success = data.error === 0;
            this.makeToast('Result', success ? 'Success' : 'error=' + data.error, success ? 'success' : 'warning');
        },
        makeToastException(e) {
            this.makeToast('Exception', JSON.stringify({name: e.name, message: e.message}), 'warning');
        },
        isPositiveNumber(number) {
            return /^\d+$/.test(number);
        },
        restrictChars(event) {
            if (event.charCode === 0 || /\d/.test(String.fromCharCode(event.charCode))) {
                return true;
            } else {
                event.preventDefault();
            }
        },
        inbox_userId_restrictChars(event) {
            if (event.charCode === 0 || event.charCode === 44 || /\d/.test(String.fromCharCode(event.charCode))) {
                return true;
            } else {
                event.preventDefault();
            }
        },
        //
        maintain_onSet() {
            var flag = confirm("Thực hiện Bảo trì!!!");
            if (!flag) return;

            this.isProcessing = true;
            axios
                .post('', {
                    'command': 3,
                    'gameId': this.maintain_selected,
                    'maintain_start': Date.parse(this.maintain_start) / 1000,
                    'maintain_end': Date.parse(this.maintain_end) / 1000,
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        //
        userData_onCheckOnline() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 9,
                    'gameId': this.userData_selected,
                    'userData_userId': this.userData_userId,
                })
                .then(res => this.makeToast('Result', res.data.string, 'success'))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        userData_onGet() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 1,
                    'gameId': this.userData_selected,
                    'userData_userId': this.userData_userId,
                    'userData_className': this.userData_className,
                })
                .then(res => {
                    if (res.data.error === 0)
                        this.userData_json = JSON.parse(res.data.string);
                    this.makeToastResult(res.data);
                })
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        userData_onGetDetailedInfo() {
            console.log("userData_onGetDetailedInfo");
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 11,
                    'gameId': this.userData_selected,
                    'userData_userId': this.userData_userId,
                    'userData_className': this.userData_className,
                })
                .then(res => {
                    console.log("res.data" + JSON.stringify(res.data));
                    if (res.data.error === 0)
                        this.valueDataMatch3 = JSON.parse(res.data.string);
                    this.makeToastResult(res.data);
                })
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        userdata_json_onError(error) {
            //console.log(error)
        },
        userData_onSet() {
            this.checkedSetData = false;

            var flag = confirm("Thực hiện Save Data!!!");
            if (!flag) return;

            this.isProcessing = true;
            axios
                .post('', {
                    'command': 7,
                    'gameId': this.userData_selected,
                    'userData_userId': this.userData_userId,
                    'userData_className': this.userData_className,
                    'userData_json': JSON.stringify(this.userData_json),
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },

        userData_onSetDetailedInfo() {
            this.checkedSetData = false;

            var flag = confirm("Thực hiện Save Data!!!");
            if (!flag) return;

            this.isProcessing = true;
            axios
                .post('', {
                    'command': 12,
                    'gameId': this.userData_selected,
                    'userData_userId': this.userData_userId,
                    'userData_className': this.userData_className,
                    'valueDataMatch3': this.valueDataMatch3,
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        //
        giftCode_onUndo() {
            let lastIndexOf = this.giftCode_itemList.lastIndexOf(';');
            if (lastIndexOf !== -1)
                this.giftCode_itemList = this.giftCode_itemList.substring(0, lastIndexOf);
            else if (this.giftCode_itemList.lastIndexOf(':') !== -1)
                this.giftCode_onClear();
        },
        giftCode_onAdd() {
            let prefix = this.giftCode_itemList ? ';' : '';
            this.giftCode_itemList += prefix + this.giftCode_itemName.trim() + ':' + this.giftCode_itemAmount;
        },
        giftCode_onClear() {
            this.giftCode_itemList = '';
        },
        giftCode_onCreate() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 10,
                    'gameId': this.giftCode_selected,
                    'giftCode_type': this.giftCode_type, //0; giftcode tự nhâp, 1: server gen code
                    'giftCode_inputCode': this.giftCode_inputCode,
                    'giftCode_length': this.giftCode_length,
                    'giftCode_number': this.giftCode_number,
                    'giftCode_dateExpired': this.giftCode_dateExpired,
                    'giftCode_limit': this.giftCode_limit,
                    'giftCode_itemList': this.giftCode_itemList.replace(/,/g, ''),
                    'giftCode_limitPerDevice': this.giftCode_limitPerDevice,
                    'giftCode_userCanReceiveMul': this.giftCode_userCanReceiveMul,
                    'giftCode_limitUserAge': this.giftCode_limitUserAge,
                    'giftCode_limitMatchPlayed': this.giftCode_limitMatchPlayed,
                    'giftCode_keepIfOutOfCode': this.giftCode_keepIfOutOfCode,

                })
                .then(res => {
                    if (res.data.error === 0)
                       this.giftCode_codes = res.data.list.join();
                    this.makeToastResult(res.data);
                })
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        giftCode_onCopy() {
            let input = document.createElement("TEXTAREA");
            document.body.appendChild(input);
            input.value = this.giftCode_codes.split(',').join('\n');
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand("copy");
            input.remove();
            this.makeToast('Copy to clipboard', 'Success', 'success')
        },
        //
        inbox_onUndo() {
            let lastIndexOf = this.inbox_itemList.lastIndexOf(';');
            if (lastIndexOf !== -1)
                this.inbox_itemList = this.inbox_itemList.substring(0, lastIndexOf);
            else if (this.inbox_itemList.lastIndexOf(':') !== -1)
                this.inbox_onClear();
        },
        inbox_onAdd() {
            let prefix = this.inbox_itemList ? ';' : '';
            this.inbox_itemList += prefix + this.inbox_itemName.trim() + ':' + this.inbox_itemAmount;
        },
        inbox_onClear() {
            this.inbox_itemList = '';
        },
        inbox_onAddToInbox() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': this.inbox_userId.includes(',') ? 6 : 5,
                    'gameId': this.inbox_selected,
                    'inbox_itemList': this.inbox_itemList.replace(/,/g, ''),
                    'inbox_userId': this.inbox_userId,
                    "inbox_title": this.inbox_title,
                    "inbox_des": this.inbox_des
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        invokeStaticMethod_onInvoke() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 4,
                    'gameId': this.invokeStaticMethod_selected,
                    'invokeStaticMethod_className': this.invokeStaticMethod_className,
                    'invokeStaticMethod_methodName': this.invokeStaticMethod_methodName
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        //
        serverInfo() {
            axios
                .post('', {
                    'command': 2,
                    'gameId': this.serverInfo_selected,
                })
                .then(res => {
                    if(this.serverInfo_selected == "match3")
                        this.serverInfo_ccu = res.data.hashMap.ccu;
                    else
                    {
                        this.serverInfo_match = res.data.hashMap.match;
                        this.serverInfo_room = res.data.hashMap.room;
                        this.serverInfo_ccu = res.data.hashMap.ccu;
                    }
                })
                .catch(e => {} /*this.makeToastException(e)*/)
                .finally(() => {});
        },
        //
        user_onAddTool() {
            this.isProcessing = true;
            axios
                .post('addTool', {
                    'username': this.user_username.trim(),
                    'toolId': this.user_tool,
                })
                .then(res => this.makeToastResult({error: res.data ? 0 : 1}))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        user_onAddCommandToGame() {
            this.isProcessing = true;
            axios
                .post('addCommandAndGame', {
                    'username': this.user_username.trim(),
                    'command': this.user_command,
                    'game': this.user_game,
                })
                .then(res => this.makeToastResult({error: res.data ? 0 : 1}))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
        //
        sendCmd_onSend() {
            this.isProcessing = true;
            axios
                .post('', {
                    'command': 8,
                    'gameId': this.sendCmd_selected,
                    'sendCmd_cmdId': this.sendCmd_cmdId,
                    'sendCmd_data': this.sendCmd_data,
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },

        sendCmd_setEvent() {
                    this.isProcessing = true;
                    let evtTimeStart = Date.parse(this.evtTimeStart) / 1000;
                    let evtTimeEnd = Date.parse(this.evtTimeEnd) / 1000;
                    console.log("sendCmd_setEvent",evtTimeStart,evtTimeEnd,this.evtType);
                    axios
                        .post('', {
                            'command': CmdId.SET_EVENT_INFO,
                            'gameId': this.maintain_selected,
                            'evtType': this.evtType,
                            'evtTimeStart': evtTimeStart,
                            'evtTimeEnd': evtTimeEnd
                        })
                        .then(res => this.makeToastResult(res.data))
                        .catch(e => this.makeToastException(e))
                        .finally(() => this.isProcessing = false);
                },
        sendCmd_RemoveTimeEvent() {
            this.isProcessing = true;
            console.log("sendCmd_RemoveTimeEvent",this.evtType);
            axios
                .post('', {
                    'command': CmdId.REMOVE_TIME_EVENT,
                    'gameId': this.maintain_selected,
                    'evtType': this.evtType,
                })
                .then(res => this.makeToastResult(res.data))
                .catch(e => this.makeToastException(e))
                .finally(() => this.isProcessing = false);
        },
    },
    computed: {
        maintain_onSet_disabled() {
            return !this.maintain_start || !this.maintain_end || Date.parse(this.maintain_start) >= Date.parse(this.maintain_end);
        },
        userData_onCheckOnline_disabled() {
            return !this.userData_selected || !this.userData_userId;
        },
        userData_onGet_disabled() {
            return !this.userData_selected || !this.userData_userId || !this.userData_className;
        },
        userData_onSet_disabled() {
            return !this.userData_selected || !this.userData_userId || !this.userData_className || !this.checkedSetData;
        },
        //
        giftCode_onUndo_disabled() {
            return !this.giftCode_itemList;
        },
        giftCode_onAdd_disabled() {
            return !this.giftCode_itemAmount || !this.giftCode_itemName;
        },
        giftCode_onClear_disabled() {
            return !this.giftCode_itemList;
        },
        giftCode_onCreate_disabled() {
            return !this.giftCode_itemList || !this.giftCode_limit || !this.giftCode_number
            || !this.giftCode_length || !this.giftCode_dateExpired;
        },
        //
        inbox_onUndo_disabled() {
            return !this.inbox_itemList;
        },
        inbox_onAdd_disabled() {
            return !this.inbox_itemAmount || !this.inbox_itemName;
        },
        inbox_onClear_disabled() {
            return !this.inbox_itemList;
        },
        inbox_onAddToInbox_disabled() {
            return !this.inbox_itemList || !this.inbox_userId;
        },
        //
        invokeStaticMethod_onInvoke_disabled() {
            return !this.invokeStaticMethod_className || !this.invokeStaticMethod_methodName;
        },
        user_onAddTool_disabled() {
            return !this.user_username || !this.user_tool;
        },
        user_onAddCommandToGame_disabled() {
            return !this.user_username || !this.user_command || !this.user_game;
        },
        //
        sendCmd_onSend_disabled() {
            return !this.sendCmd_selected || !this.sendCmd_cmdId;
        }
    },
    watch: {
        userData_selected: function (gameId) {
            this.userData_classNames = userDataGameToClassNames[gameId];
        },
        //
        giftCode_selected: function (gameId) {
            this.giftCode_itemNames = giftCodeGameToItemNames[gameId];
        },
        giftCode_itemAmount: function (newValue) {
            newValue = newValue.replace(/,/g, '');
            let num_parts = newValue.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.giftCode_itemAmount = num_parts.join(".");
        },
        //
        inbox_selected: function (gameId) {
            this.inbox_itemNames = giftCodeGameToItemNames[gameId];
        },
        inbox_itemAmount: function (newValue) {
            newValue = newValue.replace(/,/g, '');
            let num_parts = newValue.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.inbox_itemAmount = num_parts.join(".");
        },
        //
        serverInfo_selected: function (gameId) {
            if (this.interval_serverInfo)
                clearInterval(this.interval_serverInfo);
            this.serverInfo_match = '?';
            this.serverInfo_room = '?';
            this.serverInfo_ccu = '?';
            this.serverInfo();
            this.interval_serverInfo = setInterval(this.serverInfo, 3000);
        }
    },
    created: function () {
        //
        let now = new Date(new Date().getTime() + 7 * 3600 * 1000);
        this.maintain_start = new Date(now.getTime() - 25 * 3600 * 1000).toISOString().slice(0, 16);
        this.maintain_end = new Date(now.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 16);

        this.evtTimeStart = this.maintain_start;
        this.evtTimeEnd = this.maintain_end;

        //
        this.isProcessing = true;
        axios
            .get('/api/user/getUser')
            .then(res => {
                if (res.data) {
                    if (res.data.username === 'admin') {
                        this.commands.push(0);
                        return;
                    }
                    if (res.data.mapCommandWithGames) {
                        let commands = [];
                        let options = {};
                        for (let command in res.data.mapCommandWithGames) {
                            let optionsToCommand = [];
                            res.data.mapCommandWithGames[command].forEach(gameId => {
                                try {
                                    let option = {};
                                    option.value = gameId;
                                    option.text = games.find(o => o.value === gameId).text;
                                    optionsToCommand.push(option);
                                } catch(ignored) {
                                }
                            });
                            if (optionsToCommand.length > 0) {
                                commands.push(command);
                                options[command] = optionsToCommand;
                            }
                        }
                        this.noCommand = commands.length === 0;
                        this.commands = commands;
                        this.options = options;
                        this.userData_selected = options.hasOwnProperty('1') ? options['1'][0].value : '';
                        this.maintain_selected = options.hasOwnProperty('3') ? options['3'][0].value : '';
                        this.invokeStaticMethod_selected = options.hasOwnProperty('4') ? options['4'][0].value : '';
                        this.inbox_selected = options.hasOwnProperty('5') ? options['5'][0].value : '';
                        this.giftCode_selected = options.hasOwnProperty('10') ? options['10'][0].value : '';
                    }
                }
            })
            .catch(e => this.makeToast(e.name, e.message, 'warning'))
            .finally(() => this.isProcessing = false);
        //
        axios.defaults.baseURL = '/bridge/processCommand/';
    },
    beforeDestroy() {
        this.clearTimeout();
    }
});
