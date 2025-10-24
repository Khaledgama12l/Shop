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


    const productForm = document.getElementById("productForm");
    const productsList = document.getElementById("productsList");

    let products = JSON.parse(localStorage.getItem("products")) || [];

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
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <p>${p.price} جنيه</p>
          <p style="font-size:12px;color:#888">القسم: ${p.section}</p>
          <div style="margin-top:8px; display:flex; justify-content:center; gap:6px;">
        <button class="edit" data-id="${p.id}"> تعديل</button>
        <button class="delete" data-id="${p.id}"> حذف</button>
            </div>
        `;
        productsList.appendChild(card);
      });
    }

    productForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const description = document.getElementById('description').value.trim();
      const price = document.getElementById('price').value.trim();
      const imageInput = document.getElementById('image');
      const section = document.getElementById('section').value;

      if (!name || !description || !price || imageInput.files.length === 0 || !section) {
        alert('يرجى ملء جميع الحقول!');
        return;
      }

      const file = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = function() {
        const imageBase64 = reader.result;
        

        const newProduct = {
          id: Date.now(),
          name,
          description, // ✅ تم إضافته هنا
          price,
          image: imageBase64,
          section
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        productForm.reset();
        alert('✅ تمت إضافة المنتج بنجاح!');
      };
      reader.readAsDataURL(file);
    });

    productsList.addEventListener('click', e => {
      const btn = e.target.closest('.delete');
      if (!btn) return;

      const id = Number(btn.dataset.id);
      products = products.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(products));
      displayProducts();
    });

    productsList.addEventListener('click', e => {
  const editBtn = e.target.closest('.edit');
  if (!editBtn) return;

  const id = Number(editBtn.dataset.id);
  const product = products.find(p => p.id === id);
  if (!product) return alert("❌ المنتج غير موجود!");

  const newName = prompt("📝 اسم جديد:", product.name);
  const newDescription = prompt("📝 وصف جديد:", product.description);
  const newPrice = prompt("📝 سعر جديد:", product.price);

  if (newName && newDescription && newPrice) {
    product.name = newName.trim();
    product.description = newDescription.trim();
    product.price = newPrice.trim();

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    alert("✅ تم تعديل المنتج بنجاح!");
  } else {
    alert("❌ تم إلغاء التعديل أو البيانات ناقصة.");
  }
});

    displayProducts();