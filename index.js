// recArray = [firstName string, familyName string, title string, payPerHour number]
//employee = employee record Object

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employee) {
    return employee.map(rec => createEmployeeRecord(rec))

}

const createTimeInEvent = function (employee, dateStamp) {
    // const [date, hour] = dateStamp.split(' ')
    //       ["YYYY-MM-DD", "HHMM"]
    //         [   0,         1   ]

    const arrFromDate = dateStamp.split(' ')
    const date = arrFromDate[0]
    const hour = arrFromDate[1]
    const inEvent = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    }
    employee.timeInEvents.push(inEvent)
    //this is a keyword saying "i am representing the function" it could be in an object, different kinds of arrays/functions. sometimes need to bind to this function w/ older JS. keyword that represents the function/object itself that you are within.
    return employee
}

const createTimeOutEvent = function (employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const outEvent = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }
    employee.timeOutEvents.push(outEvent)
    return employee
}

const hoursWorkedOnDate = function (employee, targetDate) {
    const inEvent = employee.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = employee.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (employee, targetDate) {
    const wages = hoursWorkedOnDate(employee, targetDate) * employee.payPerHour
    return wages
}

const allWagesFor = function (employee) {
    const eligibleDates = employee.timeInEvents.map(function (e) { return e.date })
    // console.log(eligibleDates)
    const payable = eligibleDates.reduce(function (acc, targetDate) {
        return acc + wagesEarnedOnDate(employee, targetDate)
    }, 0)
    // console.log(payable)
    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.Array.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function (employee) {
    return employee.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}



// const allWagesFor = function (employee){
    //     wagesEarnedOnDate.
    // }
