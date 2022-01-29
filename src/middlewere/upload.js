const multer = require('multer')
const createError = require('http-errors')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const maxSize = 7 * 1024 * 1024 //1MB
  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(createError('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
    limits: { fileSize: maxSize }
  })

module.exports = { 
    upload
}