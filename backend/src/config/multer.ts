import multer from 'multer'

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/temp')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const upload = multer({
  storage: diskStorage,
})

export default upload
