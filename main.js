// DOM Elements
const elements = {

    title: document.getElementById('title'),
    price: document.getElementById('price'),
    taxes: document.getElementById('taxes'),
    ads: document.getElementById('ads'),
    discount: document.getElementById('discount'),
    total: document.getElementById('total'),
    count: document.getElementById('count'),
    category: document.getElementById('category'),
    submit: document.getElementById('submit'),
    search: document.getElementById('search'),
    toggle: document.querySelector('.mode'),
    body: document.querySelector('body'),
    
};

// Variables
let mode = 'create';
let darkmode = localStorage.getItem('mode') || '';

// Apply dark mode 
if (darkmode) {
    elements.body.classList.add(`${darkmode}`)   
}

function toggleMode() {
    darkmode = darkmode === 'dark' ? '' : 'dark';
    elements.body.classList.toggle('dark',darkmode === 'dark');
    window.localStorage.setItem('mode', darkmode);
}



// Get total
function getTotal(){
    if(elements.price.value != ''){
        
        let result = (+elements.price.value + +elements.taxes.value + +elements.ads.value) - +elements.discount.value;
        elements.total.innerHTML = result;
        elements.total.style.background ='#1a75ff';
    }else{
        total.innerHTML = '';
        total.style.background ='#4d004d';
    }

}

// Create product

let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)

}else{
    data = [];
}

function handleSubmit() {
    
    const newProduct = {
        title: elements.title.value.toLowerCase(),
        price: elements.price.value,
        taxes: elements.taxes.value,
        ads: elements.ads.value,
        discount: elements.discount.value,
        total: elements.total.innerHTML,
        count: elements.count.value,
        category: elements.category.value.toLowerCase(),
    };

    if (isValidProduct(newProduct)) {
        updateProduct(newProduct);
        clearInputs();
        saveToLocalstorage();
        showData();
        
    } else {
        elements.title.focus();
    }
}

function isValidProduct(product) {
    return product.title !== '' && product.price !== '' && product.category !== '' && product.count < 101;
}

function updateProduct(newProduct) {
    if (mode === 'create') {
        data.push(...Array.from( { length: newProduct.count || 1 }, () => ({ ...newProduct }) ));
    } else {
        
        data[index] = newProduct;
        mode = 'create';
        elements.submit.innerHTML = 'Create';
        elements.count.style.display = 'block';
    }
}

function clearInputs() {
    Object.values(elements).forEach((element) => {
        element.value = '';
    });
}

function saveToLocalstorage() {
    localStorage.setItem('product', JSON.stringify(data));
}

// Read
function showData(){
    getTotal()
    
    let table = '';
    for(let i = 0; i < data.length; i++ ){

        table += `
        <tr>
            <th>${i+1}</th>
            <th>${data[i].title}</th>
            <th>${data[i].price}</th>
            <th>${data[i].taxes}</th>
            <th>${data[i].ads}</th>
            <th>${data[i].discount}</th>
            <th>${data[i].total}</th>
            <th>${data[i].category}</th>
            <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
            <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
        </tr>
        `;      
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllbtn = document.getElementById("delete-all");

    if(data.length > 0 ){
        deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="delete-all" >Delete All (${data.length})</button>`;
    }else {
        deleteAllbtn.innerHTML = '';
    }
}
showData()

// Delete
function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);

    showData()
}

function deleteAll(){
    localStorage.clear()
    data.splice(0)
    showData()
}

// Update
function updateData(i){

    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    category.value = data[i].category;

    getTotal()
    count.style.display='none';
    submit.innerHTML = 'Update';

    mode = 'update';
    index = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//Search
let searchmode = 'title';

function handleSearchInput() {
    searchData(elements.search.value.toLowerCase());
}

function setSearchMode(mode) {
    searchmode = mode;
    elements.search.placeholder = `Search By ${searchmode}`;
    elements.search.focus();
    elements.search.value = '';
    showData();
}

function searchData(value) {
    const filteredData = data.filter(item => {
        return searchmode === 'title' 
            ? item.title.includes(value) 
            : item.category.includes(value);
    });

    const table = filteredData.map((item, i) => `
        <tr>
            <th>${i + 1}</th>
            <th>${item.title}</th>
            <th>${item.price}</th>
            <th>${item.taxes}</th>
            <th>${item.ads}</th>
            <th>${item.discount}</th>
            <th>${item.total}</th>
            <th>${item.category}</th>
            <th> <button onclick="updateData(${i})" id="update">Update</button></th>
            <th> <button onclick="deleteData(${i})" id="delete">Delete</button></th>
        </tr>
    `);

    document.getElementById('tbody').innerHTML = table.join('');
}


// Event listeners
elements.toggle.addEventListener('click', toggleMode);
elements.submit.addEventListener('click', handleSubmit);

elements.search.addEventListener('input', handleSearchInput);
document.getElementById('search-title').addEventListener('click', () => setSearchMode('title'));
document.getElementById('search-category').addEventListener('click', () => setSearchMode('category'));