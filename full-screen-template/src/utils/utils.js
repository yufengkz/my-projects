function isObject(obj) {
    return typeof obj === 'object' && obj != null
}
const deepClone = (source, hash = new WeakMap()) => {
    if (!isObject(source)) return source
    if (hash.has(source)) return hash.get(source)
    const target = Array.isArray(source) ? [] : {}
    hash.set(source, target)
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = deepClone(source[key], hash)
        }
    }
    return target
}

function deepMerge(FirstOBJ, SecondOBJ) {
    // 深度合并对象
    for (const key in SecondOBJ) {
        FirstOBJ[key] =
            FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ? deepMerge(FirstOBJ[key], SecondOBJ[key]) : (FirstOBJ[key] = SecondOBJ[key])
    }
    return FirstOBJ
}

export { deepClone, isObject, deepMerge }
