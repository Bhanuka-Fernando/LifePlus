// /subjects/userRegistrationSubject.js
class UserRegistrationSubject {
    constructor() {
      this.observers = [];
    }
  
    // Method to register observers
    registerObserver(observer) {
      this.observers.push(observer);
    }
  
    // Method to remove observers
    removeObserver(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    // Notify all observers when a user registers
    notifyObservers(user) {
      this.observers.forEach(observer => observer.update(user));
    }
  }
  
  module.exports = UserRegistrationSubject;
  