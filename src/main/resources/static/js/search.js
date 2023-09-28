var metric_items = [
    {
        "metric": "metric_login",
        "column1": "date",
        "column2": "userId",
        "column3": "serverId",
        "column4": "userId_",
        "column5": "userName",
        "column6": "clientVersion",
        "column7": "osPlatform",
        "column8": "osVersion",
        "column9": "device",
        "column10": "connectionType",
        "column11": "0",
        "column12": "0",
        "column13": "gTotal",
        "column14": "g",
        "column15": "gBonus",
        "column16": "",
        "column17": "result",
        "column18": "store",
        "column19": "ip",
        "column20": "sourceCountry",
    },
    {
        "metric": "metric_logout",
        "column1": "date",
        "column2": "userId",
        "column3": "serverId",
        "column4": "userId_",
        "column5": "userName",
        "column6": "clientVersion",
        "column7": "osPlatform",
        "column8": "osVersion",
        "column9": "device",
        "column10": "connectionType",
        "column11": "0",
        "column12": "0",
        "column13": "gTotal",
        "column14": "g",
        "column15": "gBonus",
        "column16": "",
        "column17": "onlineTime",
        "column18": "result",
        "column19": "disReason",
        "column20": "sourceCountry",
    },
    {
        "metric": "metric_match_start",
        "column1": "date",
        "column2": "matchId",
        "column3": "ownerId",
        "column4": "numberPlayer",
        "column5": "baseGold",
        "column6": "roomId",
        "column7": "matchMode",
        "column8": "time"
    },
    {
        "metric": "metric_win_match",
        "column1": "date",
        "column2": "matchId",
        "column3": "winnerId",
        "column4": "winType",
        "column5": "gold",
        "column6": "chargedMoney",
        "column7": "cardId",
        "column8": "cardType",
        "column9": "cardLevel",
        "column10": "osPlatform",
        "column11": "listSkill (dynamic size)",
        "column12": "sourceCountry",
        "column13": "time"
    },
    {
        "metric": "metric_tutorial",
        "column1": "date",
        "column2": "userId",
        "column3": "step",
        "column4": "osPlatform",
        "column5": "sourceCountry"
    },
    {
        "metric": "metric_user_play(start)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "matchId",
        "column5": "gold",
        "column6": "g",
        "column7": "cardId",
        "column8": "cardAutoId",
        "column9": "cardType",
        "column10": "diceId",
        "column11": "0",
        "column12": "platform",
        "column13": "sourceCountry"
    },
    {
        "metric": "metric_user_play(end)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "matchId",
        "column5": "gold",
        "column6": "g",
        "column7": "goldChange",
        "column8": "gChange",
        "column9": "winOrLose",
        "column10": "winLoseType",
        "column11": "1",
        "column12": "sourceCountry",
        "column13": "totalMatch"
    },
    {
        "metric": "metric_action",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "action",
        "column5": "param",
        "column6": "platform",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_gold",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "goldBefore",
        "column5": "goldAfter",
        "column6": "goldChange",
        "column7": "action",
        "column8": "itemId",
        "column9": "osPlatform",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_g",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "gBefore",
        "column5": "gAfter",
        "column6": "gChange",
        "column7": "action",
        "column8": "itemId",
        "column9": "osPlatform",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_cancel_room",
        "column1": "date",
        "column2": "channelId",
        "column3": "mode",
        "column4": "waitTime"
    },
    {
        "metric": "metric_register",
        "column1": "date",
        "column2": "userId",
        "column3": "serverId",
        "column4": "clientVersion",
        "column5": "osPlatform",
        "column6": "osVersion",
        "column7": "device",
        "column8": "connectionType",
        "column9": "downloadSource",
        "column10": "thirdPartySource",
        "column11": "result",
        "column12": "sourceCountry"
    },
    {
        "metric": "metric_paying",
        "column1": "date",
        "column2": "userId",
        "column3": "serverId",
        "column4": "userId_",
        "column5": "userName",
        "column6": "paymentGateway",
        "column7": "paymentMethod",
        "column8": "transactionId",
        "column9": "ip",
        "column10": "grossUser",
        "column11": "gross",
        "column12": "topUpRecv",
        "column13": "gRecv",
        "column14": "gBonusRecv",
        "column15": "topUpAfter",
        "column16": "gAfter",
        "column17": "gBonusAfter",
        "column18": "desc",
        "column19": "result",
        "column20": "0",
        "column21": "isFirstPaying",
        "column22": "sourceCountry"
    },
    {
        "metric": "metric_spent_coin",
        "column1": "date",
        "column2": "actionName",//SmsBuyHammer/GBuyHammer
        "column3": "userId",
        "column4": "serverId",
        "column5": "userId_",
        "column6": "userName",
        "column7": "0",
        "column8": "transactionId",
        "column9": "ip",
        "column10": "1",
        "column11": "itemId",
        "column12": "itemName",//Hammer
        "column13": "itemPrice",
        "column14": "itemQuan",//so luong
        "column15": "spentGTotal",//G
        "column16": "spentG",
        "column17": "spentGBonus",
        "column18": "gTotalAfter",
        "column19": "gAfter",
        "column20": "gBonusAfter",
        "column21": "desc",
        "column22": "result",
        "column23": "sourceCountry"
    },
    {
        "metric": "metric_social",
        "column1": "date",
        "column2": "userId",
        "column3": "serverId",
        "column4": "userId_",
        "column5": "userName",
        "column6": "socialName",
        "column7": "socialId",
        "column8": "socialAcc",
        "column9": "socialDisplayName",
        "column10": "gender",
        "column11": "phoneNo",
        "column12": "birthDay",
        "column13": "sourceCountry"
    },
    {
        "metric": "metric_find_room_action",
        "column1": "userId",
        "column2": "userName",
        "column3": "action",
        "column4": "itemId",
        "column5": "platform",
        "column6": "sourceCountry"
    },
    {
        "metric": "metric_quest",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "action",
        "column5": "itemId",
        "column6": "platform",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_clan",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "action",
        "column5": "itemId",
        "column6": "platform",
        "column7": "clanId",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_clan_info",
        "column1": "date",
        "column2": "clanId",
        "column3": "clanName",
        "column4": "level",
        "column5": "donate",
        "column6": "gold",
        "column7": "skillId",
        "column8": "numMember",
        "column9": "numRequest"
    },
    {
        "metric": "metric_reconnect_match",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "numberPlayer",
        "column5": "baseGold",
        "column6": "matchId",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_character",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "characterId",
        "column5": "characterType",
        "column6": "autoId",
        "column7": "platform",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_create_room",
        "column1": "date",
        "column2": "ownerId",
        "column3": "mode",
        "column4": "channelId",
        "column5": "roomId",
        "column6": "sourceCountry"
    },
    {
        "metric": "metric_upgrade_character_r",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "upgradeId",
        "column5": "upgradeType",
        "column6": "materialId",
        "column7": "materialType",
        "column8": "platform",
        "column9": "characterAutoId",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_upgrade_character",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "upgradeId",
        "column5": "upgradeType",
        "column6": "materialId",
        "column7": "materialType",
        "column8": "platform",
        "column9": "characterAutoId",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_upgrade_pendant",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "upgradeId",
        "column5": "upgradeType",
        "column6": "materialId",
        "column7": "materialType",
        "column8": "platform",
        "column9": "pendantAutoId",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_sell_character",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "characterId",
        "column5": "characterType",
        "column6": "autoId",
        "column7": "gold",
        "column8": "platform",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_donate_character",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "characterId",
        "column5": "characterType",
        "column6": "autoId",
        "column7": "gold",
        "column8": "platform",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_sell_pendant",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "characterId",
        "column5": "characterType",
        "column6": "autoId",
        "column7": "gold",
        "column8": "platform",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_storage",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "actType",
        "column5": "item",
        "column6": "num",
        "column7": "action",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_fortune_card",
        "column1": "date",
        "column2": "userId",
        "column3": "card",
        "column4": "sourceCountry"
    },
    {
        "metric": "metric_open_gacha",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "gachaType",
        "column5": "number",
        "column6": "platform",
        "column7": "meterial",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_dice",
        "column1": "date",
        "column2": "userId",
        "column3": "matchId",
        "column4": "firstDice",
        "column5": "secondDice",
        "column6": "firstDice=secondDice+controlVal",
        // "column7": "controlVal", dang bi sai format ghi log
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_skill_activate",
        "column1": "date",
        "column2": "matchId",
        "column3": "gold",
        "column4": "skillEnum",
        "column5": "skillChance",
        "column6": "1",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_tutorial",
        "column1": "date",
        "column2": "userId",
        "column3": "step",
        "column4": "platform",
        "column5": "sourceCountry"
    },
    {
        "metric": "metric_intensive",
        "column1": "date",
        "column2": "matchId",
        "column3": "channelId",
        "column4": "mode",
        "column5": "numberPlayer",
        "column6": "winType",
        "column7": "goldIntensive"
    },
    {
        "metric": "metric_loan",
        "column1": "date",
        "column2": "goldRequire",
        "column3": "gLoan",
        "column4": "goldLoan",
        "column5": "platform",
        "column6": "userId",
        "column7": "userName",
        "column8": "matchId",
        "column9": "gold",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_giftcode",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "code",
        "column5": "codeId",
        "column6": "platform",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_email",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "displayName",
        "column5": "email",
        "column6": "phone",
        "column7": "platform",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_match_exp",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "autoId",
        "column5": "characterId",
        "column6": "type",
        "column7": "level",
        "column8": "exp",
        "column9": "isWinner",
        "column10": "endType",
        "column11": "channelId",
        "column12": "goldInit",
        "column13": "sourceCountry"
    },
    {
        "metric": "metric_track_payment",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "chargeType",
        "column5": "chargeAmount",
        "column6": "trackValue",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_invitation",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "numberInvitation",
        "column5": "numberBefore",
        "column6": "numberAfter",
        "column7": "platform",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_login_from",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "from",
        "column5": "platform",
        "column6": "ip"
    },
    {
        "metric": "metric_seen_special_deal",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "chargedAmount",
        "column5": "isSmsCharged",
        "column6": "isCardCharged",
        "column7": "platform",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_seen_special_deal_error",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "isSmsCharged",
        "column5": "isCardCharged",
        "column6": "lastChargeTime",
        "column7": "lastTimeSeenSpecialDeal",
        "column8": "timeSeen",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_seen_popup",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "chargedAmount",
        "column5": "isSmsCharged",
        "column6": "isCardCharged",
        "column7": "platform",
        "column8": "popupType",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_transfer_data",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "userIdTarget",
        "column5": "userNameTarget",
        "column6": "platform",
        "column7": "sourceCountry"
    },
    {
        "metric": "metric_enable_local_payment",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "chargedAmount",
        "column5": "isSmsCharged",
        "column6": "isCardCharged",
        "column7": "platform",
        "column8": "reason",
        "column9": "sourceCountry"
    },
    {
        "metric": "metric_coop_iap_count",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "chargedAmount",
        "column5": "isSmsCharged",
        "column6": "isCardCharged",
        "column7": "platform",
        "column8": "action",
        "column9": "item",
        "column10": "gross",
        "column11": "iapCount"
    },
    {
        "metric": "metric_lost_account(1)",
        "column1": "date",
        "column2": "oldUserId",
        "column3": "newUserId",
        "column4": "socialId",
        "column5": "sourceCountry"
    },
    {
        "metric": "metric_lost_account(2)",
        "column1": "date",
        "column2": "matchId",
        "column3": "matchStartTime"
    },
    {
        "metric": "metric_open_inbox_item",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "header",
        "column5": "item",
        "column6": "value",
        "column7": "killedTime",
        "column8": "custom",
        "column9": "action",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_open_all_inbox_item",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "sizeBefore",
        "column5": "sizeAfter",
        "column6": "sourceCountry"
    },
    {
        "metric": "metric_roll_gift",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "position",
        "column5": "giftPosition",
        "column6": "platform",
        "column7": "isCharged",//1,0
        "column8": "multiple",
        "column9": "gBefore",
        "column10": "gAfter",
        "column11": "sourceCountry"
    },
    {
        "metric": "metric_grateful",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "time",
        "column5": "platform",
        "column6": "sourceCountry"
    },
    {
        "metric": "metric_event_hitegg(1)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "action(hitEgg)",
        "column6": "numHammer",
        "column7": "listGift",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_event_hitegg(2)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "action(Match)",
        "column6": "feeAdd",
        "column7": "hammerAdd",
        "column8": "feeBefore",
        "column9": "feeAfter",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_event_hitegg(3)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "action(ExGold)",
        "column6": "gExchange",
        "column7": "hammerAdd",
        "column8": "gExchangedBefore",
        "column9": "gExchangedAfter",
        "column10": "sourceCountry"
    },
    {
        "metric": "metric_event_hitegg(4)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "action(ExUser-PieceToGift)",
        "column6": "sourceCountry"
    },
    {
        "metric": "metric_event_hitegg(5)",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "action(ExDust-DustToGold)",
        "column6": "goldGet",
        "column7": "numTotal",
        "column8": "sourceCountry"
    },
    {
        "metric": "metric_hit_egg_miss_item",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "gold",
        "column5": "g",
        "column6": "ballName",
        "column7": "itemName"
    },
    {
        "metric": "metric_event_con_giap",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "OpenPack",
        "column6": "numPackOpen",
        "column7": "listResult"
    },
    {
        "metric": "metric_event_con_giap",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "serverId",
        "column5": "ExchangeRw",
        "column6": "combineName"
    },
    // {
    //     "metric": "metric_sieu_sao",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "action",
    //     "column4": "goldChange",
    //     "column5": "gChange",
    //     "column6": "params"
    // },
    // {
    //     "metric": "metric_sieu_sao(1)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "BuyTicket",
    //     "column4": "goldChange",
    //     "column5": "0",
    //     "column6": "cardId",
    //     "column7": "cardType",
    //     "column8": "skillIds"
    // },
    // {
    //     "metric": "metric_sieu_sao(2)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "KeepCard",
    //     "column4": "goldChange",
    //     "column5": "gChange",
    //     "column6": "numberKeepCard",
    //     "column7": "cardId",
    //     "column8": "cardType",
    //     "column9": "skillIds"
    // },
    // {
    //     "metric": "metric_sieu_sao(3)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "PickCard",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "cardId"
    // },
    // {
    //     "metric": "metric_sieu_sao(4)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "PickSkill",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "skillId"
    // },
    // {
    //     "metric": "metric_sieu_sao(5)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "RollCard",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "cardIds"
    // },
    // {
    //     "metric": "metric_sieu_sao(6)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "ReRollCard",
    //     "column4": "0",
    //     "column5": "gChange",
    //     "column6": "cardIdsNew",
    //     "column7": "cardIdsOld"
    // },
    // {
    //     "metric": "metric_sieu_sao(7)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "RollSkill",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "skillIds",
    // },
    // {
    //     "metric": "metric_sieu_sao(8)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "ReRollSkill",
    //     "column4": "0",
    //     "column5": "gChange",
    //     "column6": "skillIdsNew",
    //     "column7": "skillIdsOld"
    // },
    // {
    //     "metric": "metric_sieu_sao(9)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "EndGame",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "winOrLose",
    //     "column7": "win",
    //     "column8": "lose",
    //     "column9": "point",//thua thi khong co column nay
    //     "column10": "cardId",
    //     "column10": "cardType",
    //     "column10": "skillIds"
    // },
    // {
    //     "metric": "metric_sieu_sao(10)",
    //     "column1": "date",
    //     "column2": "userId",
    //     "column3": "RewardWin",
    //     "column4": "0",
    //     "column5": "0",
    //     "column6": "win",
    //     "column7": "lose"
    // }
]

