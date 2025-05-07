export const    checkPasswordStrength = (password) => {

    let strength = 0;
    // length check 
    if( password.length >=8) strength += 1;
    // contains lowercase letters
    if (/[a-z]/.test(password)) strength += 1;
    
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

     // Contains numbers
     if (/[0-9]/.test(password)) strength += 1;
    
     // Contains special characters
     if (/[^A-Za-z0-9]/.test(password)) strength += 1;

     return strength;

     
}

export const generateStrongPassword  =( ) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";


    const allchars = lowercase + uppercase + numbers + specialChars;
    let password = "";

    // Ensure at least one of each type
    password += lowercase[Math.floor(Math.random() *lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // add more random characters to meet length requirement
    for( let i =0 ;i< 8 ; i++){
        password += allchars[Math.floor(Math.random() * allchars.length)];

    }

      // Shuffle the password
      return password.split('').sort(() => 0.5 - Math.random()).join('');
    

}


export const generatePassworSuggestions =( ) => {
    // generate a few Strong password examples 
 
}
