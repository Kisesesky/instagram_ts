var mainProfile = {
    id: '???',
    img: 'https://elice-contents.github.io/elice-instagram-clone/assets/default_profile.svg',
    name: '???',
    description: 'Hello, World!!!',
    website: 'https://github.com/Kisesesky',
    posts: '2',
    followers: '2',
    follows: '2'
};
this.addEventListener('DOMContentLoaded', function () {
    function getElementById(id) {
        var element = document.getElementById(id);
        if (!element) {
            throw new Error("".concat(id, " element\uAC00 \uC5C6\uC5B4\uC694"));
        }
        return element;
    }
    //upload element
    var uploadElement = getElementById('upload');
    var imageElement = getElementById('profile-img');
    var imagePreviewElement = getElementById('imagePreview');
    var uploadModalElement = getElementById('uploadModal');
    var updateElement = getElementById('update-profile-btn');
    var saveElemnet = getElementById('save');
    var closeElement = getElementById('close');
    //modal element
    var modalIdElement = getElementById('id');
    var modalNameElement = getElementById('name');
    var modalWebsiteElemenet = getElementById('website');
    var modalProfileIdxElement = getElementById('profileIdx');
    //update element
    var updateIdElement = getElementById('profile-id');
    var updateNameElemnet = getElementById('profile-name');
    var updateDescriptionElement = getElementById('profile-description');
    var updateWebsiteElement = getElementById('profile-website');
    //profile img fuc
    //profile img local load
    function loadImgToLocal() {
        var image = localStorage.getItem('image');
        if (image) {
            imageElement.src = image;
            imagePreviewElement.src = image;
        }
    }
    //profile img local save
    function saveImgToLocal(data) {
        localStorage.setItem('image', data);
        imageElement.src = data;
    }
    //profile index fuc
    //profile defalut value
    function loadDefalutValue() {
        modalIdElement.value = updateIdElement.textContent;
        modalNameElement.value = updateNameElemnet.textContent;
        modalWebsiteElemenet.value = updateWebsiteElement.textContent;
        modalProfileIdxElement.value = updateDescriptionElement.textContent;
    }
    //profile index local load
    function loadProfileToLocal() {
        var profileData = JSON.parse(localStorage.getItem('profileData'));
        if (profileData) {
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
        var profileData = {
            id: modalIdElement.value,
            name: modalNameElement.value,
            website: modalWebsiteElemenet.value,
            description: modalProfileIdxElement.value
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }
    //modal
    updateElement.addEventListener('click', function () {
        loadDefalutValue();
        loadProfileToLocal();
        uploadModalElement.showModal();
    });
    imagePreviewElement.addEventListener('click', function () {
        uploadElement.click();
    });
    uploadElement.addEventListener('change', function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var imageData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                imagePreviewElement.src = imageData;
            };
            reader.readAsDataURL(file);
        }
    });
    //modal save
    saveElemnet.addEventListener('click', function () {
        saveImgToLocal(imagePreviewElement.src);
        saveProfileToLocal();
        uploadElement.close();
    });
    //modal close
    //esc close
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            uploadModalElement.close();
        }
    });
    //button close
    closeElement.addEventListener('click', function () {
        uploadModalElement.close();
    });
    //load
    loadImgToLocal();
    loadProfileToLocal();
});