var metric_items_br = [
    {
        "metric": "login",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0", //gold change
        "column9": "0", //g change
        "column10": "ip",
        "column11": "lose",
        "column12": "win",
        "column13": "displayName",
    },
    {
        "metric": "device",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "deviceId",
        "column11": "deviceName",
        "column12": "osVer",
    },
    {
        "metric": "new_user",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
    },
    {
        "metric": "disconnect",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "ip",
        "column11": "lose",
        "column12": "win",
        "column13": "displayName",
        "column14": "reason",
        "column15": "onlineTime" //milis
    },
    {
        "metric": "daily_support",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "goldChange",
        "column9": "0",
        "column10": "type", // 1-dang nhap, 2-ho tro, 0-
        "column11": "num", //so lan nhan ho tro con lai
        "column12": "itemId",
    },
    {
        "metric": "g",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "gChange",
        "column10": "action",
        "column11": "result",
    },
    {
        "metric": "gold",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "goldChange",
        "column9": "0",
        "column10": "action",
    },
    {
        "metric": "join_room",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
        "column15": "pos",
    },
    {
        "metric": "quit_room",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
    },
    {
        "metric": "match_start",
        "column1": "date",
        "column2": "roomId",
        "column3": "initGold",
        "column4": "modePlay",
        "column5": "channelId",
        "column6": "listUserId",
        "column7": "time",
    },
    {
        "metric": "match_start_user",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
        "column15": "dice",
        "column16": "id",
        "column17": "characterId",
        "column18": "type",
        "column19": "level",
    },
    {
        "metric": "match_end",
        "column1": "date",
        "column2": "roomId",
        "column3": "initGold",
        "column4": "modePlay",
        "column5": "channelId",
        "column6": "listUserId",
        "column7": "size",
        "column8": "type",
        "column9": "tax",
        "column10": "dice",
        "column11": "id",
        "column12": "characterId",
        "column13": "type",
        "column14": "level",
        "column15": "matchTime", //milis
    },
    {
        "metric": "match_end_user",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
        "column15": "isWinner",
        "column16": "type",
    },
    {
        "metric": "match_disconnect",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
        "column15": "reason",
        "column16": "onlineTime",
    },
    {
        "metric": "match_reconnect",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0",
        "column9": "0",
        "column10": "roomId",
        "column11": "initGold",
        "column12": "modePlay",
        "column13": "channelId",
        "column14": "listUserId",
    },
    {
        "metric": "room_destroy",
        "column1": "date",
        "column2": "roomId",
        "column3": "initGold",
        "column4": "modePlay",
        "column5": "channelId",
        "column6": "listUserId",
        "column7": "time", //milis
    },
    {
        "metric": "local_payment",
        "column1": "date",
        "column2": "userId",
        "column3": "enableClient",
        "column4": "enableService",
    },
    {
        "metric": "client",
        "column1": "date",
        "column2": "userId",
        "column3": "action",
        "column4": "param",
    },
    {
        "metric": "charge",
        "column1": "date",
        "column2": "userId",
        "column3": "userName",
        "column4": "social",
        "column5": "osPlatform",
        "column6": "gold",
        "column7": "g",
        "column8": "0", //gold change
        "column9": "gChange",
        "column10": "chargeType",
        "column11": "paymentMethod",
        "column12": "id",
    },
    {
        "metric": "response_error",
        "column1": "date",
        "column2": "cmdId",
        "column3": "error",
    },
    {
        "metric": "add_inbox_item",
        "column1": "date",
        "column2": "userId",
        "column3": "header",
        "column4": "item",
        "column5": "value",
        "column6": "killTime",
        "column7": "custom",
        "column8": "action",
    },
]

