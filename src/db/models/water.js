
import {Schema,model} from 'mongoose'

const aquaSchema = new Schema({
userId:{type: Schema.Types.ObjectId, ref: 'users'},
date:{type: String, required:true},
norm:{type: Number, required:true},
amount:{type: Number, required:true},
percent:{type:Number},
},{
        timestamps:false,
        versionKey:false
    }
);

const Waret = model('water', aquaSchema);

export default Water;

