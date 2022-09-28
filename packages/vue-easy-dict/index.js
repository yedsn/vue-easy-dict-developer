export let _Vue
export default {
    install(Vue) {
        _Vue = Vue
        Vue.prototype.$dict = this
    },
    initDicts(options = {}) {
        const {
            modules = {},
            load = () => {
                return []
            }
        } = options
        // 循环所有配置中的load方法
        console.log("Hah ", _Vue)
    }

}