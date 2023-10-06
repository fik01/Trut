class User{
    userId = ''
    username = ''
    email = ''
    password = ''
    apiUrl = 'https://6507f25e56db83a34d9b7ccd.mockapi.io'

    create() {
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        data = JSON.stringify(data) /* pretvaramo u JSON */

        fetch(this.apiUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: data
        })
        .then(response => response.json())
        .then(data => {    

                let session = new Session()
                session.userId = data.id
                session.startSession()
                window.location.href = 'trut.html'                
        })
    }

    async get(userId) { //asinhrono
        let apiUrl = this.apiUrl + '/users/' + userId

        let response = await fetch(apiUrl)
        let data = await response.json()
        
        return data    
    }

    edit() {
        let data = {
            username: this.username,
            email: this.email    
        } 

        data = JSON.stringify(data)

        let session = new Session()
        sessionId = session.getSession()

        fetch(this.apiUrl + '/users/' + sessionId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },        
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'trut.html'
        })
    }

    login() {
        fetch(this.apiUrl + '/users')
        .then(response => response.json())
        .then(data => {

            let loginSuccessful = 0
            data.forEach(db_user => { //morala je arrow f-ja, da bi se ocuvalo this
                if(db_user.email === this.email && db_user.password === this.password) {
                    let session = new Session()
                    session.userId = db_user.id
                    session.startSession()
                    loginSuccessful = 1
                    window.location.href = 'trut.html'                               
                } 
            })

            if(loginSuccessful === 0) {
                alert('Wrong credentials')
            }
        })
    }

    delete() {
        let session = new Session()
        sessionId = session.getSession()

        fetch(this.apiUrl + '/users/' + sessionId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session()
            session.destroySession()
            window.location.href = "/"
        })
    }    
}