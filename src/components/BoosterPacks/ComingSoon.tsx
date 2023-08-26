import React from 'react';

const getDaysUntilOpening = (end: string) => {
    const date1 = new Date();
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    if (date1.getDate() === date2.getDate()) {
        return 0
    }
    return diffInDays;
}

const ComingSoon = (props: {displaySubtext: boolean}) => {
    const daysLeft = getDaysUntilOpening("2023-06-20");
    if (daysLeft <= 0) return null;
    return <div id={props.displaySubtext ? 'coming-soon-timer-large' : 'coming-soon-timer'}>
        <h2>Open in: {daysLeft} days</h2>
        {props.displaySubtext && <h3>Early Access offer at a reduced price. Unwrapping will become available in the upcoming update!</h3>}
    </div>
}

export default ComingSoon;