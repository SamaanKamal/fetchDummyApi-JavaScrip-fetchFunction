const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const buttonSection = document.querySelector('#available-posts button');
const postList= document.querySelector('ul');


function SendHttpRequest (method, url,data) {
    // const promise = new Promise((resolve , reject) => {
    //     const xhr = new XMLHttpRequest();

    //     xhr.open(method,url);
        
    //     xhr.responseType = 'json';
        
        
    //     xhr.onload =function() {
    //         if(xhr.status>=200 && xhr.status<300)
    //         {
    //             resolve(xhr.response);
    //         }
    //         else      
    //         {
    //             reject(new Error('Something Went Wrong'));
    //         }
    //     }
    //     xhr.onerror = function(){
    //         reject(new Error('Failed to send Request'));
    //     }
    //     xhr.send(JSON.stringify(data));
    // });
    

    // return promise;

    return fetch(url,{
        method:method,
        body: JSON.stringify(data)
    }).then((response)=>{
        return response.json();
    });
}

async function fetchPosts (){
    // try{
        const response = await SendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts');
        const listPosts =response;
        for(const post of listPosts)
        {
            const postEl = document.importNode(postTemplate.content,true);
            postEl.querySelector('h2').textContent =post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    // }
    // catch(error)
    // {
    //     alert(error.message); 
    // }
}

async function createPost(title,body){
    const data ={
        userId: Math.random(),
        title:title,
        body:body
    }

    SendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',data);


}


async function deletePost(id){
    SendHttpRequest('DELETE','https://jsonplaceholder.typicode.com/posts' +'/'+id);
}

buttonSection.addEventListener('click',fetchPosts);
form.addEventListener('submit',(event)=>{ 
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value; 
    
    createPost(enteredTitle,enteredContent); 
});

postList.addEventListener('click',(event)=>{
    if(event.target.tagName === 'BUTTON')
    {
        const postID = event.target.closest('li').id;
        deletePost(postID);
    }
});

