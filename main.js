let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let search = document.getElementById('search');
let mood = 'create';
let tmp;


// Light & Dark Mood

let darkMood = 'light'

let toggle = document.querySelector('.mood');
let body = document.querySelector('body')
let inputs= [title, price,  taxes, ads, discount, total, count, category ,search]
let darkBtns = document.getElementsByTagName("button")
// console.log(darkBtns);

if (localStorage.getItem('mood') ) {
    darkMood = localStorage.getItem('mood')

    if(darkMood == 'dark'){

        toggle.classList.add('active')
        toggle.classList.remove('light')
        //add Dark mood to body
        body.classList.add('active')
        //add Dark mood to inputs
        inputs.forEach((input)=>{
        input.classList.add('active')
        })
        //add Dark mood to btns
        for (let i = 0; i < darkBtns.length; i++) {
        let button = darkBtns[i];
        button.classList.add('dark')
        }
    }else{
        toggle.classList.remove('active')
        //Remove Dark mood to body
        body.classList.remove('active')
        //Remove Dark mood to inputs
        inputs.forEach((input)=>{
        input.classList.remove('active')
        })
        //Remove Dark mood to btns
        for (let i = 0; i < darkBtns.length; i++) {
        let button = darkBtns[i];
        button.classList.remove('dark')
        }
    }
    
    
}



// let darkMood = 'light'

function toggleMoode (){

        if (darkMood == 'light') {
            darkMood = 'dark'
            
        } else {
            darkMood = 'light'
            
        }

        toggle.classList.toggle('active')
        toggle.classList.toggle('light')
        //Toggle Dark mood to body
        body.classList.toggle('active')
        //Toggle Dark mood to inputs
        inputs.forEach((input)=>{
            input.classList.toggle('active')
        })
        //Toggle Dark mood to btns
        for (let i = 0; i < darkBtns.length; i++) {
            let button = darkBtns[i];
            button.classList.toggle('dark')
            
        }
    
        window.localStorage.setItem('mood', darkMood)
    }  

toggle.addEventListener('click', toggleMoode)


// get total
function getTotal(){
    if(price.value != ''){
        
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#1a75ff';
    }else{
        total.innerHTML = '';
        total.style.background ='#4d004d';
    }

}

// create product

let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)

}else{
    data = [];
}

submit.onclick = function(){
    let newProduct ={
        title: title.value.toLowerCase() ,
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value ,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // clean data
    if (title.value != ''
        && price.value != '' 
        && category.value != ''
        && count.value < 101){
        if ( mood === 'create'){
            if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                data.push(newProduct);
            }    
            }else{
                data.push(newProduct);
            }
        }else{
            data[ tmp ] = newProduct ;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        
        }
        clearData()
    }else{
        
        title.focus()    
    }
    
    // save localstorge

    localStorage.setItem('product', JSON.stringify(data))
    
    
    showData()
}

// clearinputs
function clearData(){

    inputs.forEach((e)=>{
        e.value = '';
    })
}

// read




function showData(){
    getTotal()
    
    let table = '';
    for(let i = 0; i < data.length; i++ ){
        if( darkMood === 'dark'){
            
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
                        <th> <button onclick="updateData(${i})" id="update" class= "dark">Uptdate </button></th>
                        <th> <button onclick="deleteData(${i} )" id="delete" class = "dark">Delete</button></th>
                    </tr>
                    `;
        }else{
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
                <th> <button onclick="updateData(${i})" id="update" >Uptdate </button></th>
                <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
                </tr>
                `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllbtn = document.getElementById("delete-all");
    if(data.length > 0 ){
        if (darkMood === 'dark') {        
            deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="delete-all" class ="dark" >Delete All (${data.length})</button>`;
        }else{
            deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="delete-all" >Delete All (${data.length})</button>`;
        }
    
    }else {
        deleteAllbtn.innerHTML = '';
    }
}
showData()

// delete
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


// update

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

    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    
}

//search

let searchMood = 'title';

function getShearcgMood(id){
    

    if(id == 'search-title' ){
        searchMood = 'title';
        
    }else{
        searchMood = 'category';
    }
    search.placeholder = `Search By  ${searchMood}`;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
    
    let table ='';
    for(let i = 0; i < data.length; i++){
        if (searchMood == 'title'){
        
            if(data[i].title.includes(value.toLowerCase() ) ){
                
                if( darkMood === 'dark'){
            
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
                        <th> <button onclick="updateData(${i})" id="update" class= "dark">Uptdate </button></th>
                        <th> <button onclick="deleteData(${i} )" id="delete" class = "dark">Delete</button></th>
                        </tr>
                        `;
                }else{
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
                        <th> <button onclick="updateData(${i})" id="update" >Uptdate </button></th>
                        <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
                        </tr>
                        `;
                }
            
            }


        }else{ 
            if(data[i].category.includes(value.toLowerCase() ) ){
            
                if( darkMood === 'dark'){
            
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
                        <th> <button onclick="updateData(${i})" id="update" class= "dark">Uptdate </button></th>
                        <th> <button onclick="deleteData(${i} )" id="delete" class = "dark">Delete</button></th>
                        </tr>
                        `;
                }else{
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
                        <th> <button onclick="updateData(${i})" id="update" >Uptdate </button></th>
                        <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
                        </tr>
                        `;
                }
            }
    }
}

    document.getElementById('tbody').innerHTML = table;

}

