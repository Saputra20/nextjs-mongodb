import dbConnect from '../../../utils/dbConnect'
import Car from '../../../models/Cars'

dbConnect();

export default async (req, res) => {
    const { 
        query : { id },
        method
    } = req;

    switch (method) {
        case "GET":
            const car = await Car.findById(id);
            
            if(!car){
                return res.status(400).json({
                    status: false
                });
            }

            res.status(200).json({
                success: true,
                data: car
            });
            break;
            
        case "PUT" : 
            try {
                const car = await Car.findByIdAndUpdate(id , req.body, {
                    new: true,
                    runValidators: true
                });

                if(!car){
                    return res.status(400).json({
                        status: false
                    });
                }

                res.status(200).json({
                    success: true,
                    data: car
                });
            } catch (error) {
                return res.status(400).json({
                    status: false
                });
            }
            break;

        case "DELETE" : 
            try {
                const car = await Car.deleteOne({ _id : id });

                if(!car){
                    return res.status(400).json({
                        status: false
                    });
                }

                res.status(200).json({
                    success: true,
                    data: car
                });
            } catch (error) {
                return res.status(400).json({
                    status: false
                });
            }
            break;
            
        default:
            return res.status(400).json({
                        status: false
                    });
            break;
    }

}