var findMetric = function (metric) {
    for (var i in metric_items)
        if (metric_items[i].metric === metric)
            return metric_items[i];
    return null
}

var metric_fields = [
    "metric"
]

var maxColumn = 0;
metric_items.forEach(i => maxColumn = Math.max(maxColumn, Object.keys(i).length))
for (var i = 1; i < maxColumn; i++)
    metric_fields.push('column' + i)

var _metricOptions = [
    {name: 'action'},
    {name: 'add_inbox_item'},
    // { name: 'admin' },
    {name: 'cancel_room'},
    {name: 'character'},
    {name: 'clan'},
    {name: 'clan_info'},
    {name: 'coop_iap_count'},
    {name: 'create_room'},
    // { name: 'dice' },
    {name: 'donate_character'},
    {name: 'email'},
    // { name: 'enable_local_payment' },
    // { name: 'error' },
    {name: 'event_con_giap'},
    {name: 'event_euro'},
    {name: 'event_hitegg'},
    {name: 'find_room_action'},
    {name: 'fortune_card'},
    {name: 'g'},
    {name: 'giftcode'},
    {name: 'gold'},
    {name: 'hit_egg_miss_item'},
    {name: 'iap'},
    {name: 'intensive'},
    {name: 'loan'},
    {name: 'login'},
    {name: 'login_from'},
    {name: 'logout'},
    {name: 'lost_account'},
    {name: 'match_exp'},
    {name: 'match_start'},
    {name: 'open_all_inbox_item'},
    {name: 'open_gacha'},
    {name: 'open_inbox_item'},
    {name: 'paying'},
    {name: 'piggy_bank'},
    {name: 'quest'},
    {name: 'reconnect_match'},
    {name: 'register'},
    {name: 'reputation'},
    {name: 'roll_gift'},
    {name: 'seen_popup'},
    {name: 'sell_character'},
    {name: 'sell_pendant'},
    {name: 'send_error'},
    {name: 'social'},
    {name: 'spent_coin'},
    {name: 'storage'},
    // { name: 'top_rank' },
    {name: 'tournament_join'},
    {name: 'tournament_point'},
    // { name: 'tournament_rank' },
    {name: 'track_payment'},
    {name: 'transfer_data'},
    // { name: 'tutorial' },
    {name: 'upgrade_character'},
    {name: 'upgrade_character_r'},
    {name: 'upgrade_pendant'},
    {name: 'user_play'},
    {name: 'win_match'},
    {name: 'all'}
]

