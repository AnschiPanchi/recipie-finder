const searchbox= document.querySelector(".inputbar");
const searchbutton= document.querySelector(".searchbutton");
const recipiecards= document.querySelector(".main-section");
const text= document.querySelector(".text");
const recipiepopup=document.querySelector(".recipie");
const closebutton=document.querySelector(".closebutton");
const recipiecontent=document.querySelector(".recipiecontent");


const apifetch= async (food)=>{
    text.innerHTML='Fetching Recipies....';
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
    const dataobj= await data.json();
    text.innerHTML='';
    dataobj.meals.forEach(food => {
        const recipiediv=document.createElement('div');
        recipiediv.classList.add('recipiediv');
        const mealcard=document.createElement('div');
        mealcard.classList.add('mealcard');
        mealcard.innerHTML=`
             <img src="${food.strMealThumb}">
             <p>${food.strMeal}</p>
             <p>${food.strArea}</p>
             <p>${food.strCategory}</p>
        `
        recipiecards.appendChild(recipiediv);
        recipiediv.appendChild(mealcard);
        const recipieview= document.createElement('button');
        recipieview.classList.add('recipieview');
        recipieview.innerHTML='View Recipie';
        mealcard.appendChild(recipieview);

        recipieview.addEventListener('click',()=>{
            recipie(food);
        })

        closebutton.addEventListener('click',()=>{
            recipiepopup.style.display='none';
        })


        
    });
    
}
searchbutton.addEventListener('click',(e)=>{
    recipiecards.innerHTML='';
    const searchinput= searchbox.value.trim();
    apifetch(searchinput);
    
    searchbutton.addEventListener('click',(e)=>{
    recipiecards.innerHTML='';
    const searchinput= searchbox.value.trim();
    apifetch(searchinput);
    })
    
   
})

function fetchIngredients(food){
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=food[`strIngredient${i}`];
        if(ingredient){
            const measure=food[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`
        }else{
            break;
        }
    }
    return ingredientsList;
}

function recipie(food){
    recipiecontent.innerHTML=`
        <h2>${food.strMeal}</h2>
        <h3>Indregients:</h3>
        <ul>${fetchIngredients(food)}</ul>

    `
    recipiepopup.style.display="block";
}