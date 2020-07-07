<template>
    <div id="login">
      <div class="top">
        <span class="icon-close" @click="$router.go(-1)"></span>
      </div>
      <div class="login-container">
        <div class="login-header logo">
          <span class="icon icon-film-logo"></span>
          <p class="title">有趣电影</p>
        </div>
        <div class="login-content">
          <div class="login-type">
            补齐信息
          </div>
          <div class="login-main">
            <form>
              <div class="login-password">
                <section class="login-info">
                  <input type="text" placeholder="用户名" v-model="userName">
                </section>
                <section class="login-info login-verification">
                  <input type="password" placeholder="密码" v-show="!isShowPassword" v-model="password">
                  <input type="text" placeholder="密码" v-show="isShowPassword" v-model="password">
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
                </section>
                <section class="login-info login-verification">
                  <input type="password" placeholder="确认密码" v-show="!isShowPassword1" v-model="ppassword">
                  <input type="text" placeholder="确认密码" v-show="isShowPassword1" v-model="ppassword">
                  <div class="switch-show">
                    <span
                      class="icon-eye-close-fill"
                      v-show="!isShowPassword1"
                      @click="changePwdShow1"
                    >
                    </span>
                    <span
                      class="icon-eye-open-fill"
                      v-show="isShowPassword1"
                      @click="changePwdShow1"
                    >
                    </span>
                  </div>
                </section>
              </div>
              <button
                class="login-submit"
                @click.prevent="login"
              >
                确认
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {updateUser} from '../../api/index'
    import {Toast,MessageBox} from 'mint-ui'
    import md5 from 'js-md5';
    export default {
        name: "Login",
        data(){
          return{
            userName:'',//用户名
            password:'',//密码
            ppassword:'',//密码
            isShowPassword:false,//密码显示方式
            isShowPassword1:false,//密码显示方式
          }
        },
        methods:{
          //选择密码显示方式
          changePwdShow(){
            this.isShowPassword = !this.isShowPassword
          },
          changePwdShow1(){
            this.isShowPassword1 = !this.isShowPassword1
          },
          //登录
          async login(){
            if (this.userName===''){
              MessageBox.alert('请输入用户名');
            }else if(!this.password){
              MessageBox.alert('请输入密码');
            }else if (!(/^[0-9a-zA-Z\u4e00-\u9fa5]{4,12}$/.test(this.password))) {
              Toast({
                message: '密码应为4到12个字符！',
                position: 'bottom',
                duration: 2000
              });
              return;
            }else if(this.ppassword===''){
              MessageBox.alert('请确认密码');
            }else if(this.ppassword!==this.password){
              MessageBox.alert('两次密码不一致');
            }else{
              let json = await updateUser(this.$cookies.get('user_id'),this.userName,md5(this.password));
              if (json.success_code===200){
                Toast({
                  message: '注册成功',
                  position: 'middle',
                  duration: 2000
                });
                    this.$router.go(-2);
                // this.$router.push('/my');
              } else{
                MessageBox.alert(json.message);
              }
            }
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #login
    width 100%
    height 100%
    color #000
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
      color #dd2727
      .icon-close
        font-size .6rem
        position absolute
        left .3rem
      .name
        width 60%
    .login-container
      margin-top 1.2rem
      display flex
      justify-content center
      align-items center
      flex-flow column
      .login-header
        display flex
        flex-flow column
        justify-content center
        align-items center
        margin-bottom .2rem
        .icon
          font-size 2rem
        .title , .eng-title
          font-size .3125rem
          font-weight bolder
          text-align center
          color #dd2727
        .title
          text-indent .2rem
          letter-spacing .14rem
          margin-bottom .04rem
        .eng-title
          letter-spacing .02rem
          font-size .21rem
      .login-content
        width 100%
        background-color #fff
        .login-type
          width 100%
          font-size .25rem
          font-weight 700
          display flex
          justify-content center
          align-items center
          margin-bottom .25rem
          span
            margin .25rem
            padding-bottom .25rem
            box-sizing border-box
          .active
            color #dd2727
            border-bottom .04rem solid #dd2727
        .login-main
          width 100%
          display flex
          justify-content center
          align-items center
          form
            width 100%
            .login-phone,.login-password
              display flex
              justify-content center
              align-items center
              flex-flow column
              .login-info
                position relative
                margin-bottom .25rem
                width 70%
                input
                  width 100%
                  height .8rem
                  padding-left .2rem
                  box-sizing border-box
                  border .02rem solid #888
                  border-radius .12rem
                  outline 0
                  &:focus
                    border: 0.02rem solid #dd2727;
              .login-info > button
                position absolute
                top 50%
                right .2rem
                height 80%
                transform translateY(-50%)
                border 0
                color #ccc
                font-size .25rem
                background transparent
                outline none
                &.phone_right
                  color #e02e24
              .login-info > .switch-show , .login-info > .captcha
                position absolute
                top 50%
                right .2rem
                transform translateY(-50%)
              .login-info > .captcha
                height 68%
              .login-hint
                color #888
                font-size .24rem
                line-height 20px
                > a
                  color #dd2727
            .login-submit
              display block
              width 70%
              height .8rem
              margin .16rem auto
              border-radius .12rem
              background #dd2727
              color #fff
              text-align center
              font-size .3125rem
              line-height .8rem
              border 0
</style>
