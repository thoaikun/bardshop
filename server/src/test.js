const bcrypt = require('bcrypt')

bcrypt.hash('Nh1234@', 7)
    .then(hash => console.log(hash))
    .catch(error => console.log(error))