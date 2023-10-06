class Post{
    postId = ''
    postContent = ''
    userId = ''
    likes = ''
    apiUrl = 'https://6507f25e56db83a34d9b7ccd.mockapi.io'

    async create() {
        let session = new Session()
        sessionId = session.getSession()

        let data = {       
                user_id: sessionId,
                post_content: this.postContent,
                likes: 0     
        }

        data = JSON.stringify(data)

        let response = await fetch(this.apiUrl + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        data = await response.json()
        return data
    }

    async getAll() {
        let response = await fetch(this.apiUrl + '/posts')
        let data = await response.json()
        return data
    }

    like(postId, likes) {
        let data = {
            likes: likes
        }

        data = JSON.stringify(data)

        fetch(this.apiUrl + '/posts/' + postId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {alert('Post liked')})
    }

    delete(postId) {
        fetch(this.apiUrl + '/posts/' + postId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {alert('Post deleted')})
    }
}