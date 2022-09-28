export let _Vue
export let dictDataPool = {} 
export default {
    install(Vue) {
        _Vue = Vue
        Vue.prototype.$dict = this
    },
    init(options = {}) {
        const {
            storageKey = 'dictData',
            modules = {},
            labelKey: globalLabelKey = 'label',
            valueKey: globalValueKey = 'value',
            dictApi: globalDictApi = {},
            cache: globalCache = true
        } = options

        // 获取缓存的字典数据
        dictDataPool = globalCache? JSON.parse(localStorage.getItem(storageKey) || '{}'): {}
        
        // 循环获取配置中的数据
        let allModules = { 'default': options, ...modules}
        for (let moduleKey in allModules) {
            const currentModule = allModules[moduleKey]
            // 获取当前模块的配置
            const { 
                dicts = [], 
                labelKey: moduleLabelKey = 'label', 
                valueKey: moduleValueKey = 'value',
                dictApi: moduleDictApi = {} ,
                // cache: moduleCache = true
            } = currentModule

            // 获取模块存储池
            let moduleDictDataPool = moduleKey == 'default'? dictDataPool : dictDataPool[moduleKey] || {}
            if(moduleKey != 'default') {
                dictDataPool[moduleKey] = moduleDictDataPool
            }

            // 循环字典配置列表
            dicts.forEach(dict => {
                const { 
                    dictKey, 
                    labelKey: itemLabelKey, 
                    valueKey: itemValueKey, 
                    // cache: itemCache = true, 
                    dictData = [], 
                    dictApi 
                } = dict
                
                // 根据顺序 当前->模块->全局 顺序，获取配置
                const { url, method = 'get', headers = {}, params = {}, data = {}, cache = true } = dictApi || moduleDictApi || globalDictApi
                const labelKey = itemLabelKey || moduleLabelKey || globalLabelKey
                const valueKey = itemValueKey || moduleValueKey || globalValueKey
                
                // 请求字典接口数据
                if (url) {

                    // TODO 接口获取数据
                    console.log("当前字典api配置", url, method, headers, params, data, cache)
                    
                }
                moduleDictDataPool[dictKey] = dictData.map(x => ({...x, label: x[labelKey], value: x[valueKey]}))
                
            })
        }
        console.log('字典数据池', dictDataPool)
        
        // 缓存字典数据
        if(globalCache) {
            localStorage.setItem(storageKey, JSON.stringify(dictDataPool))
        }
    },

    /**
     * 获取字典
     * @param {*} dictKey 
     * @returns 
     */
    getDict(dictKey) {
        return (dictDataPool[dictKey]||[])
    },

    /**
     * 获取字典项
     * @param {*} dictKey 
     * @param {*} value 
     * @returns 
     */
    getDictItem(dictKey, value) {
        return ((dictDataPool[dictKey]||[]).find((x) => x.value == value) || {})
    },

    /**
     * 获取字典项的label
     * @param {*} dictKey 
     * @param {*} value 
     * @returns 
     */
    getDictLabel(dictKey, value) {
        return ((dictDataPool[dictKey]||[]).find((x) => x.value == value) || {}).label
    }

}