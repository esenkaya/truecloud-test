//  ESEN KAYA'S SOLUTIONS FOR TRUECLOUD JAVASCRIPT TEST QUESTIONS
//  602 332 7922
//  esenkaya@msn.com
//  portfolio.esenkaya.net



// Given these three variables:

var employees = [
	{"internalid":"1", "name":"Abe Anderson", "email":"aanderson@javascript.com", "birthdate":"9/25/1974", "supervisor":"3", "2012 Revenue":"100000.00", "2013 Revenue":"0.00"},
	{"internalid":"2", "name":"Bob Benson", "email":"bbenson@javascript.com", "birthdate":"7/13/1972", "supervisor":"3", "2012 Revenue":"150000.00", "2013 Revenue":"0.00"},
	{"internalid":"3", "name":"Chelsea Chastain", "email":"cchastain@javascript.com", "birthdate":"5/7/1968", "supervisor":"", "2012 Revenue":"375000.00", "2013 Revenue":"0.00"},
	{"internalid":"4", "name":"Dwight Dwyer", "email":"ddwyer@javascript.com", "birthdate":"8/23/1982", "supervisor":"3", "2012 Revenue":"125000.00", "2013 Revenue":"0.00"},
	{"internalid":"5", "name":"Eathon Eckhart", "email":"eeckhart@javascript.com", "birthdate":"11/28/1970", "supervisor":"", "2012 Revenue":"200000.00", "2013 Revenue":"0.00"}
];

var revenue2013 = [
	{"type":"invoice", "customer":"Franklin", "Employee":"1", "amount":"50000.00"},
	{"type":"invoice", "customer":"Gabby", "Employee":"1", "amount":"25000.00"},
	{"type":"invoice", "customer":"Harry", "Employee":"1", "amount":"30000.00"},
	{"type":"invoice", "customer":"Ingrid", "Employee":"2", "amount":"75000.00"},
	{"type":"invoice", "customer":"Jacob", "Employee":"2", "amount":"60000.00"},
	{"type":"invoice", "customer":"Kelly", "Employee":"4", "amount":"30000.00"},
	{"type":"invoice", "customer":"Lamar", "Employee":"4", "amount":"40000.00"},
	{"type":"invoice", "customer":"Mary", "Employee":"4", "amount":"20000.00"},
	{"type":"invoice", "customer":"Nicole", "Employee":"4", "amount":"70000.00"},
	{"type":"invoice", "customer":"Oscar", "Employee":"5", "amount":"75000.00"},
	{"type":"invoice", "customer":"Patrick", "Employee":"5", "amount":"80000.00"},
	{"type":"invoice", "customer":"Quin", "Employee":"5", "amount":"60000.00"},
	{"type":"invoice", "customer":"Rachel", "Employee":"5", "amount":"100000.00"}
];

var commissionRules = [
	{"employee" : "1", "percentage":"15%", "bonus":"2000.00"},
	{"employee" : "2", "percentage":"10%", "bonus":"3000.00"},
	{"employee" : "3", "percentage":"7.5%", "bonus":"5000.00"},
	{"employee" : "4", "percentage":"10%", "bonus":"3000.00"},
	{"employee" : "5", "percentage":"10%", "bonus":"3000.00"}
];


// Below are individual problems, write a function/functions to accomplish the use-cases below.
	// Write all problems to an HTML page (or pages, if preferred) and present in a User-Interface that displays this raw data in an easily readable format
	// Comment code from a developer's-perspective (i.e. you are working on a team that will need to review/alter this code) and also provide comments as to why you chose to write a particular solution in the way you did.
	// Write solutions as efficiently as possible
	// Explain what tools were used during this practice - what program did you use to write this, what tool(s) did you use to debug, what references did you use if any were necessary?


// 1. Assume that today is 1/1/2014, update each employee's record to indicate the number of days until their birthday. Store the resulting value in a new key on the employee object.

// Answer 1 : Birthday counter from year to date
	function birthdayCounter() {
	var i;
	var birthdayCounter ="";
	
			function daysUntilBirthday(month, day){                  // Function for returning the millisecond value for the total days left to birthday
				var startDay = new Date('01/01/2014 12:01 AM')
				var y = startDay.getFullYear()
				var endDay = new Date(y, month-1, day);
				startDay.setHours(0, 0, 0, 0);
				if (startDay > endDay) endDay.setFullYear(y+1);
				return Math.round((endDay-startDay)/8.64e7);
			}

			
			birthdayCounter += "<table><th>Internal ID</th><th>Name</th><th>Email</th><th>Birthdate</th><th>Days to Birthday</th>";  // title for the days to birthday table
			
			for (i in employees){                                 // slicing the month and the day of the employee's birthday to send them to function
				var s1 = employees[i].birthdate.search("/");
				var s2 = employees[i].birthdate.substring(3, 6).search("/");
				var bd;
				var bm;
					
				bm = employees[i].birthdate.slice(0, s1);
				bd = employees[i].birthdate.substring(s1+3, s2+1);
				if (s2 == 0) bd = employees[i].birthdate.substring(s1+2, s2+2);

				employees[i].daysToBd = daysUntilBirthday(bm, bd); 
				
				
				birthdayCounter += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>"  +  employees[i].email + "</td><td>"  + employees[i].birthdate + "</td><td>" + " "  + employees[i].daysToBd + "</td></tr>";
				
				document.getElementById("birthdayCounter").innerHTML = birthdayCounter;
			
			}
			
			birthdayCounter +="</table>";	
			
	
    }		



