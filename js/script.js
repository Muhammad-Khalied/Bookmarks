var bookmarkName = document.getElementById('inputName');
var bookmarkUrl = document.getElementById('inputURL');
var submitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById('tableContent');
var bookmarks = [];

displayBookmarks();




function checkInputs(element) {
    if (!isValid(element)) {
        if (element.classList.contains('is-valid')) {
            element.classList.remove('is-valid');
        }
        if (!element.classList.contains('is-invalid')) {
            element.classList.add('is-invalid');
        }
    }
    else {
        if (element.classList.contains('is-invalid')) {
            element.classList.remove('is-invalid');
        }
        if (!element.classList.contains('is-valid')) {
            element.classList.add('is-valid');
        }
    }
    updateBtn();
}


function updateBtn() {
    if (isValid(bookmarkName) && isValid(bookmarkUrl)) {
        if (submitBtn.hasAttribute('data-bs-target')) {
            submitBtn.removeAttribute('data-bs-target', '#modal');
        }
        if (submitBtn.hasAttribute('data-bs-toggle')) {
            submitBtn.removeAttribute('data-bs-toggle', 'modal');
        }
        if (!submitBtn.hasAttribute('onclick')) {
            submitBtn.setAttribute('onclick', 'addBookmark()');
        }
    }
    else {
        if (!submitBtn.hasAttribute('data-bs-target')) {
            submitBtn.setAttribute('data-bs-target', '#modal');
        }
        if (!submitBtn.hasAttribute('data-bs-toggle')) {
            submitBtn.setAttribute('data-bs-toggle', 'modal');
        }
        if (submitBtn.hasAttribute('onclick')) {
            submitBtn.removeAttribute('onclick', 'addBookmark()');
        }
    }
}

function isValid(element) {
    var regex = {
        inputName: /^[a-zA-Z0-9]{3,30}$/,
        inputURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

    return regex[element.id].test(element.value)
}


function addBookmark() {
    var bookmark = {
        name: '',
        url: ''
    }
    bookmark.name = bookmarkName.value;
    bookmark.url = bookmarkUrl.value;
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    clearInputs();
    displayBookmarks();
    updateBtn();
}


function clearInputs() {
    bookmarkName.value = '';
    bookmarkUrl.value = '';
    bookmarkName.classList.remove('is-valid');
    bookmarkUrl.classList.remove('is-valid');
}


function displayBookmarks() {
    const storedItemsString = localStorage.getItem('bookmarks');
    if (storedItemsString !== null) {
        bookmarks = JSON.parse(storedItemsString);
    }
    if (bookmarks) {
        tableContent.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            tableContent.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                <td><button class="btn btn-delete" onclick="deleteBookmark(${index})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
            `;
        })
    }
}


function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}
