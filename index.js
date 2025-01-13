this.addEventListener('DOMContentLoaded', function () {
    function getElementById(id) {
        var element = document.getElementById(id);
        if (!element) {
            throw new Error("".concat(id, " Element is Noting"));
        }
        return element;
    }
    function getElementsByClassName(className) {
        var element = document.getElementsByClassName(className);
        if (!element) {
            throw new Error("".concat(className, " Element is Noting"));
        }
        return Array.from(element);
    }
    //upload element
    var uploadElement = getElementById('upload');
    var imageElement = getElementById('profile-img');
    var imagePreviewElement = getElementById('imagePreview');
    var uploadModalElement = getElementById('uploadModal');
    var updateElement = getElementById('update-profile-btn');
    var saveElement = getElementById('save');
    var closeElement = getElementById('close');
    //modal element
    var modalIdElement = getElementById('id');
    var modalNameElement = getElementById('name');
    var modalWebsiteElement = getElementById('website');
    var modalProfileIdxElement = getElementById('profileIdx');
    //update element
    var updateIdElement = getElementById('profile-id');
    var updateNameElemnet = getElementById('profile-name');
    var updateDescriptionElement = getElementById('profile-description');
    var updateWebsiteElement = getElementById('profile-website');
    //post element
    var postBtnElement = getElementById('postBtn');
    var postModalElement = getElementById('postModal');
    var postUploadElement = getElementById('postUpload');
    var postImgElement = getElementById('postImg');
    var postPreviewImgElement = getElementById('postImagePreview');
    var postTextElement = getElementById('postText');
    var shareBtnElement = getElementById('share');
    var postModalPageElement = getElementById('PostModalPage');
    var postGalleryElement = getElementsByClassName('posts__gallery');
    var postGetElement = getElementById('postGet');
    var postUploadBtnElement = getElementById('postUploadBtn');
    var close2Element = getElementById('close2');
    //profile img fuc
    //profile img local load
    var loadImgToLocal = function () {
        var image = localStorage.getItem('image');
        if (image) {
            imageElement.src = image;
            imagePreviewElement.src = image;
        }
    };
    //profile img local save
    var saveImgToLocal = function (data) {
        localStorage.setItem('image', data);
        imageElement.src = data;
    };
    //profile defalut value
    var loadDefalutValue = function () {
        modalIdElement.value = updateIdElement.textContent;
        modalNameElement.value = updateNameElemnet.textContent;
        modalWebsiteElement.value = updateWebsiteElement.textContent;
        modalProfileIdxElement.value = updateDescriptionElement.textContent;
    };
    //profile index local load
    var loadProfileToLocal = function () {
        var profileData = JSON.parse(localStorage.getItem('profileData'));
        if (profileData) {
            updateIdElement.textContent = profileData.id || "";
            updateNameElemnet.textContent = profileData.name || "";
            updateWebsiteElement.textContent = profileData.website || "";
            updateDescriptionElement.textContent = profileData.description || "";
            modalIdElement.value = profileData.id || "";
            modalNameElement.value = profileData.name || "";
            modalWebsiteElement.value = profileData.website || "";
            modalProfileIdxElement.value = profileData.description || "";
        }
    };
    //profile index local save
    var saveProfileToLocal = function () {
        var profileData = {
            id: modalIdElement.value,
            name: modalNameElement.value,
            website: modalWebsiteElement.value,
            description: modalProfileIdxElement.value
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
    };
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
    saveElement.addEventListener('click', function () {
        saveImgToLocal(imagePreviewElement.src);
        saveProfileToLocal();
        uploadElement.close();
    });
    //profile modal close
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
    //postModal
    //post img local load
    var postLoadImgToLocal = function () {
        var image = localStorage.getItem('image');
        if (image) {
            postImgElement.src = image;
            postPreviewImgElement.src = image;
        }
    };
    //post img local save
    var postSaveImgToLocal = function (data) {
        localStorage.setItem('image', data);
        postImgElement.src = data;
    };
    //post create
    var createPost = function (image, text) {
        var posts = JSON.parse(localStorage.getItem("posts")) || [];
        var newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            image: image,
            text: text,
            likes: 0,
            comments: 0
        };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    };
    //postModal event
    postBtnElement.addEventListener('click', function () {
        var showModalopen = true;
        if (showModalopen) {
            postGetElement.style.display = 'none';
            shareBtnElement.style.display = 'none';
            postModalPageElement.style.display = 'block';
            postModalElement.showModal();
        }
        else {
            postGetElement.style.display = 'block';
            shareBtnElement.style.display = 'block';
            postModalPageElement.style.display = 'none';
            postModalElement.close();
        }
    });
    //postmodal label click -> postupload click
    postUploadElement.addEventListener('click', function () {
        postUploadElement.click();
    });
    //postmodal close
    //esc close
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            postModalElement.close();
        }
    });
    //button close
    close2Element.addEventListener('click', function () {
        postModalElement.close();
    });
    //load
    loadImgToLocal();
    loadProfileToLocal();
    postLoadImgToLocal();
});
