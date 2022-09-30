import install from './install'
import DictMeta from './DictMeta'
import DictData from './DictData'

const DEFAULT_DICT_OPTIONS = {
  dicts: [],
}

/**
 * @classdesc 字典
 * @property {Object} label 标签对象，内部属性名为字典类型名称
 * @property {Array} dict 字段数组，内部属性名为字典类型名称
 * @property {Array.<DictMeta>} _dictMetas 字典元数据数组
 */
export default class Dict {
  static install = install

  constructor() {
    this.dictDataPool = {}
    this.dictMetas = []
  }

  init(options) {
    if (options instanceof Array) {
      options = { dicts: options }
    }
    let dicts = options.dicts || []
    const loadDictTasks = []
    this.dictMetas = dicts.map(x => DictMeta.parse(x))
    console.log('dictMetas', this.dictMetas)
    this.dictMetas.forEach(dictMeta => {
      const { dictKey } = dictMeta
      if (dictMeta.lazy) {
        return
      }
      loadDictTasks.push(loadDict(this, dictMeta))
    })
    return Promise.all(loadDictTasks)
  }

  /**
   * 重新加载字典
   * @param {String} dictKey 字典键
   */
  reloadDict(dictKey) {
    const dictMeta = this.dictMetas.find(e => e.dictKey === dictKey)
    if (dictMeta === undefined) {
      return Promise.reject(`the dict meta of ${dictKey} was not found`)
    }
    return loadDict(this, dictMeta)
  }

  /**
   * 获取字典
   * @param {String} dictKey 字典键
   */
  getDict(dictKey) {
    return this.dictDataPool[dictKey]
  }
}

/**
 * 加载字典
 * @param {Dict} dict 字典
 * @param {DictMeta} dictMeta 字典元数据
 * @returns {Promise}
 */
function loadDict(dict, dictMeta) {
  return new Promise((resolve) => {
    let { dictKey, dictData, request, labelField, valueField} = dictMeta
    console.log(`start load dictData: ${dictKey}`)
    if(!dictData || dictData.length === 0) {
      let dictReq = request(dictMeta)
      if (!(dictReq instanceof Promise)) {
        dictReq = Promise.resolve(dictReq)
      }
      dictReq.then(response => {
        if (!(response instanceof Array)) {
          console.error('the request return must be Promise of Array.')
          response = []
        }
        dict.dictDataPool[dictKey] = response.map(x => new DictData(x[labelField], x[valueField], x))
        resolve(dict.dictDataPool[dictKey])
      })
    } else {
      if (!(dictData instanceof Array)) {
        console.error('the dictData must be Array.')
        response = []
      }
      dict.dictDataPool[dictKey] = dictData.map(x => new DictData(x[labelField], x[valueField], x))
      resolve(dict.dictDataPool[dictKey])
    }
  })
}
