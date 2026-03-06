// const loadPhone = async (searchText) => {
//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/phones?search=${searchText}`,
//   );
//   const data = await res.json();
//   const phones = data.data;
//   displayPhones(phones);
// };

// const displayPhones = (phones) => {
//     const phoneContiner = document.getElementById('phone-container');
//     phoneContiner.textContent = '';
//   phones.forEach((phone) => {
//     console.log(phone);
//     const phoneCard = document.createElement("div");
//     phoneCard.classList = `card bg-base-100 p-4 shadow-sm`;
//     phoneCard.innerHTML = `
//     <figure>
//                         <img src="${phone.image}"
//                             alt="Shoes" />
//                     </figure>
//                     <div class="card-body">
//                         <h2 class="card-title">${phone.phone_name}</h2>
//                         <p>A card component has a figure, a body part, and inside body there are title and actions parts
//                         </p>
//                         <div class="card-actions justify-end">
//                             <button class="btn btn-primary">Buy Now</button>
//                         </div>
//                     </div>
//     `;
//     phoneContiner.appendChild(phoneCard);
//   });
  
// };

// const searchHandle = () => {
//   const searchField = document.getElementById('search-field');
//   const searchText = searchField.value;
//   console.log(searchText);
//   loadPhone(searchText);
// }


const loadphone = async(searchText = '13',isShowAll) =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
   const data = await res.json();
   const phones = data.data;
   console.log(phones);
   displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12 && !isShowAll){
  showAllContainer.classList.remove('hidden');
}
else{
  showAllContainer.classList.add('hidden');
}

 if(!isShowAll){
  phones = phones.slice(0,12);
 }

phones.forEach(phone => {
  const phoneCard = document.createElement('div');
  phoneCard.classList =`card bg-base-100 w-96 shadow-sm`;
  phoneCard.innerHTML = `
  <figure>
                        <img src="${phone.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts
                        </p>
                        <div class="card-actions justify-center">
                            <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                        </div>
                    </div>
  `
  phoneContainer.appendChild(phoneCard);
});
toggleLoadingSpinner(false);
}


const searchHandle = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadphone(searchText,isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }

}

const handleShowAll = () => {
  searchHandle(true);
}

const handleShowDetails = async (id) => {
  // console.log("clicked show details",id);
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById('show-detail-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>chipset:</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>displaySize:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS'}</p>
  `
  show_details_modal.showModal();


}

loadphone();