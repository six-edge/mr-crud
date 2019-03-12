import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import uk from 'vuetify/es5/locale/uk'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { uk },
    current: 'uk'
  },
})
