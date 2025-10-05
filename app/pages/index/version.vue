<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-start p-space-lg">
    <my-svg :svgContent="versionSvg" />
    <desc-text>古剑奇谭网络版（以下简称“古网”），是本站作者玩过最长时间也是最喜欢的MMORG 🎉。</desc-text>
    <desc-text>这里使用爬虫收集了自游戏开服以来的所有官方公告，并依据版本对公告进行分类和统计。蓝色的线是版本公告字数的中位数，我用它表示更新强度，另一条线则显示了每个版本的持续周数</desc-text>
    <versionChart />
    <desc-text>诸位正在浏览的网页，在开发眼中是一个web项目，通常在项目封板之前更新较为频繁，随着时间推移，更新频率会逐渐降低。古网作为一个更大更复杂的项目，也是如此。所以上表中蓝线整体呈现下降趋势</desc-text>
    <desc-text>但是蓝线存在俩次逆势上涨，第一次是2019年7月游戏正式公测，第二次是2021年12月的玉轮铃音版本。玉轮铃音在古网的发展中也算是一个重要的版本，我们稍后再谈。</desc-text>
    <desc-text>先看下俩条线第一次相交的时间点，即2020年4月到7月的风动心弦版本。这俩条线相交可不是什么好的征兆，或许你会想古网是从那时候就开摆了吗？说不是那是假的，前面一个女刀的版本就够拖了，风动心弦又没有什么实质性的更新。</desc-text>
    <desc-text>
      但是在2020年7月11日<a class="desc-a" href="https://www.bilibili.com/video/BV1kV41167Rn" target="_blank">网元嘉年华</a>上公布了<a class="desc-a"
        href="https://www.bilibili.com/video/BV1vA411e7Fq" target="_blank">古网的UE4重制版</a>。
    </desc-text>
    <rambling text="当时站长看到视频，真是垂死病中惊坐起，上线就去氪金" />
    <desc-text>
      那还说什么呢，之前和之后版本的敷衍都可以用“正在制作重制版解释了”
    </desc-text>

    <desc-text>
      转眼到了<a class="desc-a" href="https://www.bilibili.com/video/BV1ML4y1Y71K" target="_blank">2021年7月24日网元嘉年华</a>，那天网元公布了<a class="desc-a"
        href="https://www.bilibili.com/video/BV1Dw41197j2" target="_blank">UE4重制版第一二支视频</a>，首公开了白荆回廊和古剑四。
    </desc-text>
    <desc-text>
      这些都很好，除了木语人😱。
    </desc-text>
    <rambling text="一个暴论：木语人和神舞幻想2这二位堪称卧龙凤雏，合力抬走了老孟和古网" />

    <desc-text>
      紧随其后，在2021年12月，全新的古网——玉轮铃音。它带来了最好的共享机制和饱受争议的路域通，不管诸位怎么看待这个版本，它都是迄今为止古网改变最大的一个版本
    </desc-text>
    <rambling text="卡兹克：改变就是好事" />

    <desc-text>
      随后，更新强度回归正常下降，直至共烛天明版本，这是我们体验到的最后一个具有实质性更新的版本。在此之后，就全部都是寰宇会😭。
    </desc-text>
    <rambling>
      顺便一提，在古网的官网中，寰宇会没有纳入<a class="desc-a" href="https://gjol.wangyuan.com/info/huod/version.shtml" target="_blank">版本资料站</a>
    </rambling>
    <desc-text>
      2020年7月11日，我们看到古网重置最后一支视频，大胆猜测，至少烛龙在那时对古网的规划并非如今日所见
    </desc-text>
    <veriosnTimeLine />
    <desc-text>屋漏偏逢连夜雨</desc-text>

    <desc-text>
      到今天我们都知道,<a class="desc-a" href="https://www.bilibili.com/video/BV1pT4y1p7Kd" target="_blank">白荆回廊如期上线</a>，古剑四也有了<a class="desc-a" href="https://www.bilibili.com/video/BV1WgYYzhEKw" target="_blank">第一支视频</a>,只有古网半截身子入了土
    </desc-text>
  </div>
</template>

<script lang="ts" setup>
import versionChart from './versionChart.vue'
import versionSvg from '~/assets/svg/version.svg?raw'
import veriosnTimeLine from "./versionTimeLine.vue"
</script>