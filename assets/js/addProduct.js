// document.addEventListener("DOMContentLoaded", () => {

//   const productForm = document.getElementById("productForm");
//   const productsList = document.getElementById("productsList");

//   // تحميل المنتجات من localStorage
//   let products = JSON.parse(localStorage.getItem("products")) || [];

//   // عرض المنتجات
//   function displayProducts() {
//     productsList.innerHTML = "";

//     if(products.length === 0) {
//       productsList.innerHTML = "<p style='text-align:center;color:#aaa;'>لا توجد منتجات بعد.</p>";
//       return;
//     }

//     products.forEach((p, index) => {
//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.innerHTML = `
//         <img src="${p.image}" alt="${p.name}">
//         <h4>${p.name}</h4>
//         <p>${p.desc}</p>
//         <p>${p.price} جنيه</p>
//         <p style="font-size:12px;color:#888;">القسم: ${p.section}</p>
//         <button class="delete" data-index="${index}">حذف</button>
//       `;
//       productsList.appendChild(card);
//     });
//   }

//   // إضافة منتج جديد
//   productForm.addEventListener("submit", e => {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const desc = document.getElementById("desc").value.trim();
//     const price = document.getElementById("price").value.trim();
//     const section = document.getElementById("section").value;
//     const imageInput = document.getElementById("image");

//     if(!name || !desc || !price || !section || imageInput.files.length === 0) {
//       alert("يرجى ملء جميع الحقول!");
//       return;
//     }

//     const file = imageInput.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       const imageBase64 = reader.result;
//       console.log(name, desc, price, section, imageBase64);
//       products.push({ name, desc, price, section, image: imageBase64 });
//       localStorage.setItem("products", JSON.stringify(products));
//       displayProducts();
//       productForm.reset();
//       alert("✅ تمت إضافة المنتج بنجاح!");
//     };
//     reader.readAsDataURL(file);
//   });

//   // حذف المنتج
//   productsList.addEventListener("click", e => {
//     if(e.target.classList.contains("delete")) {
//       const index = e.target.dataset.index;
//       products.splice(index,1);
//       localStorage.setItem("products", JSON.stringify(products));
//       displayProducts();
//     }
//   });

//   // عرض المنتجات عند التحميل
//   displayProducts();

// });


//     const productForm = document.getElementById("productForm");
//     const productsList = document.getElementById("productsList");

//     let products = JSON.parse(localStorage.getItem("products")) || [];

//     function displayProducts() {
//       productsList.innerHTML = "";

//       if (products.length === 0) {
//         productsList.innerHTML = "<p style='text-align:center;color:#aaa'>لا توجد منتجات بعد.</p>";
//         return;
//       }

//       products.forEach(p => {
//         const card = document.createElement('div');
//         card.className = 'product-card';
//         card.innerHTML = `
//           <img src="${p.image}" alt="${p.name}">
//           <h4>${p.name}</h4>
//           <p>${p.description}</p>
//           <p>${p.price} جنيه</p>
//           <p style="font-size:12px;color:#888">القسم: ${p.section}</p>
//           <div style="margin-top:8px; display:flex; justify-content:center; gap:6px;">
//         <button class="edit" data-id="${p.id}"> تعديل</button>
//         <button class="delete" data-id="${p.id}"> حذف</button>
//             </div>
//         `;
//         productsList.appendChild(card);
//       });
//     }

//     productForm.addEventListener('submit', e => {
//       e.preventDefault();

//       const name = document.getElementById('name').value.trim();
//       const description = document.getElementById('description').value.trim();
//       const price = document.getElementById('price').value.trim();
//       const imageInput = document.getElementById('image');
//       const section = document.getElementById('section').value;

//       if (!name || !description || !price || imageInput.files.length === 0 || !section) {
//         alert('يرجى ملء جميع الحقول!');
//         return;
//       }

//       const file = imageInput.files[0];
//       const reader = new FileReader();
//       reader.onload = function() {
//         const imageBase64 = reader.result;
        

//         const newProduct = {
//           id: Date.now(),
//           name,
//           description, // ✅ تم إضافته هنا
//           price,
//           image: imageBase64,
//           section
//         };

//         products.push(newProduct);
//         localStorage.setItem('products', JSON.stringify(products));
//         displayProducts();
//         productForm.reset();
//         alert('✅ تمت إضافة المنتج بنجاح!');
//       };
//       reader.readAsDataURL(file);
//     });

//     productsList.addEventListener('click', e => {
//       const btn = e.target.closest('.delete');
//       if (!btn) return;

//       const id = Number(btn.dataset.id);
//       products = products.filter(p => p.id !== id);
//       localStorage.setItem('products', JSON.stringify(products));
//       displayProducts();
//     });

//     productsList.addEventListener('click', e => {
//   const editBtn = e.target.closest('.edit');
//   if (!editBtn) return;

//   const id = Number(editBtn.dataset.id);
//   const product = products.find(p => p.id === id);
//   if (!product) return alert("❌ المنتج غير موجود!");

//   const newName = prompt("📝 اسم جديد:", product.name);
//   const newDescription = prompt("📝 وصف جديد:", product.description);
//   const newPrice = prompt("📝 سعر جديد:", product.price);

//   if (newName && newDescription && newPrice) {
//     product.name = newName.trim();
//     product.description = newDescription.trim();
//     product.price = newPrice.trim();

