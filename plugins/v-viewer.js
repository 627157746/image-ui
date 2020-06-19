import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { inline: false, button: true, navbar: true, title: false, toolbar: true, tooltip: true, movable: true, zoomable: true, rotatable: true, scalable: true, transition: false, fullscreen: true, keyboard: true, url: 'data-source' }
})
