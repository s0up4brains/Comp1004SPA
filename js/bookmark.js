
function bookmarkAdd() { //add bookmarks as JSON in local storage
    const newBookmark = document.getElementById("search-input").value; //Get Location from user input in search bar
    const bookmarArr = { location: newBookmark };
    const myJSON = JSON.stringify(bookmarArr);
    localStorage.setItem(newBookmark, myJSON);

}
function bookmarkLoad(){ //load bookmarks from localstorage and display
    const length = localStorage.length;
    const outputArray = [];
    for (i=0; i < length; i++) {
        const bookmark = localStorage.key(i);
        outputArray.push(bookmark);
    }
    document.getElementById("bookmark-out").innerHTML = "";
    list = document.getElementById("bookmark-out");

    for (i=0; i < outputArray.length; i++){ 
        let li = document.createElement('p'); //create p tag for each bookmark
        li.innerText = outputArray[i];

        (function(index) { //select search saved bookmarks
            li.addEventListener('click', function() {
                let selectedBookmark = outputArray[index];
                let bookmarkSelected = true;
                fetchWeather(selectedBookmark, bookmarkSelected); //fetch saved bookmark weather
            });
        })(i);
        list.appendChild(li);
        
    }

}     

function bookmarkClear(){ //Delete all bookmarks
    localStorage.clear();
}

