export interface BulletinInfo {
  date: string
  orderId: number
  totalLen: number
}
export interface VersionInfo {
  id: number
  acronyms: string
  list: Array<BulletinInfo>
}

export const testData: Array<VersionInfo> = [
  {
    id: 1,
    acronyms: '不删档测试',
    list: [
      {
        date: '2018-07-10',
        orderId: 20,
        totalLen: 1602,
      },
      {
        date: '2018-07-11',
        orderId: 14,
        totalLen: 2567,
      },
      {
        date: '2018-07-14',
        orderId: 17,
        totalLen: 2053,
      },
      {
        date: '2018-07-19',
        orderId: 6,
        totalLen: 4275,
      },
      {
        date: '2018-07-26',
        orderId: 3,
        totalLen: 5802,
      },
      {
        date: '2018-08-16',
        orderId: 11,
        totalLen: 2714,
      },
      {
        date: '2018-08-23',
        orderId: 7,
        totalLen: 3928,
      },
      {
        date: '2018-08-30',
        orderId: 2,
        totalLen: 6120,
      },
      {
        date: '2018-09-06',
        orderId: 1,
        totalLen: 7284,
      },
      {
        date: '2018-09-13',
        orderId: 4,
        totalLen: 4791,
      },
      {
        date: '2018-09-20',
        orderId: 5,
        totalLen: 4671,
      },
      {
        date: '2018-09-27',
        orderId: 8,
        totalLen: 3388,
      },
      {
        date: '2018-10-04',
        orderId: 21,
        totalLen: 1356,
      },
      {
        date: '2018-10-11',
        orderId: 15,
        totalLen: 2458,
      },
      {
        date: '2018-10-18',
        orderId: 10,
        totalLen: 3099,
      },
      {
        date: '2018-10-25',
        orderId: 12,
        totalLen: 2626,
      },
      {
        date: '2018-11-01',
        orderId: 9,
        totalLen: 3198,
      },
      {
        date: '2018-11-08',
        orderId: 13,
        totalLen: 2626,
      },
      {
        date: '2018-11-15',
        orderId: 18,
        totalLen: 1789,
      },
      {
        date: '2018-11-22',
        orderId: 16,
        totalLen: 2299,
      },
      {
        date: '2018-11-29',
        orderId: 23,
        totalLen: 928,
      },
      {
        date: '2018-12-06',
        orderId: 19,
        totalLen: 1709,
      },
      {
        date: '2018-12-13',
        orderId: 22,
        totalLen: 1025,
      },
    ],
  },
  {
    id: 2,
    acronyms: '剑鸣流花',
    list: [
      {
        date: '2018-12-20',
        orderId: 1,
        totalLen: 17285,
      },
      {
        date: '2018-12-27',
        orderId: 2,
        totalLen: 4884,
      },
      {
        date: '2019-01-03',
        orderId: 4,
        totalLen: 3810,
      },
      {
        date: '2019-01-10',
        orderId: 3,
        totalLen: 4117,
      },
      {
        date: '2019-01-17',
        orderId: 5,
        totalLen: 3604,
      },
      {
        date: '2019-02-14',
        orderId: 8,
        totalLen: 1323,
      },
      {
        date: '2019-02-21',
        orderId: 7,
        totalLen: 1731,
      },
      {
        date: '2019-02-28',
        orderId: 6,
        totalLen: 2699,
      },
      {
        date: '2019-03-07',
        orderId: 9,
        totalLen: 1312,
      },
    ],
  },
  {
    id: 3,
    acronyms: '2019春季版本',
    list: [
      {
        date: '2019-03-14',
        orderId: 2,
        totalLen: 7645,
      },
      {
        date: '2019-03-21',
        orderId: 3,
        totalLen: 4788,
      },
      {
        date: '2019-03-28',
        orderId: 6,
        totalLen: 2628,
      },
      {
        date: '2019-04-04',
        orderId: 4,
        totalLen: 3201,
      },
      {
        date: '2019-04-11',
        orderId: 11,
        totalLen: 1870,
      },
      {
        date: '2019-04-18',
        orderId: 5,
        totalLen: 3077,
      },
      {
        date: '2019-04-25',
        orderId: 7,
        totalLen: 2429,
      },
      {
        date: '2019-05-02',
        orderId: 14,
        totalLen: 1384,
      },
      {
        date: '2019-05-09',
        orderId: 13,
        totalLen: 1574,
      },
      {
        date: '2019-05-16',
        orderId: 15,
        totalLen: 953,
      },
      {
        date: '2019-05-23',
        orderId: 8,
        totalLen: 2157,
      },
      {
        date: '2019-05-30',
        orderId: 9,
        totalLen: 2032,
      },
      {
        date: '2019-06-06',
        orderId: 17,
        totalLen: 706,
      },
      {
        date: '2019-06-13',
        orderId: 1,
        totalLen: 7932,
      },
      {
        date: '2019-06-17',
        orderId: 18,
        totalLen: 654,
      },
      {
        date: '2019-06-20',
        orderId: 12,
        totalLen: 1845,
      },
      {
        date: '2019-06-27',
        orderId: 10,
        totalLen: 1898,
      },
      {
        date: '2019-07-04',
        orderId: 16,
        totalLen: 886,
      },
    ],
  },
  {
    id: 4,
    acronyms: '公测(琅泉太华)',
    list: [
      {
        date: '2019-07-11',
        orderId: 2,
        totalLen: 7549,
      },
      {
        date: '2019-07-18',
        orderId: 1,
        totalLen: 9084,
      },
      {
        date: '2019-07-25',
        orderId: 5,
        totalLen: 4981,
      },
      {
        date: '2019-08-01',
        orderId: 10,
        totalLen: 3565,
      },
      {
        date: '2019-08-08',
        orderId: 8,
        totalLen: 3667,
      },
      {
        date: '2019-08-15',
        orderId: 11,
        totalLen: 3212,
      },
      {
        date: '2019-08-22',
        orderId: 4,
        totalLen: 5397,
      },
      {
        date: '2019-08-29',
        orderId: 3,
        totalLen: 5573,
      },
      {
        date: '2019-09-05',
        orderId: 9,
        totalLen: 3645,
      },
      {
        date: '2019-09-12',
        orderId: 6,
        totalLen: 4124,
      },
      {
        date: '2019-09-19',
        orderId: 13,
        totalLen: 2064,
      },
      {
        date: '2019-09-26',
        orderId: 14,
        totalLen: 1731,
      },
      {
        date: '2019-10-03',
        orderId: 19,
        totalLen: 498,
      },
      {
        date: '2019-10-10',
        orderId: 17,
        totalLen: 976,
      },
      {
        date: '2019-10-17',
        orderId: 7,
        totalLen: 3771,
      },
      {
        date: '2019-10-24',
        orderId: 18,
        totalLen: 918,
      },
      {
        date: '2019-10-31',
        orderId: 16,
        totalLen: 1422,
      },
      {
        date: '2019-11-07',
        orderId: 12,
        totalLen: 2696,
      },
      {
        date: '2019-11-14',
        orderId: 15,
        totalLen: 1625,
      },
    ],
  },
  {
    id: 5,
    acronyms: '梦与时空',
    list: [
      {
        date: '2019-11-21',
        orderId: 1,
        totalLen: 20522,
      },
      {
        date: '2019-11-28',
        orderId: 3,
        totalLen: 6005,
      },
      {
        date: '2019-12-05',
        orderId: 2,
        totalLen: 6942,
      },
      {
        date: '2019-12-12',
        orderId: 5,
        totalLen: 4360,
      },
      {
        date: '2019-12-19',
        orderId: 8,
        totalLen: 3115,
      },
      {
        date: '2019-12-26',
        orderId: 14,
        totalLen: 1943,
      },
      {
        date: '2020-01-02',
        orderId: 15,
        totalLen: 1693,
      },
      {
        date: '2020-01-09',
        orderId: 4,
        totalLen: 5066,
      },
      {
        date: '2020-01-16',
        orderId: 9,
        totalLen: 2827,
      },
      {
        date: '2020-02-06',
        orderId: 7,
        totalLen: 3522,
      },
      {
        date: '2020-02-13',
        orderId: 6,
        totalLen: 3993,
      },
      {
        date: '2020-02-20',
        orderId: 11,
        totalLen: 2694,
      },
      {
        date: '2020-02-27',
        orderId: 13,
        totalLen: 1997,
      },
      {
        date: '2020-03-05',
        orderId: 10,
        totalLen: 2697,
      },
      {
        date: '2020-03-12',
        orderId: 12,
        totalLen: 2383,
      },
    ],
  },
  {
    id: 6,
    acronyms: '山海飞花',
    list: [
      {
        date: '2020-03-19',
        orderId: 1,
        totalLen: 13679,
      },
      {
        date: '2020-03-26',
        orderId: 11,
        totalLen: 2600,
      },
      {
        date: '2020-04-02',
        orderId: 3,
        totalLen: 5553,
      },
      {
        date: '2020-04-09',
        orderId: 10,
        totalLen: 2912,
      },
      {
        date: '2020-04-16',
        orderId: 6,
        totalLen: 4230,
      },
      {
        date: '2020-04-23',
        orderId: 8,
        totalLen: 3489,
      },
      {
        date: '2020-04-30',
        orderId: 9,
        totalLen: 3204,
      },
      {
        date: '2020-05-07',
        orderId: 16,
        totalLen: 557,
      },
      {
        date: '2020-05-14',
        orderId: 5,
        totalLen: 4444,
      },
      {
        date: '2020-05-21',
        orderId: 13,
        totalLen: 2154,
      },
      {
        date: '2020-05-28',
        orderId: 2,
        totalLen: 7146,
      },
      {
        date: '2020-06-04',
        orderId: 12,
        totalLen: 2448,
      },
      {
        date: '2020-06-11',
        orderId: 7,
        totalLen: 4176,
      },
      {
        date: '2020-06-18',
        orderId: 4,
        totalLen: 5377,
      },
      {
        date: '2020-06-25',
        orderId: 15,
        totalLen: 1167,
      },
      {
        date: '2020-07-02',
        orderId: 17,
        totalLen: 465,
      },
      {
        date: '2020-07-09',
        orderId: 14,
        totalLen: 1581,
      },
    ],
  },
  {
    id: 7,
    acronyms: '瀚海惊弦',
    list: [
      {
        date: '2020-07-16',
        orderId: 1,
        totalLen: 26271,
      },
      {
        date: '2020-07-23',
        orderId: 6,
        totalLen: 6506,
      },
      {
        date: '2020-07-30',
        orderId: 5,
        totalLen: 6744,
      },
      {
        date: '2020-08-06',
        orderId: 9,
        totalLen: 3413,
      },
      {
        date: '2020-08-13',
        orderId: 3,
        totalLen: 9295,
      },
      {
        date: '2020-08-20',
        orderId: 2,
        totalLen: 22498,
      },
      {
        date: '2020-08-27',
        orderId: 10,
        totalLen: 2611,
      },
      {
        date: '2020-09-03',
        orderId: 14,
        totalLen: 1428,
      },
      {
        date: '2020-09-10',
        orderId: 8,
        totalLen: 3892,
      },
      {
        date: '2020-09-17',
        orderId: 12,
        totalLen: 2365,
      },
      {
        date: '2020-09-24',
        orderId: 4,
        totalLen: 7588,
      },
      {
        date: '2020-10-01',
        orderId: 13,
        totalLen: 1809,
      },
      {
        date: '2020-10-08',
        orderId: 17,
        totalLen: 1038,
      },
      {
        date: '2020-10-15',
        orderId: 7,
        totalLen: 3898,
      },
      {
        date: '2020-10-22',
        orderId: 15,
        totalLen: 1408,
      },
      {
        date: '2020-10-29',
        orderId: 18,
        totalLen: 1036,
      },
      {
        date: '2020-11-05',
        orderId: 11,
        totalLen: 2482,
      },
      {
        date: '2020-11-12',
        orderId: 16,
        totalLen: 1077,
      },
      {
        date: '2020-11-19',
        orderId: 21,
        totalLen: 604,
      },
      {
        date: '2020-11-26',
        orderId: 22,
        totalLen: 455,
      },
      {
        date: '2020-12-03',
        orderId: 20,
        totalLen: 662,
      },
      {
        date: '2020-12-10',
        orderId: 19,
        totalLen: 722,
      },
    ],
  },
  {
    id: 8,
    acronyms: '月引长刀',
    list: [
      {
        date: '2020-12-17',
        orderId: 1,
        totalLen: 36740,
      },
      {
        date: '2020-12-24',
        orderId: 4,
        totalLen: 11621,
      },
      {
        date: '2020-12-31',
        orderId: 7,
        totalLen: 4572,
      },
      {
        date: '2021-01-07',
        orderId: 14,
        totalLen: 1744,
      },
      {
        date: '2021-01-14',
        orderId: 17,
        totalLen: 1477,
      },
      {
        date: '2021-01-21',
        orderId: 13,
        totalLen: 2518,
      },
      {
        date: '2021-01-28',
        orderId: 15,
        totalLen: 1739,
      },
      {
        date: '2021-02-04',
        orderId: 2,
        totalLen: 18150,
      },
      {
        date: '2021-02-25',
        orderId: 3,
        totalLen: 15459,
      },
      {
        date: '2021-03-04',
        orderId: 8,
        totalLen: 4441,
      },
      {
        date: '2021-03-11',
        orderId: 19,
        totalLen: 1334,
      },
      {
        date: '2021-03-18',
        orderId: 25,
        totalLen: 837,
      },
      {
        date: '2021-03-25',
        orderId: 21,
        totalLen: 1195,
      },
      {
        date: '2021-04-01',
        orderId: 9,
        totalLen: 3962,
      },
      {
        date: '2021-04-08',
        orderId: 30,
        totalLen: 345,
      },
      {
        date: '2021-04-15',
        orderId: 6,
        totalLen: 5699,
      },
      {
        date: '2021-04-22',
        orderId: 18,
        totalLen: 1392,
      },
      {
        date: '2021-04-29',
        orderId: 5,
        totalLen: 9086,
      },
      {
        date: '2021-05-06',
        orderId: 16,
        totalLen: 1619,
      },
      {
        date: '2021-05-13',
        orderId: 10,
        totalLen: 2748,
      },
      {
        date: '2021-05-20',
        orderId: 12,
        totalLen: 2622,
      },
      {
        date: '2021-05-27',
        orderId: 11,
        totalLen: 2684,
      },
      {
        date: '2021-06-03',
        orderId: 27,
        totalLen: 710,
      },
      {
        date: '2021-06-10',
        orderId: 24,
        totalLen: 890,
      },
      {
        date: '2021-06-17',
        orderId: 28,
        totalLen: 551,
      },
      {
        date: '2021-06-24',
        orderId: 29,
        totalLen: 515,
      },
      {
        date: '2021-07-01',
        orderId: 22,
        totalLen: 1112,
      },
      {
        date: '2021-07-08',
        orderId: 20,
        totalLen: 1315,
      },
      {
        date: '2021-07-15',
        orderId: 26,
        totalLen: 777,
      },
      {
        date: '2021-07-22',
        orderId: 23,
        totalLen: 1018,
      },
    ],
  },
  {
    id: 9,
    acronyms: '天门终开',
    list: [
      {
        date: '2021-08-05',
        orderId: 2,
        totalLen: 5530,
      },
      {
        date: '2021-08-12',
        orderId: 3,
        totalLen: 4421,
      },
      {
        date: '2021-08-19',
        orderId: 7,
        totalLen: 2466,
      },
      {
        date: '2021-08-26',
        orderId: 1,
        totalLen: 5718,
      },
      {
        date: '2021-09-02',
        orderId: 4,
        totalLen: 3565,
      },
      {
        date: '2021-09-09',
        orderId: 6,
        totalLen: 2532,
      },
      {
        date: '2021-09-16',
        orderId: 5,
        totalLen: 2687,
      },
      {
        date: '2021-09-23',
        orderId: 9,
        totalLen: 1344,
      },
      {
        date: '2021-09-30',
        orderId: 12,
        totalLen: 938,
      },
      {
        date: '2021-10-07',
        orderId: 8,
        totalLen: 1487,
      },
      {
        date: '2021-10-14',
        orderId: 11,
        totalLen: 986,
      },
      {
        date: '2021-10-21',
        orderId: 14,
        totalLen: 623,
      },
      {
        date: '2021-10-28',
        orderId: 13,
        totalLen: 699,
      },
      {
        date: '2021-11-04',
        orderId: 15,
        totalLen: 437,
      },
      {
        date: '2021-11-11',
        orderId: 10,
        totalLen: 1088,
      },
      {
        date: '2021-11-18',
        orderId: 17,
        totalLen: 430,
      },
      {
        date: '2021-11-25',
        orderId: 18,
        totalLen: 276,
      },
      {
        date: '2021-12-02',
        orderId: 16,
        totalLen: 437,
      },
    ],
  },
  {
    id: 10,
    acronyms: '玉轮铃音',
    list: [
      {
        date: '2021-12-16',
        orderId: 3,
        totalLen: 4191,
      },
      {
        date: '2021-12-23',
        orderId: 2,
        totalLen: 10103,
      },
      {
        date: '2021-12-30',
        orderId: 6,
        totalLen: 2596,
      },
      {
        date: '2022-01-06',
        orderId: 10,
        totalLen: 739,
      },
      {
        date: '2022-01-13',
        orderId: 5,
        totalLen: 2804,
      },
      {
        date: '2022-01-20',
        orderId: 4,
        totalLen: 3829,
      },
      {
        date: '2022-01-27',
        orderId: 1,
        totalLen: 10557,
      },
      {
        date: '2022-02-10',
        orderId: 12,
        totalLen: 583,
      },
      {
        date: '2022-02-17',
        orderId: 8,
        totalLen: 1112,
      },
      {
        date: '2022-02-24',
        orderId: 7,
        totalLen: 1522,
      },
      {
        date: '2022-03-03',
        orderId: 9,
        totalLen: 863,
      },
      {
        date: '2022-03-10',
        orderId: 11,
        totalLen: 637,
      },
      {
        date: '2022-03-17',
        orderId: 15,
        totalLen: 274,
      },
      {
        date: '2022-03-24',
        orderId: 14,
        totalLen: 294,
      },
      {
        date: '2022-03-31',
        orderId: 13,
        totalLen: 417,
      },
    ],
  },
  {
    id: 11,
    acronyms: '明心九天',
    list: [
      {
        date: '2022-04-14',
        orderId: 5,
        totalLen: 1325,
      },
      {
        date: '2022-04-21',
        orderId: 9,
        totalLen: 833,
      },
      {
        date: '2022-04-28',
        orderId: 1,
        totalLen: 4616,
      },
      {
        date: '2022-05-05',
        orderId: 3,
        totalLen: 1650,
      },
      {
        date: '2022-05-12',
        orderId: 8,
        totalLen: 912,
      },
      {
        date: '2022-05-19',
        orderId: 6,
        totalLen: 1309,
      },
      {
        date: '2022-05-26',
        orderId: 2,
        totalLen: 2334,
      },
      {
        date: '2022-06-02',
        orderId: 11,
        totalLen: 748,
      },
      {
        date: '2022-06-09',
        orderId: 4,
        totalLen: 1344,
      },
      {
        date: '2022-06-16',
        orderId: 7,
        totalLen: 1232,
      },
      {
        date: '2022-06-23',
        orderId: 10,
        totalLen: 756,
      },
      {
        date: '2022-06-30',
        orderId: 13,
        totalLen: 431,
      },
      {
        date: '2022-07-07',
        orderId: 12,
        totalLen: 437,
      },
    ],
  },
  {
    id: 12,
    acronyms: '帝首熠兮',
    list: [
      {
        date: '2022-07-21',
        orderId: 2,
        totalLen: 3268,
      },
      {
        date: '2022-07-28',
        orderId: 5,
        totalLen: 2083,
      },
      {
        date: '2022-08-04',
        orderId: 1,
        totalLen: 3544,
      },
      {
        date: '2022-08-11',
        orderId: 4,
        totalLen: 2168,
      },
      {
        date: '2022-08-18',
        orderId: 3,
        totalLen: 2668,
      },
      {
        date: '2022-08-25',
        orderId: 13,
        totalLen: 749,
      },
      {
        date: '2022-09-01',
        orderId: 7,
        totalLen: 1659,
      },
      {
        date: '2022-09-08',
        orderId: 6,
        totalLen: 1784,
      },
      {
        date: '2022-09-15',
        orderId: 17,
        totalLen: 323,
      },
      {
        date: '2022-09-22',
        orderId: 19,
        totalLen: 279,
      },
      {
        date: '2022-09-29',
        orderId: 11,
        totalLen: 886,
      },
      {
        date: '2022-10-06',
        orderId: 14,
        totalLen: 434,
      },
      {
        date: '2022-10-13',
        orderId: 8,
        totalLen: 1396,
      },
      {
        date: '2022-10-20',
        orderId: 15,
        totalLen: 417,
      },
      {
        date: '2022-10-27',
        orderId: 10,
        totalLen: 998,
      },
      {
        date: '2022-11-03',
        orderId: 21,
        totalLen: 95,
      },
      {
        date: '2022-11-10',
        orderId: 12,
        totalLen: 875,
      },
      {
        date: '2022-11-17',
        orderId: 18,
        totalLen: 311,
      },
      {
        date: '2022-11-24',
        orderId: 9,
        totalLen: 1259,
      },
      {
        date: '2022-12-01',
        orderId: 20,
        totalLen: 102,
      },
      {
        date: '2022-12-08',
        orderId: 16,
        totalLen: 368,
      },
    ],
  },
  {
    id: 13,
    acronyms: '凿空浑沦',
    list: [
      {
        date: '2022-12-15',
        orderId: 1,
        totalLen: 5288,
      },
      {
        date: '2022-12-22',
        orderId: 4,
        totalLen: 3073,
      },
      {
        date: '2022-12-29',
        orderId: 3,
        totalLen: 3155,
      },
      {
        date: '2023-01-05',
        orderId: 15,
        totalLen: 841,
      },
      {
        date: '2023-01-12',
        orderId: 2,
        totalLen: 4001,
      },
      {
        date: '2023-01-19',
        orderId: 18,
        totalLen: 631,
      },
      {
        date: '2023-01-26',
        orderId: 11,
        totalLen: 1084,
      },
      {
        date: '2023-02-02',
        orderId: 10,
        totalLen: 1583,
      },
      {
        date: '2023-02-09',
        orderId: 8,
        totalLen: 1689,
      },
      {
        date: '2023-02-16',
        orderId: 22,
        totalLen: 312,
      },
      {
        date: '2023-02-23',
        orderId: 7,
        totalLen: 1997,
      },
      {
        date: '2023-03-02',
        orderId: 28,
        totalLen: 104,
      },
      {
        date: '2023-03-09',
        orderId: 14,
        totalLen: 846,
      },
      {
        date: '2023-03-16',
        orderId: 23,
        totalLen: 298,
      },
      {
        date: '2023-03-23',
        orderId: 24,
        totalLen: 284,
      },
      {
        date: '2023-03-30',
        orderId: 6,
        totalLen: 2499,
      },
      {
        date: '2023-04-06',
        orderId: 21,
        totalLen: 325,
      },
      {
        date: '2023-04-13',
        orderId: 25,
        totalLen: 216,
      },
      {
        date: '2023-04-20',
        orderId: 5,
        totalLen: 2881,
      },
      {
        date: '2023-04-27',
        orderId: 9,
        totalLen: 1655,
      },
      {
        date: '2023-05-04',
        orderId: 26,
        totalLen: 180,
      },
      {
        date: '2023-05-11',
        orderId: 12,
        totalLen: 1071,
      },
      {
        date: '2023-05-18',
        orderId: 20,
        totalLen: 550,
      },
      {
        date: '2023-05-25',
        orderId: 13,
        totalLen: 1064,
      },
      {
        date: '2023-06-01',
        orderId: 17,
        totalLen: 691,
      },
      {
        date: '2023-06-08',
        orderId: 16,
        totalLen: 831,
      },
      {
        date: '2023-06-15',
        orderId: 27,
        totalLen: 127,
      },
      {
        date: '2023-06-22',
        orderId: 19,
        totalLen: 567,
      },
    ],
  },
  {
    id: 14,
    acronyms: '共烛天明',
    list: [
      {
        date: '2023-06-29',
        orderId: 1,
        totalLen: 5640,
      },
      {
        date: '2023-07-06',
        orderId: 5,
        totalLen: 2182,
      },
      {
        date: '2023-07-13',
        orderId: 6,
        totalLen: 1703,
      },
      {
        date: '2023-07-20',
        orderId: 11,
        totalLen: 954,
      },
      {
        date: '2023-07-27',
        orderId: 16,
        totalLen: 692,
      },
      {
        date: '2023-08-03',
        orderId: 12,
        totalLen: 896,
      },
      {
        date: '2023-08-10',
        orderId: 37,
        totalLen: 132,
      },
      {
        date: '2023-08-17',
        orderId: 3,
        totalLen: 2501,
      },
      {
        date: '2023-08-24',
        orderId: 7,
        totalLen: 1410,
      },
      {
        date: '2023-08-31',
        orderId: 22,
        totalLen: 321,
      },
      {
        date: '2023-09-07',
        orderId: 10,
        totalLen: 994,
      },
      {
        date: '2023-09-14',
        orderId: 35,
        totalLen: 143,
      },
      {
        date: '2023-09-21',
        orderId: 17,
        totalLen: 441,
      },
      {
        date: '2023-10-12',
        orderId: 20,
        totalLen: 364,
      },
      {
        date: '2023-10-19',
        orderId: 41,
        totalLen: 40,
      },
      {
        date: '2023-10-26',
        orderId: 8,
        totalLen: 1195,
      },
      {
        date: '2023-11-02',
        orderId: 19,
        totalLen: 366,
      },
      {
        date: '2023-11-09',
        orderId: 13,
        totalLen: 810,
      },
      {
        date: '2023-11-16',
        orderId: 36,
        totalLen: 140,
      },
      {
        date: '2023-11-23',
        orderId: 38,
        totalLen: 108,
      },
      {
        date: '2023-11-30',
        orderId: 29,
        totalLen: 165,
      },
      {
        date: '2023-12-07',
        orderId: 30,
        totalLen: 163,
      },
      {
        date: '2023-12-14',
        orderId: 21,
        totalLen: 335,
      },
      {
        date: '2023-12-21',
        orderId: 4,
        totalLen: 2497,
      },
      {
        date: '2023-12-28',
        orderId: 14,
        totalLen: 745,
      },
      {
        date: '2024-01-04',
        orderId: 40,
        totalLen: 57,
      },
      {
        date: '2024-01-11',
        orderId: 39,
        totalLen: 89,
      },
      {
        date: '2024-01-18',
        orderId: 42,
        totalLen: 28,
      },
      {
        date: '2024-01-25',
        orderId: 31,
        totalLen: 163,
      },
      {
        date: '2024-02-01',
        orderId: 25,
        totalLen: 221,
      },
      {
        date: '2024-02-08',
        orderId: 9,
        totalLen: 1167,
      },
      {
        date: '2024-02-15',
        orderId: 27,
        totalLen: 181,
      },
      {
        date: '2024-02-22',
        orderId: 18,
        totalLen: 424,
      },
      {
        date: '2024-02-29',
        orderId: 26,
        totalLen: 210,
      },
      {
        date: '2024-03-07',
        orderId: 34,
        totalLen: 161,
      },
      {
        date: '2024-03-14',
        orderId: 32,
        totalLen: 163,
      },
      {
        date: '2024-03-21',
        orderId: 33,
        totalLen: 163,
      },
      {
        date: '2024-03-28',
        orderId: 28,
        totalLen: 170,
      },
      {
        date: '2024-04-04',
        orderId: 24,
        totalLen: 316,
      },
      {
        date: '2024-04-11',
        orderId: 2,
        totalLen: 4480,
      },
      {
        date: '2024-04-18',
        orderId: 15,
        totalLen: 695,
      },
      {
        date: '2024-04-25',
        orderId: 23,
        totalLen: 320,
      },
    ],
  },
]
