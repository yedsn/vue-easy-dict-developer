export const options = {
  /**
   * 是否初始化时立即加载
   */
  immediateLoad: true,
  /**
   * 字典加载方法，方法签名为function(dictMeta: DictMeta): Promise | Array
   */
  loadData: null,
  /**
   * 字典数据
   */
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
