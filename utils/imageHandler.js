const cloudinary = require('cloudinary').v2

const uploadSingleImage = async (userId, image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: `user_${userId}`,
            resource_type: 'auto',
            type: 'private'
        }, (error, uploadResult) => {
            if (error) return reject(error)
            resolve(uploadResult);
        }).end(image.buffer)
    });
}

const uploadImagesArray = async (userId, images) => {
    // console.log(typeof images)
    const upload = await Promise.all(images.map(image =>
        uploadSingleImage(userId, image)
    ))
    return upload
}

// const result = await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream({
//         folder: `user_${req.user._id}`,
//         resource_type: 'auto',
//         type: 'private'
//     }, (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//     }).end(req.file.buffer);
// });

module.exports = {
    uploadImagesArray
}