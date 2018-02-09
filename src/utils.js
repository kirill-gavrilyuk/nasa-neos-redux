export const min = (a, b) => a > b ? b : a;
export const max = (a, b) => a < b ? b : a;

const _curry = (arity, fn) => (...args) =>
    args.length < arity ? _curry(arity - args.length, (...nextArgs) => fn(...args, ...nextArgs)) : fn(...args);

export const curry2 = fn => _curry(2, fn);
export const curry3 = fn => _curry(3, fn);
export const curry4 = fn => _curry(4, fn);
export const curry5 = fn => _curry(5, fn);
export const curry6 = fn => _curry(6, fn);

let id = 0;
export const getUniqId = () => id++;

// Date -> String
export const convertDate = date => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    return [
        year.toString(),
        (month > 9 ? "" : "0") + month.toString(),
        (day > 9 ? "" : "0") + day.toString(),
    ].join("-");
};

// I should! use moment.js next time :[

// Date -> Date
export const nextDay = date => new Date(new Date(date.getTime()).setUTCDate(date.getUTCDate() + 1));

// Date -> Date
export const startOfMonth = date => new Date(new Date(date.getTime()).setUTCDate(1));


// Date -> Date
export const isToday = date => {
    const today = new Date();

    return (true
        && date.getUTCFullYear() === today.getUTCFullYear()
        && date.getUTCMonth() === today.getUTCMonth()
        && date.getUTCDate() === today.getUTCDate()
    );
};
