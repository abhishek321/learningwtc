var employee = [
    {
        id: 1,
        name: "Name A",
        JoinningYear: 2023,
        Salary: 5000
    },
    {
        id: 2,
        name: "Name B",
        JoinningYear: 2023,
        Salary: 4000
    },
    {
        id: 3,
        name: "Name C",
        JoinningYear: 2023,
        Salary: 500
    },
    {
        id: 4,
        name: "Name D",
        JoinningYear: 2022,
        Salary: 5000
    },
    {
        id: 5,
        name: "Name E",
        JoinningYear: 2015,
        Salary: 5000
    },
 
];

// Custom comparator function for sorting
function compareEmployees(a, b) {
    // Compare JoiningYear
    if (a.JoiningYear !== b.JoiningYear) {
        return a.JoiningYear - b.JoiningYear;
    }

    // If JoiningYear is equal, compare Salary
    return a.Salary - b.Salary;
}

// Sort the employee array using the custom comparator
employee.sort(compareEmployees);

// Display the sorted array
console.log(employee);