const TapRecord = require('../../models/Banuka/TapRecord')

exports.getPeakVisitTimes = async () => {
    const peakVisitTimes = await TapRecord.aggregate([
      {
        // Group by hour of the tap event
        $group: {
          _id: { $hour: "$tapTime" }, // Group by the hour of the event
          count: { $sum: 1 } // Count how many taps occurred in each hour
        }
      },
      {
        // Sort by count to get peak hours
        $sort: { count: -1 }
      }
    ]);
  
    return peakVisitTimes;
  };

  exports.getPeaktimes = async(req,res,next) => {

    const {startDate,endDate} = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Please provide startDate and endDate in YYYY-MM-DD format.' });
      }

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
              from: 'hospitals',
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
    
        res.status(200).json({ report });
      } catch (error) {
        next(error);
        // console.error('Error generating peak times report:', error);
        // res.status(500).json({ error: 'Failed to generate peak times report.' });
      }
  }
  

  exports.generatePeakTimesReport =async(req,res,next) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Please provide startDate and endDate in YYYY-MM-DD format.' });
    }
  
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
            from: 'hospitals',
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
          $sort: { 'hospitalName': 1, 'hour': 1 }
        }
      ]);

      // Transform the data to a more usable format
    const transformedReport = report.reduce((acc, curr) => {
      const { hospitalName, hour, totalTaps } = curr;
      if (!acc[hospitalName]) {
        acc[hospitalName] = Array(24).fill(0); // Initialize an array for 24 hours
      }
      acc[hospitalName][hour] = totalTaps;
      return acc;
    }, {});

    res.status(200).json({ report: transformedReport });
  } catch (error) {
    console.error('Error generating peak times report:', error);
    res.status(500).json({ error: 'Failed to generate peak times report.' });
  }
  }