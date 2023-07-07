export const formDataToPlainObject = (formData: FormData) => {
  const values = {} as any
  const uniqueKeys: string[] = []
  for (const key of formData.keys()) {
    if (uniqueKeys.includes(key)) continue
    uniqueKeys.push(key)
    const value = formData.getAll(key)
    if (value.length === 1) {
      values[key] = value[0]
      continue
    }
    values[key] = value.join(',')
  }
  return values
}



export const formDataToPlainObject_Old = (formData: FormData) => {
  let obj = {} as any
  for (const key of formData.keys()) {
    if (key.includes('.')) {
      const [prefix, suffix] = key.split('.')
      obj[prefix] ??= []
      for (const [index, element] of formData.getAll(key).entries()) {
        obj[prefix][index] ??= {}
        obj[prefix][index][suffix] = element
      }
    } else {
      obj[key] = formData.get(key)
    }
  }
  return obj
}
