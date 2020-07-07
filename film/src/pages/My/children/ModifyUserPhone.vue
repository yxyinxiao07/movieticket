<template>
    <div id="modify_userphone">
      <div class="top">
        <span class="icon-back" @click="$router.go(-1)"></span>
        <span class="phone ellipsis">修改手机号</span>
        <span class="sure-btn" @click="modifyUserPhone">确定</span>
      </div>
      <div class="container">
        <el-input
          class="input"
          placeholder="手机号"
          v-model="input"
          spellcheck="false"
          clearable>
        </el-input>
      </div>
    </div>
</template>

<script>
    import {Input} from 'element-ui'
    import {Toast} from 'mint-ui'
    import {updateUserPhone} from '../../../api/index'
    export default {
        name: "modifyUserPhone",
        components:{
          Input
        },
        data(){
          return{
            input:null
          }
        },
        created() {
              this.input = this.$route.params.userPhone;
            },
        methods:{
          async modifyUserPhone(){
            if (!this.input){
              Toast({
                message: '手机号不能为空！',
                position: 'bottom',
                duration: 2000
              });
              return;
            }else if (!(/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.input))) {
              Toast({
                message: '请输入正确的手机号',
                position: 'bottom',
                duration: 2000
              });
              return;
            } else{
              if(this.$cookies.get('user_id')){
                let json = await updateUserPhone(this.$cookies.get('user_id'),this.input);
                if(json.success_code==200){
                  this.$router.go(-1);
                }else if(json.error_code==1){
                  Toast({
                    message: '手机号已存在',
                    position: 'bottom',
                    duration: 2000
                  });
                  return;
                }
              }
            }
          },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #modify_userphone
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
      .phone
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
</style>
