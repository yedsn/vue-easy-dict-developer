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
      if (!dictMeta.immediateLoad) {
        return
      }
      loadDictTasks.push(loadDict(this, dictMeta))
    })
    return Promise.all(loadDictTasks)
  }

  /**
   * 加载字典
   * @param {String} dictKey 字典键
   */
  loadDict(dictKey, force) {
    const dictMeta = this.dictMetas.find(e => e.dictKey === dictKey)
    if (dictMeta === undefined) {
      return Promise.reject(`the dict meta of ${dictKey} was not found`)
    }
    return loadDict(this, dictMeta, force)
  }

  /**
   * 获取字典
   * @param {String} dictKey 字典键
   */
  getDict(dictKey) {
    if(!this.dictDataPool[dictKey]) {
      console.warn(`you are loading an unloaded dict "${dictKey}", please do it after load`)
    }
    return this.dictDataPool[dictKey] || []
  }

  /**
   * 获取字典标签
   * @param {String} dictKey
   * @param {*} value
   * @returns
   */
  getDictLabel(dictKey, value) {
    const dict = this.getDict(dictKey)
    const dictData = dict.find(e => e.value === value)
    return dictData ? dictData.label : ''
  }
}

/**
 * 加载字典
 * @param {Dict} dict 字典
 * @param {DictMeta} dictMeta 字典元数据
 * @returns {Promise}
 */
function loadDict(dict, dictMeta, force = false) {
  return new Promise((resolve) => {
    let { dictKey, dictData, loadData, labelField, valueField} = dictMeta

    // 不强制加载，且已经加载过，则直接返回
    if(dict[dictKey] && !force) {
      resolve(dict[dictKey])
    }

    console.log(`start load dict: ${dictKey}`)
    // 加载数据方法
    if(loadData) {
      let loadFun = loadData(dictMeta)
      if (!(loadFun instanceof Promise)) {
        loadFun = Promise.resolve(loadFun)
      }
      loadFun.then(response => {
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
