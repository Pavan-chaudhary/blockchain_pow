function Cars(make,name,mileage){
	this.make=make; 
	this.name=name;      //This is an constructor function,behaves similiar to class 
	this.mileage=mileage;
}

var Innova = new Cars(2017,"innova",12.4); //This are instances
var i20 = new Cars(2015,"i20",21);  // of Constructor function Cars

Innova.parentCompany="Toyota"; //adding property specific to innova
 
console.log(Innova);
console.log(i20);
console.log(i20.mileage);

//Creating prototype to an Const. fxn.

Cars.prototype.getAgeOfCar = function(){
	var d = new Date();
	return d.getFullYear()-this.make; //This function( or method ) will be added to all instances.
	
}

console.log(Innova.getAgeOfCar());
console.log(i20.getAgeOfCar()); 