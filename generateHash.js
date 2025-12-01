import bcrypt from "bcryptjs";

const password = "Carpe12345."; 

const hash = bcrypt.hashSync(password, 10); 
console.log("Hash generat:", hash);