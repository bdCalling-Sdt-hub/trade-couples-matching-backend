import schedule from 'node-schedule';

const scheduleJob = () => {
  schedule.scheduleJob('* * * * *', () => {
    console.log('Print a A');
  });
};

export const scheduleHelper = { scheduleJob };
