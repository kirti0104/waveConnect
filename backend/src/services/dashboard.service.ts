import Waves from "../models/waves.model";


const createWaves = async (data:any) => {

    const { userId, name, message, photoUrl } = data;
    const wave = await Waves.create({userId, name, message,photoUrl, });
     return wave;
}

export default{ createWaves };