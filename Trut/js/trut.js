let session = new Session()
sessionId = session.getSession()

if(sessionId !== "") {
    async function populateUserData() {
        let user = new User()
        user = await user.get(sessionId)

        document.querySelector('#username').innerText = user['username']
        document.querySelector('#email').innerText = user['email'] 

        document.querySelector('#editUsername').value = user['username']
        document.querySelector('#editEmail').value = user['email'] 
    }
    populateUserData()
    
} else {
    window.location.href = "/"
}

let logOut = document.querySelector('#logOut')

logOut.addEventListener("click", function(event) {
    event.preventDefault()
    session.destroySession()
    window.location.href = '/'
})

let editAccount = document.querySelector('#editAccount')

editAccount.addEventListener("click", function() {
    document.querySelector('.custom-modal').style.display = 'block'
})

let closeModal = document.querySelector('#closeModal')

closeModal.addEventListener("click", function() {
    document.querySelector('.custom-modal').style.display = 'none'
})

let editForm = document.querySelector('#editForm')

editForm.addEventListener("submit", function(event) {
    event.preventDefault()

    let user = new User()
    user.username = document.querySelector('#editUsername').value
    user.email = document.querySelector('#editEmail').value
    user.edit()
})

let deleteProfile = document.querySelector('#deleteProfile')

deleteProfile.addEventListener("click", function(event) {
    event.preventDefault()

    let text = 'Are you sure?'

    if(confirm(text) === true) {
        let user = new User()
        user.delete()
    }
})

document.querySelector('#postForm').addEventListener("submit", event => { // mora opet arrow
    event.preventDefault()

    async function createPost() {
        let content = document.querySelector('#postContent').value
        document.querySelector('#postContent').value = ''
        let post = new Post()
        post.postContent = content
        post = await post.create()

        let currentUser = new User()
        currentUser = await currentUser.get(sessionId)
        
        let deletePostHtml = ''
        if(sessionId === post.user_id) { 
            deletePostHtml = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
        }

        let html = document.querySelector('#allPostsWrapper').innerHTML
        document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.post_content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Autor: </b>${currentUser.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> likes</button>
                                                                            ${deletePostHtml}
                                                                        </div>
                                                                    </div>
                                                                </div>` + html
    }
    createPost()
})

function removeMyPost(btn) {
    let postId = btn.closest('.single-post').getAttribute('data-post_id')
    btn.closest('.single-post').remove()

    let post = new Post()
    post.delete(postId)
}

function likePost(btn) {
    let mainPostEl = btn.closest('.single-post')
    let postId = btn.closest('.single-post').getAttribute('data-post_id')
    let numOfLikes = parseInt(btn.querySelector('span').innerText)

    btn.querySelector('span').innerText = numOfLikes + 1
    btn.setAttribute('disabled', 'true')

    let post = new Post()
    post.like(postId, numOfLikes + 1)
}

async function getAllPosts() {
    let allPosts = new Post()
    allPosts = await allPosts.getAll()

    allPosts.forEach(function(post) {
        async function getPostUser() {
            let user = new User()
            user = await user.get(post.user_id)

            let deletePostHtml = ''
            if(sessionId === post.user_id) {
                deletePostHtml = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
            }

            let html = document.querySelector('#allPostsWrapper').innerHTML
            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.post_content}</div>

                                                                        <div class="post-actions">
                                                                            <p><b>Autor: </b>${user.username}</p>
                                                                            <div>
                                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> likes</button>
                                                                                ${deletePostHtml}
                                                                            </div>
                                                                        </div>
                                                                    </div>` + html
        }
        getPostUser()
    })
}

getAllPosts()
