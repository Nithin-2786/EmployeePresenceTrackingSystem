const WebSocket = require("ws");
const connectdb = require("./connectDb");
const wss = new WebSocket.Server({ port: 3000 });
const User = require("./models/usermodel");
const Department = require("./models/Department");
const cico = require("./models/cico");
let adminWs = null;
connectdb();

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);

        try {
            const data = JSON.parse(message);

            if (data.action === 'getDepartments') {

                Department.find({}).then(function (departments) {
                    console.log('Retrieved departments:', departments);

                    // Send the departments back to the client
                    ws.send(JSON.stringify({ action: 'getDepartments', departments }));
                }).catch(function (err) {
                    console.error('Error occurred while retrieving departments:', err);
                });
            }
            if (data.action === 'addDepartment') {
                const { departmentId, departmentName } = data;

                Department.create({ departmentId, departmentName })
                    .then((newDepartment) => {
                        console.log('New Department Added:', newDepartment);

                    })
                    .catch((err) => {
                        console.error('Error adding new department:', err);

                    });
            }
            if (data.action === 'adminConnected') {
                adminWs = ws;
                console.log('Admin page connected');


                cico.find({}).then((data) => {
                    console.log("data:", data);
                    ws.send(JSON.stringify({ action: 'previousData', data }));

                });
            }
            if (data.action === 'getUsers') {
                User.find({}, 'username').then(function (users) {
                    console.log("Retrieved Users:", users);

                    const usernames = users.map(user => user.username);
                    ws.send(JSON.stringify({ action: "getUsers", users: usernames }));
                }).catch(function (err) {
                    console.error('Error occurred while retrieving users:', err);
                });
            }
            if (data.action === 'checkIn') {
                const username = data.username;
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB');
                const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

                cico.create({ username, date: formattedDate, checkIn: formattedTime })
                    .then(() => {
                        console.log('Check-in recorded for', username);
                        if (adminWs) {
                            adminWs.send(JSON.stringify({ action: 'checkIn', username, checkInTime: formattedTime }));
                        }
                        ws.send(JSON.stringify({ action: 'checkIn', status: 'success' }));
                    })
                    .catch(err => {
                        console.error('Error recording check-in:', err);
                        ws.send(JSON.stringify({ action: 'checkIn', status: 'error', message: err.message }));
                    });
            }
            if (data.action === 'checkOut') {
                const { username } = data;
                const currentDate = new Date();
                const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

                cico.findOne({ username }).sort({ checkIn: -1 })
                    .then(checkInRecord => {
                        if (!checkInRecord) {

                            ws.send(JSON.stringify({ action: 'checkOut', status: 'error', message: 'No check-in record found' }));
                        } else {

                            checkInRecord.checkOut = formattedTime;
                            checkInRecord.save()
                                .then(() => {
                                    console.log('Check-out recorded for', username);
                                    ws.send(JSON.stringify({ action: 'checkOut', status: 'success' }));
                                })
                                .catch(err => {
                                    console.error('Error recording check-out:', err);
                                    ws.send(JSON.stringify({ action: 'checkOut', status: 'error', message: err.message }));
                                });
                        }
                    })
                    .catch(err => {
                        console.error('Error finding check-in record:', err);
                        ws.send(JSON.stringify({ action: 'checkOut', status: 'error', message: err.message }));
                    });
            }
            if (data.action === 'elapsedTime') {
                // Check if WebSocket connection is open
                if (adminWs && adminWs.readyState === WebSocket.OPEN) {
                    // Send elapsed time to admin client
                    adminWs.send(JSON.stringify({ action: 'elapsedTime', elapsedTime: data.elapsedTime }));
                } else {
                    console.error('WebSocket connection is not open');
                }
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });

});
