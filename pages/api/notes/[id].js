import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Notes'

dbConnect();

export default async (req, res) => {
    const { 
        query : { id },
        method
    } = req;

    switch (method) {
        case "GET":
            const note = Note.findById(id);
            
            if(!note){
                return res.status(400).json({
                    status: false
                });
            }

            res.status(200).json({
                success: true,
                data: note
            });
            break;
            
        case "PUT" : 
            try {
                const note = await Note.findByIdAndUpdate(id , req.body, {
                    new: true,
                    runValidators: true
                });

                if(!note){
                    return res.status(400).json({
                        status: false
                    });
                }

                res.status(200).json({
                    success: true,
                    data: note
                });
            } catch (error) {
                return res.status(400).json({
                    status: false
                });
            }
            break;

        case "DELETE" : 
            try {
                const note = await Note.deleteOne({ _id : id });

                if(!note){
                    return res.status(400).json({
                        status: false
                    });
                }

                res.status(200).json({
                    success: true,
                    data: note
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