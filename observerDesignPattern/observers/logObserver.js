const Observer = require('./observer');

class LogObserver extends Observer {
  update(user) {
    const logMessage = `User Registered: ${user.fullName}, Email: ${user.email}, NIC: ${user.nic}, Registered At: ${new Date().toISOString()}\n`;

    // Log to console
    console.log(logMessage);

  
  }
}

module.exports = LogObserver;