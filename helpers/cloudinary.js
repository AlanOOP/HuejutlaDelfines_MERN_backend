import cloudinary from 'cloudinary';

cloudinary.v2.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET
    cloud_name: 'dxpbz65ha',
    api_key: '135576353568483',
    api_secret: 'aQWEv1GOHhAk1OE0Ypxg2fJ_SHs' // Click 'View API Keys' above to copy your API secret
});



export default cloudinary;