import { model, Schema } from 'mongoose';
import { schemaObjectString } from '../../constants/constants.js';

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accessToken: schemaObjectString,
    refreshToken: schemaObjectString,
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Sessions = model('sessions', sessionsSchema);

export default Sessions;
