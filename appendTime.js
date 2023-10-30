const fs = require('fs');
const cron = require('node-cron');


function appendTimeToFile() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = (hours % 12) || 12;

  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  fs.appendFile('time.txt', formattedTime + '\n', (err) => {
    if (err) {
      console.error('Error appending time to file:', err);
    } else {
      console.log('Appended time to file:', formattedTime);
    }
  });
}

// Schedule the task to run every 5 seconds
cron.schedule('* * * * *', () => {
  appendTimeToFile();
  console.log('Task scheduled to append time to file.');
});
