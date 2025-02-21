export function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    
    // Check if the input is of correct length
    if (cleaned.length !== 10) {
      return phoneNumberString; // Return as-is if invalid
    }
    
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phoneNumberString;
  }