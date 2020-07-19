import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.min.css'
Vue.use(Viewer, {
  defaultOptions: {
    interval: 1500,
    inline: false,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})
