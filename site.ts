// get url
let url = new URL(window.location.href);
let page = url.searchParams.get('page');

// === add header items ===

// get the header
let mainHeader = document.getElementById("headerItemContainer") as HTMLElement;

// variable to track the selected header
let selectedHeaderItem: HTMLElement;

// define header items
let headerItemsTemplates:{
    name: string,
    link: string
}[] = [
    {"name":"projects", "link":"lists.html"},
    {"name":"blog", "link":"blog.html"},
    {"name":"about", "link":"about.html"}
]

// array for the HTML elements that will be made from the templates
let headerElements:{
    name: string,
    element: HTMLElement
}[] = [];

// define function to assign to the event listener
let clickFunction = function setHtmlOfID(id:string, headerItem: {name:string, link:string}, column :string){

    let mainContent = document.getElementById(id) as HTMLElement;
    mainContent.innerHTML = "<object class=\"contentObject\" data=\"" + headerItem.link + "\"></object>";
    let headerLine = document.getElementById("headerLine") as HTMLElement;

    animateFollowLine(headerLine, column);

    // set the url arguments
    page = headerItem.name;
    url.searchParams.set('page', page);
    // history.replaceState(history.state, '', url.href);
    history.pushState({name:page}, '', url.href);
    
}

// function to animate the line below the headers moving in between grid cells
function animateFollowLine(line: HTMLElement, column: string){
    
    // get the starting position
    const { top: top1, left: left1} = line.getBoundingClientRect();
    let startingColumn = getComputedStyle(line).gridColumn;

    // snap the line to the target grid column and get it's position
    line.style.gridColumn = column;
    const {top: top2, left: left2} = line.getBoundingClientRect();
    // put the line back to where it was
    line.style.gridColumn = startingColumn;
    
    line.style.transition = "0.25s";

    // animate from the starting to the ending

    // set a timer to *actually* move the line as soon as the amination is finished
    setTimeout(() => {
        line.style.transition = "auto";
        line.style.gridColumn = column;
        line.style.top = "0px";
        line.style.left = "0px";
    },
    250)

    // animate the line moving
    line.style.left = (left2 - left1) + 'px';
    line.style.top = (top2 - top1) + 'px';
}

// function to load page
function loadPage(){

    // get url
    url = new URL(window.location.href);
    page = url.searchParams.get('page');

    // if the url has a page argument, set that
    if(page != ''){
        // find the right header
        headerElements.forEach(element => {
            if(element.name == page){
                selectedHeaderItem = element.element;
                return;
            }
            })
        }

    // select the right page
    selectedHeaderItem.click();

}

// set the header item grid up with the right amount of columns
let headerGrid = document.getElementById("headerItemContainer") as HTMLElement;
let gridPropertiesColumns: string = "";

// make the 'grid-template-columns for the 
for(let i =0;i<headerItemsTemplates.length;i++){
    gridPropertiesColumns += " auto";
}

headerGrid.style.gridTemplateColumns = gridPropertiesColumns;
let gridColumnCounter = 1;

// made the header elements with the links and name from the headerItems list
headerItemsTemplates.forEach(element => {
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
        selectedHeaderItem = newHeader;
    });

    headerElements.push({"name":element.name, "element":newHeader});
});

// default assignment
selectedHeaderItem = headerElements[0].element;
window.addEventListener('popstate', loadPage);
loadPage();