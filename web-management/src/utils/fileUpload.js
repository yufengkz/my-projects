import SparkMD5 from 'spark-md5'

/**
 * MD5加密
 * @param {*} file
 * @param {*} callBack
 */
export function calculateMd5(file, callBack) {
  const fileReader = new FileReader()
  const blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice
  const chunkSize = 2097152
  // read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5()

  fileReader.onload = function (e) {
    spark.appendBinary(e.target.result) // append binary string
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      callBack(spark.end())
    }
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsBinaryString(blobSlice.call(file, start, end))
  }

  loadNext()
}