// 2. Update each Employee object to contain a reference to their "best" customer (as defined by who purchased the most in the 2013 year).  
//    Store the resulting value in a new key on the employee object.

// Answer 2 : Employees by their best customer

function bestCustomerSort() {
var revenueMax = "";
var bestTotal;	
var preTotal;	
//TABLE HEADER
	revenueMax += "<table><th>Internal ID</th><th>Name</th><th>Supervisor</th><th>Best Customer</th>"; 
	
//CALCULATING EACH EMPLOYEE'S MAX REVENUE IN 2013
	for (i in employees){ 
	
	bestTotal = 0;
	preTotal = 0;
	console.log (employees[i].name, preTotal, bestTotal);
	
		for (r in revenue2013) {			
						
			if (employees[i].internalid == revenue2013[r].Employee) {
								
					if (Number(revenue2013[r].amount) > bestTotal){
					
						preTotal = revenue2013[r].amount;
						bestTotal = preTotal;
											
					} else {

						bestTotal = preTotal;
					}
									
				console.log(employees[i].internalid, revenue2013[r].Employee, " - amount : " + revenue2013[r].amount + " - preToTal : " + preTotal + " - bestTotal : " + bestTotal );

//ASSIGNING THE CUSTOMER NAME FOR THE HIGHEST REVENUE FOR EACH EMPLOYEE			
				if (bestTotal == revenue2013[r].amount){

					employees[i].bestCustomer = revenue2013[r].customer;
				}
							
			}

// EXCLUDING SUPERVISORS IF THERE IS NO DIRECT SALE			
			if (!employees[i].supervisor && bestTotal == "") {
						
					employees[i].bestCustomer = "Supervisor !";
					console.log(employees[i].bestCustomer);
			}
							
		}
			
	}

// POPULATING BEST CUSTOMER BY EMPLOYEES
	for (i in employees) {
			
		revenueMax += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>" + employees[i].supervisor +  "</td><td>" + employees[i].bestCustomer + "</td></tr>";
	}
		
// SENDING DATA TO HTML
		document.getElementById("bestCustomerSort").innerHTML = revenueMax;
		revenueMax +="</table>";
		
}





// 3. The 2013 Revenue element on the Employee records needs to be updated with the "revenue2013" list of data. 
//    Chelsea Chastain manages a team of employees - her 2013 Revenue number should be derived from the total revenue of all of the employees she manages.  
//    Store the resulting value in a new key on the employee object.

function update2013Revenue() {

var i;
var update2013Revenue ="";
for (c in employees) employees[c]['2013 Revenue'] = "";   // RESETTING OLD REVENUE2013 VALUES

//TABLE HEADER
	update2013Revenue += "<table><th>Internal ID</th><th>Name</th><th>Supervisor</th><th>2012 Revenue</th><th>2013 Revenue</th>"; 
	
//CALCULATING EACH EMPLOYEE'S REVENUE	
	for (i in employees){    
	
		for (r in revenue2013) {
			
			if (employees[i].internalid == revenue2013[r].Employee) {
			
				employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
				employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);
				
			}
			
			
		}
		
// CALCULATING SUPERVISOR'S REVENUE
		if (employees[i].supervisor) {     
			
			employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
			employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
		}
		
	}

// POPULATING REVENUE 2013 BY EMPLOYEES AND SUPERVISORS
	for (i in employees) update2013Revenue += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>" + employees[i].supervisor + "</td><td>" + employees[i]['2012 Revenue'] + "</td><td>" + employees[i]['2013 Revenue'].toFixed(2) + "</td></tr>";
	
		
// SENDING DATA TO HTML
		document.getElementById("update2013Revenue").innerHTML = update2013Revenue;
		update2013Revenue +="</table>";
	
}




// 4. Calculate the Employee's commission based on the 2013 Revenue: the employee receives a percentage of the revenue they generated for the year as well as a bonus. 
//    The bonus is a flat-sum of money if they managed to generate more revenue than the previous year.

