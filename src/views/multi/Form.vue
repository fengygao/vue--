<template>
  <section style="padding:20px;">
    <elselect @chooseSec='changeSec' :vals="value" :array="option" :placeholders="placeholder"></elselect>
  </section>
</template>

<script>
import elselect from "../../components/select"
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      option: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            placeholder:'请选择或输入以查询'
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    changeSec(msg){
      this.value=msg
      console.log(msg)
    }
  },
  components:{
    elselect
  }
};
</script>