const jwt = require('jsonwebtoken');
const studentService = require('./studentService');

const getUserDetailsControllerFn = async (req, res) => {
    try {
        const { email } = req.query;
        const userDetails = await studentService.getUserDetailsByEmail(email);
        res.send(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveLoginTimeControllerFn = async (req, res) => {
    try {
        const { email, loginTime } = req.body;
        // Update the login time directly in the studentService
        const result = await studentService.saveLoginTimeDBService(email, loginTime);
        res.status(200).json({ message: 'Login time saved successfully' });
    } catch (error) {
        console.error('Error saving login time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const savecheckintmControllerFn = async (req, res) => {
    try {
        const { email, checkintm } = req.body;
        // Update the login time directly in the studentService
        const result = await studentService.checkintmDBService(email, checkintm);
        res.status(200).json({ message: 'checkin time saved successfully' });
    } catch (error) {
        console.error('Error saving chechkin time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const savecheckindateControllerFn = async (req, res) => {
    try {
        const { email, checkindate } = req.body;
        // Update the login time directly in the studentService
        const result = await studentService.checkindateDBService(email, checkindate);
        res.status(200).json({ message: 'checkin time saved successfully' });
    } catch (error) {
        console.error('Error saving chechkin time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const saveLogoutTimeControllerFn = async (req, res) => {
    try {
        const { email, logoutTime } = req.body;
        // Update the logout time directly in the studentService
        const result = await studentService.saveLogoutTimeDBService(email, logoutTime);
        res.status(200).json({ message: 'Logout time saved successfully' });
    } catch (error) {
        console.error('Error saving logout time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveLogoutdateControllerFn = async (req, res) => {
    try {
        const { email, logoutdate } = req.body;
        // Update the logout time directly in the studentService
        const result = await studentService.saveLogoutdateDBService(email, logoutdate);
        res.status(200).json({ message: 'Logout time saved successfully' });
    } catch (error) {
        console.error('Error saving logout time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const savecheckoutControllerFn = async (req, res) => {
    try {
        const { email, checkout } = req.body;
        // Update the logout time directly in the studentService
        const result = await studentService.savecheckout(email, checkout);
        res.status(200).json({ message: 'checkout  successfully' });
        // console.log(checkout)
    } catch (error) {
        console.error('Error saving logout time:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createStudentControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        const status = await studentService.createStudentDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ status: true, message: 'Student created successfully' });
        } else {
            res.send({ status: false, message: 'Error creating user' });
        }
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUserControllerFn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await studentService.loginuserDBService({ email, password });
        if (result.status) {
            res.send({ status: true, message: result.msg, token: result.token }); // Send token to client
        } else {
            res.send({ status: false, message: result.msg });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { 
    createStudentControllerFn, 
    loginUserControllerFn, 
    getUserDetailsControllerFn,
    saveLoginTimeControllerFn,
    saveLogoutTimeControllerFn,
    saveLogoutdateControllerFn,
    savecheckintmControllerFn,
    savecheckindateControllerFn,
    savecheckoutControllerFn,
};
