const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    database: 'tokopedia',
    user: 'postgres',
    password: 'admin',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })


const getAllUsers = (req, res) => {
    pool.query('SELECT * FROM persons WHERE deleted = 1', (err, result) => {
        if(err) {
            throw err
        }

        res.status(200).json({data: result.rows})
    })
}

const getUserById = (req, res) => {
      const id = parseInt(req.params.id)

      const query = {
        // give the query a unique name
        name: 'fetch-persons',
        text: 'SELECT * FROM persons WHERE personid = $1',
        values: [id],
      }

      // callback
    pool.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({data: result.rows[0]})
        }
    })

    //   lakukan query ke database
    // SELECT * FROM persons WHERE id = 2
}

const addUser = (req, res) => {
    const {personid, firstname, lastname, address, city, deleted} = req.body

    const query = {
        // give the query a unique name
        name: 'add-persons',
        text: 'INSERT INTO persons (personid, lastname, firstname, address, city, deleted) VALUES ($1, $2, $3, $4, $5, $6);',
        values: [personid, lastname, firstname, address, city, deleted],
      }

      pool.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({data: result})
        }
    })
}

const deleteUser = (req, res) => {
    // tangkap id
    const id = req.params.id
    // query
    const query = {
        // give the query a unique name
        name: 'delete-persons',
        text: 'DELETE from persons WHERE personid = $1',
        values: [id],
      }

    pool.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({data: result})
        }
    })
      
}




module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser
}
