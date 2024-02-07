const apartments = all_apartments().apartments;
for (const value in apartments) {
  const element = apartments[value];
  const busy = busy_apartments();
  if (busy === null) {
    busy_apartments([])
    window.location.reload()
  }
  document.getElementById("card_target").innerHTML += `
                <div class="col">
                
                <div class="modal fade" id="staticBackdrop_${
                  element.id
                }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form onsubmit="saveReservation(event , ${element.id})">

                    <div class="mb-3">
                      <label for="name" class="form-label">ФИО</label>
                      <input 
                          type="text" 
                          class="form-control" 
                          id="name_${element.id}"
                          required
                      >
                    </div>
                  
                    <div class="mb-3">
                      <label for="age" class="form-label">Возраст</label>
                      <input 
                          type="number" 
                          class="form-control" 
                          id="age_${element.id}"
                          min="17"
                          required
                      >
                    </div>
                  
                    <div class="mb-3">
                      <label for="date-from" class="form-label">Дата с</label>
                      <input 
                          type="date" 
                          class="form-control" 
                          id="date-from_${element.id}"
                          required
                      >
                    </div>
                  
                    <div class="mb-3">
                      <label for="date-to" class="form-label">Дата по</label>
                      <input 
                          type="date" 
                          class="form-control" 
                          id="date-to_${element.id}"
                          required
                      >
                    </div>
                  
                    <button type="submit" class="btn btn-primary">Забронировать</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </form>
                    </div>
                
                  </div>
                </div>
              </div>
                <div class="card_d">
                  <div class="front">

                <div class="card text-bg-dark" >
                    <img src="${
                      element.photoUrl
                    }" class="card-img" style="opacity: 0.50;">
                    
                    <div class="card-img-overlay" style="background-color: rgba(189, 195, 199, 0.2); ">
                    
                        <h5 class="card-title"> ${
                          element.class.charAt(0).toUpperCase() +
                          element.class.slice(1)
                        } </h5>
                        <h2 class="card-text">Номер: ${element.roomNumber}</h2>
                        <h4 class="card-text">${
                          element.occupantsCount === 1
                            ? "На одного"
                            : "На двоих"
                        }</h4>
                        <h1 class="card-text">${element.price}$</h1>
                    </div>
                    ${
                      find_by_id(busy, element.id) === undefined
                        ? ``
                        : `
                    <div class="card-footer " style="z-index:1;">
                    <a class="btn btn-dark">Забронировано </a> до ${
                      find_by_id(busy, element.id).dateTo
                    }
                    </div> 
                    `
                    }
                </div>
                  </div>
                  <div class="back">
                  
                 
                ${element.description}
                
                <div class="card text-bg-dark" >
                    <img src="${
                      element.photoUrl
                    }" class="card-img" style="opacity: 0.50;">
                    
                    <div class="card-img-overlay" style="background-color: rgba(189, 195, 199, 0.2); ">
                    
                        <h5 class="card-title"> ${
                          element.class.charAt(0).toUpperCase() +
                          element.class.slice(1)
                        } </h5>
                        <h2 class="card-text">Номер: ${element.roomNumber}</h2>
                        <h4 class="card-text">${
                          element.occupantsCount === 1
                            ? "На одного"
                            : "На двоих"
                        }</h4>
                        <h1 class="card-text">${element.price}$</h1>
                    </div>
                    ${
                      find_by_id(busy, element.id) === undefined
                        ? `<div class="card-footer" style="z-index:1;">
                    <a href="#ids=${element.id}"class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop_${element.id}">Забронировать</a>
                    </div>
                    `
                        : `
                    `
                    }
                    
                </div>
                  </div>
                </div>

               
                   
                </div>
                `;
}

setInterval(() => {
  if (window.location.hash !== "") {
    const ids = window.location.hash.split("=");
    state_global.ids = Number(ids[1]);

    history.pushState("", document.title, window.location.pathname);
  }
}, 500);

const now = new Date();

const twoYearsLater = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate()
);
for (let index = 0; index < all_apartments().apartments.length; index++) {
  document
  .getElementById("date-from"+"_"+index)
  .setAttribute("min", now.toISOString().split("T")[0]);
document
  .getElementById("date-to"+"_"+index)
  .setAttribute("min", now.toISOString().split("T")[0]);
document
  .getElementById("date-to"+"_"+index)
  .setAttribute("max", twoYearsLater.toISOString().split("T")[0]);
document
  .getElementById("date-from"+"_"+index)
  .setAttribute("max", twoYearsLater.toISOString().split("T")[0]);
  
}