var dateToString = today => {
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10)
        dd = '0' + dd
    if (mm < 10)
        mm = '0' + mm
    var date = yyyy + "-" + mm + "-" + dd
    return date
}

var viewSearchLog = new Vue({
    el: '#view-search-log',
    components: {
        Multiselect: window.VueMultiselect.default
    },
    data: {
        visible: true,
        inputUserId: '',
        inputDateStart: '',
        inputDateEnd: '',
        metricSelected: [{name: 'gold'}, {name: 'g'}],
        metricOptions: _metricOptions,
        gameSelected: 'vi',
        gameOptions: [
            {value: 'vi', text: 'Việt'},
            {value: 'sea', text: 'Sea'},
        ],
        filter: null,
        isSearching: false,
        errored: false,
        items: metric_items,
        fields: metric_fields,
        totalRows: metric_items.length,
        currentPage: 1,
        perPage: 20,
        pageOptions: [20, 25, 30],
        selectMode: 'single',
        infoModal: {
            id: 'info-modal',
            title: 'Details',
            content: ''
        },
        fab: conf_fab
    },
    methods: {
        onSearchClicked() {
            var isSearchAll = false
            for (var i in this.metricSelected)
                if (this.metricSelected[i].name === 'all') {
                    isSearchAll = true;
                    break;
                }
            if (isSearchAll)
                this.makeToast('warning')
            var metrics = this.metricSelected
                .reduce((initArr, currentItem) => {
                    initArr.push(currentItem.name)
                    return initArr
                }, []).join(",")
            console.log('/api/log/getUserLog?userId=' + this.inputUserId + '&dateStart=' + this.inputDateStart +
                '&dateEnd=' + this.inputDateEnd + '&metrics=' + metrics + '&gameId=' + this.gameSelected)
            this.isSearching = true
            axios
                .get('/api/log/getUserLog', {
                    params: {
                        userId: this.inputUserId,
                        dateStart: this.inputDateStart,
                        dateEnd: this.inputDateEnd,
                        metrics: metrics,
                        gameId: this.gameSelected
                    }
                })
                .then(res => {
                    var data = res.data
                    var _fields = []
                    var _items = []
                    var _maxColumn = 0;
                    data.forEach((item) => {
                        var columns = item.split("|")
                        _maxColumn = Math.max(_maxColumn, columns.length)
                        var item = {}
                        item["metric"] = columns[0]
                        item["time"] = columns[1]
                        for (var i = 2; i < columns.length; i++)
                            item['column' + i] = columns[i]
                        _items.push(item)
                    })
                    _fields.push({key: "metric", sortable: true})
                    _fields.push({key: "time", sortable: true})
                    for (var i = 2; i < _maxColumn; i++)
                        _fields.push({key: 'column' + i, sortable: true})

                    this.fields = _fields
                    this.items = _items
                    this.totalRows = this.items.length
                })
                .catch(e => {
                    console.log(e)
                    this.errored = true
                })
                .finally(() => this.isSearching = false)
        },

        onRowSelected(rowSelected) {
            if (rowSelected.length === 0)
                return;
            rowSelected = rowSelected[0]
            var content = {}
            var metric = findMetric(rowSelected.metric)
            if (metric == null || rowSelected.hasOwnProperty('column1')) {
                content = rowSelected
            } else {
                content.metric = rowSelected.metric
                content.time = rowSelected.time
                for (var key in rowSelected)
                    if (key.startsWith('column')) {
                        let keyOfContent = key
                        if (metric.hasOwnProperty(key) && metric[key].length > 1)
                            keyOfContent = metric[key]
                        content[keyOfContent] = rowSelected[key]
                    }
            }

            this.infoModal.content = content
            this.$root.$emit('bv::show::modal', this.infoModal.id)
        },

        onHided() {
            this.infoModal.content = ''
        },

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

        addTag(newTag) {
            const tag = {
                name: newTag
            }
            this.metricOptions.push(tag)
            this.metricSelected.push(tag)
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
