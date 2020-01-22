<template>
  <section >
    <el-tabs v-model="active" @tab-click="jumpTitle">
      <el-tab-pane v-for="(item, index) in steps" :key="index" :label="item" :name="item"></el-tab-pane>
    </el-tabs>
    <el-card
      ref="leftNewsDiv"
      @scroll.native="handleScroll"
      class="reviewLDCardStyle"
      style="height:600px !important;
  overflow-y: scroll !important;"
    >
      <p class="mianDFont">
        <img src="../../assets/images/storeytu1.jpg" class="imgDStyle" />1
      </p>
      <p class="mianDFont">
        <img src="../../assets/images/storeytu2.jpg" class="imgDStyle" />基本情况
      </p>
    </el-card>
  </section>
</template>
<script>
export default {
	data(){
		return{
			steps:['图一','图二'],
			active:''
		}
	},
	methods:{
		jumpTitle() {
  let nodeList = document.querySelectorAll('.mianDFont');
  let index = this.steps.indexOf(this.active);
  let element = nodeList[index];
  let material = this.$refs.leftNewsDiv.$el;
  const scrollTop =element.offsetTop;
//父元素一定要有定位，定位可以是relative，或者resolution,会根据最近的有定位的父元素来计算，若没有定位，就是相对于body的位置
  material.scrollTo({
    top: scrollTop,
    behavior: 'smooth' // 平滑滚动
  });
 
},
//根据滚动事件，改变tab选中的名字
handleScroll() {
  let nodeList = document.querySelectorAll('.mianDFont');
  nodeList.forEach((item, index) => {
    //获取滚动的高度，加上标题的高度（方便能正好定位到标题）
    let scrollTop = this.$refs.leftNewsDiv.$el.scrollTop;
    if (scrollTop >= item.offsetTop) {
      this.active = this.steps[index];
    }
  })
}

	}
	
}
</script>
<style scoped>

</style>