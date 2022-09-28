export let _Vue
export let dictData = {} 
export default {
    install(Vue) {
        _Vue = Vue
        Vue.prototype.$dict = this
    },
    init(options = {}) {
        const {
            storageKey = 'dictData',
            modules = {},
            dicts = {},
            labelKey: moduleLabelKey = 'label',
            valueKey: moduleValueKey = 'value',
            dictApi: moduleDictApi = {}
        } = options

        // 获取缓存的字典数据
        dictData = JSON.parse(localStorage.getItem(storageKey) || '{}')

        // 循环获取配置中的数据
        let allModules = { 'default': options, ...modules}
        for (let moduleKey in allModules) {
            const currentModule = allModules[moduleKey]
            const { dicts = {} } = currentModule
            const { dictKey, dictData = [], dictApi } = dicts
            const { url, method = 'get', headers = {}, params = {}, data = {}, cache = true } = dictApi || moduleDictApi
            // 请求字典接口数据
            if (url) {
                
            }
            console.log("当前字典静态数据", dictData)
            console.log("当前字典api配置", url, method, headers, params, data, cache)
        }
        console.log("Hah ", _Vue)
    },
    getDict(dictKey) {

    },
    getDictObj(dictKey, value) {

    },
    getDictLabel(dictKey, value) {

    }

}