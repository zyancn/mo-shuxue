var dictaColor = '#ffffff'; //文字颜色
function dowritedicta(num){
 var randid = Math.round(Math.random()*num);
 randid = randid >= num ? num-1 : randid;
    
 document.write('<font color="' + dictaColor + '">' + dictumin[randid] + '</font>');
}
var dictumin = new Array(
 '天才就其本质而论只不过是对事业、对工作过程的热爱而已。——高尔基',
 '勤能补拙是良训，一分辛劳一分才。——华罗庚',
 '知识就是力量。——培根',
 '知识是一种快乐，而好奇则是知识的萌芽。——培根',
 '理智要比心灵为高，思想要比感情可靠。___高尔基',
 '少而好学，如日出之阳；壮而好学，如日中之光；老而好学，如炳烛之明。___刘向',
 '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼',
 '构成我们学习最大障碍的是已知的东西，而不是未知的东西。——贝尔纳',
 '骐骥一跃，不能十步；驽马十驾，功在不舍；锲而舍之，朽木不折；锲而不舍，金石可镂。——荀况',
 '才能不是天生的，可以任其自便的，而要钻研艺术请教良师，才会成材。——歌德',
 '业精于勤而荒于嬉，行成于思而毁于随。——韩愈',
 '形成天才的决定因素应该是勤奋。……有几分勤学苦练是成正比例的。——郭沫若',
 '我是个拙笨的学艺者，没有充分的天才，全凭苦学。——梅兰芳',
 '应知学问难，在乎点滴勤。——陈毅',
 '十日画一水，五日画一石。——杜甫',
 '才能是来自独创性。独创性是思维、观察、理解和判断的一种独特的方式。——莫泊桑',
 '正确的道路是这样：吸取你的前辈所做的一切，然后再往前走.——列夫?托尔斯泰',
 '懒惰象生锈一样，比操劳更能消耗身体；经常用的钥匙，总是亮闪闪的。——_富兰克林',
 '智慧，不是死的默念，而是生的沉思。——斯宾诺莎',
 '在天才和勤奋两者之间，我毫不迟疑地选择勤奋，她是几乎世界上一切成就的催产婆。——爱因斯坦',
 '人生在勤，不索何获？——_张衡',
 '富人如果把金钱放在你手中，你不要对这点恩惠太看重；因为圣人曾经这样教诲：勤劳远比黄金可贵。——萨迪',
 '我只相信一条：灵感是在劳动的时候产生的。——_奥斯特洛夫斯基',
 '哪里有天才，我是把别人喝咖啡的工夫都用在工作上的。——_鲁迅',
 '伟人只在事业上惊天动地，他时常不声不响地深思熟虑。——_克雷洛夫',
 '精神的浩瀚、想象的活跃、心灵的勤奋：就是天才。——_狄德罗',
 '天才免不了有障碍，因为障碍会创造天才。——罗曼.罗兰',
 '辛苦是获得一切的定律。——牛顿',
 '对自己不满是任何真正有才能的人的根本特征之一。——契诃夫',
 '真实与朴实是天才的宝贵品质。——斯坦尼斯拉夫斯基',
 '不经巨大的困难，不会有伟大的事业。——伏尔泰',
 '无论天资有多麽高，他仍需学会了技巧来发挥那些天资。——卓别麟',
 '不满足是向上的车轮。——鲁迅',
 '任何人都应该有自尊心、自信心、独立性，不然就是奴才。但自尊不是轻人，自信不是自满，独立不是孤立。——徐特立',
 '成功之花，人们往往惊羡它现时的明艳，然而当初，它的芽儿却浸透了奋斗的泪泉，洒满了牺牲的血雨。——冰心',
 '我扑在书籍上，就像饥饿的人扑在面包上。——高尔基',
 '单是说不行，要紧的是做。——鲁迅',
 '天生我才必有用。——李白',
 '如果是玫瑰，它总会开花的。——歌德',
 '知识犹如人体的血液一样宝贵。——高士其',
 '成名的艺术家反为盛名所拘束，所以他们最早的作品往往是最好的。——贝多芬',
 '灵感——这是一个不喜欢采访懒汉的客人。——车尔尼雪夫斯基',
 '天才就是这样，终身努力，便成天才。——门捷列夫',
 '只有不畏攀登的采药者，只有不怕巨浪的弄潮儿，才能登上高峰采得仙草，深入水底觅得骊珠。——华罗庚',
 '所谓天才人物指的就是具有毅力的人、勤奋的人、入迷的人和忘我的人。——木村久一',
 '我没有什麽特别的才能，不过喜欢寻根刨底地追究问题罢了。——爱因斯坦',
 '天才是百分之一的灵感，百分之九十九的血汗。——爱迪生',
 '如果你希望成功，就以恒心为良友，以经验为参谋，以谨慎为兄弟吧！——爱迪生',
 '成功＝艰苦劳动＋正确方法＋少说空话。——爱因斯坦',
 '天才就是无止境刻苦勤奋的能力。——卡莱尔',
 '聪明出于勤奋，天才在于积累。——华罗庚',
 '勤劳一日，可得一夜安眠；勤劳一生，可得幸福长眠。——达?芬奇',
 '人的大脑和肢体一样，多用则灵，不用则废。——茅以升',
 '辛勤的蜜蜂永没有时间悲哀。——布莱克',
 '天才的作品是用眼泪灌溉的。——巴尔扎克',
 '我们应该有恒心，尤其要有自信心。——居里夫人',
 '有了天才不用，天才一定会衰退的，而且会在慢性的腐朽中归于消灭。——克雷洛夫',
 '一年之计，莫如树谷：十年之计，莫如树木；终身之计，莫如树人。——管仲',
 '对作家来说，写得少是这样的有害，就跟医生缺乏诊病的机会一样。——苏格拉底',
 '我的箴言始终是：无日不动笔；如果我有时让艺术之神瞌睡，也只为要使它醒后更兴奋。——贝多芬',
 '最大的天才尽管朝朝暮暮躺在青草地上，让微风吹来，眼望着天空，温柔的灵感也始终不光顾他.——黑格尔'
 );
dowritedicta(dictumin.length);