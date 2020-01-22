<template>
  <div class="back-image">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h1 class="title">欢迎登陆朱雀系统</h1>
      <el-form-item prop="account">
        <el-input type="text" prefix-icon="el-icon-user" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm2.checkPass"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"  class="remember">记住密码，一周内免登录</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
        type="danger"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
        >登&nbsp;&nbsp;录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
    <p class="footer">Copyright © 2018-{{new Date()|nowtime}} Powered By 上海瑞商联城 沪ICP备138号</p>
    </div>
</template>

<script>
import axios from "axios";
 
import Cookies from 'js-cookie';
import Mock from "mockjs";
Mock.mock("http://ruishanglogin", "get", {
  "id|+1": 1,
  'name': "@cname()",
  'addr': "@county(true)",
  "ago|18-28": 25,
  "sex|1": ["男", "女"],
  // 'avatar':"@image('88x31')"
});
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        // checkPass: [
        //   { required: true, message: "请输入密码", trigger: "blur" }
        //   //{ validator: validaePass2 }
        // ]
      },
      checked: false
    };
  },
  filters:{       
    nowtime(data){
        return data.getFullYear()+'年';
    }
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      // debugger
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          // debugger
          console.log(valid);
          if(_this.checked){
            // debugger
          Cookies.set(this.ruleForm2.account, this.ruleForm2.checkPass, 7);
             axios
            .get("http://ruishanglogin", {
              // params: {
              //   ID: 12345
              // }
            })
            .then(function(res) {
              console.log(res)
              // debugger
              sessionStorage.setItem("user", JSON.stringify(res.data));
              _this.$store.commit('changeLogin','1') 
              _this.$router.push('/homePage/page')          
            })
            .catch(function(error) {
              console.log(error);
            });
          }else{
            //清空Cookie
            _this.clearCookie();
             axios
            .get("http://ruishanglogin", {
              // params: {
              //   ID: 12345
              // }
            })
            .then(function(res) {
              console.log(res)
              sessionStorage.setItem("user", JSON.stringify(res.data));
              _this.$router.push('/homePage/page')          
            })
            .catch(function(error) {
              console.log(error);
            });
          }          
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();
          // var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
          // requestLogin(loginParams).then(data => {
          //   this.logining = false;
          //   //NProgress.done();
          // let { msg, code, user } = data;
          //   if (code !== 200) {
          //     this.$message({
          //       message: msg,
          //       type: 'error'
          //     });
          //   } else {        
          //   }
          // });
  
          // axios
          //   .post("/user", {
          //     firstName: "Fred",
          //     lastName: "Flintstone"
          //   })
          //   .then(function(response) {
          //     console.log(response);
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });
        } else {
          debugger;
          alert("登陆失败")
          return false;
        }
      });
    },
     //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
  }
};
</script>

<style lang="scss" scoped>
.back-image {
  min-width: 1920px;
  min-height: 536px;
  background:url(../../assets/images/loginbg.png) no-repeat;
  background-size: 100%;
  top:19%;
  position: relative;
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    top:15%;
    right: 19%;
    width: 300px;
    padding:35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #666;
    .title {
      margin: 0px auto 40px auto;
      text-align: left;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .footer{
    position: absolute;
    bottom: -80px;
    left:40%;
  }
}
</style>