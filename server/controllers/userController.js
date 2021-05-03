const mysql = require('mysql');
const router = require('../routes/user');


//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//View users and bots
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
    if (err) throw err;

        //User connection
        connection.query('SELECT * FROM user', (err, user) => {
            connection.release();
            if(err) return console.log(err);
            connection.query('SELECT * FROM bot', (err, bot) => {
                if(err) return console.log(err);
                res.render('home', { 
                    users: user,
                    bots: bot
                });
            });

        });
    });
} 

//find users and bots
exports.find = (req, res) => {

 pool.getConnection((err, connection) => {
    if (err) throw err;

    let searchTerm = req.body.search;

    //User connection
    connection.query('SELECT * FROM user WHERE firs_name LIKE ?', ['%' + searchTerm + '%'], (err, user) => {
        connection.release();
        if(err) return console.log(err);
        connection.query('SELECT * FROM bot WHERE Name LIKE ?', ['%' + searchTerm + '%'], (err, bot) => {
            if(err) return console.log(err);
            res.render('home', { 
                users: user,
                bots: bot
            });
        });
    });
});
}
exports.adduser = (req, res) => {
    res.render('add-user');
}

//add new user
exports.createUser = (req, res) => {

    const { firs_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('INSERT INTO user SET firs_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [firs_name, last_name, email, phone, comments], (err, user) => {
            connection.release();
            if(err) return console.log(err);
            res.render('add-user', { alert: 'User add successfully!'});

        });
    });
}

//add new bot
exports.addbot = (req, res) => {
    res.render('add-bot');

}

exports.createBot= (req, res) => {

    const { ind, Name, comments, status} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('INSERT INTO bot SET ind = ?, Name = ?, comments = ?, status = ?', [ind, Name, comments, status], (err, bot) => {
            connection.release();
            if(err) return console.log(err);
            res.render('add-bot', { alert: 'Bot add successfully!'});
        });
    });
}

//edit user
exports.edituser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, user) => {
            connection.release();
            if(err) return console.log(err);
            res.render('edit-user', { user });

        });
            
    });
}

exports.updateuser = (req, res) => {

    const { firs_name, last_name, email, phone, comments} = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('UPDATE user SET firs_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [firs_name, last_name, email, phone, comments, req.params.id], (err, user) => {
            if(err) return console.log(err);
            pool.getConnection((err, connection) => {
                if (err) throw err;
                //User connection
                connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, user) => {
                    connection.release();
                    if(err) return console.log(err);
                    console.log(user);
                    res.render('edit-user', { user, alert: `${firs_name} has been updated` });
        
                });
                    
            });

            connection.release();
        });
            
    });
}

//edit bot
exports.editbot = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('SELECT * FROM bot WHERE id = ?', [req.params.id], (err, bot) => {
            connection.release();
            if(err) return console.log(err);
            res.render('edit-bot', { bot });

        });
            
    });
}

exports.updatebot = (req, res) => {

    const { ind, Name, comments, status } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        //User connection
        connection.query('UPDATE bot SET ind = ?, Name = ?, comments = ?, status = ? WHERE id = ?', [ind, Name, comments, status, req.params.id], (err, bot) => {
            connection.release();
            if(err) return console.log(err);
            pool.getConnection((err, connection) => {
                if (err) throw err;
                //User connection
                connection.query('SELECT * FROM bot WHERE id = ?', [req.params.id], (err, bot) => {
                    connection.release();
                    if(err) return console.log(err);
                    res.render('edit-bot', { bot, alert: `${Name} has been updated` });
        
                });
                    
            });

        });
            
    });
}

exports.viewuser = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
    
        //User connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, user) => {
            connection.release();
            if(err) return console.log(err);
            res.render('view-user', { user });

        });
    });
}


exports.viewbot = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
    
        //User connection
        connection.query('SELECT * FROM bot WHERE id = ?', [req.params.id], (err, bot) => {
            connection.release();
            if(err) return console.log(err);
            res.render('view-bot', { bot });

        });
    });
}