class LocalStorageUtil{
    static set<T>(key: string, value:T): void{
        localStorage.setItem(key, JSON.stringify(value))
    }
    static get<T>(key: string): T | null{
        const value = localStorage.getItem(key);
        if(!value) return null
        return JSON.parse(value) as T
    }
}

this.addEventListener('DOMContentLoaded', ()=>{

    function getElementById<T extends HTMLElement>(id: string):T{
        const element = document.getElementById(id);
        if(!element){
            throw new Error(`${id} Element is Noting`)
        }
        return element as T
    }

    function getElementsByClassName<T extends HTMLElement>(className: string):T[] {
        const element = document.getElementsByClassName(className);
            if(!element){
                throw new Error(`${className} Element is Noting`)
            }
        return Array.from(element) as T[];
    }

    function querySelector<T extends HTMLDivElement>(selectors: string):T{
        const element = document.querySelector(selectors);
        if(!element){
            throw new Error(`${selectors} Element is Noting`)
        }
        return element as T
    }

    //upload element
    const uploadElement = getElementById<HTMLDialogElement>('upload') 
    const imageElement = getElementById<HTMLImageElement>('profile-img') 
    const imagePreviewElement = getElementById<HTMLImageElement>('imagePreview') 
    const uploadModalElement = getElementById<HTMLDialogElement>('uploadModal') 
    const updateElement= getElementById<HTMLButtonElement>('update-profile-btn') 
    const saveElement = getElementById<HTMLButtonElement>('save')
    const closeElement = getElementById<HTMLElement>('close')

    //modal element
    const modalIdElement = getElementById<HTMLInputElement>('id') 
    const modalNameElement = getElementById<HTMLInputElement>('name')
    const modalWebsiteElement = getElementById<HTMLInputElement>('website')
    const modalProfileIdxElement = getElementById<HTMLInputElement>('profileIdx') 

    //update element
    const updateIdElement = getElementById<HTMLElement>('profile-id')
    const updateNameElemnet = getElementById<HTMLElement>('profile-name')
    const updateDescriptionElement = getElementById<HTMLElement>('profile-description')
    const updateWebsiteElement = getElementById<HTMLElement>('profile-website')

    //post element
    const postBtnElement = getElementById<HTMLButtonElement>('postBtn')
    const postModalElement = getElementById<HTMLDialogElement>('postModal')
    const postUploadElement = getElementById<HTMLElement>('postUpload')
    const postImgElement = getElementById<HTMLImageElement>('postImg')
    const postPreviewImgElement = getElementById<HTMLImageElement>('postImagePreview')
    const postTextElement = getElementById<HTMLTextAreaElement>('postText')
    const shareBtnElement = getElementById<HTMLButtonElement>('share')
    const postModalPageElement = getElementById<HTMLElement>('PostModalPage')
    const postGalleryElement = getElementsByClassName<HTMLElement>('posts__gallery')
    const postGetElement = getElementById<HTMLElement>('postGet')
    const postUploadBtnElement = getElementById<HTMLButtonElement>('postUploadBtn')
    const close2Element = getElementById<HTMLElement>('close2')


    //profile img fuc
    //profile img local load
    const loadImgToLocal = (): void =>{
        const image = localStorage.getItem('image');
        if(image){
            imageElement.src = image;
            imagePreviewElement.src = image;
        }
    }
    //profile img local save
    const saveImgToLocal =(data:string):void => {
        localStorage.setItem('image', data)
        imageElement.src=data;
    }

    //profile index fuc
    //profile interface
    interface ProfileData {
        id: string,
        name: string,
        website?: string,
        description?: string
    }


    //profile defalut value
    const loadDefalutValue = (): void =>{
        modalIdElement.value = updateIdElement.textContent;
        modalNameElement.value = updateNameElemnet.textContent;
        modalWebsiteElement.value = updateWebsiteElement.textContent;
        modalProfileIdxElement.value = updateDescriptionElement.textContent;
    }

    //profile index local load
    const loadProfileToLocal = (): void =>{
        const profileData = JSON.parse(localStorage.getItem('profileData'))
        if(profileData){
           
            updateIdElement.textContent = profileData.id || "";
            updateNameElemnet.textContent = profileData.name || "";
            updateWebsiteElement.textContent = profileData.website || "";
            updateDescriptionElement.textContent = profileData.description || "";

            modalIdElement.value = profileData.id || "";
            modalNameElement.value = profileData.name || "";
            modalWebsiteElement.value = profileData.website || "";
            modalProfileIdxElement.value = profileData.description || "";
        }
    }

    //profile index local save
    const saveProfileToLocal = (): void => {
        const profileData:ProfileData = {
            id: modalIdElement.value,
            name: modalNameElement.value,
            website: modalWebsiteElement.value,
            description: modalProfileIdxElement.value
        };
        localStorage.setItem('profileData',JSON.stringify(profileData))
    }


    //modal
    updateElement.addEventListener('click', ()=>{
        loadDefalutValue();
        loadProfileToLocal();
        uploadModalElement.showModal();
    })
    imagePreviewElement.addEventListener('click', ()=>{
        uploadElement.click();
    })
    uploadElement.addEventListener('change',(e) =>{
        const file = (e.target as HTMLInputElement).files?.[0];
        if(file){
            const reader = new FileReader()
            reader.onload = function(e){
                const imageData = (e.target?.result as string);
                imagePreviewElement.src = imageData
            }
            reader.readAsDataURL(file)
        }
    })

    //modal save
    saveElement.addEventListener('click', ()=>{
            saveImgToLocal(imagePreviewElement.src);
            saveProfileToLocal();
            uploadElement.close()
    })


    //profile modal close
    //esc close
    window.addEventListener('keydown',(e) => {
        if(e.key === 'Escape'){
            uploadModalElement.close()
        }
    })
    //button close
    closeElement.addEventListener('click', () => {
        uploadModalElement.close()
    })

    //postModal
    //post img local load
     const postLoadImgToLocal = (): void =>{
        const image = localStorage.getItem('image');
        if(image){
            postImgElement.src = image;
            postPreviewImgElement.src = image;
        }
    }
    //post img local save
    const postSaveImgToLocal =(data:string):void => {
        localStorage.setItem('image', data)
        postImgElement.src=data;
    }
    interface Post{
        id:number;
        image:string;
        text:string;
        likes:number;
        comments:number;
    }
    
    //post create
    const createPost = (image:string, text:string):void =>{
        const posts:Post[] = JSON.parse(localStorage.getItem("posts")) || [];
        const newPost:Post ={
            id: posts.length ? posts[posts.length -1].id +1 : 1,
            image,
            text,
            likes:0,
            comments:0
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

    }
    const udatePostUI = ():void =>{
        const posts:Post[] = JSON.parse(localStorage.getItem('posts')) || [];
        const postsGallery = querySelector<HTMLDivElement>('posts__gallery')

        postsGallery.innerHTML = "";

        if(posts.length === 0){
            postsGallery.style.display = 'flex';
            postsGallery.innerHTML = 
            `<div class="posts_item">
                <div class="posts_img">
                    <img src="https://elice-contents.github.io/elice-instagram-clone/assets/camera_icon.svg" alt="camera">
                </div>
                <h3>게시물 없음</h3>
            </div>`;
            return
        }
    }

    

    //postdelete
    const deletePost = (id: string):void =>{
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.filter((post) => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        udatePostUI();
    }
    


    //postModal event
    postBtnElement.addEventListener('click', ()=>{
        const showModalopen = true;
        if(showModalopen){
            postGetElement.style.display = 'none';
            shareBtnElement.style.display = 'none';
            postModalPageElement.style.display = 'block';
            postModalElement.showModal();
        } else{
            postGetElement.style.display = 'block';
            shareBtnElement.style.display = 'block';
            postModalPageElement.style.display = 'none';
            postModalElement.close();
        }
    })
    //postmodal label click -> postupload click
    postUploadElement.addEventListener('click', ()=>{
        postUploadElement.click();
    })

    //postmodal close
    //esc close
    window.addEventListener('keydown',(e) => {
        if(e.key === 'Escape'){
            postModalElement.close()
        }
    })
    //button close
    close2Element.addEventListener('click', () => {
        postModalElement.close()
    })
    //share
    shareBtnElement.addEventListener('click', ()=> {
        const imageData = postPreviewImgElement.src;
        const textdata = postTextElement.value;
        if(imageData && textdata){
            createPost(imageData, textdata);
        }
        postModalElement.close()
    })



    //load
    loadImgToLocal();
    loadProfileToLocal();
    postLoadImgToLocal();
    udatePostUI();
})
