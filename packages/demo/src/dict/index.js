
import Vue from 'vue'
import VueEasyDict from 'vue-easy-dict'
Vue.use(VueEasyDict, {
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
            ],
            // loadData() {
            //     return [
            //         { label: 'ok', value: 1 }
            //     ]
            // }
        },
        {
            dictKey: 'company',
            // immediateLoad: false,
            loadData(dictMeta) {
                console.log("开始加载", dictMeta)
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            { name: '公司1', id: 1 },
                            { name: '公司2', id: 2 },
                            { name: '公司3', id: 3 },
                        ])
                    }, 4000)
                })
            },
            labelField: 'name',
            valueField: 'id'
        }
    ],
    onReady(dict) {
        console.log("加载完毕", dict)
    }
})
