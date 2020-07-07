<template>
  <div id="app">
        <!-- <router-view/> -->
    <!-- <keep-alive  include="Home"> -->
        <router-view/>
    <!-- </keep-alive> -->
    <tab-bar v-if="$route.meta.showTabBar"/>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'
  import Vue from 'vue'
  import 'mint-ui/lib/style.css'
  import {
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Row,
    Col,
    Table,
    TableColumn,
    Input,
    Button,
    Form,
    FormItem,
    Pagination,
    Select,
    DatePicker,
    Option,
    Dialog,
    Upload,
    Cascader
  } from 'element-ui'
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Submenu);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(TableColumn);
    Vue.use(Table);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Pagination);
    Vue.use(Select);
    Vue.use(DatePicker);
    Vue.use(Option);
    Vue.use(Dialog);
    Vue.use(Upload);
    Vue.use(Cascader);
  export default {
    name: 'App',
    components: {TabBar}
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    // height 100% 
</style>
