const TapRecord = require('./models/Banuka/TapRecord'); // Your TapRecord model
const reportController = require('./controllers/Banuka/reportController'); // Your report logic

jest.mock('../models/tapRecordModel');

describe('Report Generation', () => {
  it('should generate peak visit times based on mock tap events', async () => {
    TapRecord.aggregate.mockResolvedValue([
      { _id: 9, count: 10 }, // Example: 10 taps at 9 AM
      { _id: 12, count: 8 }  // Example: 8 taps at 12 PM
    ]);

    const result = await reportController.getPeakVisitTimes();
    expect(result).toEqual([
      { _id: 9, count: 10 },
      { _id: 12, count: 8 }
    ]);
  });
});
