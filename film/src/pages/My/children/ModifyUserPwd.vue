<template>
    <div id="modify_userpwd">
      <div class="top">
        <span class="icon-back" @click="$router.go(-1)"></span>
        <span class="pwd ellipsis">修改密码</span>
        <span class="sure-btn" @click="modifyUserPwd">确定</span>
      </div>
      <div class="container">
        <el-input
          class="input"
          type="password"
          placeholder="4-12个字符支持中英文、数字"
          v-model="password"
          spellcheck="false" v-show="!isShowPassword"
          clearable>
        </el-input>
                  <el-input type="text" placeholder="密码" v-show="isShowPassword" v-model="password"></el-input>
                  <div class="switch-show">
                    <span
                      class="icon-eye-close-fill"
                      v-show="!isShowPassword"
                      @click="changePwdShow"
                    >
                    </span>
                    <span
                      class="icon-eye-open-fill"
                      v-show="isShowPassword"
                      @click="changePwdShow"
                    >
                    </span>
                  </div>
      </div>
    </div>
</template>

<script>
    import {Input} from 'element-ui'
    import {Toast} from 'mint-ui'
    import {updateUserPwd} from '../../../api/index'
    import md5 from 'js-md5';
    export default {
        name: "ModifyUserPwd",
        components:{
          Input
        },
        data(){
          return{
            password:null,
            isShowPassword:false,//密码显示方式
          }
        },
        created() {
              this.password = this.$route.params.userPwd;
            },
        methods:{
          //选择密码显示方式
          changePwdShow(){
            this.isShowPassword = !this.isShowPassword
          },
          async modifyUserPwd(){
            if (!this.password){
              Toast({
                message: '密码不能为空！',
                position: 'bottom',
                duration: 2000
              });
              return;
            }else if (!(/^[0-9a-zA-Z\u4e00-\u9fa5]{4,12}$/.test(this.password))) {
              Toast({
                message: '密码应为4到12个字符！',
                position: 'bottom',
                duration: 2000
              });
              return;
            } else{
              if(this.$cookies.get('user_id')){
                let json = await updateUserPwd(this.$cookies.get('user_id'),md5(this.password));
                if(json.success_code==200){
                  this.$router.go(-1);
                }
              }
            }
          },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #modify_userpwd
    width 100%
    height 100%
    font-size .3125rem
    .top
      width 100%
      height 1rem
      display flex
      justify-content center
      align-items center
      position fixed
      top 0
      left 0
      background-color #dd2727
      color #fff
      .icon-back
        font-size .4rem
        position absolute
        left .3rem
      .pwd
        width 60%
        font-size .345rem
        text-align center
      .sure-btn
        position absolute
        right .3rem
        font-size .3125rem
    .container
      font-size .3125rem
      position fixed
      top 1rem
      left 0
      bottom 0
      width 100%
      background-color: #f1f1f1;
      /deep/ .el-input
        margin-top .4rem
        input
          border none
          outline none
          font-size .3125rem
      p
        font-size .24rem
        color #888
        margin .2rem
      .switch-show
        position absolute
        top 6%
        right .2rem
        transform translateY(-50%)
</style>
