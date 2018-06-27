### 一个地震管理系统的前端的部分页面
需要注意的几个点
1. 创建google map需要在index中引入对应的api以及key
2. map 需要一个container来初始化,container对应着dom里面的一个tag
    - map由ion-segment控制 但ion-segmaen沿用到是angular的做法对dom tree进行增删达成切换的效果,所以不能直接把container放进ion-segment中,会导致获取不到对应的dom的element
    - **解决方案**是用ion-segment控制对应的div的样式`displlay:none`
    - 但Echart用隐藏的div初始化时会出现bug 所以让每次点击对应的segment的时候都会先控制div的显示逻辑,再重新初始化对应的chart
3. 在service里进行统一的发布
