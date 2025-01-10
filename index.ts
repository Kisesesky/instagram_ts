const mainProfile = {
    id: '???',
    img: 'https://elice-contents.github.io/elice-instagram-clone/assets/default_profile.svg',
    name: '???',
    description: 'Hello, World!!!',
    website: 'https://github.com/Kisesesky',
    posts:'2',
    followers:'2',
    follows:'2'
}


this.addEventListener('DOMContentLoaded', ()=>{

    function getElementById<T extends HTMLElement>(id: string):T{
        const element = document.getElementById(id);
        if(!element){
            throw new Error(`${id} element is Noting`)
        }
        return element as T
    }

    //upload element
    const uploadElement = getElementById<HTMLDialogElement>('upload') 
    const imageElement = getElementById<HTMLImageElement>('profile-img') 
    const imagePreviewElement = getElementById<HTMLImageElement>('imagePreview') 
    const uploadModalElement = getElementById<HTMLDialogElement>('uploadModal') 
    const updateElement= getElementById<HTMLButtonElement>('update-profile-btn') 
    const saveElemnet = getElementById<HTMLButtonElement>('save')
    const closeElement = getElementById<HTMLElement>('close')

    //modal element
    const modalIdElement = getElementById<HTMLInputElement>('id') 
    const modalNameElement = getElementById<HTMLInputElement>('name')
    const modalWebsiteElemenet = getElementById<HTMLInputElement>('website')
    const modalProfileIdxElement = getElementById<HTMLInputElement>('profileIdx') 

    //update element
    const updateIdElement = getElementById<HTMLElement>('profile-id')
    const updateNameElemnet = getElementById<HTMLElement>('profile-name')
    const updateDescriptionElement = getElementById<HTMLElement>('profile-description')
    const updateWebsiteElement = getElementById<HTMLElement>('profile-website')

    //profile img fuc
    //profile img local load
    function loadImgToLocal(){
        const image = localStorage.getItem('image');
        if(image){
            imageElement.src = image;
            imagePreviewElement.src = image;
        }
    }
    //profile img local save
    function saveImgToLocal(data:string) {
        localStorage.setItem('image', data)
        imageElement.src=data;
    }

    //profile index fuc
    //profile interface
    interface ProfileData {
        id: string,
        name: string,
        website: string,
        description: string
    }


    //profile defalut value
    function loadDefalutValue(){
        modalIdElement.value = updateIdElement.textContent;
        modalNameElement.value = updateNameElemnet.textContent;
        modalWebsiteElemenet.value = updateWebsiteElement.textContent;
        modalProfileIdxElement.value = updateDescriptionElement.textContent;
    }

    //profile index local load
    function loadProfileToLocal(){
        const profileData = JSON.parse(localStorage.getItem('profileData'))
        if(profileData){
           
            updateIdElement.textContent = profileData.id || "";
            updateNameElemnet.textContent = profileData.name || "";
            updateWebsiteElement.textContent = profileData.website || "";
            updateDescriptionElement.textContent = profileData.description || "";

            modalIdElement.value = profileData.id || "";
            modalNameElement.value = profileData.name || "";
            modalWebsiteElemenet.value = profileData.website || "";
            modalProfileIdxElement.value = profileData.description || "";
        }
    }

    //profile index local save
    function saveProfileToLocal() {
        const profileData:ProfileData = {
            id: modalIdElement.value,
            name: modalNameElement.value,
            website: modalWebsiteElemenet.value,
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
    saveElemnet.addEventListener('click', ()=>{
            saveImgToLocal(imagePreviewElement.src);
            saveProfileToLocal();
            uploadElement.close()
    })


    //modal close
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


    //load
    loadImgToLocal();
    loadProfileToLocal();
})
