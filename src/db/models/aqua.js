import {Schema,model} from 'mongoose'

const aquaSchema = new Schema(
    {date:{type: String, required:true}},{
        timestamps:false,
        versionKey:false
    }
);

const Aqua = model('aqua', aquaSchema);

export default Aqua;

