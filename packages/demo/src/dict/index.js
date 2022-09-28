
import Vue from 'vue'
import VueEasyDict from 'vue-easy-dict'
Vue.use(VueEasyDict)

VueEasyDict.init({
    cache: false,
    modules: {
        // user: {
        //   dicts: [
        //     { dictKey: 'sex', dictData: [{ label: '男', value: 1 }, { label: '女', value: 0 }] }
        //   ]
        // }
    },
    dicts: [
        {
            dictKey: 'status',
            dictData: [
                { label: '启用', value: 1, color: 'red' },
                { label: '禁用', value: 0, color: 'green' }
            ]
        },
        {
            dictKey: 'company',
            dictApi: {
                url: '/company',
                method: 'get',
            },
            labelKey: 'name',
            valueKey: 'id'
        }
    ],
    onReady() {
        // console.log("加载完毕", dictData)
    }
})