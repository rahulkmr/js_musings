function mixin(dest) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (!dest[prop]) {
                dest[prop] = source[prop];
            }
        }
    }
}

function Person(firstName, lastName) {
    var createdAt = new Date();

    this.firstName = firstName;
    this.lastName = lastName;

    this.createdAt = function() {
        return createdAt;
    }
}

Person.prototype.getName = function() {
    return this.lastName + ", " + this.firstName;
};

function Serializable() {}
Serializable.prototype = {
    serialize: function() {
        print("Serializing " + this.getName());
    }
}

mixin(Person.prototype, Serializable.prototype);

function User(firstName, lastName, password) {
    this.password = password;
    Person.call(this, firstName, lastName);
}

User.prototype = Object.create(Person.prototype);
User.prototype.getPassword = function() {
    return this.password;
}

User.prototype.getName = function() {
    return Person.prototype.getName.call(this);
};
var Authorizable = {
    authorize: function() {
        print("Authorizing " + this.getName());
    }
}

mixin(User.prototype, Authorizable);

var user = new User("Rahul", "Kumar", "test");
print(user.getName());
print(user.createdAt());
user.serialize();
user.authorize();
