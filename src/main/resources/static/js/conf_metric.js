//Note:
//Highcharts: xAxis.crosshair = true
var conf_metric = {};
conf_metric.vi = {
    'hitEgg': [
        {
            title: 'Tham Gia Event',
            plotOptions: {line: {dataLabels: {enabled: true}}},
            series: [
                {key: 'ssNumHitEgg.size', name: 'User'},
            ]
        },
        {
            title: 'Búa Out',
            plotOptions: {line: {dataLabels: {enabled: true}}},
            series: [
                {key: 'ssNumHitEgg.sum', name: 'Búa'},
            ]
        },
        {
            type: 'column',
            title: 'Búa In',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            series: [
                {key: 'hammerMatch', name: 'Búa Bàn Chơi'},
                {key: 'hammerExchangeGold', name: 'Bùa Đổi Vàng'},
                {key: 'hammerSMS', name: 'Búa SMS'},
                {key: 'hammerG', name: 'Búa G'},
            ]
        },
        {
            type: 'column',
            title: 'Kiểu Đập Búa',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'typeHitEggToCount',
        },
        {
            type: 'column',
            title: 'Số Búa Đập',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            series: [
                {key: 'ssNumHitEgg.min', name: 'Min'},
                {key: 'ssNumHitEgg.median', name: 'Median'},
                {key: 'ssNumHitEgg.avg', name: 'Avg'},
                {key: 'ssNumHitEgg.max', name: 'Max'},
            ]
        },
        {
            title: 'Số Quà User Nhận Được',
            multipleKey: 'rewardOfAllUser',
            tooltip: {shared: true,},
        },
    ],
    'treasureHunt': [
        {
            title: 'Thẻ A',
            type: 'column',
            series: [
                {key: 'cardA.numCard', name: 'Thẻ'},
                {key: 'cardA.numUserReceiveCard', name: 'User'},
            ]
        },
        {
            title: 'Thẻ S',
            type: 'column',
            series: [
                {key: 'cardS.numCard', name: 'Thẻ'},
                {key: 'cardS.numUserReceiveCard', name: 'User'},
            ]
        },
        {
            title: 'G Dùng Để Được Thẻ A Đầu Tiên',
            type: 'area',
            series: [
                {key: 'cardAUntilNow.maxGReceiveFirstCard', name: 'Max'},
                {key: 'cardAUntilNow.avgGReceiveFirstCard', name: 'Avg'},
                {key: 'cardAUntilNow.minGReceiveFirstCard', name: 'Min'},
            ]
        },
        {
            title: 'G Dùng Để Được Thẻ S Đầu Tiên',
            type: 'area',
            series: [
                {key: 'cardSUntilNow.maxGReceiveFirstCard', name: 'Max'},
                {key: 'cardSUntilNow.avgGReceiveFirstCard', name: 'Avg'},
                {key: 'cardSUntilNow.minGReceiveFirstCard', name: 'Min'},
            ]
        },
        {
            title: 'Tham Gia Event',
            type: 'column',
            series: [
                {key: 'numUser', name: 'User Tham Gia'},
                {key: 'numUserSpentG', name: 'User Dùng G'},
                {key: 'numUserUntilNow', name: 'User Tham Gia Đến Bây Giờ'},
                {key: 'numUserSpentGUntilNow', name: 'User Dùng G Đến Bây Giờ'},
            ]
        },
        {
            title: 'G Dùng',
            type: 'area',
            series: [
                {key: 'totalGSpent', name: 'G'},
            ]
        },
        {
            title: 'Top 50 Dùng G',
            subtitle: 'Từ Đầu Event Đến Hết Ngày Hiện Tại',
            multipleKey: 'topSpentGUntilNow',
        },
    ],
    'trungThu': [
        {
            title: 'Thẻ A',
            series: [
                {key: 'numCardA', name: 'Thẻ'},
                {key: 'numUserA', name: 'User'},
            ]
        },
        {
            title: 'Thẻ S',
            series: [
                {key: 'numCardS', name: 'Thẻ'},
                {key: 'numUserS', name: 'User'},
            ]
        },
        {
            title: 'Tham Gia Event',
            series: [
                {key: 'numUser', name: 'User'},
                {key: 'numUserSpentG', name: 'User Dùng G'},
            ]
        },
    ],
    'sieuSao': [
        {
            type: 'column',
            title: 'Gold',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            series: [
                {key: 'goldBuyTicket', name: 'Gold Vé'},
                {key: 'goldKeepCard', name: 'Gold giữ thẻ'},
            ]
        },
        {
            type: 'column',
            title: 'G',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            series: [
                {key: 'gReRollSkill', name: 'G Quay Skill'},
                {key: 'gReRollCard', name: 'G Quay Thẻ'},
                {key: 'gKeepCard', name: 'G Giữ Thẻ'},
                {key: 'ssBuyExtraPointTicket.sum', name: 'G Mua Ngôi Sao'},
            ]
        },
        {
            type: 'column',
            title: 'Tham Gia Đấu Trường',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            series: [
                {key: 'userJoinEvent', name: 'User'},
                {key: 'userReRollSkill', name: 'User Quay Lại Skill'},
                {key: 'userReRollCard', name: 'User Quay Lại Thẻ'},
                {key: 'ssKeepCard.size', name: 'User Giữ Thẻ'},
                {key: 'ssBuyExtraPointTicket.size', name: 'User Mua Ngôi Sao'},
            ]
        },
        {
            type: 'column',
            title: 'G Quay Lại Skill',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            series: [
                {key: 'staticsGReRollSkillMin', name: 'Min'},
                {key: 'staticsGReRollSkillMedian', name: 'Median'},
                {key: 'staticsGReRollSkillAvg', name: 'Avg'},
                {key: 'staticsGReRollSkillMax', name: 'Max'},
            ]
        },
        {
            type: 'column',
            title: 'G Quay Lại Thẻ',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            series: [
                {key: 'staticsGReRollCardMin', name: 'Min'},
                {key: 'staticsGReRollCardMedian', name: 'Median'},
                {key: 'staticsGReRollCardAvg', name: 'Avg'},
                {key: 'staticsGReRollCardMax', name: 'Max'},
            ]
        },
        {
            type: 'column',
            title: 'G Giữ Thẻ',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssKeepCard',
            validKey: ['min', 'median', 'avg', 'max'],
            series: [
                {key: 'min', name: 'Min'},
                {key: 'median', name: 'Median'},
                {key: 'avg', name: 'Avg'},
                {key: 'max', name: 'Max'},
            ]
        },
        {
            type: 'column',
            title: 'G Mua Ngôi Sao',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssBuyExtraPointTicket',
            validKey: ['min', 'median', 'avg', 'max'],
            series: [
                {key: 'min', name: 'Min'},
                {key: 'median', name: 'Median'},
                {key: 'avg', name: 'Avg'},
                {key: 'max', name: 'Max'},
            ]
        },
        {
            type: 'column',
            title: 'Số Ván Chơi/Thắng Top 10,20,100',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            series: [
                {key: 'numMatchPlayed10', name: 'top10_play'},
                {key: 'numMatchWin10', name: 'top10_win'},
                {key: 'numMatchPlayed20', name: 'top20_play'},
                {key: 'numMatchWin20', name: 'top20_win'},
                {key: 'numMatchPlayed100', name: 'top100_play'},
                {key: 'numMatchWin100', name: 'top100_win'},
            ]
        },
        {
            title: 'Win Rate 3 User Mua Nhiều Ngôi Sao Nhất',
            plotOptions: {line: {dataLabels: {enabled: true}}},
            series: [
                {key: 'rateWinTop3', name: 'Win Rate'},
            ]
        },
        {
            type: 'column',
            title: 'Số Lần Chọn Chơi Tiếp',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'keepCardId',
        },
        {
            title: 'Số Lần Giữ Thẻ',
            plotOptions: {line: {dataLabels: {enabled: true}}},
            series: [
                {key: 'numKeepCard', name: 'Lần'},
            ]
        },
        {
            type: 'column',
            title: 'Cấp Thẻ Chọn Chơi Tiếp',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'keepCardTypeId',
            series: [
                {key: '4', name: 'Thẻ A'},
                {key: '5', name: 'Thẻ S'},
                {key: '6', name: 'Thẻ R'},
            ]
        },
        {
            type: 'column',
            title: 'Cấp Thẻ Chọn Chơi Mới',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'nonKeepCardId',
            series: [
                {key: '4', name: 'Thẻ A'},
                {key: '5', name: 'Thẻ S'},
                {key: '6', name: 'Thẻ R'},
            ]
        },
        {
            type: 'column',
            title: 'Chuỗi Thắng',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'rewardWinId',
        },
        {
            type: 'column',
            title: 'Thẻ Chọn Nhiều Mhất',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>'},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'pickCardId',
        },
        {
            title: 'Skill Chọn Nhiều Mhất',
            multipleKey: 'pickSkillId',
        }
    ],
    'luckyBox': [
        {
            title: 'Số User Mở Hộp',
            plotOptions: {line: {dataLabels: {enabled: true}}},
            series: [
                {key: 'soUserMoHop', name: 'User'},
            ]
        },
        {
            type: 'column',
            title: 'Vé In',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
            series: [
                {key: 'tongVeBanRa', name: 'Vé Bán Ra'},
                {key: 'tongVeBanChoi', name: 'Vé Bàn Chơi'},
                {key: 'tongVeMienPhi', name: 'Vé Miễn Phí'},
                {key: 'soQuaSinhRa.LUCKY_BOX_TICKET', name: 'Vé Mở Ra'},
            ]
        },
        {
            type: 'column',
            title: 'Số Gói Vé 1,11,60 Bán Ra',
            multipleKey: 'soGoiVeBanRa',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số Vé Bàn Chơi Theo Gold',
            multipleKey: 'soVeBanChoiTheoGold',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số User Mở Hộp Được Quà Theo Level',
            multipleKey: 'soUserMoHopDuocQuaTheoLevel',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số Lần Mở Hộp Quà Theo Level',
            multipleKey: 'soLanMoTheoLevel',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            title: 'Tỉ Lệ Mở Trúng Bomb Theo Level',
            multipleKey: 'rateTrungBombTheoLevel',
            tooltip: {shared: true,},
        },
        {
            type: 'column',
            title: 'Số User Mở Lại Khi Trúng Bomb Theo Level',
            multipleKey: 'soUserMoLaiKhiTrungBombTheoLevel',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số User Mở Tiếp Tại Các Mốc Jackpot',
            multipleKey: 'soUserMoTiepTheoLevelJackpot',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số User Nhận Quà Theo Level',
            multipleKey: 'soUserNhanQuaTheoLevel',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
        },
        {
            type: 'column',
            title: 'Số Quà User Mở Ra',
            multipleKey: 'soQuaMoDuocTheoId',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true,},
            plotOptions: {series: {stacking: 'normal'}},
            series: [
                {key: '-1', name: 'Bomb'},
                {key: '13', name: 'Thẻ 500K Exp'},
                {key: '28', name: 'Thẻ A SKB'},
                {key: '43', name: 'Thẻ S SKB'},
                {key: '58', name: 'Thẻ R SKB'},
            ]
        },
        {
            title: 'Số Quà User Nhận Được',
            multipleKey: 'soQuaSinhRa',
            tooltip: {shared: true,},
            series: [
                {key: 'CARD_A_RANDOM', name: 'Thẻ A Random'},
                {key: 'GOLD', name: 'Gold'},
                {key: 'GOLD_GACHA', name: 'Rương Vàng'},
                {key: 'LUCKY_BOX_TICKET', name: 'Vé LuckyBox'},
                {key: 'MIRACLE_CARD_A', name: 'Thẻ Vi Diệu'},
                {key: 'ORANGE_GACHA', name: 'Rương Cam'},
                {key: 'PENDANT', name: 'Rương Pendant'},
                {key: 'PURPLE_GACHA', name: 'Rương Tím'},
                {key: 'card_exp_2', name: '20K Exp'},
                {key: 'card_exp_3', name: '30K Exp'},
                {key: 'card_exp_5', name: '50K Exp'},
                {key: 'card_exp_10', name: '100K Exp'},
                {key: 'card_exp_20', name: '200K Exp'},
                {key: 'card_exp_30', name: '300K Exp'},
                {key: 'card_exp_50', name: '500K Exp'},
                {key: 'item_oddeven', name: 'Item Chẵn Lẻ'},
            ]
        },
    ],
    'twoVsTwo': [
        {
            title: 'Kiểu Thắng Ván Chơi',
            multipleKey: 'kieuThang',
            series: [
                {key: '1', name: 'Normal'},
                {key: '2', name: 'Bankrupt'},
                {key: '3', name: 'Color'},
                {key: '4', name: 'Resort'},
                {key: '5', name: 'Line'},
            ]
        },
        {
            title: 'Số Lần Chọn Thẻ Theo ID',
            multipleKey: 'soLanChonTheTheoId',
        },
        {
            title: 'Số Pendant Mở Được Từ Rương Pendant Mới',
            multipleKey: 'pendant',
            series: [
                {key: '8', name: 'Hoàn Tiền'},
                {key: '9', name: 'Mũ Phép'},
            ]
        },
        {
            title: 'Số User Theo Ván Thắng',
            multipleKey: 'soUserTheoVanThang',
        },
        {
            title: 'Thống Kê Ván Chơi',
            multipleKey: 'thongKeVanChoi',
        },
        {
            title: 'Số Ván Chơi/Thắng Của Top 3,10,20,50,100,1000,3000,5000',
            multipleKey: 'soVanChoiTopUser',
        },
        {
            visible: 20,
            title: 'Top Clan',
            multipleKey: 'DiemClan',
        },
    ],
    'gameError': [
        {
            title: 'Số Ván Chơi Lỗi',
            type: 'column',
            series: [
                {key: 'match_NumMatch', name: 'Ván'},
            ]
        },
        {
            title: 'Kiểu Lỗi Ván Chơi',
            type: 'area',
            multipleKey: 'match_ErrorId',
            validKey: ['0', '1', '2'],
            series: [
                {key: '0', name: 'Vị Trí'},
                {key: '1', name: 'Vàng'},
                {key: '2', name: 'Seed'},
            ]
        },
        {
            title: 'Thẻ Xuất Hiện Trong Các Ván Lỗi',
            multipleKey: 'match_CardId',
        },
        {
            title: 'Kỹ Năng Xuất Hiện Trong Các Ván Lỗi',
            multipleKey: 'match_SkillId',
        },
        {
            title: 'Số Mã Lỗi Gửi Về Client',
            type: 'column',
            series: [
                {key: 'sendError_Num', name: 'Mã Lỗi'},
            ]
        },
        {
            title: 'CmdID Xuất Hiện Nhiều Nhất',
            multipleKey: 'sendError_CmdId',
        },
        {
            title: 'ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'sendError_ErrorId',
        },
        {
            title: 'CmdId_ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'sendError_CmdId_ErrorId',
        },
    ],
    'localPayment': [
        {
            title: 'Tỉ Lệ Mở Local Payment',
            series: [
                {key: 'serviceRate', name: 'Service'},
                {key: 'clientRate', name: 'Client'},
            ]
        },
    ],
    'quest': [
        {
            title: 'Hoàn Thành, Nhận Thưởng',
            series: [
                {key: 'a1', name: 'A1'},
                {key: 'numUserCompleteQuestToday', name: 'User Hoàn Thành'},
                {key: 'numUserQuestToday', name: 'User Nhận Thưởng'},
                {key: 'n1', name: 'N1'},
                {key: 'numNewUserCompleteQuestToday', name: 'New User Hoàn Thành'},
                {key: 'numNewUserQuestToday', name: 'New User Nhận Thưởng'},
            ]
        },
        {
            title: 'Tỉ Lệ Quay Lại Ngày Hôm Sau',
            series: [
                {key: 'rateUserQuestYesterdayBackToday', name: 'User Nhận Thưởng Quay Lại'},
                {key: 'rateUserCompleteQuestYesterdayBackToday', name: 'User Hoàn Thành Quay Lại'},
                {key: '100-churn1', name: '100-Churn1'},
                {key: 'rateNewUserQuestYesterdayBackToday', name: 'New User Nhận Thưởng Quay Lại'},
                {key: 'rateNewUserCompleteQuestYesterdayBackToday', name: 'New User Hoàn Thành Quay Lại'},
                {key: 'rr1', name: 'RR1'},
            ]
        },
        {
            title: 'Tổng số user hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc',
        },
        {
            title: 'Tổng số user 0 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc1',
        },
        {
            title: 'Tổng số user 1 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc2',
        },
        {
            title: 'Tổng số user 2-3 tuỏi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc3',
        },
        {
            title: 'Tổng số user 4-7 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc4',
        },
        {
            title: 'Tổng số user 8-15 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc5',
        },{
            title: 'Tổng số user 16-30 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc6',
        },{
            title: 'Tổng số user 30-180 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc7',
        },
        {
            title: 'Tổng số user >180 tuổi hoàn thành số nhiệm vụ',
            multipleKey: 'thongKeUserHoanThanhTungMoc8',
        },
        {
            title: 'Tổng số user click nhận quà nhiệm vụ',
            series: [
                {key: 'soLuongUserNhanQua3MucDo', name: 'Tổng'},
                {key: 'soLuongUserNhanQua3MucDo1', name: 'Nhóm 0 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo2', name: 'Nhóm 1 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo3', name: 'Nhóm 2-3 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo4', name: 'Nhóm 4-7 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo5', name: 'Nhóm 8-15 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo6', name: 'Nhóm 16-30 tuổi'},
                {key: 'soLuongUserNhanQua3MucDo7', name: 'Nhóm 30-180 tuôi'},
                {key: 'soLuongUserNhanQua3MucDo8', name: 'Nhóm >180 tuỏi'}
            ]
        },
        {
            title: 'Tỷ lệ hoàn thành mỗi nhiệm vụ (DiffId_QuestId)',
            multipleKey: 'rateUserCompleteEachQuest',
            visible: 5
        },
        {
            title: 'Số user hoàn thành (nhận được) 3 mốc quà lớn',
            multipleKey: 'soUserHoanThanh3MocQua',
            series: [
                {key: '90', name: 'Mốc 90'},
                {key: '150', name: 'Mốc 150'},
                {key: '200', name: 'Mốc 200'},
            ]
        },
        {
            title: 'Số user nhận quà bonus',
            series: [
                {key: 'soUserNhanQuaBonus', name: 'Tổng'},
            ]
        },
        {
            title: 'Số user được khởi tạo mới',
            series: [
                {key: 'soUserCoNhiemVuTaoMoi', name: 'Tổng'},
            ]
        }
    ],
    'g': [
        {
            visible: 5,
            title: 'Action',
            multipleKey: 'soLan',
        },
        {
            visible: 5,
            title: 'User / Action',
            multipleKey: 'soUser',
        },
        {
            visible: 5,
            title: 'G In / Action',
            multipleKey: 'soGNhan',
        },
        {
            visible: 5,
            title: 'G Out / Action',
            multipleKey: 'soGDung',
        },
        {
            title: 'G In Summary Statistics',
            multipleKey: 'thongKeNhanG',
            series: [
                {key: 'count', name: 'user'},
            ]
        },
        {
            title: 'G Out Summary Statistics',
            multipleKey: 'thongKeDungG',
            series: [
                {key: 'count', name: 'user'},
            ]
        },
        {
            title: 'G Balance (In-Out)',
            type: 'area',
            series: [
                {key: 'gBalance', name: 'G'},
            ],
            ignoreGames: ['vi'],
        },
        {
            title: 'Top 20 G In / User',
            multipleKey: 'nhanG',
        },
        {
            title: 'Top 20 G Out / User',
            multipleKey: 'dungG',
        },
    ],
    'gold': [
        {
            visible: 5,
            title: 'Action',
            multipleKey: 'soLan',
        },
        {
            visible: 5,
            title: 'User / Action',
            multipleKey: 'soUser',
        },
        {
            visible: 5,
            title: 'Gold In / Action',
            multipleKey: 'soGoldNhan',
        },
        {
            visible: 5,
            title: 'Gold Out / Action',
            multipleKey: 'soGoldDung',
        },
        {
            title: 'Gold In Summary Statistics',
            multipleKey: 'thongKeNhanGold',
            series: [
                {key: 'count', name: 'user'},
            ]
        },
        {
            title: 'Gold Out Summary Statistics',
            multipleKey: 'thongKeDungGold',
            series: [
                {key: 'count', name: 'user'},
            ]
        },
        {
            title: 'Gold Summary Statistics',
            multipleKey: 'ssGold',
            ignoreGames: ['vi', 'sea']
        },
        {
            title: 'User / Đoạn Vàng',
            multipleKey: 'groupGold',
            series: [
                {key: '0', name: '0-2999'},
                {key: '3000', name: '3000-8999'},
                {key: '9000', name: '9000-14999'},
                {key: '15000', name: '15000-20999'},
                {key: '21000', name: '21000-29999'},
                {key: '30000', name: '30000-89999'},
                {key: '90000', name: '90000-149999'},
                {key: '150000', name: '150000-209999'},
                {key: '210000', name: '210000-499999'},
                {key: '500000', name: '500000-999999'},
                {key: '1000000', name: '> 1000000'},
            ],
            ignoreGames: ['vi', 'sea']
        },
        {
            title: 'Gold Balance (In-Out)',
            type: 'area',
            series: [
                {key: 'goldBalance', name: 'Gold'},
            ]
        },
        {
            title: 'Top 20 Gold In / User',
            multipleKey: 'nhanGold',
        },
        {
            title: 'Top 20 Gold Out / User',
            multipleKey: 'dungGold',
        },
    ],
    'stayHome': [
        {
            type: 'column',
            title: 'Số user hoàn thành theo ngày',
            multipleKey: 'PassDay',
            series: [
                {key: '0', name: 'Ngày 1'},
                {key: '1', name: 'Ngày 2'},
                {key: '2', name: 'Ngày 3'},
                {key: '3', name: 'Ngày 4'},
                {key: '4', name: 'Ngày 5'},
                {key: '5', name: 'Ngày 6'},
                {key: '6', name: 'Ngày 7'},
                {key: '7', name: 'Ngày 8'},
                {key: '8', name: 'Ngày 9'},
                {key: '9', name: 'Ngày 10'},
                {key: '10', name: 'Ngày 11'},
                {key: '11', name: 'Ngày 12'},
                {key: '12', name: 'Ngày 13'},
                {key: '13', name: 'Ngày 14'},
                {key: '14', name: 'Ngày 15'},
                {key: '15', name: 'Ngày 16'},
            ]
        }
    ],
    'userplay': [
            {
                title: 'Số lần kỹ năng mang vào chơi',
                multipleKey: 'numSkillPlay',
                visible: 5,
            },
            {
                title: 'Số lần thẻ SKB được chơi',
                multipleKey: 'cardSKBPlay',
                visible: 5,
            }
    ],
    'winMatch': [
            {
                title: 'Số lần kỹ năng thắng',
                multipleKey: 'numSkillPLayWin',
                visible: 5,
            },
            {
                title: 'Số lần thẻ SKB thắng',
                multipleKey: 'cardSKBPlay',
                visible: 5,
            },
            {
                title: 'Tỷ lệ kỹ năng thắng',
                multipleKey: 'percentSkillPLay',
                visible: 5,
            },
            {
                title: 'Tỷ lệ thẻ SKB thắng',
                multipleKey: 'percentCardByType',
                visible: 5,
            }
    ],
    'pendantCardSV': [
            {
                title: 'Số thẻ S',
                series: [
                     {key: 'numCardS', name: 'số thẻ'},
                     {key: 'sumNumCardS', name: 'tổng số thẻ'}
                ]
            },
            {
                title: 'Số thẻ R',
                series: [
                     {key: 'numCardR', name: 'số thẻ'},
                     {key: 'sumNumCardR', name: 'tổng số thẻ'}
                ]
            },
            {
                title: 'Số pendant S',
                series: [
                      {key: 'numPendantS', name: 'số pendant'},
                      {key: 'sumNumPenS', name: 'tổng số pendant'}
                ]
            },
            {
                title: 'Số pendant R',
                series: [
                     {key: 'numPendantR', name: 'số pendant'},
                     {key: 'sumNumPenR', name: 'tổng số pendant'}
                ]
            },
    ],
    'guessSkill': [
                {
                    title: 'Số vàng/10K đặt mỗi cửa',
                    multipleKey: "mucDatMoiCuaGuessSkill"
                },
                {
                    title: 'Số vàng/10K User thắng mỗi cửa',
                    multipleKey: "mucThangMoiCuaGuessSkill"
                },
                {
                    title: 'Gold thắng / Gold đặt',
                    multipleKey: "rateGold"
                },
                {
                    title: 'Gold đặt - Gold thắng',
                    multipleKey: "deltaGold"
                }
    ],
    'world2': [
                {
                    title: 'Số item đã nhận',
                    multipleKey: "soTheWorld2DuocNhan"
                }
    ],
    'metricMatchExp': [
                {
                    title: 'Thẻ D',
                    multipleKey: "cardDPlayRoom"
                },
                {
                    title: 'Thẻ C',
                    multipleKey: "cardCPlayRoom"
                },
                {
                    title: 'Thẻ B',
                    multipleKey: "cardBPlayRoom"
                },
                {
                    title: 'Thẻ A',
                    multipleKey: "cardAPlayRoom"
                },
                {
                    title: 'Thẻ S',
                    multipleKey: "cardSPlayRoom"
                },
                {
                    title: 'Thẻ R',
                    multipleKey: "cardRPlayRoom"
                },

    ],
    'addInboxItem': [
                {
                    title: 'Số thẻ vòng quay SKB nhận được',
                    multipleKey: "numRotateCardSKB"
                },
                {
                    title: 'Số user hoàn thành tutorial',
                    series: [
                        {key: 'numUserCompleteTutorial', name: 'số user'}
                    ]
                },
                ],
    'firstpay': [
                {
                    title: 'Số User thấy popup',
                    series: [
                            {key: 'soUserThayPopup.gift_pack_21', name: 'Gói 1'},
                            {key: 'soUserThayPopup.gift_pack_22', name: 'Gói 2'},
                            {key: 'soUserThayPopup.gift_pack_23', name: 'Gói 3'}
                    ]
                },
                {
                    title: 'Số lượt mua',
                    series: [
                            {key: 'soLuotMua.21', name: 'Gói 1'},
                            {key: 'soLuotMua.22', name: 'Gói 2'},
                            {key: 'soLuotMua.23', name: 'Gói 3'}
                    ]
                },
                {
                    title: 'Trung bình số lần user thấy popup mới mua',
                    series: [
                            {key: 'ssSeePopup.min', name: 'Min'},
                            {key: 'ssSeePopup.median', name: 'Median'},
                            {key: 'ssSeePopup.avg', name: 'Avg'},
                            {key: 'ssSeePopup.max', name: 'Max'},
                    ]
                },
                {
                    title: 'Thời gian Trung bình user mua sau khi thấy popup (Giây)',
                    series: [
                            {key: 'ssTimeFromSeePopup.min', name: 'Min'},
                            {key: 'ssTimeFromSeePopup.median', name: 'Median'},
                            {key: 'ssTimeFromSeePopup.avg', name: 'Avg'},
                            {key: 'ssTimeFromSeePopup.max', name: 'Max'},
                    ]
                },
                {
                    title: 'ABTest - Số user mua gói 1',
                    multipleKey: "soLuotMuaPack21AB"
                },
                {
                    title: 'ABTest - Số user mua gói 3',
                    multipleKey: "soLuotMuaPack23AB"
                },
    ],
    'newTut': [
                    {
                        title: 'Số user hoàn thành tut theo từng bước',
                        multipleKey: 'mapStepToNumUser'
                    },
                    {
                        title: 'Tỉ lệ NEW user hoàn thành tut theo từng bước',
                        multipleKey: 'mapStepToRateNewUser'
                    },
                    {
                        title: 'Số NEW user hoàn thành tut theo từng bước',
                        multipleKey: 'mapStepToNumNewUser'
                    },
                    {
                        title: 'Số user skip tut theo từng bước',
                        multipleKey: 'mapStepToNumUserSkip'
                    },
                    {
                        title: 'Số NEW user skip tut theo từng bước',
                        multipleKey: 'mapStepToNumNewUserSkip'
                    },
                    {
                        title: 'Số user hoàn thành tut hôm qua và quay lại theo từng bước',
                        multipleKey: 'mapStepToNumUserCompleteYesterday'
                    },
                    {
                        title: 'Số NEW user hoàn thành tut hôm qua và quay lại theo từng bước',
                        multipleKey: 'mapStepToNumNewUserCompleteYesterday'
                    },
                    {
                        title: 'Số user skip tut hôm qua và quay lại theo từng bước',
                        multipleKey: 'mapStepToNumUserSkipYesterday'
                    },
                    {
                        title: 'Số NEW user skip tut hôm qua và quay lại theo từng bước',
                        multipleKey: 'mapStepToNumNewUserSkipYesterday'
                    },
    ],
    'loidai': [
                    {
                        title: 'Thời gian chơi',
                        multipleKey: 'timeplay'
                    },
                    {
                        title: 'Số lần mua trang bị',
                        multipleKey: 'BuyEquipment'
                    },
                    {
                        title: 'Thời gian chơi đường giữa',
                        multipleKey: 'timeplayMidLane'
                    },
                    {
                        title: 'Thời gian chơi đường trên/dưới',
                        multipleKey: 'timeplayTopBotLane'
                    },
                    {
                        title: 'Số lần mở rương',
                        multipleKey: 'numOpenGacha'
                    },
                    {
                        title: 'Số lần mua trang bị tăng atk',
                        series: [
                            {key: 'numBuyItemLoiDai', name: 'số lần'}
                        ]
                    },
    ],
    'clientStep': [
        {
            custom: 'swap',
            type: 'column',
            title: 'Tỉ lệ New User ở lại tại các bước',
            multipleKey: 'custom2',
            tooltip: {shared: true},
            validKey: ['n1', 'newDevice', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9',
                'step10', 'step11', 'step12', 'step13', 'step14', 'step15', 'step16',
                'numUserPlay1', 'numUserPlay1Done', 'numUserPlay2', 'numUserPlay2Done', 'numUserPlay3', 'numUserPlay3Done'],
            series: [
                {key: 'n1', name: 'N1'},
                {key: 'newDevice', name: 'N1 Device'},
                {key: 'step1', name: 'Show Init Char'},
                {key: 'step2', name: 'Select Init Char'},
                {key: 'step3', name: 'Screen Tut Quest'},
                {key: 'step4', name: 'Start Tut1'},
                {key: 'step5', name: 'Finish Tut1'},
                {key: 'step6', name: 'Start Tut2'},
                {key: 'step7', name: 'Finish Tut2'},
                {key: 'step8', name: 'Start Tut3'},
                {key: 'step9', name: 'Finish Tut3'},
                {key: 'step10', name: 'Start Tut4'},
                {key: 'step11', name: 'Finish Tut4'},
                {key: 'step12', name: 'Start Tut5'},
                {key: 'step13', name: 'Finish Tut5'},
                {key: 'step14', name: 'Start Tut6'},
                {key: 'step15', name: 'Finish Tut6'},
                {key: 'step16', name: 'Complete Tut'},
                {key: 'numUserPlay1', name: 'Play 1'},
                {key: 'numUserPlay1Done', name: 'Play 1 done'},
                {key: 'numUserPlay2', name: 'Play 2'},
                {key: 'numUserPlay2Done', name: 'Play 2 done'},
                {key: 'numUserPlay3', name: 'Play 3'},
                {key: 'numUserPlay3Done', name: 'Play 3 done'},
            ]
        },
        {
            title: 'Số New User ở lại tại các bước',
            multipleKey: 'custom1',
            tooltip: {shared: true},
            validKey: ['n1', 'newDevice', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9',
                'step10', 'step11', 'step12', 'step13', 'step14', 'step15', 'step16',
                'numUserPlay1', 'numUserPlay1Done', 'numUserPlay2', 'numUserPlay2Done', 'numUserPlay3', 'numUserPlay3Done'],
            series: [
                {key: 'n1', name: 'N1'},
                {key: 'newDevice', name: 'N1 Device'},
                {key: 'step1', name: 'Show Init Char'},
                {key: 'step2', name: 'Select Init Char'},
                {key: 'step3', name: 'Screen Tut Quest'},
                {key: 'step4', name: 'Start Tut1'},
                {key: 'step5', name: 'Finish Tut1'},
                {key: 'step6', name: 'Start Tut2'},
                {key: 'step7', name: 'Finish Tut2'},
                {key: 'step8', name: 'Start Tut3'},
                {key: 'step9', name: 'Finish Tut3'},
                {key: 'step10', name: 'Start Tut4'},
                {key: 'step11', name: 'Finish Tut4'},
                {key: 'step12', name: 'Start Tut5'},
                {key: 'step13', name: 'Finish Tut5'},
                {key: 'step14', name: 'Start Tut6'},
                {key: 'step15', name: 'Finish Tut6'},
                {key: 'step16', name: 'Complete Tut'},
                {key: 'numUserPlay1', name: 'Play 1'},
                {key: 'numUserPlay1Done', name: 'Play 1 done'},
                {key: 'numUserPlay2', name: 'Play 2'},
                {key: 'numUserPlay2Done', name: 'Play 2 done'},
                {key: 'numUserPlay3', name: 'Play 3'},
                {key: 'numUserPlay3Done', name: 'Play 3 done'},
            ]
        },
        {
            title: 'RR1',
            multipleKey: 'rr1',
            tooltip: {shared: true},
            validKey: ['1', '2', '3'],
            series: [
                {key: '1', name: 'Play 1'},
                {key: '2', name: 'Play 2'},
                {key: '3', name: 'Play 3'},
            ]
        },
        {
            title: 'RR2',
            multipleKey: 'rr2',
            tooltip: {shared: true},
            validKey: ['1', '2', '3'],
            series: [
                {key: '1', name: 'Play 1'},
                {key: '2', name: 'Play 2'},
                {key: '3', name: 'Play 3'},
            ]
        },
        {
            title: 'RR3',
            multipleKey: 'rr3',
            tooltip: {shared: true},
            validKey: ['1', '2', '3'],
            series: [
                {key: '1', name: 'Play 1'},
                {key: '2', name: 'Play 2'},
                {key: '3', name: 'Play 3'},
            ]
        },
        {
            title: 'RR7',
            multipleKey: 'rr7',
            tooltip: {shared: true},
            validKey: ['1', '2', '3'],
            series: [
                {key: '1', name: 'Play 1'},
                {key: '2', name: 'Play 2'},
                {key: '3', name: 'Play 3'},
            ]
        },
        {
            title: 'New user disconnect in match',
            multipleKey: 'groupDisconnect'
        },
    ],
    'giftCode' : [
        {
            title: 'Tổng số user dùng giftcode ilovectp',
            series: [
                {key: 'soUserDungilovectp', name: 'Tổng'},
            ]
        },
        {
            title: 'Số users quay lại sau (0->14, 15-30, >31) ngày active code ilovectp',
            multipleKey: 'ilovectpTimeReturbGame',
            validKey: ['1', '2', '3'],
            series: [
                {key: '1', name: '0-14'},
                {key: '2', name: '15-30'},
                {key: '3', name: '>30'},
            ]
        },
    ],
};
conf_metric.sea = {
    'g': JSON.parse(JSON.stringify(conf_metric.vi.g)),
    'gold': JSON.parse(JSON.stringify(conf_metric.vi.gold)),
};
conf_metric.br = {
    'treasureHunt': [
        {
            type: 'column',
            title: 'Số Lần Đổ XX / Số User',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'groupRoll',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            type: 'column',
            title: 'Đổ XX',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssRoll'
        },
        {
            type: 'column',
            title: 'G Đổ XX',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssG'
        },
        {
            type: 'column',
            title: 'Cạnh 1',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'edge_1',
        },
        {
            type: 'column',
            title: 'Cạnh 2',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'edge_2',
        },
        {
            type: 'column',
            title: 'Cạnh 3',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'edge_3',
        },
        {
            type: 'column',
            title: 'Cạnh 4',
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'edge_4',
        },
        {
            title: 'Quà Sinh Ra',
            multipleKey: 'soQuaSinhRa',
        },
    ],
    'gameError': [
        {
            title: 'Số Mã Lỗi Gửi Về Client',
            series: [
                {key: 'size', name: 'Mã Lỗi'},
            ]
        },
        {
            title: 'CmdID Xuất Hiện Nhiều Nhất',
            multipleKey: 'cmdId',
        },
        {
            title: 'ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'errorId',
        },
        {
            title: 'CmdId_ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'cmdIdErrorId',
        },
    ],
    'localPayment': JSON.parse(JSON.stringify(conf_metric.vi.localPayment)),
    'quest': [
        JSON.parse(JSON.stringify(conf_metric.vi.quest))[0],
        {
            title: 'Tỉ Lệ Quay Lại Ngày Hôm Sau',
            series: [
                {key: 'rateUserQuestYesterdayBackToday', name: 'User Nhận Thưởng Quay Lại'},
                {key: 'rateUserCompleteQuestYesterdayBackToday', name: 'User Hoàn Thành Quay Lại'},
                {key: '100-churn1', name: '100-Churn1'},
                {key: 'rateNewUserQuestYesterdayBackToday', name: 'New User Nhận Thưởng Quay Lại'},
                {key: 'rateNewUserCompleteQuestYesterdayBackToday', name: 'New User Hoàn Thành Quay Lại'},
                {key: 'rrFinishTut', name: 'RR1 Finish Tut'},
                {key: 'rrViewTut', name: 'RR1 View Tut'},
                {key: 'rr1', name: 'RR1'},
                {key: 'rrSkipTut', name: 'RR1 Skip Tut'},
            ]
        },
    ],
    'g': conf_metric.vi.g,
    'gold': JSON.parse(JSON.stringify(conf_metric.vi.gold)),
    'client': [
        {
            custom: 'swap',
            type: 'column',
            title: 'Tỉ lệ New User ở lại tại các bước',
            multipleKey: 'custom2',
            tooltip: {shared: true},
            validKey: ['n1', 'tut_step1', 'tut_step2', 'tut_step3', 'tut_step4', 'skip_step4+tut_step5',
                'numUserPlay1', 'numUserPlay1Done', 'numUserPlay2', 'numUserPlay2Done', 'numUserPlay3', 'numUserPlay3Done'],
            series: [
                {key: 'n1', name: 'N1'},
                {key: 'tut_step1', name: 'Screen Welcome'},
                {key: 'tut_step2', name: 'Screen Chọn NV'},
                {key: 'tut_step3', name: 'Chọn NV'},
                {key: 'tut_step4', name: 'Main Lobby'},
                {key: 'skip_step4+tut_step5', name: 'Xem+Skip Tut'},
                {key: 'numUserPlay1', name: 'Play 1'},
                {key: 'numUserPlay1Done', name: 'Play 1 Online'},
                {key: 'numUserPlay2', name: 'Play 2'},
                {key: 'numUserPlay2Done', name: 'Play 2 Online'},
                {key: 'numUserPlay3', name: 'Play 3'},
                {key: 'numUserPlay3Done', name: 'Play 3 Online'},
            ]
        },
        {
            title: 'Số New User ở lại tại các bước',
            multipleKey: 'custom1',
            tooltip: {shared: true},
            validKey: ['n1', 'tut_step1', 'tut_step2', 'tut_step3', 'tut_step4', 'skip_step4+tut_step5',
                'numUserPlay1', 'numUserPlay1Done', 'numUserPlay2', 'numUserPlay2Done', 'numUserPlay3', 'numUserPlay3Done'],
            series: [
                {key: 'n1', name: 'N1'},
                {key: 'tut_step1', name: 'Screen Welcome'},
                {key: 'tut_step2', name: 'Screen Chọn NV'},
                {key: 'tut_step3', name: 'Chọn NV'},
                {key: 'tut_step4', name: 'Main Lobby'},
                {key: 'skip_step4+tut_step5', name: 'Xem+Skip Tut'},
                {key: 'numUserPlay1', name: 'Play 1'},
                {key: 'numUserPlay1Done', name: 'Play 1 Online'},
                {key: 'numUserPlay2', name: 'Play 2'},
                {key: 'numUserPlay2Done', name: 'Play 2 Online'},
                {key: 'numUserPlay3', name: 'Play 3'},
                {key: 'numUserPlay3Done', name: 'Play 3 Online'},
            ]
        },
        {
            custom: 'swap',
            type: 'column',
            title: 'Tỉ lệ New User ở lại Tut',
            multipleKey: 'custom4',
            tooltip: {shared: true},
            series: [
                {key: '5', name: 'start'},
                {key: '6', name: 'step6'},
                {key: '7', name: 'step7'},
                {key: '8', name: 'step8'},
                {key: '9', name: 'step9'},
                {key: '10', name: 'step10'},
                {key: '11', name: 'step11'},
            ]
        },
        {
            title: 'Số New User ở lại Tut',
            subtitle: 'stepTut(n)+skipTut(n-1)',
            multipleKey: 'custom3',
            tooltip: {shared: true},
            series: [
                {key: '5', name: 'start'},
                {key: '6', name: 'step6'},
                {key: '7', name: 'step7'},
                {key: '8', name: 'step8'},
                {key: '9', name: 'step9'},
                {key: '10', name: 'step10'},
                {key: '11', name: 'step11'},
            ]
        },
        {
            title: 'roll_pass_1',
            multipleKey: 'rollPass1',
        },
        {
            title: 'roll_pass_2',
            multipleKey: 'rollPass2',
        },
        {
            title: 'roll_pass_3',
            multipleKey: 'rollPass3',
        },
        {
            title: 'roll_pass',
            series: [
                {key: 'rollPass', name: 'roll_pass'},
            ]
        },
        {
            title: 'Online Time Summary Statistics (Seconds)',
            multipleKey: 'ssOnlineTime',
        },
        {
            title: 'Số User/Khoảng Thời Gian Online (Phút)',
            multipleKey: 'groupOnlineTime',
            series: [
                {key: '1', name: '0-1'},
                {key: '2', name: '1-2'},
                {key: '3', name: '2-3'},
                {key: '5', name: '3-5'},
                {key: '8', name: '5-8'},
                {key: '13', name: '8-13'},
                {key: '21', name: '13-21'},
                {key: '34', name: '21-34'},
                {key: '55', name: '34-55'},
                {key: '89', name: '55-89'},
                {key: '144', name: '89-144'},
                {key: '233', name: '144-233'},
                {key: '377', name: '233-377'},
                {key: '999999', name: '> 377'},
            ]
        },
        {
            title: 'Online Time Summary Statistics (New)',
            multipleKey: 'newUser_ssOnlineTime',
        },
        {
            title: 'Số User/Khoảng Thời Gian Online (New)',
            multipleKey: 'newUser_groupOnlineTime',
            series: [
                {key: '1', name: '0-1'},
                {key: '2', name: '1-2'},
                {key: '3', name: '2-3'},
                {key: '5', name: '3-5'},
                {key: '8', name: '5-8'},
                {key: '13', name: '8-13'},
                {key: '21', name: '13-21'},
                {key: '34', name: '21-34'},
                {key: '55', name: '34-55'},
                {key: '89', name: '55-89'},
                {key: '144', name: '89-144'},
                {key: '233', name: '144-233'},
                {key: '377', name: '233-377'},
                {key: '999999', name: '> 377'},
            ]
        },
        {
            title: 'First Character',
            multipleKey: 'firstCharacter',
            series: [
                {key: '1', name: 'Nữ'},
                {key: '2', name: 'Nam'},
            ]
        },
        {
            title: 'Step Tutorial',
            multipleKey: 'tutorialDistinct',
            series: [
                {key: 'step1', name: 'Hiện Screen Welcome'},
                {key: 'step2', name: 'Hiện Chọn Nhân Vật'},
                {key: 'step3', name: 'Chọn Nhân Vật'},
                {key: 'step4', name: 'Vào Main Lobby'},
                {key: 'step5', name: 'Bấm Xem Tut'},
                {key: 'step6', name: 'Bấm Đổ XX Lần Đầu'},
                {key: 'step7', name: 'Bấm Mua Nhà Lần Đầu'},
                {key: 'step8', name: 'Hiện 4 Cách Thắng'},
                {key: 'step9', name: 'Bấm Xem Cách Thắng 02'},
                {key: 'step10', name: 'Bấm Xem Cách Thắng 03'},
                {key: 'step11', name: 'Bấm Xem Cách Thắng 04'},
            ]
        },
        {
            title: 'Step Skip Tutorial',
            multipleKey: 'skipTutDistinct',
            series: [
                {key: 'step1', name: 'Hiện Screen Welcome'},
                {key: 'step2', name: 'Hiện Chọn Nhân Vật'},
                {key: 'step3', name: 'Chọn Nhân Vật'},
                {key: 'step4', name: 'Vào Main Lobby'},
                {key: 'step5', name: 'Bấm Xem Tut'},
                {key: 'step6', name: 'Bấm Đổ XX Lần Đầu'},
                {key: 'step7', name: 'Bấm Mua Nhà Lần Đầu'},
                {key: 'step8', name: 'Hiện 4 Cách Thắng'},
                {key: 'step9', name: 'Bấm Xem Cách Thắng 02'},
                {key: 'step10', name: 'Bấm Xem Cách Thắng 03'},
                {key: 'step11', name: 'Bấm Xem Cách Thắng 04'},
            ]
        },
        {
            title: 'Step Shop',
            multipleKey: 'shopStepDistinct',
            series: [
                {key: '1', name: 'shop'},
                {key: '2', name: 'tab_iap'},
                {key: '3', name: 'tab_cc'},
                {key: '4', name: 'tab_gold'},
                {key: '5', name: 'select_item_iap'},
                {key: '6', name: 'select_item_cc'},
                {key: '7', name: 'show_cc_type'},
                {key: '8', name: 'input_cc_type'},
                {key: '9', name: 'show_cc_card'},
                {key: '10', name: 'input_cc_card'},
                {key: '11', name: 'show_cc_user'},
                {key: '12', name: 'input_cc_user'},
                {key: '13', name: 'show_cc_repay'},
                {key: '14', name: 'cc_create_trans'},
                {key: '15', name: 'cc_create_trans_success'},
            ]
        },
        {
            title: 'IAP/Credit Amount',
            multipleKey: 'priceDistinct',
        },
        {
            title: 'Credit Rate',
            multipleKey: 'ccrDistinct',
            series: [
                {key: '1', name: 'Card Token'},
                {key: '2', name: 'Card CVV'},
                {key: '3', name: 'User Info'},
            ]
        },
        {
            title: 'IAP Step',
            multipleKey: 'iapStepDistinct',
            series: [
                {key: '1', name: 'start'},
                {key: '2', name: 'cancel'},
                {key: '3', name: 'failed'},
                {key: '4', name: 'timeout'},
                {key: '5', name: 'failed_other'},
                {key: '6', name: 'success'},
            ]
        },
        {
            title: 'IAP Portal Step',
            multipleKey: 'iapPortalStepDistinct',
            series: [
                {key: '1', name: 'start'},
                {key: '2', name: 'cancel'},
                {key: '3', name: 'failed'},
                {key: '4', name: 'timeout'},
                {key: '5', name: 'failed_other'},
                {key: '6', name: 'success'},
            ]
        },
    ],
    'match': [
        {
            title: 'Ván chơi Summary Statistics',
            multipleKey: 'ssMatch',
        },
        {
            title: 'Số User/Ván Chơi',
            multipleKey: 'groupMatch',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            title: 'Tỉ Lệ Online Khi Hết Ván/Ván Chơi',
            multipleKey: 'groupRateOnline',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            title: 'Ván Chơi Summary Statistics (New)',
            multipleKey: 'newUser_ssMatch',
        },
        {
            title: 'Số User/Ván Chơi (New)',
            multipleKey: 'newUser_groupMatch',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            title: 'Tỉ Lệ Online Khi Hết Ván/Ván Chơi (New)',
            multipleKey: 'newUser_groupRateOnline',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            title: 'Tỉ Lệ Chơi Ít Nhất 1 Ván',
            series: [
                {key: 'ratePlayLeast1Match', name: 'All'},
                {key: 'newUser_ratePlayLeast1Match', name: 'New'},
            ]
        },
        {
            title: 'Số Ván Chơi',
            series: [
                {key: 'vanChoi', name: 'Ván'},
            ]
        },
        {
            title: 'Số Ván Chơi/Mức Cược',
            multipleKey: 'vanChoi/mucCuoc',
        },
        {
            title: 'Số Lần Chơi/Mức Cược',
            multipleKey: 'lan/mucCuoc',
        },
        {
            title: 'Số User Chơi/Mức Cược',
            multipleKey: 'user/mucCuoc',
        },
        {
            title: 'Phế/Mức Cược',
            multipleKey: 'waste/mucCuoc',
        },
        {
            title: 'Thời Gian Trung Bình Ván Chơi/Mức Cược',
            multipleKey: 'avgMatchTime/mucCuoc',
        },
    ],
    'openGacha': [
        {
            title: 'Số User Mở Rương Miễn Phí',
            type: 'area',
            series: [
                {key: 'numUserOpenFreeGacha', name: 'User'},
            ]
        },
        {
            title: 'Số User Hoàn Thành 3 Ván Đầu/Số Ngày',
            multipleKey: 'first3game_complete',
        },
        {
            title: 'Số User Nhận Thưởng 3 Ván Đầu/Số Ngày',
            multipleKey: 'first3game_receive',
        },
    ],
    'tournament': [
        {
            type: 'column',
            title: 'Số Vé Mua / Số User',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'groupJoin',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            type: 'column',
            title: 'Mua Vé Đấu Trường',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssJoin'
        },
        {
            type: 'column',
            title: 'Số Ván Chơi / Số User',
            yAxis: {title: {text: ''}, stackLabels: {enabled: true}},
            tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>', shared: true},
            plotOptions: {column: {stacking: 'normal', dataLabels: {enabled: true}}},
            multipleKey: 'groupMatch',
            series: [
                {key: '10', name: '>= 10'},
            ]
        },
        {
            type: 'column',
            title: 'Ván Chơi Đấu Trường',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'ssMatch'
        },
        {
            title: 'Số Ván Chơi',
            plotOptions: {line: {dataLabels: {enabled: true}}, series: {enableMouseTracking: false}},
            series: [
                {key: 'numMatch', name: 'Ván'},
            ]
        },
        {
            type: 'column',
            title: 'Số User Tại Các Level',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'mapGiftLevelWithNumUser'
        },
        {
            type: 'column',
            title: 'Số Lần Tại Các Level',
            plotOptions: {column: {dataLabels: {enabled: true}}},
            multipleKey: 'mapGiftLevelWithNum'
        },
        {
            title: 'Quà Sinh Ra',
            multipleKey: 'soQuaSinhRa',
        },
    ],
    'heatMap': []
};
conf_metric.mx = JSON.parse(JSON.stringify(conf_metric.br));
conf_metric.lite = {
    'gameError': [
        {
            title: 'Số Mã Lỗi Gửi Về Client',
            series: [
                {key: 'size', name: 'Mã Lỗi'},
            ]
        },
        {
            title: 'CmdID Xuất Hiện Nhiều Nhất',
            multipleKey: 'cmdId',
        },
        {
            title: 'ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'errorId',
        },
        {
            title: 'CmdId_ErrorId Xuất Hiện Nhiều Nhất',
            multipleKey: 'cmdIdErrorId',
        },
    ],
    'localPayment': JSON.parse(JSON.stringify(conf_metric.vi.localPayment)),
    'client': [
        {
            title: 'Step Tutorial',
            multipleKey: 'buocTutorial',
        },
        {
            title: 'Step Skip Tutorial',
            multipleKey: 'skipTutDistinct',
        },
        {
            title: 'Shop',
            series: [
                {key: 'openShop', name: 'Lần Mở'},
                {key: 'buyHeartFromShop', name: 'Lần Mua Heart'},
                {key: 'buyGemFromShop', name: 'Lần Mua Gem'},
            ]
        },
    ],
    'match': [
        {
            title: 'Số Ván Chơi Bàn 2,3,4',
            multipleKey: 'soVanChoi',
        },
        {
            title: 'Thống Kê Turn Bàn 2',
            multipleKey: 'thongKeTurnBan2',
        },
        {
            title: 'Thống Kê Turn Bàn 3',
            multipleKey: 'thongKeTurnBan3',
        },
        {
            title: 'Thống Kê Turn Bàn 4',
            multipleKey: 'thongKeTurnBan4',
        },
        {
            title: 'Thống Kê ReRollDice',
            multipleKey: 'thongKeReRollDice',
        },
        {
            title: 'Thống Kê ReRollCard',
            multipleKey: 'thongKeReRollCard',
        },
        {
            title: 'Tỉ Lệ ReRoll',
            series: [
                {key: 'tyLeReRollDice', name: 'Dice'},
                {key: 'tyLeReRollCard', name: 'Card'},
            ]
        },
        {
            title: 'User / Ván Chơi',
            multipleKey: 'groupMatch',
        },
    ],
    'heart': [
        {
            title: 'Hết Tim',
            series: [
                {key: 'soUserHetTim', name: 'Lần'},
                {key: 'soUserUniqueHetTim', name: 'User'},
                {key: 'soUserQuayLaiKhiHetTim', name: 'Lần Quay Lại Khi Hết Tim'},
                {key: 'soUserUniqueQuayLaiKhiHetTim', name: 'User Quay Lại Khi Hết Tim'},
            ]
        },
        {
            title: 'Số Tim Đăng Nhập Sau Khi Hết Tim',
            multipleKey: 'soTimLoginSauKhiHetTim',
        },
    ],
    'character': [
        {
            title: 'Character/ User',
            multipleKey: 'nhanVat/user',
        },
        {
            title: 'Character Được Chọn',
            multipleKey: 'soNhanVatDuocChon',
        },
    ],
};
conf_metric.match3 = {
    'metric_level': [
            {
                visible: 5,
                title: 'Số lượt chơi',
                multipleKey: 'luotChoi',
            },
            {
                visible: 5,
                title: 'Số người chơi',
                multipleKey: 'soNguoiChoi',
            },
            {
                visible: 5,
                title: 'Lượt Thắng',
                multipleKey: 'luotThang',
            },
            {
                visible: 5,
                title: 'Lượt thua',
                multipleKey: 'luotThua',
            }
        ],
    'soMoveThua': [
        {
            visible: 5,
            title: 'Thống kê số move thừa trung bình theo level',
            multipleKey: 'soMoveThuaAverage',
        },
        {
            visible: 5,
            title: 'Thống kê số move thừa min theo level',
            multipleKey: 'soMoveThuaMin',
        },
        {
            visible: 5,
            title: 'Thống kê số move thừa max theo level',
            multipleKey: 'soMoveThuaMax',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa < 0',
            multipleKey: 'soMoveThuaRange_<0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 0',
            multipleKey: 'soMoveThuaRange_0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 1',
            multipleKey: 'soMoveThuaRange_1',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 2',
            multipleKey: 'soMoveThuaRange_2',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 3',
            multipleKey: 'soMoveThuaRange_3',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 4',
            multipleKey: 'soMoveThuaRange_4',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 5',
            multipleKey: 'soMoveThuaRange_5',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 6-10',
            multipleKey: 'soMoveThuaRange_6-10',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa = 11-15',
            multipleKey: 'soMoveThuaRange_11-15',
        },
        {
            visible: 5,
            title: 'Thống kê level có số move thừa >15',
            multipleKey: 'soMoveThuaRange_>15',
        },
    ],
    'loseTarget_1': [
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm trung bình theo level',
            multipleKey: 'loseTarget_1_Average',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm min theo level',
            multipleKey: 'loseTarget_1_Min',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm max theo level',
            multipleKey: 'loseTarget_1_Max',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm < 0',
            multipleKey: 'Range_<0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 0',
            multipleKey: 'Range_0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 1',
            multipleKey: 'Range_1',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 2',
            multipleKey: 'Range_2',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 3',
            multipleKey: 'Range_3',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 4',
            multipleKey: 'Range_4',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 5',
            multipleKey: 'Range_5',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 6-10',
            multipleKey: 'Range_6-10',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 11-15',
            multipleKey: 'Range_11-15',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm > 15',
            multipleKey: 'Range_>15',
        },
    ],
    'loseTarget_2': [
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm trung bình theo level',
            multipleKey: 'loseTarget_2_Average',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm min theo level',
            multipleKey: 'loseTarget_2_Min',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm max theo level',
            multipleKey: 'loseTarget_2_Max',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm < 0',
            multipleKey: 'Range_<0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 0',
            multipleKey: 'Range_0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 1',
            multipleKey: 'Range_1',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 2',
            multipleKey: 'Range_2',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 3',
            multipleKey: 'Range_3',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 4',
            multipleKey: 'Range_4',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 5',
            multipleKey: 'Range_5',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 6-10',
            multipleKey: 'Range_6-10',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 11-15',
            multipleKey: 'Range_11-15',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm > 15',
            multipleKey: 'Range_>15',
        },
    ],
    'loseTarget_3': [
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm trung bình theo level',
            multipleKey: 'loseTarget_3_Average',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm min theo level',
            multipleKey: 'loseTarget_3_Min',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm max theo level',
            multipleKey: 'loseTarget_3_Max',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm < 0',
            multipleKey: 'Range_<0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 0',
            multipleKey: 'Range_0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 1',
            multipleKey: 'Range_1',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 2',
            multipleKey: 'Range_2',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 3',
            multipleKey: 'Range_3',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 4',
            multipleKey: 'Range_4',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 5',
            multipleKey: 'Range_5',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 6-10',
            multipleKey: 'Range_6-10',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 11-15',
            multipleKey: 'Range_11-15',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm > 15',
            multipleKey: 'Range_>15',
        },
    ],
    'loseTarget_4': [
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm trung bình theo level',
            multipleKey: 'loseTarget_4_Average',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm min theo level',
            multipleKey: 'loseTarget_4_Min',
        },
        {
            visible: 5,
            title: 'Thống kê số lượng tartget cần thêm max theo level',
            multipleKey: 'loseTarget_4_Max',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm < 0',
            multipleKey: 'Range_<0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 0',
            multipleKey: 'Range_0',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 1',
            multipleKey: 'Range_1',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 2',
            multipleKey: 'Range_2',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 3',
            multipleKey: 'Range_3',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 4',
            multipleKey: 'Range_4',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 5',
            multipleKey: 'Range_5',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 6-10',
            multipleKey: 'Range_6-10',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm = 11-15',
            multipleKey: 'Range_11-15',
        },
        {
            visible: 5,
            title: 'Thống kê level có số lượng tartget cần thêm > 15',
            multipleKey: 'Range_>15',
        },
    ]
};
//
conf_metric.mode1 = true; //show table below chart
conf_metric.mode2 = false; //show table in modal
conf_metric.metricDefault = 'g';
