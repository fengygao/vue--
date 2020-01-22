<template>
     <el-select v-model="value8" filterable  @change="selChoose" :placeholder="placeholder">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
    data() {
      return {
        options: [],
        value8:'',
        placeholder:''
      }
    },
    props:{
        array:{
            type:Array
        },
        vals:String,
        placeholders:String
    },
    methods:{
        selChoose(val){
            this.$emit('chooseSec',val)
        }
    },
    mounted(){
        this.options=this.array;
        this.value8=this.vals;
        this.placeholder=this.placeholders

    }
}
</script>
<style scoped>

</style>