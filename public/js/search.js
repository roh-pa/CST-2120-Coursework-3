//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    searchResto();
}

//Search for a restaurant
function searchResto() {
    //Create request object
    let request = new XMLHttpRequest();

    let searchInput = document.getElementById("searchResto").value;

    let searchResto = {
        search_Input: searchInput
    }

    request.open("GET", "/searchRestaurant", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(searchResto));
}

//Validate search
function validateSearch(){
    if (document.searchForm.search.value === "") {
        alert("Search field is empty.");
        document.regForm.firstName.focus();
        return false;
    }

}