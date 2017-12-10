import Table from 'cli-table';
import moment from 'moment-timezone';


class DailySummaryTableCreator {
  static create(data) {
    const {
      date,
      summary,
    } = data;
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const table = new Table({ head: [formattedDate, 'Time', 'Distance'] });
    summary.forEach((overview) => {
      const {
        activity,
        duration,
        distance,
      } = overview;
      const columnValues = DailySummaryTableCreator.createRowColumnValues(duration, distance);
      const row = {};
      row[activity] = columnValues;
      table.push(row);
    });
    return table.toString();
  }

  static createRowColumnValues(duration, distance) {
    return [
      DailySummaryTableCreator.convertSecondsToFormattedDuration(duration),
      DailySummaryTableCreator.convertMetersToMiles(distance),
    ];
  }

  static convertSecondsToFormattedDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  static convertMetersToMiles(meters) {
    return `${(meters * 0.000621371192).toFixed(1)}`;
  }
}

export default DailySummaryTableCreator;
