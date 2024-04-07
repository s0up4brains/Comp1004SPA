

function bookmarkAdd() {

    const newBookmark = document.getElementById("search-input").value; //Get Location from user input in search bar
    const bookmarArr = { location: newBookmark };
    const myJSON = JSON.stringify(bookmarArr);
    localStorage.setItem(newBookmark, myJSON);

}

function bookmarkLoad(){

    const length = localStorage.length;
    const outputArray = [];
    for (i=0; i < length; i++) {
        const bookmark = localStorage.key(i);
        outputArray.push(bookmark);
    }

    document.getElementById("bookmark-out").innerHTML = "";
    list = document.getElementById("bookmark-out");
    for (i=0; i < outputArray.length; i++){
        let li = document.createElement('p');
        li.innerText = outputArray[i];
        list.appendChild(li);
        
    }

}           