const jwt = require('jsonwebtoken');
const studentModel = require('./studentModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.getUserDetailsByEmail = async (email) => {
    try {
        return await studentModel.findOne({ email });
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw { status: 500, message: 'Error fetching user details' };
    }
};


module.exports.saveLoginTimeDBService = async (email, loginTime) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { intm: loginTime } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};

module.exports.checkintmDBService = async (email, checkintm) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { checkintm: checkintm } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};
module.exports.checkindateDBService = async (email, checkindate) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { checkindate: checkindate } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};

module.exports.saveLogoutTimeDBService = async (email, logoutTime) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { outtm: logoutTime } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};

module.exports.saveLogoutdateDBService = async (email, logoutdate) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { Logoutdate: logoutdate } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};

module.exports.savecheckout = async (email, checkout) => {
    try {
        const student = await studentModel.findOneAndUpdate(
            { email },
            { $set: { checkout: checkout } },
            { new: true }
        );
        return !!student; // Successfully saved if student exists
    } catch (error) {
        throw error;
    }
};


module.exports.createStudentDBService = (studentDetails) => {
    return new Promise((resolve, reject) => {
        // Check if email already exists in the database
        studentModel.findOne({ email: studentDetails.email })
            .then(existingStudent => {
                if (existingStudent) {
                    // If email already exists, reject the promise with status code 409
                    const error = new Error("User already registered");
                    error.status = 409;
                    reject(error);
                } else {
                    // If email does not exist, create a new student record
                    var studentModelData = new studentModel({
                        firstname: studentDetails.firstname,
                        lastname: studentDetails.lastname,
                        email: studentDetails.email,
                        age: studentDetails.age,
                        num: studentDetails.num,
                        gender: studentDetails.gender,
                        dpt: studentDetails.dpt,
                        intm: studentDetails.intm,
                        outtm: studentDetails.outtm,
                        checkintm:studentDetails.checkintm,
                        checkindate:studentDetails.checkindate,
                        Logoutdate: studentDetails.Logoutdate,
                        checkout: studentDetails.checkout,
                        password: encryptor.encrypt(studentDetails.password)
                    });

                    studentModelData.save()
                        .then((result) => {
                            resolve(true); // Successfully saved
                        })
                        .catch((error) => {
                            reject(error); // Failed to save
                        });
                }
            })
            .catch(error => {
                reject(error); // Error while checking for existing email
            });
    });
};

module.exports.loginuserDBService = (studentDetails) => {
    return new Promise((resolve, reject) => {
        studentModel.findOne({ email: studentDetails.email })
            .then((result) => {
                if (!result) {
                    reject({ status: false, msg: "Student not found" });
                } else {
                    const decrypted = encryptor.decrypt(result.password);
                    if (decrypted === studentDetails.password) {
                        // Generate JWT token
                        const token = jwt.sign({ email: result.email }, key, { expiresIn: '5h' });
                        resolve({ status: true, msg: "Student validated successfully", token });
                    } else {
                        reject({ status: false, msg: "Student validation failed" });
                    }
                }
            })
            .catch((error) => {
                reject({ status: false, msg: "Invalid data" });
            });
    });
};
