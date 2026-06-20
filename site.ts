// === add header items ===
// get the header
let mainHeader = document.getElementById("headerItemContainer") as HTMLElement;

// define header items
let headerItems:{
    name: string,
    link: string
}[] = [
    {"name":"list", "link":"lists.html"},
    {"name":"about", "link":"about.html"}
]

// define function to assign to the event listener
let clickFunction = function setHtmlOfID(id:string, headerItem: {name:string, link:string}, column :string){
    let mainContent = document.getElementById(id) as HTMLElement;
    mainContent.innerHTML = "<object data=\"" + headerItem.link + "\"></object>";
    let headerLine = document.getElementById("mainHeaderLine") as HTMLElement;
    headerLine.style.gridColumn = column;
}

// set the header item grid up with the right amount of columns
let headerGrid = document.getElementById("headerItemContainer") as HTMLElement;
let gridPropertiesColumns: string = "";

for(let i =0;i<headerItems.length;i++){
    gridPropertiesColumns += " auto";
}

headerGrid.style.gridTemplateColumns = gridPropertiesColumns;
let gridColumnCounter = 1;

// made the header elements with the links and name from the headerItems list
headerItems.forEach(element => {
    // make a header html and add it to the header
    let html: string = 
    "<a class=\"headerLink\" id=\""+ element.name +"Header\" style=\"cursor: pointer;\">" + element.name + "</a>";
    mainHeader.insertAdjacentHTML("beforeend", html);

    // get the element we just made
    let newHeader = document.getElementById(element.name + "Header") as HTMLAnchorElement;

    // set the column (this is set here and not left as auto so we can set the grid column of the line in the click event)
    newHeader.style.setProperty("grid-column", gridColumnCounter.toString())
    gridColumnCounter += 1;

    // add the click event
    newHeader.addEventListener("click", function(){
        clickFunction("mainContent", element, getComputedStyle(newHeader).gridColumn);
        
    });
});