export const options = {
  /**
   * 字典请求，方法签名为function(dictMeta: DictMeta): Promise | Array
   */
  request: (dictMeta) => {
    console.log(`load dict ${dictMeta.dictKey}`)
    return Promise.resolve([])
  },
  dictData: [],
  /**
   * 默认标签字段
   */
  labelField: 'label',
  /**
   * 默认值字段
   */
  valueField: 'value',
}

export function mergeOptions(customOptions) {
  Object.assign(options, customOptions)
}

export default options
