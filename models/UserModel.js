import  pool from '../config/db.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (name, email, password) => {
    //checking if empty fields
    if(name.trim() === '' || 
        email.trim() === '' || 
        password.trim() === '') {
        const error = new TypeError( 
            'Name, Email and Password are required'
        )
        error.statusCode = 400;
        throw error;
    }
    //validating email
    if (!validator.isEmail(email)) {
        const error = new TypeError('Invalid email address');
        error.statusCode = 400;
        throw error;
    }
    //validating password strength
    if (!validator.isStrongPassword(password, )){
        const error = new TypeError(
            'Password is not strong enough.')
        error.statusCode = 400;
        throw error;
    }
    //checkiing if email is unique
    const [user] = await pool.query(
        "SELECT email FROM tbluser WHERE email = ?", [email]);

    if(user.length === 1){
        const error = new Error(`The email ${email} is already used.`)
        error.statusCode = 400;
        throw error;
    }

    //encrypting password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const[newUser] = await pool.query("INSERT INTO tbluser(name, email, password) VALUES (?, ?, ?)", 
        [name, email, hashedPassword]
    );

    return newUser;
    
}

export const login = async (email, password) => {

    //if may laman
    if(email.trim() === '' || password.trim() === '') {
        const error = new Error('Email and password is required');
        error.statusCode = 400;
        throw error;
    }
    //checking if email exists in db
    const [user] = await pool.query(
        "SELECT * FROM tbluser WHERE email = ?", [email]);
    if(user.length === 0){
        const error = new Error(
            `An account with the email: ${email} does not exist.`);
        error.statusCode = 400;
        throw error;
    }
    //check if password matches
    if(!bcrypt.compareSync(password, user[0].password)){
        const error = new Error('Incorrect password.');
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign(
        {id: user[0].id},
        process.env.SECRET,
        {expiresIn: '1d'}
    );

    return token;
}


export const getUser = async (ID) => {
    if(parseInt(ID) === NaN){
        throw new Error('Invalid user ID');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [ID]);
    return user;

}