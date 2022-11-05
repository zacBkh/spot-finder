import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
    {
        // username: {
        //     type: String,
        //     required: true,
        //     unique: true // email must be unique (that's an index, NOT a validator)
        // },

        name: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        hashedPassword: {
            type: String,
            required: true,
            minLength: 6
        },

        hashedPassword: {
            type: String,
            },
    },
);

// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema);


// Exportation of model
export default User;


