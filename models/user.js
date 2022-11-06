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
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minLength: 6
        },

    },
);

// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema);


// Exportation of model
export default User;


