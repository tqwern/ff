function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function find_by_id(list, id) {

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }

  return undefined;
}

function removeById(array, id) {
  return array.filter(item => item.id !== id);
}

const deleteBusy = (event , ids) => {
  event.preventDefault();
  console.log(find_by_id(JSON.parse(localStorage.getItem("busy_apartments")) ,ids ))
  localStorage.setItem('busy_apartments' , JSON.stringify(removeById(JSON.parse(localStorage.getItem("busy_apartments")) ,ids )))
  window.location.reload()
  
};
const all_apartments = () => {
  return JSON.parse(localStorage.getItem("all_apartments"));
};
const busy_apartments = (data = null) => {
  if (data !== null) {
    localStorage.setItem("busy_apartments", JSON.stringify(data));
    return data;
  }
  return JSON.parse(localStorage.getItem("busy_apartments"));
};

const busy_apartments_add = (obj) => {
  let data = busy_apartments();

  if (data !== null) {
    data.push(obj);
  } else {
    data = [obj];
  }
  busy_apartments(data);
};
function generateApartmentsData(
  numFloors,
  url_standart_1 = "https://a-house.ru/upload/resize_cache/iblock/1d2/1240_700_2/1d24e801a02ddcb4ff693f29bc7ff81f.jpg",
  url_standart_2 = "https://a-house.ru/upload/resize_cache/iblock/f8e/1240_700_2/f8e3ebe78c8c075eb6469c2b16172fc7.jpg",
  url_comfort_1 = "https://newstory.spb.ru/sites/default/files/room2_2.jpg",
  url_comfort_2 = "https://a-house.ru/upload/resize_cache/iblock/582/1920_1080_2/58286119701e573f94163fe1097dd551.jpg",
  url_president_1 = "https://luciano-wellness.ru/upload/resize_cache/webp/upload/iblock/660/dhk25dzg6rme5iomid3q6qj221m0v5tb.webp",
  url_president_2 = "https://www.castlehotelcollection.com/wp-content/uploads/rubezahl-marienbad-historical-castle-hotel-room-presidential-suite-02-1024x683.jpg"
) {
  const apartmentClasses = ["стандарт", "комфорт", "президентский"];
  const roomsPerFloor = 10;
  const occupants = [1, 2];

  const prices = {
    стандарт: { 1: 100, 2: 150 },
    комфорт: { 1: 200, 2: 300 },
    президентский: { 1: 500, 2: 800 },
  };
  const description = {
    стандарт: `<ul class="list-group list-group-flush">
    <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Бесплатный wi-fi</li>
    <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Ежедневная уборка номера</li>
    <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Кондиционер</li>
    <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">ТВ с основными каналами</li>
    <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Сейф</li>
  </ul>`,
    комфорт:`
    <ul class="list-group list-group-flush">
  <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Все услуги Стандарта</li>
  <li class="list-group-item" style="background-color: rgba(255, 255, 255, 0);">Завтрак "шведский стол" включен</li>
  <li class="list-group-item"style="background-color: rgba(255, 255, 255, 0);">Банный халат и тапочки</li>
</ul>
    `,
    президентский: `
    <ul class="list-group list-group-flush">
  <li class="list-group-item"style="background-color: rgba(255, 255, 255, 0);">Все услуги Стандарта и Комфорта</li>
  <li class="list-group-item"style="background-color: rgba(255, 255, 255, 0);">Круглосуточное обслуживание номеров</li>
  <li class="list-group-item"style="background-color: rgba(255, 255, 255, 0);">Спа-процедуры по записи</li>
  <li class="list-group-item"style="background-color: rgba(255, 255, 255, 0);">Прачечная/химчистка</li>
</ul>
    `,
  }
  const photos = {
    стандарт: { 1: url_standart_1, 2: url_standart_2 },
    комфорт: { 1: url_comfort_1, 2: url_comfort_2 },
    президентский: { 1: url_president_1, 2: url_president_2 },
  };

  const apartmentsData = [];
  let ids = 0;
  for (let floor = 1; floor <= numFloors; floor++) {
    for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
      const roomClass =
        apartmentClasses[Math.floor(Math.random() * apartmentClasses.length)];
      const occupantsCount =
        occupants[Math.floor(Math.random() * occupants.length)];
      const price = prices[roomClass][occupantsCount];
      const photoUrl = photos[roomClass][occupantsCount];

      const apartment = {
        id: ids,
        floor: floor,
        roomNumber: roomNumber,
        occupantsCount: occupantsCount,
        class: roomClass,
        price: price,
        photoUrl: photoUrl,
        description: description[roomClass]
      };
      ids += 1;
      apartmentsData.push(apartment);
    }
  }

  return apartmentsData;
}

const create_apartments = () => {
  const storey = getRandomArbitrary(3, 10);
  localStorage.setItem(
    "all_apartments",
    JSON.stringify({
      apartments: generateApartmentsData(storey),
    })
  );
};

function saveReservation(event, ids) {
  event.preventDefault();

  let name = document.getElementById("name_"+ids).value;
  let age = document.getElementById("age_"+ids).value;
  let dateFrom = document.getElementById("date-from_"+ids).value;
  let dateTo = document.getElementById("date-to_"+ids).value;

  busy_apartments_add({
    id: ids,
    name:name,
    age: age,
    dateFrom: dateFrom,
    dateTo: dateTo,
  });

  window.location.reload()
}
