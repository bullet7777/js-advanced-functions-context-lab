/* Your Code Here */


function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(records) {
    return records.map((record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let dateArray = dateStamp.split(" ");
    let timeInDate = dateArray[0]
    let hour = dateArray[1]

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: timeInDate
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let dateArray = dateStamp.split(" ");
    let timeInDate = dateArray[0]
    let hour = dateArray[1]

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: timeInDate
    })


    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date) {

    let hours = 0
    let timeInEvent = employeeRecord.timeInEvents
        .find(o => o.date === date)

    let timeOutEvent = employeeRecord.timeOutEvents.find(o => o.date === date)

    let timeInEventHour = timeInEvent.hour
    let timeOutEventHour = timeOutEvent.hour

    hours = timeOutEventHour - timeInEventHour
    return hours/100

}


function wagesEarnedOnDate(employeeRecord, date) {
    let pay = 0
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let payRate = employeeRecord.payPerHour

    pay = hours * payRate

    return pay

}


function findEmployeeByFirstName(srcArray,firstName) {
    
    
    let employeeRecord=srcArray.find((element)=>
    {
        return element.firstName===firstName
    })
    
    return employeeRecord

}

function calculatePayroll(employeeRecords) {
    let sum= employeeRecords.reduce(myFunc,0);

function myFunc(total, employeeRecord) {
    let wage=allWagesFor(employeeRecord)
  return total + wage;
}

    return sum
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}