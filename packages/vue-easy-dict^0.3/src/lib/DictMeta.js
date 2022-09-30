import DictOptions from './DictOptions'
import DictData from './DictData'
import merge from 'merge'

/**
 * @classdesc 字典元数据
 * @property {String} dictKey 字典键
 * @property {String} dictData 数据
 * @property {Function} loadData 数据加载方法
 * @property {Boolean} immediateLoad 是否立即加载
 * @property {String} labelField 标签字段
 * @property {String} valueField 值字段
 */
export default class DictMeta {
  constructor(options) {
    this.dictKey = options.dictKey
    this.dictData = options.dictData
    this.loadData = options.loadData
    this.immediateLoad = options.immediateLoad
    this.labelField = options.labelField
    this.valueField = options.valueField
  }
}


/**
 * 解析字典元数据
 * @param {Object} options
 * @returns {DictMeta}
 */
DictMeta.parse = function(options) {
  let opts = { ...DictOptions, ...options }
  return new DictMeta(opts)
}
