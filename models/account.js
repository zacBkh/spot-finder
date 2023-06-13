import { Schema, model, models } from 'mongoose'

const accountSchema = new Schema(
    {
        provider: { type: String },
        type: { type: String },
        providerAccountId: { type: String },
        access_token: { type: String },
        token_type: { type: String },
        expires_at: { type: String },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
)

const Account = models.Account || model('Account', accountSchema)

// Exportation of model
export default Account
