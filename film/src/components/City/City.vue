<template>
    <div class="city_body">
        <div class="top">
          <span class="icon-back" @click="$router.go(-1)"></span>
          <span class="name">选择城市</span>
        </div>
        <div class="city_list">
            <Loading v-if="isLoading"></Loading>
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul>
                            <li v-for="item in hotList" :key="item.index" @tap="handleToCity( item.cityName, item.index )">{{ item.cityName }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="(item, index) in list" :key="item.index">
                            <h2>{{ getId(index) }}</h2>
                            <ul>
                                <li v-for="(city, i) in item" :key="i" @tap="handleToCity( city.cityName )">{{ city.cityName }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in letter" :key="item.index" @touchstart="handleToIndex(index)">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Citys from '../../../static/city.js';
export default {
    name: 'City',
    data(){
        return{
            cityList: [],
            hotList: [],
            letter: [],
            list: [],
            isLoading: true
        }
    },
    mounted() {
        this.cityList = JSON.parse(window.localStorage.getItem('cityList'));
        this.hotList = JSON.parse(window.localStorage.getItem('hotList'));
        this.isLoading = false;
        this.getCityInfoSucc ();
        // if (this.cityList && this.hotList) {
        //     this.isLoading = false;
        // } else {
        //     this.getCityInfoSucc ();
        // };
        var mu = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'];
        var tmp = [];
        for (var i = 0; i < mu.length; i++) {
            var item = mu[i];
            for (var j = 0; j < this.cityList.length; j++) {
              // console.log(this.cityList[j])
                var py = this.cityList[j].py;
                // console.log(py);
                if (py.substring(0, 1) == item) {
                    if (tmp.indexOf(item) == -1) {
                        this.list[i] = [this.cityList[j]];
                        tmp.push(item);
                        this.letter.push(item.toUpperCase());
                    } else {
                        this.list[i].push(this.cityList[j]);
                    }
                }
            }
        }
        // console.log(this.list);
    },
    methods : {
        getCityInfoSucc(){
            // console.log(Citys);
            this.cityList = Citys.cities;
            // console.log(this.cityList);
            this.hotList = Citys.hotCity;
            // console.log(this.hotList);
            window.localStorage.setItem( 'cityList', JSON.stringify(this.cityList) );
            window.localStorage.setItem( 'hotList', JSON.stringify(this.hotList) );
        },
        
        getId(index) {
            return this.letter[index];
        },
        handleToIndex(index) {
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
        },
        handleToCity(nm) {
            // console.log(nm)
            this.$store.commit('city/CITY_INFO', { nm });
            window.localStorage.setItem( 'nowNM', nm );
            // this.$router.push('/home');
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .city_body
    width 100%
    height 100%
    background linear-gradient(to bottom, #242342 0%,#11182B 100%)
    color #fff
    font-size .3125rem
    position absolute
    display flex
    .top
      width 100%
      height 1rem
      display flex
      justify-content center
      align-items center
      margin-bottom .2rem
      position fixed
      top 0
      left 0
      background-color #dd2727
      z-index 999
      .icon-back
       font-size .3125rem
       position absolute
       left .3rem
    .city_list
      flex 1
      overflow auto
      background #FFF5F0
      font-size .3125rem
      color black 
      margin-top 1rem
      .city_list::-webkit-scrollbar
        background-color transparent
        width 0
      .city_hot
        margin-top .3rem
        h2
          font-size .35rem
          padding-left .3rem
          line-height .5rem
          background #F0F0F0
          font-weight normal
        ul
          overflow auto
          li
            float left
            background-color #fff
            width 27%
            height .6rem
            margin-top .3rem
            margin-left 3%
            padding 0 .3rem
            border .01rem solid #e6e6e6
            border-radius .1rem
            line-height .6rem
            text-align center
            box-sizing border-box
      .city_sort
        div
          margin-top .3rem
        h2
          padding-left .3rem
          font-size .3125rem
          line-height .5rem
          background #F0F0F0
          font-weight normal
        ul
          padding-left .3rem
          li
            line-height .3rem
            margin-top .3rem
    .city_index
      width .5rem
      display flex
      flex-direction column
      background white
      justify-content center
      text-align center
      font-size .35rem
      color black 
      ul
        margin-top .3rem
        overflow auto
        li
          line-height .3rem
          margin-bottom .15rem
</style> 
