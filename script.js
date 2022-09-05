// tangkap element html
let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addList_form = document.getElementById('addList_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

// menambahkan data ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString();

// data list belanja
let data_list_belanja = [];

// menambahkan event listener ke floating button
floating_button.addEventListener('click', () => {
  // atur style pada modal display menjadi flex
  // munculkan modal
  if (modal.style.display == 'none') {
    showModal();
    return;
  }
  // sembunyikan modal
  hideModal();
});

// menambahkan event listener ke modal bg
modal_bg.addEventListener('click', () => {
  // sembunyikan modal
  hideModal();
});

// menambahkan event listener submit ke addLsit form
addList_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // tangkap value dari input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data list belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  console.info(data_list_belanja);

  // clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();
  renderToHtml();
});

// show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

// hide modal
function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#f280b6';
  floating_button.style.transform = 'rotate(0deg)';
}

// render function
function renderToHtml() {
  // clear element div
  root.innerHTML = '';

  // loop
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <small> ${e.tanggal} </small>
      <div>
        ${e.nama_barang} <span>Rp.${e.harga_barang}</span>
      </div>
      <button onclick="handleDelete(${i})">Hapus</button>
    </div>
    `;
  });
}

function handleDelete(index) {
  let confirmDel = confirm('Yakin Hapus?');

  if (!confirmDel) {
    return;
  } else {
    data_list_belanja.splice(index, 1);

    alert('Berhasil Hapus');
  }
  renderToHtml();
}
//END FUNCTION