//     localStorage.setItem("products", JSON.stringify(products));
//     displayProducts();
//     alert("✅ تم تعديل المنتج بنجاح!");
//   } else {
//     alert("❌ تم إلغاء التعديل أو البيانات ناقصة.");
//   }
// });

//     displayProducts();


// تهيئة الاتصال بـ Supabase
  const supabaseClient = supabase.createClient(
  'https://uwlomazzncrejbgxifuc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bG9tYXp6bmNyZWpiZ3hpZnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDMwODYsImV4cCI6MjA3Njg3OTA4Nn0.2imMbjsn-7mHd28HvPTJk9BGEu04JqfcESDNoBV-pSM'
);
// تهيئة Supabase


const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

let products = [];

// جلب المنتجات
async function fetchProducts() {
  const { data, error } = await supabaseClient
    .from('products')
    .select('*');

  if (error) {
    console.error("❌ خطأ في جلب المنتجات:", error.message);
    productsList.innerHTML = "<p style='text-align:center;color:#aaa'>حدث خطأ في تحميل المنتجات.</p>";
    return;
  }

  products = data;
  displayProducts();
}

// عرض المنتجات
function displayProducts() {
  productsList.innerHTML = "";

  if (products.length === 0) {
    productsList.innerHTML = "<p style='text-align:center;color:#aaa'>لا توجد منتجات بعد.</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image_url || 'https://via.placeholder.com/180x120'}" alt="${p.name}">
      <input type="text" class="edit-name" value="${p.name}">
      <input type="text" class="edit-description" value="${p.description}">
      <input type="number" class="edit-price" value="${p.price}">
      <select class="edit-section">
        <option value="الإلكترونيات" ${p.section==="الإلكترونيات"?"selected":""}>الإلكترونيات</option>
        <option value="الموبايلات" ${p.section==="الموبايلات"?"selected":""}>الموبايلات</option>
        <option value="الموضة" ${p.section==="الموضة"?"selected":""}>الموضة</option>
        <option value="الأجهزة المنزلية" ${p.section==="الأجهزة المنزلية"?"selected":""}>الأجهزة المنزلية</option>
        <option value="الأكل بقا" ${p.section==="الأكل بقا"?"selected":""}>الأكل بقا</option>
        <option value="العروض" ${p.section==="العروض"?"selected":""}>العروض</option>
      </select>
      <div style="margin-top:8px; display:flex; justify-content:center; gap:6px;">
        <button class="save" data-id="${p.id}">💾 حفظ</button>
        <button class="delete" data-id="${p.id}">❌ حذف</button>
      </div>
    `;
    productsList.appendChild(card);
  });
}

// إضافة منتج جديد
productForm.addEventListener('submit', async e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = document.getElementById('price').value.trim();
  const imageInput = document.getElementById('image');
  const section = document.getElementById('section').value;

  if (!name || !description || !price || !section) {
    alert('❌ يرجى ملء جميع الحقول!');
    return;
  }

  let imageUrl = "";

  // رفع الصورة إذا تم اختيارها
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const fileName = `${Date.now()}_${file.name.replace(/\s/g,'_')}`;

    const { data: imageData, error: imageError } = await supabaseClient.storage
      .from('images')
      .upload(fileName, file, { upsert: true }); // upsert يسمح بالكتابة على الملف إذا كان موجود

    if (imageError) {
      alert('❌ خطأ في رفع الصورة!');
      console.error(imageError.message);
      return;
    }

    imageUrl = supabaseClient.storage
      .from('images')
      .getPublicUrl(imageData.path).publicUrl;
  }

  const { error } = await supabaseClient
    .from('products')
    .insert([{ name, description, price, section, image_url: imageUrl }]);

  if (error) {
    alert('❌ خطأ في حفظ المنتج!');
    console.error(error.message);
  } else {
    alert('✅ تمت إضافة المنتج بنجاح!');
    productForm.reset();
    fetchProducts();
  }
});

// تعديل وحذف المنتجات
productsList.addEventListener('click', async e => {
  const saveBtn = e.target.closest('.save');
  const deleteBtn = e.target.closest('.delete');

  if (saveBtn) {
    const id = Number(saveBtn.dataset.id);
    const card = saveBtn.closest('.product-card');
    const newName = card.querySelector('.edit-name').value.trim();
    const newDescription = card.querySelector('.edit-description').value.trim();
    const newPrice = card.querySelector('.edit-price').value.trim();
    const newSection = card.querySelector('.edit-section').value;

    if (!newName || !newDescription || !newPrice || !newSection) {
      return alert("❌ يرجى ملء جميع الحقول!");
    }

    const { error } = await supabaseClient
      .from('products')
      .update({ name: newName, description: newDescription, price: newPrice, section: newSection })
      .eq('id', id);

    if (error) {
      alert("❌ فشل في حفظ التعديلات.");
      console.error(error.message);
    } else {
      alert("✅ تم حفظ التعديلات.");
      fetchProducts();
    }
  }

  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);
    const { error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      alert("❌ فشل في حذف المنتج.");
      console.error(error.message);
    } else {
      alert("✅ تم حذف المنتج.");
      fetchProducts();
    }
  }
});

// تحميل المنتجات عند فتح الصفحة
fetchProducts();
