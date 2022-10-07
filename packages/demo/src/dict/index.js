
import Vue from 'vue'
import VueEasyDict from 'vue-easy-dict'
Vue.use(VueEasyDict, {
    showLog: true,
    types: [
        {
            dictKey: 'status',
            data: [
                { label: '启用', value: 1, color: 'red' },
                { label: '禁用', value: 0, color: 'green' }
            ]
        },
        {
            dictKey: 'company',
            immediateLoad: false,
            data() {
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
        },
        {
            dictKey: 'dept',
            data: [
                { id: 1, name: "信息部" },
                { id: 2, name: "人力资源部" }
            ],
            labelField: 'name',
            valueField: 'id'
        }
    ],
    defaultData() {
        return []
    },
})
