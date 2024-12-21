const mongoose = require('mongoose');
const TapRecord = require('../../models/Banuka/TapRecord'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb+srv://demondevil200166:k1Ul00CCLCAdZr6o@cluster0.oialj.mongodb.net/CsseReportTest', {
  // The following options are deprecated, you can safely remove them.
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate daily report
const generateDailyReport = async (date) => {
  console.log(date);
  const startOfDay = new Date(date);
  console.log(startOfDay);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
  console.log(endOfDay);

  const report = await TapRecord.aggregate([
    {
      $match: {
        tapTime: { $gte: startOfDay, $lt: endOfDay },
      },
    },
    {
      $group: {
        _id: '$hospitalId',
        totalTaps: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'hospitals', // Name of the Hospital collection
        localField: '_id',
        foreignField: '_id',
        as: 'hospitalDetails',
      },
    },
    {
      $unwind: '$hospitalDetails',
    },
    {
      $project: {
        _id: 0,
        hospitalName: '$hospitalDetails.hospitalName', // Adjust this field to match your Hospital model
        totalTaps: 1,
      },
    },
  ]);

  console.log(`Daily Report for ${date}:`, report);
};

// Function to generate patient report
const generatePatientReport = async (patientId, startDate, endDate) => {
  const report = await TapRecord.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(patientId), // Correct usage of ObjectId
        tapTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$tapTime' } },
        totalTaps: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        totalTaps: 1,
      },
    },
  ]);

  console.log(`Patient Report for ${patientId} from ${startDate} to ${endDate}:`, report);
};

// Function to generate hospital report
const generateHospitalReport = async (hospitalId, startDate, endDate) => {
  const report = await TapRecord.aggregate([
    {
      $match: {
        hospitalId: new mongoose.Types.ObjectId(hospitalId), // Correct usage of ObjectId
        tapTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$tapTime' } },
        totalTaps: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        totalTaps: 1,
      },
    },
  ]);

  console.log(`Hospital Report for ${hospitalId} from ${startDate} to ${endDate}:`, report);
};

// Function to generate hospital report for a specific time range within a day
const generateHospitalReportForTimeRange = async (hospitalId, date, startTime, endTime) => {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
  
    // Set the start time and end time based on the provided parameters
    const [startHour, startMinute] = startTime.split(':').map(Number);
    startOfDay.setHours(startHour, startMinute, 0, 0);
  
    const [endHour, endMinute] = endTime.split(':').map(Number);
    endOfDay.setHours(endHour, endMinute, 59, 999);
  
    console.log(`Start Time: ${startOfDay}, End Time: ${endOfDay}`);
  
    const report = await TapRecord.aggregate([
      {
        $match: {
          hospitalId: new mongoose.Types.ObjectId(hospitalId), // Correct usage of ObjectId
          tapTime: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d %H:%M:%S', date: '$tapTime' } },
          totalTaps: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          totalTaps: 1,
        },
      },
    ]);
  
    console.log(`Hospital Report for ${hospitalId} from ${startTime} to ${endTime}:`, report);
  };

  // Function to generate peak times across all hospitals
const generatePeakTimesReport = async (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const report = await TapRecord.aggregate([
        {
          $match: {
            tapTime: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: {
              hospitalId: '$hospitalId',
              hour: { $hour: '$tapTime' }
            },
            totalTaps: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'hospitals', // Ensure this matches the collection name in MongoDB
            localField: '_id.hospitalId',
            foreignField: '_id',
            as: 'hospitalDetails'
          }
        },
        {
          $unwind: '$hospitalDetails'
        },
        {
          $project: {
            _id: 0,
            hospitalId: '$_id.hospitalId',
            hospitalName: '$hospitalDetails.hospitalName',
            hour: '$_id.hour',
            totalTaps: 1
          }
        },
        {
          $sort: { hospitalName: 1, hour: 1 }
        }
      ]);
  
      console.log(`Peak Times Report from ${startDate} to ${endDate}:`);
      console.log(report);
      
      // Optionally, return the report for further processing
      return report;
    } catch (error) {
      console.error('Error generating peak times report:', error);
    }
  };

// Example usage
(async () => {
//   await generateDailyReport('2024-10-03'); // Generate daily report for a specific date
//   await generatePatientReport('670e3092a67008560729ac00', '2024-10-01', '2024-10-14'); // Replace with an actual patient ID
//   await generateHospitalReport('670e2cccff9231e6a8fad7d8', '2024-10-01', '2024-10-14'); // Replace with an actual hospital ID
//   await generateHospitalReportForTimeRange('670e2cccff9231e6a8fad7d8', '2024-10-05', '10:00', '16:00'); // Replace with an actual hospital ID and desired time range
     await generatePeakTimesReport('2024-10-01', '2024-10-14');
    mongoose.disconnect();
})();