function employeeCommision() {

var i;
var employeeCommision ="";
for (c in employees) employees[c]['2013 Revenue'] = "";   // RESETTING OLD REVENUE2013 VALUES

//TABLE HEADER
	employeeCommision += "<table><th>Internal ID</th><th>Name</th><th>Supervisor</th><th>2012 Revenue</th><th>2013 Revenue</th><th>2013 Commision</th><th>Bonus</th>"; 
	
//CALCULATING EACH EMPLOYEE'S REVENUE	
	for (i in employees){    
	
		for (r in revenue2013) {
			
			if (employees[i].internalid == revenue2013[r].Employee) {
			
				employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
				employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);
				
			}
			
			
		}
		
// CALCULATING SUPERVISOR'S REVENUE
		if (employees[i].supervisor) {     
			
			employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
			employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
		}
		
	}

// POPULATING COMMISSION AND BONUS BY EMPLOYEES AND SUPERVISORS
	for (i in employees) {
	
		var s1 = commissionRules[i].percentage.search("%");
		employees[i].commision = (employees[i]['2013 Revenue'] * commissionRules[i].percentage.slice(0,s1))/100;
		
		if (employees[i]['2012 Revenue'] < employees[i]['2013 Revenue'].toFixed(2)) {
			employees[i].bonus = commissionRules[i].bonus;
		} else employees[i].bonus = "";
		
		employeeCommision += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>" + employees[i].supervisor + "</td><td>" + employees[i]['2012 Revenue'] + "</td><td>" + employees[i]['2013 Revenue'].toFixed(2) + "</td><td>" + employees[i].commision.toFixed(2) + "</td><td>" + employees[i].bonus + "</td></tr>";
		
		console.log(employees[i].internalid , revenue2013[r].Employee , employees[i]['2013 Revenue'], employees[i].supervisor, employees[i].commision);
	}
		
// SENDING DATA TO HTML
		document.getElementById("employeeCommision").innerHTML = employeeCommision;
		employeeCommision +="</table>";
	
}


// 5. Write two questsions that are similar to problems 1-4. This should demonstrate an understanding of similar business processes. 
//    (Feel free to use the three variables provided, or construct your own)

// Question 5 : List employees info
function employeeList() {
	var i;
	var employeelist ="";
		employeelist += "<table><th>Internal ID</th><th>Name</th><th>Email</th><th>Birthdate</th>";
	for (i in employees){
		
		employeelist += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>"  +  employees[i].email + "</td><td>"  + employees[i].birthdate +"</td></tr>";
		document.getElementById("employeeList").innerHTML = employeelist;
	}
		employeelist +="</table>";
		
}

	
	
	
// Question 6 : Employees performance ratio
function ratioRevenue() {

var i;
var ratioRevenue ="";
for (c in employees) employees[c]['2013 Revenue'] = "";   // RESETTING OLD REVENUE2013 VALUES

//TABLE HEADER
	ratioRevenue += "<table><th>Internal ID</th><th>Name</th><th>Supervisor</th><th>2012 Revenue</th><th>2013 Revenue</th><th>Revenue Ratio</th>"; 
	
//CALCULATING EACH EMPLOYEE'S REVENUE	
	for (i in employees){    
	
		for (r in revenue2013) {
			
			if (employees[i].internalid == revenue2013[r].Employee) {
			
				employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
				employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);
				
			}
			
			
		}
		
// CALCULATING SUPERVISOR'S REVENUE
		if (employees[i].supervisor) {     
			
			employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
			employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
		}
		
	}
	
// POPULATING PERFORMANCE RATIO OF EMPLOYEES
	
	for (i in employees) {
	
		employees[i].ratio = ((((employees[i]['2013 Revenue'].toFixed(2)/employees[i]['2012 Revenue']))*100)-100).toExponential(2).slice(0,-3);
		
		console.log(employees[i].ratio);
	
		if (employees[i].ratio > 0) {
		
			employees[i].ratio = "<span style='color:green; font-size:18px;'>" + employees[i].ratio + "% &uarr;</span>";
			
		} else if (employees[i].ratio < 0) {
			
			employees[i].ratio = "<span style='color:red; font-size:18px;'>" + employees[i].ratio + "% &darr;</span>";
			
		} else {
		
			employees[i].ratio = "<span style='color:yellow; font-size:18px;'>" + employees[i].ratio + "% </span>";
		}
	
	
		ratioRevenue += "<tr><td>" + employees[i].internalid + "</td><td>" + employees[i].name + "</td><td>" + employees[i].supervisor + "</td><td>" + employees[i]['2012 Revenue'] + "</td><td>" + employees[i]['2013 Revenue'].toFixed(2) + "</td><td>" + employees[i].ratio + "</td></tr>";
	
	}
		
// SENDING DATA TO HTML
		document.getElementById("ratioRevenue").innerHTML = ratioRevenue;
		ratioRevenue +="</table>";
	
}

